"use client";
import { useEffect, useState } from "react";
import { Match } from "@prisma/client";
import { toast } from "react-hot-toast";
import Loading from "@/components/Loading";
import SentItem from "./SentItem";
import MatchesItem from "./MatchesItem";

const AllMatchesCard = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    const fetchRequests = async () => {
      const res = await fetch("/api/matches");
      if (res.status === 200) {
        const data = await res.json();
        setMatches(data);
      } else if (res.status === 404) {
        setMatches([]);
      } else {
        toast.error("Ошибка при загрузке запросов");
      }
      setIsLoading(false);
    };
    fetchRequests();
  }, []);

  if (isLoading) return <Loading />;

  return (
    <div className="w-full flex flex-col">
      {!setMatches?.length ? (
        <>
          <div className="flex flex-col gap-2">
            <div className="text-sm text-center">Нет отправленных запросов</div>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col gap-2">
            {matches.map((match) => (
              <MatchesItem
                key={match.id}
                match={{ ...match }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AllMatchesCard;
