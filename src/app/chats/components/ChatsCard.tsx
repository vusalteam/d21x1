"use client";
import Image from "next/image";
import { UserStatus, AttachmentType } from "@prisma/client";
import { useEffect, useState } from "react";
import ChatsItem from "./ChatsItem";
import { ISafeUser } from "@/types/user";
export interface IMessage {
  id: number;
      content: string;
      senderId: number;
      createdAt: Date;
      updatedAt: Date;
      attachments: [
        {
          id: number;
          name: string;
          type: AttachmentType;
        }
      ];
}
export interface IChat {
  id: number;
  messages: IMessage[];
  members: [
    {
      id: number;
      username: string;
      avatar: string;
      status: UserStatus;
    }
  ];
  createdAt: Date;
  updatedAt: Date;
}
const ChatsCard = ({ chats,user }: { chats: IChat[],user:ISafeUser }) => {
  const [chatsList, setChatsList] = useState<IChat[]>(chats);
  const [search, setSearch] = useState("");
  const [update, setUpdate] = useState(false);
  useEffect(() => {
    const fetchChats = async () => {
      const response = await fetch("/api/chats");
      const data = await response.json();
      if (response.status === 200) {
        setChatsList(data);
      } else {
        setChatsList([]);
      }
    };
    if (update) {
      fetchChats();
      setUpdate(false);
    }
  }, [update]);

  const filterChats = () => {
    const filteredChats = chatsList.filter((chat) => {
      return chat.messages.some((message) => {
        return message.content.toLowerCase().includes(search.toLowerCase());
      });
    });
    setChatsList(filteredChats);
  };

  if (!chatsList.length)
    return (
      <div className="w-full flex justify-center  items-center h-full ">
        {" "}
        Нет чатов
      </div>
    );
  return (
    <div className="flex flex-col justify-center w-full">
      <h2 className="text-center font-bold mb-2 border-b-[1px] p-2 border-gray-100">
        Список чатов
      </h2>
      <div className="flex flex-col w-full ">
        <div className="flex item-center w-full">
          <div className="w-full my-1 relative">
            <input
              type="text"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-cyan-800"
              placeholder="Поиск чата"
            />
            <button
              className="absolute top-0 bottom-0 right-1 z-10 hover:text-gray-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <button 
             onClick={filterChats}
            className="px-4 py-2 text-sm text-white bg-cyan-800 rounded-md"
          >
            Поиск
          </button>
        </div>
        <div className="flex flex-col w-full">
          {chatsList.map((chat) => (
            <ChatsItem key={chat.id} user={user} chat={chat} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatsCard;
