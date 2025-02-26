import { getCurrentProfile } from "@/entities/user/api/userQuery";
import { db } from "@/shared/db";
import axios from "axios";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ serverId: string }> }
) {
  try {
    const { serverId } = await params;

    const { name, imageUrl } = await req.json();
    const profile = await getCurrentProfile();

    if (!profile) return new NextResponse("Unauthorized", { status: 401 });

    const server = await db.server.update({
      where: {
        id: serverId,
        profileId: profile.id,
      },
      data: {
        name,
        imageUrl,
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
