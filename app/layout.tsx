import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { NextAuthProvider } from "./Components/Providers";
import { getServerSession } from "next-auth";
import { authOptions } from "./lib/auth";
import Image from "next/image";
const inter = FontSans({ subsets: ["latin"] });
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Logout, NavLogin } from "./Components/Buttons";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "ShutApp!",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <NextAuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <nav className="px-10 py-5 flex justify-between fixed top-0 left-0 w-full bg-gray-200 dark:bg-background">
              <h1 className="text-blue-950 font-bold text-3xl select-none">
                SHUT<span className="text-teal-500 ">App!</span>
              </h1>

              {session ? (
                <div className="flex items-center">
                  <Image
                    src={session.user?.image as string}
                    alt="image"
                    className="w-12 h-12 rounded-full mr-3 border-background border-2"
                    width={50}
                    height={50}
                  />
                  <Logout />
                  <ModeToggle />
                </div>
              ) : (
                <div className="flex items-center">
                  <NavLogin />
                  <ModeToggle />
                </div>
              )}
            </nav>
            <main>{children}</main>
          </ThemeProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
