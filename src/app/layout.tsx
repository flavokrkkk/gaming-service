import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./styles/globals.css";
import { cn } from "@/shared";
import { ClerkProvider } from "@clerk/nextjs";
import ThemeProvider from "@/shared/providers/themeProvider";

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
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={cn(
            `antialiased`,
            font.variable,
            "bg-white dark:bg-gray-mode-200"
          )}
        >
          <ThemeProvider
            attribute={"class"}
            defaultTheme="dark"
            enableSystem={false}
            storageKey="strife-theme"
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
