import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Logout } from "./Buttons";
import { ModeToggle } from "@/components/ui/mode-toggle";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";

export default async function Navlist() {
  const session = await getServerSession(authOptions);
  return (
    <Sheet>
      {session ? (<SheetTrigger>
        <Image
          src={session.user?.image as string}
          alt="image"
          className="w-12 h-12 rounded-full mr-3 border-background border-2"
          width={50}
          height={50}
        />
      </SheetTrigger>) : (<div></div>)}
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Settings</SheetTitle>
          <SheetDescription>
            This is the navigation list, it's mobile only!
          </SheetDescription>
          <Logout />
          <ModeToggle />
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
