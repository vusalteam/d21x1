"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AiOutlinePlus } from "react-icons/ai";
import GameHistory from "@/components/games-history/GameHistoryList";
import { IProfileUser } from "@/types/user";
import { UserRole } from "@prisma/client";
import BalanceHistoryList from "@/components/balance-history/BalanceHistoryList";
import Loading from "@/components/Loading";
export default function UserCard() {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<IProfileUser>();
  useEffect(() => {
    setIsLoading(true);
    const fetchUser = async () => {
      const res = await fetch(`/api/users/profile`);
      const data = await res.json();
      if (res.status === 200) {
        setUser(data);
      }
      setIsLoading(false);
    };
    fetchUser();
  }, []);
  if (isLoading) {
    return <Loading/>
  }
  if (!user) {
    return null
  }

  return (
    <div className="flex w-full">
      <div className="flex flex-col w-full">
        <div className="flex flex-col md:flex-row w-full">
          <div className="flex flex-col w-full md:w-[20%]  md:pr-2 md:border-r-[1px] border-gray-100 mb-1">
            <div className="flex p-1 rounded-full md:rounded-md justify-center items-center flex-col bg-gray-50 border-[1px] overflow-hidden">
              <Image
                className="rounded-t-md cursor-pointer"
                src={"/assets/images/avatar.jpg"}
                alt="profile"
                width={200}
                height={200}
              />
              <p className="flex flex-row justify-center items-center p-1  w-full">
                <span className="text-xs text-green-500">{user.winsCount}</span>
                <span className="text-xs">/</span>
                <span className="text-xs text-red-500">{user.lossesCount}</span>
              </p>
            </div>
          </div>
          <div className="md:w-[80%] py-2 px-4 flex flex-col">
            <div className="flex flex-row gap-2 items-center w-full border-b-[1px] border-gray-200 mb-1">
              <h2 className="text-2xl w-full">{user.username}</h2>
              <p
                className={`text-md ${
                  user.accountType === UserRole.ADMIN
                    ? "text-red-600"
                    : "text-cyan-600"
                }`}
              >
                {user.accountType}
              </p>
            </div>
            <div className=" w-full  border-b-[1px] border-gray-200">
              <p className="text-sm cursor-pointer flex gap-2 items-center justify-start">
                <span className="text-gray-600">Статус: </span>
                <span className="text-xs font-light text-gray-600">
                  {user.statusMessage}
                </span>
              </p>
              {user.roles && user.roles.length && (
                <p className="text-sm flex gap-1 items-center">
                  <span className="text-gray-600">Роли:</span>
                  {user.roles.map((role) => {
                    return (
                      <Link
                        key={role.id}
                        href={`/users?roles=${role.name}`}
                        className="text-xs text-rose-600"
                      >
                        {role.name}
                      </Link>
                    );
                  })}
                </p>
              )}
              <div className="flex flex-col my-2">
                <div className="text-sm flex flex-col md:flex-row  md:items-center md:justify-between gap-3">
                  <p className="text-sm text-gray-600 flex gap-2 items-center">
                    <span>Баланс: </span>
                    <span>{user.balance.amount}</span>
                    <span> руб.</span>
                    <AiOutlinePlus className="text-green-400 cursor-pointer" />
                  </p>
                  <p className="text-sm text-gray-600 flex gap-2 items-center">
                    <span>Подписок: </span>
                    <span>{user.followings.length}</span>
                  </p>
                  <p className="text-sm text-gray-600 flex gap-2 items-center">
                    <span>Подписчиков: </span>
                    <span>{user.followers.length}</span>
                  </p>
                  <p className="text-sm text-gray-600 flex gap-2 items-center">
                    <span>Игр: </span>
                    <span>{user.mathces ? user.mathces.length : "0"}</span>
                  </p>
                </div>
              </div>
            </div>

            <BalanceHistoryList games={user.mathces} />

          </div>
        </div>
        <GameHistory games={user.mathces} />
      </div>
    </div>
  );
}
