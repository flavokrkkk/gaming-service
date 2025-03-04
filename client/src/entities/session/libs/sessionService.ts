import { getSession } from "next-auth/react";

class SessionService {
  public async getSessionUser() {
    const session = await getSession();
    if (!session || !session.user?.id) return null;
    const sessionId = session.user.id;

    return sessionId;
  }
}

export const { getSessionUser } = new SessionService();

//12121
//631620e7-743b-4c6c-ae5a-bf7ccb7dcd5b
