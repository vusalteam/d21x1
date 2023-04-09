import { IMatch } from "@/types";
import { MatchStatusType, NatchResultType } from "@prisma/client";

export default function RequestItem(params: { request: IMatch }) {
  const {request} = params;
  return (
    <div key={request.id} className="bg-white rounded-lg p-4">
                <div className="flex justify-between">
                  <div className="text-lg">Ставка: {request.bet} руб.</div>
                  <div className="text-lg">
                    Резульать:{" "}
                    {request.result === NatchResultType.DRAW
                      ? "ОЖИДАЕТ"
                      : "СЫГРАНО"}
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="text-lg">Тип: {request.mode}</div>
                  <div className="text-lg">
                    Статус:{" "}
                    {request.status == MatchStatusType.PENDING
                      ? "На рассмотрении"
                      : ""}
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="text-lg">
                    Запрос от: <a>vusalteam</a>
                  </div>
                  <div className="text-lg">
                    Созадно: 2022-06-18T12:00:00.000Z
                  </div>
                </div>
                <div className="w-full flex flex-row gap-5 items-center justify-center">
                  <button className="bg-green-600 hover:bg-green-700 p-2 text-white rounded-sm">
                    Принять
                  </button>
                  <button className="bg-red-500 hover:bg-red-700 p-2 text-white rounded-sm">
                    Отклонить
                  </button>
                </div>
              </div>
  )
}
