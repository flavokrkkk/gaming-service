import { db } from "@/shared/db";

class ConversationQuery {
  private static instance: ConversationQuery;

  public static getInstance(): ConversationQuery {
    if (!ConversationQuery.instance) {
      ConversationQuery.instance = new ConversationQuery();
    }

    return ConversationQuery.instance;
  }

  private async findConversation({
    memberOneId,
    memberTwoId,
  }: {
    memberOneId: string;
    memberTwoId: string;
  }) {
    try {
      return await db.conversation.findFirst({
        where: {
          AND: [{ memberOneId }, { memberTwoId }],
        },
        include: {
          memberOne: {
            include: {
              profile: true,
            },
          },
          memberTwo: {
            include: {
              profile: true,
            },
          },
        },
      });
    } catch {
      return null;
    }
  }

  private async createConversation({
    memberOneId,
    memberTwoId,
  }: {
    memberOneId: string;
    memberTwoId: string;
  }) {
    try {
      return await db.conversation.create({
        data: {
          memberOneId,
          memberTwoId,
        },
        include: {
          memberOne: {
            include: {
              profile: true,
            },
          },
          memberTwo: {
            include: {
              profile: true,
            },
          },
        },
      });
    } catch {
      return null;
    }
  }

  public async getOrCreateConversation({
    memberOneId,
    memberTwoId,
  }: {
    memberOneId: string;
    memberTwoId: string;
  }) {
    let conversation =
      (await this.findConversation({
        memberOneId,
        memberTwoId,
      })) || (await this.findConversation({ memberTwoId, memberOneId }));
    if (!conversation) {
      conversation = await this.createConversation({
        memberOneId,
        memberTwoId,
      });
    }
    return conversation;
  }
}

export const instance = ConversationQuery.getInstance();

export const getOrCreateConversation =
  instance.getOrCreateConversation.bind(instance);
