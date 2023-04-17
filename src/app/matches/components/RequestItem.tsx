"use client";
import { MatchStatus, MatchResult, MatchMode, Match } from "@prisma/client";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-hot-toast";

interface RequestItemProps {
  match: Match;
  onAction: () => void;
}
export default function RequestItem({ match, onAction }: RequestItemProps) {
  const [isReady, setIsReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [request, setRequest] = useState(match);

  const handeAccept = async () => {
    setIsLoading(true);
    const response = await fetch(`/api/matches/${request.id}/accept`, {
      method: "POST",
    });
    if (response.status === 200) {
      request.status = MatchStatus.ACCEPTED;
      request.result = MatchResult.PENDING;
      const data = await response.json();
      setIsReady(true);
      onAction();
      toast.success("Вы успешно приняли ставку");
    } else {
      toast.error("Ошибка при принятии ставки");
    }
    setIsLoading(false);
  };
  const handeDecline = async () => {
    setIsLoading(true);
    const response = await fetch(`/api/matches/${request.id}/decline`, {
      method: "POST",
    });
    if (response.status === 200) {
      request.status = MatchStatus.DECLINED;
      request.result = MatchResult.CANCELED;
      setIsReady(true);
      onAction();
      const data = await response.json();
      toast.success("Вы успешно отклонили ставку");
    } else {
      toast.error("Ошибка при отклонении ставки");
    }
    setIsLoading(false);
  };

  return (
    <div className="bg-white rounded-md p-2 border-[1px] border-gray-300">
      <h3 className="text-md font-bold text-center">
        <span className="mr-1">От: </span>
        <Link className="text-blue-500" href={`/users/${request.senderId}`}>
          {match.recipient.username}
        </Link>
        <span className="mx-1">|</span>
        <span className="">{request.bet} руб.</span>
      </h3>
      <div className="flex justify-between items-center">
        <div className="flex flex-col ">
          <div className=" mb-1">Ставка: {request.bet} руб.</div>
          <div className=" mb-1">Резульать: {request.result}</div>
          <div className=" mb-1">
            Тип: {request.mode === MatchMode.SOLO && "1x1 Solo mid"}
          </div>
        </div>
        <div className="flex flex-col">
          <div className=" mb-1">Статус: {request.status}</div>
          <div className=" mb-1">
            Запрос от:{" "}
            <Link className="text-blue-500" href={`/users/${request.senderId}`}>
              vusalteam
            </Link>
          </div>
          <div className=" mb-1">
            Обновлено:{" "}
            {new Date(request.updatedAt).toLocaleString("ru-RU").slice(0, -3)}
          </div>
        </div>
        {!isReady && (
          <div className=" px-2 my-1 mt-3 border-gray-300 flex flex-col gap-5 items-center justify-end">
            <>
              <button
                onClick={handeAccept}
                className="bg-green-600 hover:bg-green-700 p-2 text-white rounded-sm min-w-[100px]"
              >
                Принять
              </button>
              <button
                onClick={handeDecline}
                className="bg-red-500 hover:bg-red-700 p-2 text-white rounded-sm min-w-[100px]"
              >
                Отклонить
              </button>
            </>
          </div>
        )}
      </div>
    </div>
  );
}
