"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { JSX, SVGProps, useRef, useState } from "react";
import { postData } from "../action";
import Picker from "emoji-picker-react";
import { Theme } from "emoji-picker-react";

export default function Form() {
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [message, setMessage] = useState("");
  const [showPicker, setShowPicker] = useState(false);

  // @ts-ignore
  const onEmojiClick = (emojiData: EmojiClickData, event: MouseEvent) => {
    setMessage((prevState) => prevState + emojiData.emoji);
  };

  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await postData(message);
    setMessage("");
    formRef.current?.reset();
  };

  return (
    <div className="border-t grid w-full bg-background border-gray-800 dark:border-gray-800 bottom-0 left-0 fixed">
      <div className="flex h-12 items-center p-2 justify-between gap-4">
        <div className="flex-1 ml-4">
          <form onSubmit={handleSubmit} ref={formRef} className="flex w-full justify-between">
            <div className="flex flex-1 justify-end">
              <Input
                className="border-0 h-8 min-h-0 w-full rounded-full text-sm dark:bg-gray-900 dark:text-gray-100"
                placeholder="Type a message"
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <div
                className="rounded-full w-8 h-8 dark:bg-gray-900 dark:text-gray-100 hover:invert transition absolute mobile:hidden"
                onClick={() => setShowPicker(!showPicker)}
              >
                <EmojiIcon
                  className="w-6 h-6 absolute top-1 left-1"
                  fill="#ffffff"
                />
                <span className="sr-only">Emojis</span>
              </div>
            </div>
            {showPicker && (
              <div
                className={`lg:block md:block mobile:hidden absolute right-16 bottom-16`}
              >
                <Picker onEmojiClick={onEmojiClick} />
              </div>
            )}
            <Button
              className="rounded-full w-8 h-8 dark:bg-gray-900 dark:text-gray-100 hover:invert transition"
              size="icon"
              type="submit"
            >
              <SendIcon className="w-4 h-4" />
              <span className="sr-only">Send message</span>
            </Button>
          </form>
        </div>
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

function EmojiIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
    >
      <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm5.507 13.941c-1.512 1.195-3.174 1.931-5.506 1.931-2.334 0-3.996-.736-5.508-1.931l-.493.493c1.127 1.72 3.2 3.566 6.001 3.566 2.8 0 4.872-1.846 5.999-3.566l-.493-.493zm-9.007-5.941c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5-.672-1.5-1.5-1.5zm7 0c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5-.672-1.5-1.5-1.5z" />
    </svg>
  );
}
