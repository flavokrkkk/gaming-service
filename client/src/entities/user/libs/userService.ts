import { axiosInstance } from "@/shared/api/baseQuery";
import { User } from "next-auth";
import { ICurrentUser } from "../types";
import { getSessionUser } from "@/entities/session/libs/sessionService";

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
    const profileId = await getSessionUser();
    const { data } = await axiosInstance.get<ICurrentUser>(
      `/api/v1/user/${profileId}`
    );

    return data;
  }
}

export const { getCurrentUser, getCurrentProfile } = UserService.getInstance();
