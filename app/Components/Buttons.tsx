"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { GoogleSVG, GithubSVG } from "./Logos";
export function Logout() {
  return (
    <Button variant="outline" onClick={() => signOut()}>
      Logout
    </Button>
  );
}

export function NavLogin() {
  return (
    <Link href="/" className={buttonVariants({ variant: "outline" })}>
      Login
    </Link>
  );
}

export function MainLogin() {
  return (
    <div>
      <Button
        variant="outline"
        className="w-full flex justify-between"
        onClick={() => signIn("github")}
      >
        <GithubSVG width={30} height={30}/>
        Login with Github
      </Button>
      <Button
        variant="outline"
        className="w-full flex justify-between"
        onClick={() => signIn("google")}
      >
       <GoogleSVG width={30} height={30}/>
        Login with Google
      </Button>
    </div>
  );
}
