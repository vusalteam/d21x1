"use client";

import { useEffect, useState } from "react";
import RequestItem from "./RequestItem";
import { Match } from "@prisma/client";
import { toast } from "react-hot-toast";
import Loading from "@/components/Loading";

const RequestsCard = () => {
  const [requests, setRequests] = useState<Match[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isChange, setIsChange] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    const fetchRequests = async () => {
      const res = await fetch("/api/matches?filter=requests");
      if (res.status === 200) {
        const data = await res.json();
        setRequests(data);
      } else if (res.status === 404) {
        setRequests([]);
      } else {
        toast.error("Ошибка при загрузке запросов");
      }
      setIsLoading(false);
      setIsChange(false);
    };
    fetchRequests();
  }, [isChange]);

  if (isLoading) return <Loading />;

  return (
    <div className="w-full flex flex-col">
      {!requests?.length ? (
        <>
          <div className="flex flex-col gap-2">
            <div className="text-sm text-center">Нет активных запросов</div>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col gap-2">
            {requests.map((request) => (
              <RequestItem
                onAction={() => setIsChange(true)}
                key={request.id}
                match={{ ...request }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default RequestsCard;
