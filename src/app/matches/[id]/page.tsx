import { getMatchById } from "@/services/matches";
import MatchCard from "./components/MatchCard";
import { getSession } from "@/services/user";
import { Match } from "@prisma/client";

export const metadata = {
  title: "Match Details",
  description: "Match details page",
};
const fetchMatch = async (id: number) => {
    if (!id) return null;
  const session = await getSession();
  if (!session) return null
  const match = await getMatchById(id) as Match;
  if (!match) return null
  if (match.senderId === session.user.id || match.recipientId === session.user.id) return match
  return null;
};

const Page = async ({ params }: { params: { id: number } }) => {
  const match = await fetchMatch(Number(params.id));
  
  return <MatchCard pMatch={match} />;
};

export default Page;
