"use client";
import React from "react";
import { HorizontalScroll } from "@/helpers/HorizontalScroll";
import BalanceHistoryItem from "./BalanceHistoryItem";
import { IMatch } from "@/types/user";

const BalanceGistoryList = ({games}:  {games: IMatch[]}) =>{  
  if (!games) {
    return null;
  }
  return (
    <div className="flex flex-col w-full my-2">
      <p className="text-sm text-gray-600">История операций с балансом:</p>
      <div className="flex w-full p-2 border-[1px] rounded-md">
        <div
          onWheel={(e) => HorizontalScroll(e)}
          className="flex gap-1 w-full items-center scrollbar scrollbar-track-transparent scrollbar-thumb-gray-200 scrollbar-small border-gray-200  overflow-x-scroll "
        >
        <BalanceHistoryItem />
        </div>
      </div>
    </div>
  );
}
export default BalanceGistoryList;
