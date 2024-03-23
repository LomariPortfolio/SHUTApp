"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Pusher from "pusher-js";

type iAppProps = {
  data: {
    User: {
      image: string | null;
      name: string | null;
    };
    message: string;
  }[];
};

export default function ChatComponent({ data }: iAppProps) {
  const [totalComments, setTotalComments] = useState(data);
  const messageEndRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    var pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY as string, {
        cluster: "eu",
      });
    
      var channel = pusher.subscribe("chat");
      channel.bind("hello", function (data: any) {
            const parsedComments = JSON.parse(data.message);
            setTotalComments(prev => [...prev, parsedComments])
    });

    return () => {
        pusher.unsubscribe("chat")
    }
  }, []);
  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [totalComments]);
  return (
    <div className="p-6 flex-grow max-h-screen overflow-y-auto py-32">
      <div className="flex flex-col gap-4">
        {totalComments.map((message, idx) => (
          <div key={idx}>
            <div className="flex items-center">
              <Image
                src={message.User?.image as string}
                alt="Profile picture"
                className="w-12 h-12 object-cover rounded-lg mr-4"
                width={50}
                height={50}
              />
              <div className="rounded-lg bg-secondary p-4 shadow-black dark:shadow-white shadow-md dark:shadow-sm self-start text-primary break-words">
                {message.message}
              </div>
            </div>
            <p className="font-light text-sm text-gray-600">
              {message.User?.name}
            </p>
          </div>
        ))}
        <div ref={messageEndRef}></div>
      </div>
    </div>
  );
}
