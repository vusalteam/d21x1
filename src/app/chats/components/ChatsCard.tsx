import Image from "next/image";
const ChatsCard = () => {
  return (
    <div className="flex flex-col justify-center w-full">
      <h2 className="text-center font-bold mb-2 border-b-[1px] p-2 border-gray-100">
        Список чатов
      </h2>
      <div className="flex flex-col w-full ">
        <div className="w-full my-1 relative">
          <input
            type="text"
            className="w-full p-2 border border-gray-100 rounded-md focus:outline-none"
            placeholder="Поиск чата"
          />
          <button className="absolute top-0 bottom-0 right-1 z-10 hover:text-gray-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="flex chat-item-container gap-2 border-t-[1px] items-center border-b-[1px] hover:bg-gray-100 border-gray-100 p-1 w-full cursor-pointer">
          <div className="flex flex-col relative">
            <Image
              className="rounded-full"
              src={"/assets/images/avatar.png"}
              width={50}
              height={50}
              alt={"dsa"}
            />
            <span className="absolute top-[5px]  right-[5px] mx-auto text-sm text-white border-[1px] border-white p-1 bg-green-500 w-[2px] h-[2px] rounded-full"></span>
          </div>
          <div className="flex flex-col w-full">
            <p className="text-sm text-gray-500 w-full flex justify-between items-center">
              <span className="font-bold">vusalteam</span>
              <span className="">12.04.2022 10:00</span>
            </p>
            <div className="flex gap-1 p-1 mt-1 items-center">
              <Image
                className="rounded-full"
                src={"/assets/images/avatar.png"}
                width={20}
                height={20}
                alt={"dsa"}
              />
              <p className="max-h-[40px] text-gray-700 overflow-hidden text-ellipsis break-all  px-1">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Perferendis eveniet tempore unde optio ducimus voluptatum
                consectetur veniam voluptate rerum? Velit laboriosam ipsa
                obcaecati fugiat cumque natus officiis illo quidem laudantium!
              </p>
            </div>
          </div>
        </div>
        <div className="flex chat-item-container gap-2 border-t-[1px] items-center border-b-[1px] hover:bg-gray-100 border-gray-100 p-1 w-full cursor-pointer">
          <div className="flex flex-col relative">
            <Image
              className="rounded-full"
              src={"/assets/images/avatar.png"}
              width={50}
              height={50}
              alt={"dsa"}
            />
            <span className="absolute top-[5px]  right-[5px] mx-auto text-sm text-white border-[1px] border-white p-1 bg-green-500 w-[2px] h-[2px] rounded-full"></span>
          </div>
          <div className="flex flex-col w-full">
            <p className="text-sm text-gray-500 w-full flex justify-between items-center">
              <span className="font-bold">vusalteam</span>
              <span className="">12.04.2022 10:00</span>
            </p>
            <div className="flex gap-1 p-1 mt-1 items-center">
              <Image
                className="rounded-full"
                src={"/assets/images/avatar.png"}
                width={20}
                height={20}
                alt={"dsa"}
              />
              <p className="max-h-[40px] text-gray-700 overflow-hidden text-ellipsis break-all  px-1">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Perferendis eveniet tempore unde optio ducimus voluptatum
                consectetur veniam voluptate rerum? Velit laboriosam ipsa
                obcaecati fugiat cumque natus officiis illo quidem laudantium!
              </p>
            </div>
          </div>
        </div>
        <div className="flex chat-item-container gap-2 border-t-[1px] items-center border-b-[1px] hover:bg-gray-100 border-gray-100 p-1 w-full cursor-pointer">
          <div className="flex flex-col relative">
            <Image
              className="rounded-full"
              src={"/assets/images/avatar.png"}
              width={50}
              height={50}
              alt={"dsa"}
            />
            <span className="absolute top-[5px]  right-[5px] mx-auto text-sm text-white border-[1px] border-white p-1 bg-green-500 w-[1px] h-[1px] rounded-full"></span>
          </div>
          <div className="flex flex-col w-full">
            <p className="text-sm text-gray-500 w-full flex justify-between items-center">
              <span className="font-bold">vusalteam</span>
              <span className="">12.04.2022 10:00</span>
            </p>
            <div className="flex gap-1 p-1 mt-1 items-center">
              <p className="bg-gray-100 max-h-[40px] text-gray-700 overflow-hidden text-ellipsis break-all  px-1">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Perferendis eveniet tempore unde optio ducimus voluptatum
                consectetur veniam voluptate rerum? Velit laboriosam ipsa
                obcaecati fugiat cumque natus officiis illo quidem laudantium!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatsCard;
