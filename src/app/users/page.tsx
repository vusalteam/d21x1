import { prisma } from "../api/db";
import { FcSteam } from "react-icons/fc";
import { BsFillPersonDashFill, BsFillPersonPlusFill } from "react-icons/bs";
import Link from "next/link";
import Image from "next/image";

async function getData(query: string) {
  return await prisma.user.findMany({
    where: {
      username: {
        startsWith: query,
      },
    },
  });
}
export const metadata = {
  title: "Users",
  description: "Users page",
};
async function Page() {
  let users = await getData("");
  return (
    <div className="w-full flex flex-col p-2">
      <h2 className="text-center font-bold mb-2 border-b-[1px] p-2 border-gray-100">
        Список пользователей
      </h2>
      <div className="flex flex-col">
        {users.map((user) => (
          <div key={user.id} className="flex rounded-md bg-gray-100 p-2 ">
            <div className=" w-full flex flex-row justify-between items-center">
              <div className="flex flex-col">
                <div className="flex flex-row  items-center gap-2 relative">
                  <div className="flex flex-row items-center gap-2 relative">
                    <Image
                      className="rounded-full"
                      src={user.avatar}
                      width={55}
                      height={55}
                      alt={user.username}
                    />
                    <span className="absolute top-[6px]  right-[6px] mx-auto text-sm text-white border-[1px] border-white p-1 bg-green-500 w-[5px] h-[5px] rounded-full"></span>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex gap-1 items-center">
                      <Link
                        href={`/users/1`}
                        className="text-md font-bold text-cyan-700"
                      >
                        {user.username}
                      </Link>

                      <p className="flex gap-1">
                        <span className="text-sm text-green-500">221</span>
                        <span className="text-sm">/</span>
                        <span className="text-sm text-red-500">52</span>
                      </p>
                      <a
                        className=" text-gray-400 hover:text-gray-500 underline"
                        href="https://steamcommunity.com/id/provvler/"
                        target="_blank"
                      >
                        [[ steam ]]
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-1">
                <button className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-3 rounded">
                  Подписаться
                </button>
                <button className="bg-rose-600 hover:bg-rose-500 text-white font-bold py-2 px-3 rounded">
                  Отписаться
                </button>
                <button className="bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-3 rounded">
                  1x1
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Page;
