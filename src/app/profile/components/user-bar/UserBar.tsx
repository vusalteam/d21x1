"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { AiOutlinePlus } from "react-icons/ai";
import CustomModal from "@/components/modals/CustomModal";
import { UserStatus } from "@prisma/client";
interface IProps {
  user: {
    id: number;
    username: string;
    avatar: string;
    steamId: string;
    statusMessage: string;
    roles: [
      {
        id: number;
        name: string;
      }
    ];
    status: string;
    balance: {
      id: number;
      amount: number;
    };
    stats:{
      winsCount: number;
      lossesCount: number;
      gamesCount: number;
    }

  };
}
export default function UserBar({ user }: IProps) {
  return (
    <div className="flex flex-row w-full">
      <div className="flex flex-col w-[20%]  pr-2 border-r-[1px] border-gray-100 mb-1">
        <div className="flex rounded-md flex-col bg-gray-100 border-[1px] overflow-hidden">
          <Image
            className="rounded-t-md cursor-pointer"
            src={user.avatar ? user.avatar : "/assets/images/avatar.png"} 
            alt="profile"
            width={200}
            height={200}
          />
          {user.status === UserStatus.ONLINE && (
            <p className="flex flex-row justify-center items-center p-1 bottom-0 w-full">
              <span className="text-xs text-green-500">52</span>
              <span className="text-xs">/</span>
              <span className="text-xs text-red-500">40</span>
            </p>
          )}
        </div>
      </div>
      <div className="w-[80%] py-2 px-4 flex flex-col">
        <div className="flex flex-row gap-2 items-center w-full border-b-[1px] border-gray-200 mb-1">
          <h2 className="text-2xl w-full">{user.username}</h2>
        </div>
        <div className=" w-full  border-b-[1px] border-gray-200">
          <p className="text-sm  flex gap-3">
            <span className="text-sm text-gray-600">Роли:</span>
            {user.roles.map((role) => {
              return (
                <Link
                  key={role.id}
                  href={`/search/roles?user`}
                  className="text-md text-rose-600"
                >
                  admin
                </Link>
              );
            })}
          </p>
          <p className="text-sm  cursor-pointer flex flex-row gap-2 items-center justify-start">
            <span className="text-sm text-gray-600">Статус: </span>
            <span className="text-sm font-light text-gray-600">
              d21x1 is a social media platform that helps you to connect with
              your friends and family.
            </span>
          </p>
          <div className="flex flex-col my-2">
            <div className="text-sm flex flex-row items-center justify-between gap-3">
              <p className="text-sm text-gray-600 flex gap-2 items-center">
                <span>Баланс: </span>
                <span>{user.balance.amount}</span>
                <span> руб.</span>
                <AiOutlinePlus className="text-green-400 cursor-pointer" />
              </p>
              <p className="text-sm text-gray-600 flex gap-2 items-center">
                <span>Подписок: </span>
                <span>30</span>
              </p>
              <p className="text-sm text-gray-600 flex gap-2 items-center">
                <span>Подписчиков: </span>
                <span>22</span>
              </p>
              <p className="text-sm text-gray-600 flex gap-2 items-center">
                <span>Игр: </span>
                <span>900</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
