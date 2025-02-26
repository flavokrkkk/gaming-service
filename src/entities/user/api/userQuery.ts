import { auth, currentUser } from "@clerk/nextjs/server";
import { ICurrentUser } from "../types/types";
import { redirect, RedirectType } from "next/navigation";
import { ERouteNames } from "@/shared/libs/utils/pathVariables";
import { db } from "@/shared/db";

class UserQuery {
  private static instance: UserQuery;

  public static getInstance(): UserQuery {
    if (!UserQuery.instance) {
      UserQuery.instance = new UserQuery();
    }

    return UserQuery.instance;
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

export const { getCurrentUser, getCurrentProfile } = UserQuery.getInstance();
