"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { JSX, SVGProps, useRef } from "react";
import { postData } from "../action";

export default function Form() {
  const formRef = useRef<HTMLFormElement>(null);
  return (
    <div className="border-t grid w-full bg-background border-gray-800 dark:border-gray-800 bottom-0 left-0 fixed">
      <div className="flex h-12 items-center p-2 justify-between">
        <div className="flex-1 ml-4">
          <form
            action={async (formData) => {
              await postData(formData);
              formRef.current?.reset()
            }}
            ref={formRef}
          >
            <Input
              className="border-0 h-8 min-h-0 w-full rounded-full text-sm dark:bg-gray-900 dark:text-gray-100"
              placeholder="Type a message"
              name="message"
            />
          </form>
        </div>
        <Button
          className="rounded-full w-8 h-8 dark:bg-gray-900 dark:text-gray-100 hover:invert transition"
          size="icon"
        >
          <SendIcon className="w-3 h-3" />
          <span className="sr-only">Send message</span>
        </Button>
      </div>
    </div>
  );
}

function SendIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  );
}
