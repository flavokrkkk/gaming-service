import { getCurrentProfile } from "@/entities/user/api/userQuery";
import { fetchFileType } from "@/features/files/libs/getFileType";
import { db } from "@/shared/db";
import { Message } from "@prisma/client";
import axios from "axios";
import { NextResponse } from "next/server";

const MESSAGES_BATCH = 10;

export async function GET(req: Request) {
  try {
    const profile = await getCurrentProfile();

    const { searchParams } = new URL(req.url);

    const cursor = searchParams.get("cursor");
    const channelId = searchParams.get("channelId");

    if (!profile) return new NextResponse("Unauthorized", { status: 401 });

    if (!channelId)
      return new NextResponse("Channel ID Missing", { status: 400 });

    let messages: Array<Message> = [] as Array<Message>;

    if (cursor) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      messages = await db.message.findMany({
        take: MESSAGES_BATCH,
        skip: 1,
        cursor: {
          id: cursor,
        },
        where: {
          channelId: channelId,
        },
        include: {
          member: {
            include: {
              profile: true,
            },
          },
        },

        orderBy: {
          createdAt: "desc",
        },
      });
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      messages = await db.message.findMany({
        take: MESSAGES_BATCH,
        where: {
          channelId: channelId,
        },
        include: {
          member: {
            include: {
              profile: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    }

    let nextCursor: string | null = null;
    if (messages.length === MESSAGES_BATCH) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      nextCursor = messages[MESSAGES_BATCH - 1].id;
    }
    const newMessages: Array<Message> = [];

    for (const message of messages) {
      if (message.fileUrl) {
        const fileType = await fetchFileType(message.fileUrl);
        newMessages.push({
          ...message,
          fileUrl: { url: message.fileUrl, type: fileType },
        });
      } else {
        newMessages.push(message);
      }
    }

    return NextResponse.json({
      items: newMessages,
      nextCursor,
    });
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return new NextResponse("Internal Error", { status: err.status });
    }

    throw err;
  }
}
