"use client";

import { ISafeUser } from "@/types/user";
import { IChat } from "./ChatsCard";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { UserStatus } from "@prisma/client";

const ChatsItem = ({ chat, user }: { chat: IChat; user: ISafeUser }) => {
  const [lastMessage, setLastMessage] = useState(chat.messages.pop());
  const lastSenderId = lastMessage?.senderId;
  const lastSender = chat.members.find((member) => member.id === lastSenderId);
  const partner = chat.members.find((member) => member.id != user.id);
  return (
    <Link
      href={`/chats/${chat.id}`}
      className="flex chat-item-container gap-2 border-t-[1px] items-center border-b-[1px] hover:bg-gray-100 border-gray-100 p-1 w-full cursor-pointer"
    >
      <div className="flex flex-col relative">
        <Image
          className="rounded-full"
          src={"/assets/images/avatar.png"}
          width={50}
          height={50}
          alt={"dsa"}
        />
        {partner?.status === UserStatus.ONLINE && (
          <span className="absolute top-[5px]  right-[5px] mx-auto text-sm text-white border-[1px] border-white p-1 bg-green-500 w-[2px] h-[2px] rounded-full"></span>
        )}
      </div>
      <div className="flex flex-col w-full">
        <p className="text-sm text-gray-500 w-full flex justify-between items-center">
          <span className="font-bold">{partner?.username}</span>
          <span className="">
            {new Date(lastMessage?.createdAt!!).toLocaleDateString()}
          </span>
        </p>
        <div className="flex gap-1 p-1 mt-1 items-center">
          <Image
            className="rounded-full"
            src={"/assets/images/avatar.png"}
            width={20}
            height={20}
            alt={"dsa"}
          />
          <p className="max-h-[40px] text-gray-700 overflow-hidden text-ellipsis break-all  px-1">
            {lastMessage?.content}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ChatsItem;
