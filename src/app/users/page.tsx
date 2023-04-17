import UsersCard, { IFilter } from "./components/UsersCard";

export const metadata = {
  title: "Список пользователей",
  description: "Users page",
};

async function Page() {
  return  <UsersCard/>
}
export default Page;
