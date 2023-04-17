"use client";
import React, { useState } from "react";
import UsersList from "./UsersList";
import Link from "next/link";
import { useSearchParams,useRouter } from 'next/navigation'

enum EFilter {
  all = "all",
  following = "following",
  followers = "followers",
}
export type IFilter = EFilter;

export default function UsersCard() {
  const [query, setQuery] = useState("");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const {get} = useSearchParams();
  const router= useRouter();
  let qFilter =EFilter.all;
  if (get("filter")) {
    switch (get("filter")) {
      case EFilter.all:
        qFilter = EFilter.all;
        break;
      case EFilter.following:
        qFilter = EFilter.following;
        break;
      case EFilter.followers:
        qFilter = EFilter.followers;
        break;
      default:
        qFilter = EFilter.all;
        break;
    }
  }
  const [filter, setFilter] = useState<IFilter>(qFilter as IFilter);
  
  const setFilterHandler = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    filter: IFilter
  ) => {
    e.preventDefault();
    router.push(`/users?filter=${filter}`);
    setFilter(filter);
  };

  return (
    <div className="w-full flex flex-col p-2">
      <h2 className="text-center font-bold mb-2 border-b-[1px] p-2 border-gray-100">
        Список пользователей
      </h2>
      <div className="flex flex-col w-full">
        <div className="flex gap-3 mb-3 w-full">
          <div className="flex relative w-full">
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-cyan-800"
              placeholder="Имя пользователя"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            {input.length > 0 && (
              <button
                onClick={() => {
                  setInput("");
                  setQuery("");
                }}
                className="absolute right-[10px] top-[50%] translate-y-[-50%] cursor-pointer"
              >
                X
              </button>
            )}
          </div>
          <button
            onClick={() => {
              setLoading(true);
              setQuery(input);
              setTimeout(() => {
                setLoading(false);
              }, 1500);
            }}
            disabled={loading}
            className={`px-4 py-2 text-sm text-white bg-cyan-800 rounded-md ${
              loading ? "animate-pulse" : ""
            }`}
          >
            {loading ? "Загрузка..." : "Поиск"}
          </button>
        </div>
        <div className="flex mx-auto justify-between mb-2">
          <div className="flex justify-between text-sm w-full font-medium text-center text-gray-500 border-b  border-cyan-800">
            <ul className="flex  gap-10 flex-wrap -mb-px">
              <li>
                <a
                  onClick={(e) => setFilterHandler(e, EFilter.all)}
                  href="/users?filter=all"
                  className={`inline-block p-4 rounded-t-lg ${
                    filter === EFilter.all
                      ? "active text-blue-500 border-b-2 border-blue-500"
                      : "hover:border-blue-500 hover:text-gray-600"
                  }`}
                  aria-current="page"
                >
                  Все пользователи
                </a>
              </li>
              <li>
                <a
                  onClick={(e) => setFilterHandler(e, EFilter.following)}
                  href="/users?filter=following"
                  className={`inline-block p-4 rounded-t-lg ${
                    filter === EFilter.following
                      ? "active text-blue-500 border-b-2 border-blue-500"
                      : "hover:border-blue-500 hover:text-gray-600"
                  }`}
                  aria-current="page"
                >
                  Подписки
                </a>
              </li>
              <li>
                <a
                  onClick={(e) => setFilterHandler(e, EFilter.followers)}
                  href="/users?filter=followers"
                  className={`inline-block p-4 rounded-t-lg ${
                    filter === EFilter.followers
                      ? "active text-blue-500 border-b-2 border-blue-500"
                      : "hover:border-blue-500 hover:text-gray-600"
                  }`}
                  aria-current="page"
                >
                  Подписчики
                </a>
              </li>
            </ul>
          </div>
        </div>
        <UsersList filter={filter} query={query} />
      </div>
    </div>
  );
}
