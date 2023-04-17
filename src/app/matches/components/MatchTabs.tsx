"use client";
import { useRouter } from "next/navigation";
import { EMFilter, IMFilter } from "./MatchesCard";


const MatchTabs = ({
  filter,
  onFiltred,
}: {
  filter: IMFilter;
  onFiltred: (filter: IMFilter) => void;
}) => {
  const router = useRouter();

  const setFilterHandler = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    filter: IMFilter
  ) => {    
    e.preventDefault();
    router.replace(`/matches?filter=${filter}`);
    onFiltred(filter);
  };

  return (
    <div className="flex mx-auto justify-between mb-2">
      <div className="flex justify-between text-sm w-full font-medium text-center text-gray-500 border-b  border-cyan-800">
        <ul className="flex  gap-10 flex-wrap -mb-px">
          <li>
            <a
              onClick={(e) => setFilterHandler(e, EMFilter.ALL)}
              href="/matches?filter=all"
              className={`inline-block p-4 rounded-t-lg ${
                filter === EMFilter.ALL || !filter
                  ? "active text-blue-500 border-b-2 border-blue-500"
                  : "hover:border-blue-500 hover:text-gray-600"
              }`}
              aria-current="page"
            >
              Все матчи
            </a>
          </li>
          <li>
            <a
              onClick={(e) => setFilterHandler(e, EMFilter.SENT)}
              href="/matches?filter=sent"
              className={`inline-block p-4 rounded-t-lg ${
                filter === EMFilter.SENT
                  ? "active text-blue-500 border-b-2 border-blue-500"
                  : "hover:border-blue-500 hover:text-gray-600"
              }`}
              aria-current="page"
            >
              Отправленные
            </a>
          </li>
          <li>
            <a
              onClick={(e) => setFilterHandler(e, EMFilter.REQUESTED)}
              href="/matches?filter=requested"
              className={`inline-block p-4 rounded-t-lg ${
                filter === EMFilter.REQUESTED
                  ? "active text-blue-500 border-b-2 border-blue-500"
                  : "hover:border-blue-500 hover:text-gray-600"
              }`}
              aria-current="page"
            >
              Полученные
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MatchTabs;
