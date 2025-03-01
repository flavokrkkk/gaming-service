import { auth, currentUser } from "@clerk/nextjs/server";
import { ICurrentUser } from "../types/types";
import { redirect, RedirectType } from "next/navigation";
import { ERouteNames } from "@/shared/libs/utils/pathVariables";
import { db } from "@/shared/db";
import { customRoles } from "../utils/castomName";

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

  private getName({
    firstName,
    lastName,
  }: {
    firstName: string;
    lastName: string;
  }): string {
    if (firstName && lastName) return `${firstName} ${lastName}`;
    if (firstName) return firstName;
    if (lastName) return lastName;
    return "Unknown";
  }

  public async getCurrentUser(): Promise<ICurrentUser> {
    const user = await currentUser();

    if (!user) return redirect(ERouteNames.SIGN_IN, RedirectType.replace);

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
        name: this.getName({
          firstName: user.firstName ?? "",
          lastName: user.lastName ?? "",
        }),
        imageUrl: user.imageUrl,
        email: user.emailAddresses[0].emailAddress,
      },
    });

    return newProfile;
  }
  public async getCurrentProfile() {
    const { userId } = await auth();
    if (!userId) return null;
    const profile = await db.profile.findUnique({
      where: {
        userId,
      },
    });

    return profile;
  }
}

export const { getCurrentUser, getCurrentProfile } = UserQuery.getInstance();
