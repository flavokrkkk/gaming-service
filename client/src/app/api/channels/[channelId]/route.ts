import { getCurrentProfile } from "@/entities/user/api/userQuery";
import { db } from "@/shared/db";
import { MemberRole } from "@prisma/client";
import axios from "axios";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ channelId: string }> }
) {
  try {
    const { channelId } = await params;
    const { searchParams } = new URL(req.url);
    const serverId = searchParams.get("serverId") || "";

    const profile = await getCurrentProfile();

    if (!profile) return new NextResponse("Unauthorized", { status: 401 });

    if (!channelId)
      return new NextResponse("Channel ID Missing", { status: 400 });

    if (!serverId)
      return new NextResponse("Server ID Missing", { status: 400 });

    const server = await db.server.update({
      where: {
        id: serverId,
        members: {
          some: {
            profileId: profile.id,
            role: {
              in: [MemberRole.ADMIN, MemberRole.MODERATOR],
            },
          },
        },
      },
      data: {
        channels: {
          delete: {
            id: channelId,
            name: {
              not: "general",
            },
          },
        },
      },
    });

    return NextResponse.json(server);
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return new NextResponse("Internal Error", { status: err.status });
    }

    throw err;
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ channelId: string }> }
) {
  try {
    const { channelId } = await params;
    const { searchParams } = new URL(req.url);
    const serverId = searchParams.get("serverId") || "";
    const { name, type, isPrivate } = await req.json();
    const profile = await getCurrentProfile();

    if (!profile) return new NextResponse("Unauthorized", { status: 401 });

    if (!channelId)
      return new NextResponse("Channel ID Missing", { status: 400 });

    if (!serverId)
      return new NextResponse("Server ID Missing", { status: 400 });

    if (name === "general") {
      return new NextResponse("Name cannot be 'general'", { status: 400 });
    }

    const server = await db.server.update({
      where: {
        id: serverId,
        members: {
          some: {
            profileId: profile.id,
            role: {
              in: [MemberRole.ADMIN, MemberRole.MODERATOR],
            },
          },
        },
      },
      data: {
        channels: {
          update: {
            where: {
              id: channelId,
              NOT: {
                name: "general",
              },
            },
            data: {
              name,
              type,
              isPrivate,
            },
          },
        },
      },
    });

    return NextResponse.json(server);
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return new NextResponse("Internal Error", { status: err.status });
    }

    throw err;
  }
}
