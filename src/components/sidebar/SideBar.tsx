"use client";
import { signOut } from "next-auth/react";
import Link from "next/link";
import React from "react";

interface SideBarProps {}

const SideBar: React.FC<SideBarProps> = () => {
  return (
    <div className="flex w-full flex-col pt-3 text-xs md:text-sm">
      <ul className="flex flex-col w-full">
        <li className="flex flex-col w-full ">
          <Link
            href="/profile"
            className="w-full border-b-[1px]  p-2 hover:bg-gray-200 mb-1.5 border-gray-100"
          >
            Профиль
          </Link>
        </li>
        <li className="flex flex-col w-full">
          <Link
            href="/users"
            className="w-full border-b-[1px]  p-2 hover:bg-gray-200 mb-1.5 border-gray-100"
          >
            Пользователи
          </Link>
        </li>
        <li className="flex flex-col w-full">
          <Link
            href="/matches"
            className="w-full border-b-[1px]  p-2 hover:bg-gray-300 mb-1.5 border-gray-100"
          >
            <span className="relative pr-4">
              <span className="absolute right-0 top-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-red-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full  h-2 w-2 bg-rose-400"></span>
              </span>
              Матчи
            </span>
          </Link>
        </li>
        <li className="flex flex-col w-full">
          <Link
            href="/chats"
            className="w-full border-b-[1px]  p-2 hover:bg-gray-200 mb-1.5 border-gray-100"
          >
            Чат
          </Link>
        </li>
        <li className="flex flex-col w-full">
          <Link
            href="/profile/settings"
            className="w-full border-b-[1px]  p-2 hover:bg-gray-200 mb-1.5 border-gray-100"
          >
            Настрйоки
          </Link>
        </li>
        <li className="flex flex-col w-full">
          <a onClick={async ()=> await signOut()} className="cursor-pointer w-full border-b-[1px]  p-2 hover:bg-gray-300 mb-1.5 border-gray-100">
            Выйти
          </a>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
