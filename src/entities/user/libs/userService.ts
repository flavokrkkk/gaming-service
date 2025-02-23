import { auth, currentUser } from "@clerk/nextjs/server";
import { ICurrentUser } from "../types/types";
import { redirect, RedirectType } from "next/navigation";
import { ERouteNames } from "@/shared/libs/utils/pathVariables";
import { db } from "@/shared/db";

class UserService {
  private static instance: UserService;

  public static getInstance(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }

    return UserService.instance;
  }

  public async getCurrentUser(): Promise<ICurrentUser> {
    const user = await currentUser();

    if (!user) redirect(ERouteNames.SIGN_IN, RedirectType.replace);

    const profile = await db.profile.findUnique({
      where: {
        userId: user.id,
      },
    });

    if (profile) {
      return profile;
    }

    const newProfile = await db.profile.create({
      data: {
        userId: user.id,
        name: `${user.firstName} ${user.lastName}`,
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

export const { getCurrentUser, getCurrentProfile } = UserService.getInstance();
