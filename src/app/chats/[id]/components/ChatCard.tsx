"use client";
import Image from "next/image";
import Link from "next/link";
import { BsArrowLeft } from "react-icons/bs";
import { IChat, IMessage } from "../../components/ChatsCard";
import { ISafeUser } from "@/types/user";
import { UserStatus } from "@prisma/client";
import { useRef, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { pusherClient as pusher } from "@/services/pusher";
const ChatCard = ({ chat, user }: { chat: IChat; user: ISafeUser }) => {
  const [messages, setMessages] = useState(chat.messages);
  const [selectedMessages, setSelectedMessages] = useState<number[] | null>(
    null
  );
  const [text, setText] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const partner = chat.members.find((member) => member.id !== user.id);
  const scrollDown = useRef<HTMLDivElement>(null);

  useEffect(() => {
    pusher.subscribe(`chat_${chat.id}_incoming-message`);
    const newMessageHandler = (data: IMessage) => {
      setMessages((prev) => {
        return [data, ...prev];
      });
    };
    pusher.bind(`chat_incoming-message`, newMessageHandler);
    return () => {
      pusher.unbind(`chat_incoming-message`);
      pusher.unsubscribe(`chat_${chat.id}_incoming-message`);
    };
  }, [chat.id, user.id]);
  const sendMessage = async () => {
    if (!text.length) return null;
    setIsDisabled(true);
    const response = await fetch(`/api/chats/${chat.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chatId: chat.id,
        message: text,
      }),
    });
    const data = await response.json();
    if (response.status === 201) {
      setText("");
    } else {
      toast.error(`Error sending message: ${data.error}`, {
        position: "bottom-left",
      });
    }
    setIsDisabled(false);
  };
  const selectMessage = (messageId: number) => {
    if (selectedMessages?.includes(messageId)) {
      setSelectedMessages((prev) => {
        if (prev) {
          return prev.filter((id) => messageId !== id);
        }
        return null;
      });
    } else {
      setSelectedMessages((prev) => {
        if (prev) {
          return prev.concat(messageId);
        }
        return [messageId];
      });
    }
  };
  return (
    <div className="flex flex-col justify-center w-full h-full">
      <div className="flex w-full flex-row text-center mb-2 border-b-[1px] p-2 justify-between items-center border-gray-100">
        <Link
          className="flex items-center p-2 gap-1 hover:bg-gray-50 text-gray-700"
          href="/chats"
        >
          <BsArrowLeft />
          Назад
        </Link>
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-md font-">
            <Link href={`/users/${partner?.id}`}>{partner?.username}</Link>
          </h2>

          <span className="text-xs font-light">
            {partner?.status.toLowerCase()}
          </span>
        </div>
        <div className="relative max-w[30px] w-[30px] max-h-[30px]  min-w[30px] min-h-[30px] flex items-center justify-center">
          <Image
            className="rounded-full"
            fill
            src="/assets/images/avatar.jpg"
            alt="avatar"
          />
        </div>
      </div>
      <div
        ref={scrollDown}
        className="flex flex-1 flex-col-reverse w-full px-2 py-4 mb-auto overflow-y-auto h-screen scrollbar scrollbar-thumb-gray-300 scrollbar-medium scrollbar-white"
      >
        {messages.map((message, index) => {
          const isCurrentUser = user.id === message.senderId;
          const hasNextMessage =
            messages[index + 1]?.senderId === messages[index].senderId;
          scrollDown.current?.scrollIntoView({
            behavior: "smooth",
          });
          return (
            <div className="chat-message" key={index}>
              <div
                className={`flex items-end gap-1 ${
                  isCurrentUser && "justify-end"
                }`}
              >
                <div
                  onClick={() => selectMessage(index)}
                  className={`flex flex-col space-y-2 text-base max-w-[70%] cursor-pointer 
                   ${
                     isCurrentUser ? "order-1 items-end" : "order-2 items-start"
                   }`}
                >
                  <span
                    className={`px-4 py-2 mb-1 rounded-md inline-block ${
                      isCurrentUser && !selectedMessages?.includes(index)
                        ? "bg-indigo-400 text-white"
                        : "bg-gray-200 text-gray-900"
                    }
                    ${
                      selectedMessages?.includes(index) &&
                      "bg-gray-400 text-white"
                    }
                    ${
                      !hasNextMessage && isCurrentUser && "rounded-br-none mb-2"
                    }
                    ${
                      !hasNextMessage &&
                      !isCurrentUser &&
                      "rounded-bl-none mb-2"
                    }
                    `}
                  >
                    {message.content}{" "}
                    <span className="text-xs font-thin">
                      {new Date(message.createdAt).toLocaleString()}
                    </span>
                  </span>
                </div>
                <div
                  className={`relative w-6 h-6 
                ${isCurrentUser ? "order-2" : "order-1"}
                ${hasNextMessage && "invisible"}
                `}
                >
                  {!hasNextMessage && (
                    <Image
                      className="rounded-full"
                      fill
                      referrerPolicy="no-referrer"
                      src={
                        isCurrentUser
                          ? user.avatar
                          : partner?.avatar || "/assets/images/avatar.jpg"
                      }
                      alt={`${
                        isCurrentUser ? partner?.username : user.username
                      } avatar`}
                    />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex flex-col w-full  h-[60px]">
        <div className="w-full flex gap-1 items-center">
          <div className="flex items-center  py-2 w-full rounded-lg ">
            <button
              type="button"
              className="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100"
            >
              <svg
                aria-hidden="true"
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Upload image</span>
            </button>
            <button
              type="button"
              className="p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 "
            >
              <svg
                aria-hidden="true"
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Add emoji</span>
            </button>
            <textarea
              id="chat"
              rows={2}
              onChange={(e) => setText(e.target.value)}
              value={text}
              className="block p-2 w-full text-xs text-gray-900 bg-white rounded-xs border border-gray-300 focus:ring-blue-500 focus:outline-none resize-none scrollbar 
              scrollbar-thumb-gray-300 
              scrollbar-medium 
              scrollbar-white"
              placeholder="Your message..."
            ></textarea>
            <button
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              onClick={sendMessage}
              disabled={isDisabled}
              type="submit"
              className={`inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100`}
            >
              {isDisabled ? (
                <svg
                  aria-hidden="true"
                  className="animate-spin w-6 h-6  text-blue-600 "
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                <svg
                  aria-hidden="true"
                  className="w-6 h-6 rotate-90"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                </svg>
              )}

              <span className="sr-only">Send message</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatCard;
