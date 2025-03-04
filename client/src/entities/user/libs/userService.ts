import { axiosInstance } from "@/shared/api/baseQuery";
import { User, getServerSession } from "next-auth";
import { ICurrentUser } from "../types";
import qs from "query-string";

class UserService {
  private static instance: UserService;

  public static getInstance(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }

    return UserService.instance;
  }

  public async getCurrentUser(user: User): Promise<ICurrentUser | null> {
    const { data } = await axiosInstance.post<ICurrentUser>(
      "/api/v1/user",
      user
    );

    return data;
  }

  public async getCurrentProfile() {
    const user = await getServerSession();

    if (!user?.user.email) return null;

    const url = qs.stringifyUrl({
      url: "/api/v1/user/by-email",
      query: { email: user.user.email },
    });

    const { data } = await axiosInstance.get<ICurrentUser>(url);

    return data;
  }

  public async getCurrentProfileBySession(user?: User) {
    if (!user?.email) return null;

    const url = qs.stringifyUrl({
      url: "/api/v1/user/by-email",
      query: { email: user.email },
    });

    const { data } = await axiosInstance.get<ICurrentUser>(url);

    return data;
  }
}

export const { getCurrentUser, getCurrentProfile, getCurrentProfileBySession } =
  UserService.getInstance();
