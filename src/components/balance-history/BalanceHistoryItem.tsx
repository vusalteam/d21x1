"use client";
import React from "react";
import Image from "next/image";
import { MatchResult, UserStatus } from "@prisma/client";
import Link from "next/link";


export default function BalanceHistoryItem() {
  return (
    <div className="flex flex-col border-[1px] p-1 border-red-300  items-center justify-center min-w-[70px]">
      <p className="w-full text-gray-600 text-center">
          <span ><span className="text-red-400">-</span> 201₽</span> 
      </p>
      <p className=" text-xs w-full text-gray-400 text-center">20.01.22 15:22</p>
    </div>
  );
}
