import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./styles/globals.css";
import { cn } from "@/shared";
import Providers from "@/shared/providers/providers";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "./api/uploadthing/core";

const font = Open_Sans({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Strife",
  description: "Strife app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          `antialiased`,
          font.variable,
          "bg-white dark:bg-gray-mode-200 overflow-hidden"
        )}
      >
        <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
