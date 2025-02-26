import { getCurrentProfile } from "@/entities/user/api/userQuery";
import { db } from "@/shared/db";
import axios from "axios";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ memberId: string }> }
) {
  try {
    const { memberId } = await params;
    const { searchParams } = new URL(req.url);
    const { role } = await req.json();
    const serverId = searchParams.get("serverId");

    const profile = await getCurrentProfile();

    if (!serverId) {
      return NextResponse.json(
        { error: "Server ID is required" },
        { status: 400 }
      );
    }

    if (!memberId) {
      return NextResponse.json(
        { error: "Member ID is required" },
        { status: 400 }
      );
    }

    if (!profile) return new NextResponse("Unauthorized", { status: 401 });

    const server = await db.server.update({
      where: {
        id: serverId,
        profileId: profile.id,
      },
      data: {
        members: {
          update: {
            where: {
              id: memberId,
              profileId: {
                not: profile.id,
              },
            },
            data: {
              role,
            },
          },
        },
      },
      include: {
        members: {
          include: {
            profile: true,
          },
          orderBy: {
            role: "asc",
          },
        },
      },
    });

    return NextResponse.json(server);

    return NextResponse.json({});
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return new NextResponse("Internal Error", { status: err.status });
    }

    throw err;
  }
}
