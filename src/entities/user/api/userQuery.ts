import { ICurrentUser } from "../types/types";
import { db } from "@/shared/db";
import { customRoles } from "../utils/castomName";
import { getServerSession, User } from "next-auth";
import { authOptions } from "@/shared/libs/auth";

class UserQuery {
  private static instance: UserQuery;

  public customRoles: Array<string> = customRoles;

  public static getInstance(): UserQuery {
    if (!UserQuery.instance) {
      UserQuery.instance = new UserQuery();
    }

    return UserQuery.instance;
  }

  private generateUsername(): string {
    const randomRole =
      this.customRoles[Math.floor(Math.random() * this.customRoles.length)];
    const randomNumber = Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, "0");
    return `Strife${randomRole}#${randomNumber}`;
  }

  private async generateUniqueUsername(): Promise<string> {
    let username = this.generateUsername();
    let isUnique = false;

    while (!isUnique) {
      const existingProfile = await db.profile.findUnique({
        where: { username: username },
      });
      if (!existingProfile) {
        isUnique = true;
      } else {
        username = this.generateUsername();
      }
    }

    return username;
  }

  public async getCurrentUser(user: User): Promise<ICurrentUser | null> {
    if (!user) return null;

    const profile = await db.profile.findUnique({
      where: {
        userId: user.id,
      },
    });

    if (profile) {
      return profile;
    }

    const uniqueUsername = await this.generateUniqueUsername();

    const newProfile = await db.profile.create({
      data: {
        userId: user.id,
        username: uniqueUsername,
        name: user.name ?? "unknown",
        imageUrl: user.image ?? "",
        email: user.email ?? "",
      },
    });

    return newProfile;
  }
  public async getCurrentProfile() {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.id) return null;

    const userId = session.user.id;

    if (!userId) return null;
    const profile = await db.profile.findUnique({
      where: {
        userId,
      },
    });

    return profile;
  }
}
export const instance = UserQuery.getInstance();

export const { getCurrentProfile, getCurrentUser } = instance;

export const getCurrentUserAuth = getCurrentUser.bind(instance);
