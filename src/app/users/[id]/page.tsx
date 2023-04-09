export const metadata = {
  title: "Ivan",
  description: "Users page",
};
const Page = ({params}:{params:{id:string}}) => {
  console.log(params);
  
  return (
    <div className="w-full flex flex-col">
      <h3 className="">Пользователь №{params.id}</h3>
      <div className="flex flex-col">
      </div>
    </div>
  );
}
export default Page;
