"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function Navigation() {
  const { data: session } = useSession();
  return (
    <nav className="flex justify-between items-center  text-center">
      <div className="ml-20">
        <Link href="/">Dota2 1x1</Link>
      </div>
      <div className="flex justify-end md:mr-20 ">
        <div className=" hidden md:flex justify-between items-center  h-[52px]">
          <ul className="flex-row  justify-end items-center mr-5 flex ">
            <li>
              <Link className="px-7 py-5 hover:bg-zinc-300 " href="/news">
                Новости
              </Link>
            </li>
            <li>
              <Link className="px-7 py-5 hover:bg-zinc-300 " href="/about">
                О сервисе
              </Link>
            </li>
            {!session?.user && (
              <>
                <li>
                  <Link
                    className="px-7 py-5 hover:bg-zinc-300 "
                    href="/auth/signup"
                  >
                    Регистрация
                  </Link>
                </li>
                <li>
                  <Link
                    className="px-7 py-5 hover:bg-zinc-300 "
                    href="/auth/signin"
                  >
                    Войти
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
