"use client";
import Modal from "@/components/modals/Modal";
import { Match, MatchMode, MatchResult, MatchStatus } from "@prisma/client";
import Link from "next/link";
import { useState } from "react";

export const getMatchStatus = (status: MatchStatus) => {
  switch (status) {
    case MatchStatus.PENDING:
      return "В ожидании";
    case MatchStatus.ACCEPTED:
      return "Принята";
    case MatchStatus.FINISHED:
      return "Окончена";
    case MatchStatus.CONTESTED:
      return "Спор";
    case MatchStatus.DECLINED:
      return "Отклонена";
    case MatchStatus.CANCELED:
      return "Отменена";
  }
};
export const getMatchResult = (result: MatchResult) => {
  switch (result) {
    case MatchResult.DRAW:
      return "Не обработана";
    case MatchResult.PENDING:
      return "В ожидании";
    case MatchResult.UNDEFINED:
      return "Ошибка";
    case MatchResult.CANCELED:
      return "Отменена";
    case MatchResult.FINISHED:
      return "Окончена";
  }
};

const MatchCard = ({ pMatch }: { pMatch: Match | null }) => {
  const [match, setMatch] = useState<Match | null>(pMatch);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<MatchStatus | null>(
    match?.status || null
  );
  const [steamId, setSteamId] = useState<number | null>(match?.steamId || null);
  if (!match)
    return (
      <div className="w-full flex flex-col p-2 h-full items-center justify-center">
        <h3 className="text-center p-2">Такой игры не существует</h3>
        <span className="text-center text-md">
          <Link className="font-bold text-indigo-700" href="/matches">
            Вернуться назад
          </Link>
        </span>
      </div>
    );

  const handleMatchStatus = (status: MatchStatus | null) => {
    if (match.status === status) return;
    if (status === MatchStatus.FINISHED) {
      setSelectedStatus(status);
      setIsModalOpen(true);
    }
    if (status === MatchStatus.CONTESTED) {
      setSelectedStatus(status);
    }
  };
  const matchFinishedHandle = async () => {
    if (selectedStatus !== MatchStatus.FINISHED || !steamId) return;
    const res = await fetch("/api/matches/finish", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        steamId,
      }),
    });
    const data = await res.json();
    if (data.error) return;
    setMatch(data);
    
    setIsModalOpen(false);
  };
  return (
    <div className="w-full flex flex-col p-2">
      <h2 className="text-center font-bold mb-2 border-b-[1px] p-2 border-gray-100">
        Игра #{match.id}
      </h2>
      <Modal
        positiveButtonText="Принять"
        negativeButtonText="Отменить"
        positiveButtonClick={() => matchFinishedHandle()}
        title="Steam ID"
        show={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <input
          type="text"
          onChange={(e) => setSteamId(Number(e.target.value))}
          className="p-2 focus:outline-none border-b-[1px] border-cyan-800 focus:border-cyan-600 w-full"
          placeholder="Введите steam id"
        />
      </Modal>
      <div className="flex flex-col w-full">
        <div className="bg-white rounded-md p-2 border-[1px] border-gray-300 ">
          <div className="flex justify-between items-center">
            <div className="flex flex-col ">
              <div className=" mb-1">Ставка: {match.bet} руб.</div>
              <div className=" mb-1">
                Резульать: {getMatchResult(match.result)}
              </div>
              <div className=" mb-1">
                Тип: {match.mode === MatchMode.SOLO && "1x1 Solo mid"}
              </div>
            </div>

            {match.status === MatchStatus.ACCEPTED && (
              <div className="flex flex-col items-center justify-center py-3">
                <label className="text-md">Статус игры:</label>
                <select
                  value={match.status}
                  onChange={(e) =>
                    handleMatchStatus(e.target.value as MatchStatus)
                  }
                  className="bg-cyan-800 text-white  p-2 focus:outline-none"
                >
                  <option>Выбрать</option>
                  <option value={MatchStatus.FINISHED}>Окончена</option>
                  <option value={MatchStatus.CONTESTED}>Спор</option>
                </select>
              </div>
            )}
            <div className="flex flex-col">
              <div className=" mb-1">
                Статус: {getMatchStatus(match.status)}
              </div>
              <div className=" mb-1">
                Запрос от:{" "}
                <Link
                  className="text-blue-500"
                  href={`/users/${match.senderId}`}
                >
                  vusalteam
                </Link>
              </div>
              <div className=" mb-1">
                Обновлено:{" "}
                {new Date(match.updatedAt).toLocaleString("ru-RU").slice(0, -3)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchCard;
