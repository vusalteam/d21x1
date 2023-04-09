import { IMatch } from "@/types";
import RequestItem from "./RequestItem";
import { prisma } from "@/app/api/db";

async function getData() {
  return await prisma.match.findMany({where:{recipientId:1}});
}

async function Page() {
  const requests = await getData();
  return (
    <div className="w-full flex flex-col">
      <h3 className="text-center text-xl my-3 relative">
        Запросы на игру: <span className="text-lg text-red-400">{requests.length}</span>
      </h3>
      {!requests?.length ? (
        <>
          <div className="flex flex-col gap-2">
            <div className="text-lg">Запросов не найдено</div>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col gap-2">
            {requests.map((request) => (
              <RequestItem key={request.id} request={request} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
export default Page;
