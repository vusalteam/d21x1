
import { getCurrentUser } from "@/services/user";
import GameHistory from "../../components/games-history/GameHistoryList";
import UserBar from "./components/user-bar/UserBar";
import { prisma } from "../api/db";
import { getGames } from "@/services/user";
const getData = async()=> {
  const currentUser = await getCurrentUser()
  if(!currentUser) return {user:null}
  const { matchesCount,winsCount,lossesCount} =  await getGames(currentUser.id)
  const user = await prisma.user.findUnique({where:{id:currentUser.id},select:{
    id:true,
    username:true,
    avatar:true,
    steamId:true,
    statusMessage:true,
    roles:{
      select:{
        role:true,
      }
    },
    status:true,
    balance:true,
  }})
  return {user:{
    ...user,
    stats:{
      matchesCount,
      winsCount,
      lossesCount,
    }
  }}
  
}
const Page = async () => {
  const {user} = await getData()
  return (
    <div className="flex w-full">
      <div className="flex flex-col w-full">
        <UserBar user={user}/>
        <GameHistory />
      </div>
    </div>
  );
};
export default Page;
