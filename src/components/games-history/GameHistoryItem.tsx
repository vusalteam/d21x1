"use client";
import React from "react";
import Image from "next/image";

export default function GameHistoryItem() {
  
  return (
    <div className="flex flex-col  items-center justify-center overflow-hidden">
          <p className="w-full text-gray-600 text-center"> <span className="text-green-400">+</span>   100rub.</p>
          <div className="p-[2px] bg-green-300">
            <Image
              className=" cursor-pointer"
              src="/assets/images/avatar.png"
              alt="profile"
              width={50}
              height={50}
            />
          </div>
          <p className=" text-xs w-full text-gray-400 text-center">20.01.22</p>
          <p className=" text-xs w-full text-gray-400 text-center">15:22</p>
        </div>
  );
}
