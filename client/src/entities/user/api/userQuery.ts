import { db } from "@/shared/db";
import { customRoles } from "../utils/castomName";
import { getServerSession } from "next-auth";
import { authOptions } from "@/shared/libs/auth";
import { NextApiRequest, NextApiResponse } from "next";

class UserQuery {
  private static instance: UserQuery;

  public customRoles: Array<string> = customRoles;

  public static getInstance(): UserQuery {
    if (!UserQuery.instance) {
      UserQuery.instance = new UserQuery();
    }

    return UserQuery.instance;
  }

  public async getCurrentProfileAuthApi(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    const session = await getServerSession(req, res, authOptions);

    if (!session || !session.user?.id) return null;

    const userId = session.user.id;

    if (!userId) return null;
    //на сервер
    const profile = await db.profile.findUnique({
      where: {
        userId,
      },
    });

    return profile;
  }
}
export const instance = UserQuery.getInstance();

export const { getCurrentProfileAuthApi } = instance;

export const getCurrentProfileAuth = getCurrentProfileAuthApi.bind(instance);
