import { getChats } from "@/services/message"
import ChatsCard, { IChat } from "./components/ChatsCard"
import { getSession } from "@/services/user"
import { ISafeUser } from "@/types/user"
const fetchChats = async () => {
    const session = await getSession()
    if (!session) {
        return
    }
    return  await getChats(session?.user.id)
}

const Page = async () => {
    const chats = await fetchChats()
    const session = await getSession()
    return <ChatsCard user={session?.user} chats={chats as IChat} />
}

 
export default Page;