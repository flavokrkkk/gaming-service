// middleware.ts
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { JWT } from "next-auth/jwt";

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
  function middleware(req: AuthRequest) {
    const { pathname } = req.nextUrl;
    const token = req.nextauth.token;

    if (token && pathname === "/sign-in") {
      return NextResponse.redirect(new URL("/", req.url));
    }

    if (pathname.startsWith("/api/uploadthing")) {
      return NextResponse.next();
    }

    if (!token && pathname !== "/sign-in") {
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
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
