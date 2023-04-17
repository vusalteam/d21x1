"use client";
import React from "react";
import Image from "next/image";
import { MatchResult, UserStatus } from "@prisma/client";
import Link from "next/link";
interface GameHistoryItemProps {
  id: number;
  winnerId: number;
  result: MatchResult;
  bet: number;
  sender: {
    id: number;
    username: string;
    avatar: string;
    status: UserStatus;
  };
  recipientId: number;
}
const shortBet = (bet: number) => {  
  switch (bet.toString().length) {
    case 1:
    case 2:
    case 3:
      return bet.toString();
    case 4:
      return (bet/1000).toString().slice(0,3)+'K';
    case 5:
      return (bet/1000).toString().slice(0,4)+'K';
    case 6:
      return (bet/1000).toString().slice(0,5)+'K';
    case 7:
    case 8:
    case 9:
      return (bet/1000000).toString().slice(0,4)+'KK';
    default:
      return bet.toString();
  }
};

export default function GameHistoryItem({game}:{game: GameHistoryItemProps}) {
  return (
    <div className="flex flex-col  items-center justify-center min-w-[70px]">
      <p className="w-full text-gray-600 text-center">
        {" "}
        {game.winnerId === game.recipientId ? (
          <span ><span className="text-green-400">+</span> {shortBet(game.bet)}₽</span> 
        ): (
          <span ><span className="text-red-400">-</span> {shortBet(game.bet)}₽</span> 
        )}
      </p>
      <div className={`p-[2px] ${game.winnerId === game.recipientId ? ' bg-green-300' : ' bg-red-300'}`}>
        <Link href={`/game/${game.id}`}>
          <Image
            className=" cursor-pointer"
            src="/assets/images/avatar.png"
            alt="profile"
            width={70}
            height={70}
          />
        </Link>
      </div>
      <p className=" text-xs w-full text-gray-400 text-center">20.01.22</p>
      <p className=" text-xs w-full text-gray-400 text-center">15:22</p>
    </div>
  );
}
