import { axiosInstance } from "@/shared/api/baseQuery";

class ConversationService {
  private static instance: ConversationService;

  public static getInstance(): ConversationService {
    if (!ConversationService.instance) {
      ConversationService.instance = new ConversationService();
    }

    return ConversationService.instance;
  }

  public async getOrCreateConversation({
    memberOneId,
    memberTwoId,
  }: {
    memberOneId: string;
    memberTwoId: string;
  }) {
    const { data } = await axiosInstance.post("/api/v1/conversation", {
      memberOneId,
      memberTwoId,
    });

    return data;
  }
}

export const { getOrCreateConversation } = ConversationService.getInstance();
