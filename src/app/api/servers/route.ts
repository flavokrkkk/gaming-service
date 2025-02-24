import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { NextResponse } from "next/server";
import { db } from "@/shared/db";
import { MemberRole } from "@prisma/client";
import { getCurrentProfile } from "@/entities/user/api/userQuery";

export async function POST(req: Request) {
  try {
    const { name, imageUrl } = await req.json();

    const profile = await getCurrentProfile();

    if (!profile) return new NextResponse("Unauthorized", { status: 401 });

    const server = await db.server.create({
      data: {
        name,
        imageUrl,
        profileId: profile.id,
        inviteCode: uuidv4(),
        channels: {
          create: [
            {
              name: "general",
              profileId: profile.id,
            },
          ],
        },
        members: {
          create: [
            {
              profileId: profile.id,
              role: MemberRole.ADMIN,
            },
          ],
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
