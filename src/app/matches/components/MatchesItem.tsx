"use client";
import { MatchStatus, MatchResult, MatchMode, Match } from "@prisma/client";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-hot-toast";

interface RequestItemProps {
  match: Match;
}
export default function MatchesItem({ match }: RequestItemProps) {
  const [sent, setRequest] = useState(match);
  return (
    <div className="bg-white rounded-md p-2 border-[1px] border-gray-300 ">
      <div className="flex justify-between items-center">
        <p className="text-md font-bold text-center">
          <span className="mr-1">От: </span>
          <Link className="text-blue-500" href={`/users/${sent.senderId}`}>
            {sent.sender.username}
          </Link>
        </p>
        <p className="text-md font-bold text-center">
          <span className="mr-1">Сумма:</span>
          <span className="">{sent.bet} руб.</span>
        </p>
        <p className="text-md font-bold text-center">
          <span className="mr-1">Кому: </span>
          <Link className="text-blue-500" href={`/users/${sent.senderId}`}>
            {sent.recipient.username}
          </Link>
        </p>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex flex-col ">
          <div className=" mb-1">Ставка: {sent.bet} руб.</div>
          <div className=" mb-1">Резульать: {sent.result}</div>
          <div className=" mb-1">
            Тип: {sent.mode === MatchMode.SOLO && "1x1 Solo mid"}
          </div>
        </div>
        <div className="flex flex-col">
          <div className=" mb-1">Статус: {sent.status}</div>
          <div className=" mb-1">
            Запрос от:{" "}
            <Link className="text-blue-500" href={`/users/${sent.senderId}`}>
              vusalteam
            </Link>
          </div>
          <div className=" mb-1">
            Обновлено:{" "}
            {new Date(sent.updatedAt).toLocaleString("ru-RU").slice(0, -3)}
          </div>
        </div>
      </div>
    </div>
  );
}
