"use client";
import React, { use, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { User, UserStatus } from "@prisma/client";
import { toast } from "react-hot-toast";
import Modal from "@/components/modals/Modal";
 
interface UserListItemProps {
  userItem: User & { 
    wins: number; 
    losses: number; 
    isFollowing: boolean; 
    followersCount: number; 
    followingsCount: number 
  };
}
export default function UserListItem({ userItem }: UserListItemProps) {
  const [open, setOpen] = useState(false);
  const betRef =  useRef<HTMLInputElement>(null);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const [user, setUser] = useState<User & { 
    wins: number; 
    losses: number; 
    isFollowing: boolean; 
    followersCount: number; 
    followingsCount: number 
  }>(userItem);
  const [isFollowing, setIsFollowing] = useState<boolean>(userItem.isFollowing);
  const [loading, setLoading] = useState<boolean>(false);
  
  if (!user || loading) return <div>Загрузка...</div>;

  const toggleFollow = async () => {
    const res = await fetch(`/api/users/toggle/following?id=${user.id}`, {
      method: "POST",
    });
    if (res.status === 200) {
      setIsFollowing(!isFollowing);
      user.followersCount = isFollowing
        ? user.followersCount - 1
        : user.followersCount + 1;
    } else {
      toast.error("Произошла ошибка");
    }
  };
  const createMatch = async() => {
    const bet = Number(betRef.current?.value);
    if (bet <= 0 || bet > 100000) return toast.error("Сумма должна быть больше 0 и меньше 100000");
    const response = await fetch(`/api/matches?recipientId=${user.id}&bet=${bet}`, {
      method: "POST",
    });
    
    if (response.status === 201) {
      toast.success("Матч создан");
      onCloseModal();
    } else {
      toast.error("Произошла ошибка");
    }
  }
  
  return (
    <div className=" w-full flex flex-row justify-between items-center">
      <Modal
        show={open}
        onClose={onCloseModal}
        title="Новый матч"
        negativeButtonText="Отмена"
        positiveButtonText="Отправить"
        positiveButtonClick={createMatch}
      >
        <div className="flex flex-col items-center gap-2 w-full">
          <div className="w-full">
            <label className="text-sm text-gray-600">Сумма:</label>
            <input ref={betRef} type="number" className="w-full rounded-md my-1 border focus:outline-none border-gray-300  focus:border-gray-500 p-2" placeholder="Введите сумму"/>
          </div>
        </div>
      </Modal>
      <div className="flex flex-col">
        <div className="flex flex-row  items-center gap-2 relative">
          <div className="flex flex-row items-center gap-2 relative">
            <Image
              className="rounded-full"
              src={user.avatar || "/images/avatar.png"}
              width={55}
              height={55}
              alt={user.username}
            />
            {user.status === UserStatus.ONLINE && (
              <span className="absolute top-[6px]  right-[6px] mx-auto text-sm text-white border-[1px] border-white p-1 bg-green-500 w-[5px] h-[5px] rounded-full"></span>
            )}
          </div>
          <div className="flex flex-col border-l-[1px] border-gray-300 px-3">
            <div className="flex gap-1 items-center">
              <Link
                href={`/users/${user.id}`}
                className="text-xl font-bold text-cyan-700"
              >
                {user.username}
              </Link>

              <p className="flex gap-1">
                <span className="text-sm text-green-500">{user.wins}</span>
                <span className="text-sm">/</span>
                <span className="text-sm text-red-500">{user.losses}</span>
              </p>
              {user.steamId && (
                <a
                  className=" text-gray-400 hover:text-gray-500 underline"
                  href={`http://steamcommunity.com/profiles/${user.steamId}`}
                  target="_blank"
                >
                  [[ steam ]]
                </a>
              )}
            </div>
            <div className="flex flex-col text-xs text-gray-600">
              <span className="">
                Подписчиков:
                {user.followersCount}
              </span>
              <span className="">
                Подписок:
                {user.followingsCount}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-1">
        <button
          onClick={() => toggleFollow()}
          className={`text-white font-bold py-2 px-3 rounded ${
            isFollowing
              ? "bg-rose-600 hover:bg-rose-500"
              : "bg-blue-600 hover:bg-blue-500"
          }`}
        >
          {isFollowing ? "Отписаться" : "Подписаться"}
        </button>
        <button
          onClick={onOpenModal}
          className="bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-3 rounded"
        >
          1x1
        </button>
      </div>
    </div>
  );
}
