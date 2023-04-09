"use client";
import React from "react";
import { HorizontalScroll } from "@/helpers/HorizontalScroll";
import GameHistoryItem from "./GameHistoryItem";

export default function GameHistory() {
  
  return (
    <div className="flex flex-col w-full my-2">
      <p className="text-sm text-gray-600">Истрия игр:</p>
      <div className="flex w-full px-2 border-[1px] rounded-md">
      <div
        onWheel={(e) => HorizontalScroll(e)}
        className="flex gap-2 w-full  scrollbar scrollbar-track-transparent scrollbar-thumb-gray-400 scrollbar-small border-gray-200  overflow-x-scroll "
      >
        <GameHistoryItem />
      </div>
      </div>
    </div>
  );
}
