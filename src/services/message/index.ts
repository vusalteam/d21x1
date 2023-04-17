import {prisma} from "@/api/db";   
import { ChatSelectObject } from "./slect-object";

export const getMessage = async (id: number) => {
    const message = await prisma.message.findUnique({
        where: {id: id},
        
    });
    return message;
}
export const getMessagesByChatId = async (chatId:number) => {
    const messages = await prisma.message.findMany({
        where:{chat:{id:chatId}},
        ...ChatSelectObject
    });
    return messages;
}
export const getMessagesBySenderId = async (chatId:number) => {
    const messages = await prisma.message.findMany({
        where:{chat:{id:chatId}},
        ...ChatSelectObject
    });
    return messages;
}
export const createMessage = async (senderId:number,chatId:number, content:string) => {
    const isExist = await getChatById(chatId);
    if(!isExist) return null;
    const message = await prisma.message.create({
        data:{
            content,
            chat:{
                connect:{id:chatId},
            },
            senderId,
        }
    });
    return message;
}
export const createChat = async (firstUserId:number,secondUserId:number) => {
    const firstUser = await prisma.user.findUnique({
        where:{id:firstUserId}
    });
    if(!firstUser) return null;
    const secondUser = await prisma.user.findUnique({
        where:{id:secondUserId},
    });
    if(!secondUser) return null;
    const isExist = await prisma.chat.findFirst({
        where:{
            OR:[
                {members:{some:{id:firstUserId}} },
                {members:{some:{id:secondUserId}} }
            ]
        },
    });
    if(isExist) return null;
    const chat = await prisma.chat.create({
        data:{
            members:{
                connect:[{id:firstUserId},{id:secondUserId}],
            },
        }
    });
    return chat;
}
export const getChats = async (userId:number) => {
    const chats = await prisma.chat.findMany({
        where:{members:{some:{id:userId}}},
        ...ChatSelectObject,
    });
    if(!chats) return null;
    return chats;
}
export const getChatByUsers = async (firstUserId:number,secondUserId:number) => {
    const chat = await prisma.chat.findFirst({
        where:{
            AND:[
                {members:{some:{id:firstUserId}} },
                {members:{some:{id:secondUserId}} }
            ]
        },
        ...ChatSelectObject
    });
    return chat;
}
export const getChatById= async (id:number) => {
    const chat = await prisma.chat.findUnique({
        where:{id},
        include:{
            messages:{
                orderBy:{
                    createdAt: 'desc'
                }
            },
            members:{
                select:{
                    id:true,
                    username:true,
                    avatar:true,
                    status:true,
                }
            }
        }
    });
    return chat;
}
