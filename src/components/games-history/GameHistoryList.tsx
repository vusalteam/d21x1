"use client";
import React from "react";
import { HorizontalScroll } from "@/helpers/HorizontalScroll";
import GameHistoryItem from "./GameHistoryItem";
import { MatchResult, UserStatus } from "@prisma/client";
import { IMatch } from "@/types/user";

export default function GameHistory({games}:  {games: IMatch[]}) {  
  if (!games) {
    return null;
  }
  return (
    <div className="flex flex-col w-full my-2">
      <p className="text-sm text-gray-600">Истрия игр:</p>
      <div className="flex w-full px-2 border-[1px] rounded-md">
        <div
          onWheel={(e) => HorizontalScroll(e)}
          className="flex gap-1 w-full items-center scrollbar scrollbar-track-transparent scrollbar-thumb-gray-200 scrollbar-small border-gray-200  overflow-x-scroll "
        >
          {games.map((game) => (
            <GameHistoryItem key={game.id} game={game} />
          ))}
        </div>
      </div>
    </div>
  );
}
