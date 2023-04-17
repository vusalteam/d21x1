"use client";
import { use, useEffect, useState } from "react";
import MatchTabs from "./MatchTabs";
import RequestsCard from "./RequestsCard";
import SentCard from "./SentCard";
import { useSearchParams } from "next/navigation";
import Loading from "@/components/Loading";
import AllMatchesCard from "./AllMatchesCard";
export enum EMFilter {
  ALL = "all",
  SENT = "sent",
  REQUESTED = "requested",
}
export type IMFilter = EMFilter;
const MatchesCard = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { get } = useSearchParams();
  const [filter, setFilter] = useState<IMFilter>(get("filter") as IMFilter);
  useEffect(() => {
    let query = get("filter");
    if (query !== "sent" && query !== "requested" && query !== "all")
      setFilter("all" as IMFilter);
    setIsLoading(false);
  }, [get]);
  if (isLoading) <Loading />;
  return (
    <div className="w-full flex flex-col p-2">
      <h2 className="text-center font-bold mb-2 border-b-[1px] p-2 border-gray-100">
        Список Матчей
      </h2>
      <div className="flex flex-col w-full">
        <MatchTabs filter={filter} onFiltred={(f) => setFilter(f)} />
        {filter === EMFilter.REQUESTED && <RequestsCard />}
        {filter === EMFilter.SENT && <SentCard />}
        {filter === EMFilter.ALL && <AllMatchesCard />}
      </div>
    </div>
  );
};

export default MatchesCard;
