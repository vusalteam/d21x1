"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Form() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [steamId, setSteamId] = useState("");

 
  return (
    <div className="w-full flex flex-col text-neutral-700">
      <div className="w-full">
        <h1 className="text-3xl font-bold text-center mt-1 mb-3">
          Регистрация
        </h1>
        <p className="text-center text-sm text-neutral-500">
          Регистрация в системе
        </p>
      </div>
      <div className="mx-auto max-w-sm">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            signIn("signup", {
              redirect: false,
              email,
              password,
              rePassword,
              username,
              steamId,
              // @ts-ignore
            }).then(({ ok, error }) => {
              if (error) {
                toast.error(error);
              } else {
                router.push("/");
              }
            });
          }}
          className="flex flex-col justify-center items-center mt-5 w-full"
        >
          <div className="w-full mt-2">
            <label className="text-md text-neutral-500">
              Имя пользователя<span className="text-sm text-red-500">*</span>:
            </label>
            <input
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border-[1px] mt-2 focus-visible::border-[1px] border-neutral-600 rounded-md"
              type="text"
              placeholder="username"
            />
            <span className="text-sm text-red-600 mb-2 pl-2 hidden">
              Введите парильно данные
            </span>
          </div>
          <div className="w-full mt-2">
            <label className="text-md text-neutral-500">
              Email<span className="text-sm text-red-500">*</span>:
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border-[1px] mt-2 focus-visible::border-[1px] border-neutral-600 rounded-md"
              type="text"
              placeholder="email@gmail.com"
            />
            <span className="text-sm text-red-600 mb-2 pl-2 hidden">
              Введите парильно данные
            </span>
          </div>
          <div className="w-full mt-2">
            <label className="text-md text-neutral-500">
              Пароль<span className="text-sm text-red-500">*</span>:
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border-[1px] mt-2 focus-visible::border-[1px] border-neutral-600 rounded-md"
              type="password"
              placeholder="******"
            />
            <span className="text-sm text-red-600 mb-2 pl-2 hidden">
              Введите парильно данные
            </span>
          </div>
          <div className="w-full mt-2">
            <label className="text-md text-neutral-500">
              Подтвердите пароль<span className="text-sm text-red-500">*</span>:
            </label>
            <input
              onChange={(e) => setRePassword(e.target.value)}
              className="w-full px-4 py-2 border-[1px] mt-2 focus-visible::border-[1px] border-neutral-600 rounded-md"
              type="password"
              placeholder="******"
            />
            <span className="text-sm text-red-600 mb-2 pl-2 hidden">
              Введите парильно данные
            </span>
          </div>
          <div className="w-full mt-2">
            <label className="text-md text-neutral-500">SteamId:</label>
            <input
              onChange={(e) => setSteamId(e.target.value)}
              className="w-full px-4 py-2 border-[1px] mt-2 focus-visible::border-[1px] border-neutral-600 rounded-md"
              type="text"
              placeholder="7926751658"
            />
            <span className="text-sm text-red-600 mb-2 pl-2 hidden">
              Введите парильно данные
            </span>
          </div>
          <div className="w-full px-4 py-2 bg-green-800 text-white rounded-md my-3">
            <button className="text-center w-full">Регистрация</button>
          </div>
          <div className="w-full px-2 flex items-center justify-center">
            <Link className="text-sm text-neutral-500" href="/auth/signin">
              <span className="text-sm text-green-500 mr-2">
                Уже зарегистрированы?
              </span>
              Войти
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
