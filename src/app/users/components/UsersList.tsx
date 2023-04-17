"user client";
import React, { useEffect, useState } from "react";
import { User, UserStatus } from "@prisma/client";
import UserListItem from "./UserListItem";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import Loading from "@/components/Loading";
import { IFilter } from "./UsersCard";

interface UsersOnList extends User {
  wins: number;
  losses: number;
  isFollowing: boolean;
  followersCount: number;
  followingsCount: number;
}
export default function UsersList({filter, query }: { filter: IFilter,query: string }) {
  const [users, setUsers] = useState<UsersOnList[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    async function fetchUsers() {
      const url = query.length ? `/api/users/?query=${query}&filter=${filter}` : `/api/users/?filter=${filter}`;
      const response = await fetch(url);
      if (response.status === 200) {
        const data = await response.json();
        setUsers(data);
      } else if (response.status === 404) {
        setUsers([]);
        toast.error("Никого не нашлось");
      } else {
        toast.error("Ошибка при загрузке данных");
      }
      setLoading(false);
    }
    fetchUsers();
  }, [filter, query]);

  if (loading) {
    return <Loading />
  }
  if (!users?.length) {
    return <div className="flex w-full my-2 text-md ">Нет подходящих результатов!</div>;
  }
  return (
    <div className="flex flex-col">
      {users.map((user) => (
        <div key={user.id} className="flex rounded-md bg-gray-100 p-2 ">
          <UserListItem userItem={user} />
        </div>
      ))}
    </div>
  );
}
