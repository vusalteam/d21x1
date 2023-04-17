import { getChatById } from "@/services/message";
import ChatCard from "./components/ChatCard";
import { IChat } from "../components/ChatsCard";
import { getSession } from "@/services/user";

const fetchChat = async (id:number) => {
    return await getChatById(id)
}

const Page = async ({params}:{params:{id:number}}) => {
    const chat = await fetchChat(Number(params.id)) as IChat
    const session = await getSession()
    if (!chat ) return <div>Такого чата не существует</div>
    const isMember = chat.members.some((member) => member.id === session?.user.id)
    if (!isMember ) return <div>Такого чата не существует</div>
    return <ChatCard user={session?.user} chat={chat}/>
}
 
export default Page;