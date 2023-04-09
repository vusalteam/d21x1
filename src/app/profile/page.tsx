
import { getCurrentUser } from "@/actions/getCurrentUser";
import GameHistory from "../../components/games-history/GameHistoryList";
import UserBar from "./components/user-bar/UserBar";
import { prisma } from "../api/db";
const getData = async()=> {
  const currentUser = await getCurrentUser()
  if(!currentUser) return {user:null}
  const user = await prisma.user.findUnique({where:{id:currentUser.id},select:{
    id:true,
    username:true,
    avatar:true,
    steamId:true,
    roles:{
      select:{
        role:true,
      }
    },
    status:true,
    balance:true,
  }})
  return {user}
  
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
