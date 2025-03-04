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
