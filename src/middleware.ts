// middleware.ts
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { JWT } from "next-auth/jwt";
import { getToken } from "next-auth/jwt";

interface CustomJWT extends JWT {
  id?: string;
  email?: string;
  name?: string | null;
  image?: string | null;
}

interface AuthRequest extends NextRequest {
  nextauth: {
    token: CustomJWT | null;
  };
}

export default withAuth(
  async function middleware(req: AuthRequest) {
    const { pathname } = req.nextUrl;
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (token && (pathname === "/sign-in" || pathname === "/sign-up")) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    if (pathname.startsWith("/api/uploadthing")) {
      return NextResponse.next();
    }

    if (!token && pathname !== "/sign-in" && pathname !== "/sign-up") {
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }

    return NextResponse.next();
  },
  {
    pages: {
      signIn: "/sign-in",
    },
    callbacks: {
      authorized: ({
        req,
        token,
      }: {
        req: NextRequest;
        token: CustomJWT | null;
      }): boolean => {
        if (req.nextUrl.pathname.startsWith("/api/uploadthing")) return true;
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: [
    "/",
    "/sign-in",
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)", // Все остальные маршруты
    "/(api|trpc)(.*)",
  ],
};
