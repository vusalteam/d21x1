import { prisma } from "@/app/api/db";
import { MatchResult, MatchStatus } from "@prisma/client";
const baseSelect = {
  id: true,
  description: true,
  createdAt: true,
  bet: true,
  winnerId: true,
  status: true,
  result: true,
  steamId: true,
  mode: true,
  updatedAt: true,
  senderId: true,
  recipientId:true,
  sender: {
    select: {
      username: true,
      avatar: true,
      id: true,
      status: true,
    },
  },
  recipient: {
    select: {
      username: true,
      avatar: true,
      id: true,
      status: true,
    },
  },
};


const getMathces = async (where: object,select: object={...baseSelect}) => {
  const mathces = await prisma.match.findMany({
    where,
    select: {...select},
  });
  return mathces;
};

const getMatch = async (where: object,select: object={...baseSelect}) => {
  const match = await prisma.match.findUnique({
    where,
    select: {...select},
  });
  return match;
};

export const getMatchBySteamId = async (steamId: string) => {
  return await getMatch({ steamId } );
};
export const getMatchById = async (id: number) => {
  return await getMatch({ id });
};
export const getMatchesByWinnerId = async (winnerId: number,result:MatchResult = MatchResult.FINISHED) => {
  return await getMathces({result, winnerId } );
};
export const getRecipientMatchesByUserId = async (userId: number,result:MatchResult = MatchResult.FINISHED) => {
  return await getMathces({result, recipientId:userId },{});
};
export const getRecipientMatchesByUserIdAndStatus = async (userId: number,status:MatchStatus) => {
  return await getMathces({status,  recipientId:userId} );
};
export const getRecipientMatchesByUserIdAndResultAndStatus = async (userId: number,result:MatchResult,status:MatchStatus) => {
  return await getMathces({status,result, recipientId:userId});
};
export const getSentMatchesByUserId = async (userId: number,result:MatchResult = MatchResult.FINISHED) => {
  return await getMathces({result, senderId:userId });
};
export const getSentMatchesByUserIdAndStatus = async (userId: number,status:MatchStatus) => {
  return await getMathces({status,  senderId:userId  } );
};
export const getSentMatchesByUserIdAndResultAndStatus = async (userId: number,result:MatchResult,status:MatchStatus) => {
  return await getMathces({status,result, senderId:userId });
};
export const getAllMatchesByUserId = async (userId: number,result:MatchResult = MatchResult.FINISHED) => {
  return await getMathces({result, OR:[{senderId:userId},{recipientId:userId}] });
};
export const getAllMatchesByUserIdAndStatus = async (userId: number,status:MatchStatus) => {
  return await getMathces({status, OR:[{senderId:userId},{recipientId:userId}] } );
};
export const getAllMatchesByUserIdAndResultAndStatus = async (userId: number,result:MatchResult,status:MatchStatus) => {
  return await getMathces({status,result, OR:[{senderId:userId},{recipientId:userId}] });
};
