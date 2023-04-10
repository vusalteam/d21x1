"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";


export default function Form() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  return (
    <div className="w-full flex flex-col text-neutral-700">
      <div className="w-full">
          <h1 className="text-3xl font-bold text-center mt-1 mb-3">
            Авторизация
          </h1>
          <p className="text-center text-sm text-neutral-500">
            Авторизация в системе
          </p>
        </div>
        <div className="mx-auto max-w-sm">
          <form
          onSubmit={(e) => {
            e.preventDefault();
            signIn("signin", {
              redirect: true,
              email,
              password
              //@ts-ignore
            }).then(({ ok, error }) => {
              if (error) {
                toast.error(error);
              } else {
                //router.push("/");
                //console.log(ok);
              }
            }).catch((error) => {
              toast.error(error,{
                position: "bottom-center",
              });
            });
          }}
           className="flex flex-col justify-center items-center mt-5 w-full">
            <div className="w-full">
              <label className="text-md text-neutral-500">
                Email:
              </label>
              <input name="email" onChange={(e)=>setEmail(e.target.value)} className="w-full px-4 py-2 border-[1px] mt-2 focus-visible::border-[1px] border-neutral-600 rounded-md" type="text" placeholder="email@gmail.com" />
            <span className="text-sm text-red-600 mb-2 pl-2 hidden">Введите парильно данные</span>
            </div>
            <div className="w-full">
              <label className="text-md text-neutral-500">
                Пароль:
              </label>
              <input name="password" onChange={(e)=>setPassword(e.target.value)}  className="w-full px-4 py-2 border-[1px] mt-2 focus-visible::border-[1px] border-neutral-600 rounded-md" type="password" placeholder="******" />
            <span className="text-sm text-red-600 mb-2 pl-2 hidden">Введите парильно данные</span>
            </div>
            <div className="w-full px-4 py-2 bg-green-800 text-white rounded-md my-3">
              <button className="text-center w-full">
                Войти
              </button>
            </div>
            <div className="w-full pb-0.5 flex flex-col items-center">
              <Link className="text-sm text-neutral-500" href="/user/forgot">
                Забыли пароль?
              </Link>
            </div>
            <div className="w-full flex items-center justify-center">
              <Link className="text-sm text-neutral-500" href="/auth/signup">
                <span className="text-sm text-green-500 mr-2">
                  Нет аккаунта?
                </span>
                Зарегистрироваться
              </Link>
            </div>
          </form>
        </div>
    </div>
  )
}
