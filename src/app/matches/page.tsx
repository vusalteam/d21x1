import MatchesCard from "./components/MatchesCard"
export const metadata = {
    title: "Матчи",
    description: "Список матчей",
    keywords: "matches, league, league table, league table page, matches page",
}

const Page = () => {
    return ( 
        <MatchesCard />
     );
}
 
export default Page;