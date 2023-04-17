import Image from "next/image";
import Link from "next/link";
import { BsArrowLeft } from "react-icons/bs";
const ChatCard = () => {
  return (
    <div className="flex flex-col justify-center w-full h-full">
      <div className="flex w-full flex-row text-center mb-2 border-b-[1px] p-2 justify-between items-center border-gray-100">
        <Link
          className="flex items-center p-2 gap-1 hover:bg-gray-50 text-gray-700"
          href="/chats"
        >
          <BsArrowLeft />
          Назад
        </Link>
        <h2 className="text-md font-">
          <Link href={"/users/1"}>vusalteam</Link>
        </h2>
        <div className="max-w[20px] max-h-[20px] flex items-center justify-center">
          <Image
            className="rounded-full"
            width={20}
            height={20}
            src="/assets/images/avatar.jpg"
            alt="avatar"
          />
        </div>
      </div>
      <div className="flex flex-col items-end justify-end w-full px-2 py-4 mb-auto overflow-y-scroll h-full scrollbar scrollbar-thumb-gray-300 scrollbar-medium scrollbar-white">
        <div className="flex w-full gap-3 pt-3 pb-2 border-b-[1px] border-gray-100">
          <div className="flex flex-col rounded-full relative overflow-hidden min-h-[40px] min-w-[40px] w-[40px] h-[40px] items-center justify-center">
            <Image
              className="rounded-full "
              fill
              src="/assets/images/avatar.jpg"
              alt="avatar"
            />
          </div>
          <div className="flex flex-col w-[calc(100%-40px]">
            <p>Vusalteam</p>
            <div className="flex flex-col pl-2">
              <p className="">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut
                facere illo placeat. Temporibus voluptatem iure nesciunt
                obcaecati Lorem ipsum dolor sit amet consectetur adipisicing
                elit. Pariatur corporis cupiditate, repellat, inventore, quidem
                accusantium sunt corrupti totam libero blanditiis adipisci
                deleniti doloribus odio. Fugit unde exercitationem repudiandae
                culpa excepturi?
              </p>
              <p className="mt-1 font-light text-xs text-gray-500">
                15.02.2022 15:21
              </p>
            </div>
          </div>
        </div>
        <div className="flex w-full gap-3 justify-end pt-3 pb-2 border-b-[1px] border-gray-100">
          <div className="flex flex-col">
            <p className="text-right">Вы</p>
            <div className="flex flex-col pl-2">
              <p className="">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut
                facere illo placeat. Temporibus voluptatem iure nesciuntы
              </p>
              <p className="mt-1 font-light text-right text-xs text-gray-500">
                15.02.2022 15:21
              </p>
            </div>
          </div>
          <div className="flex flex-col rounded-full relative overflow-hidden min-h-[40px] min-w-[40px] w-[40px] h-[40px] items-center justify-center">
            <Image
              className="rounded-full "
              fill
              src="/assets/images/avatar.jpg"
              alt="avatar"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full  h-[60px]">
        <div className="w-full flex gap-1 items-center">
          <div className="flex items-center  py-2 w-full rounded-lg ">
            <button
              type="button"
              className="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100"
            >
              <svg
                aria-hidden="true"
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Upload image</span>
            </button>
            <button
              type="button"
              className="p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 "
            >
              <svg
                aria-hidden="true"
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Add emoji</span>
            </button>
            <textarea
              id="chat"
              rows={2}
              className="block p-2 w-full text-xs text-gray-900 bg-white rounded-xs border border-gray-300 focus:ring-blue-500 focus:outline-none resize-none scrollbar 
              scrollbar-thumb-gray-300 
              scrollbar-medium 
              scrollbar-white"
              placeholder="Your message..."
            ></textarea>
            <button
              type="submit"
              className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 "
            >
              <svg
                aria-hidden="true"
                className="w-6 h-6 rotate-90"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
              </svg>
              <span className="sr-only">Send message</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatCard;
