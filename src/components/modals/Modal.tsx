const Modal = ({
  show,
  onClose,
  children,
  title,
  negativeButtonText,
  positiveButtonClick,
  positiveButtonText,
}: {
  show: boolean;
  onClose: () => void;
  children: React.ReactNode;
  positiveButtonText: string;
  positiveButtonClick: () => void;
  negativeButtonText: string;
  title: string;
}) => {
  if (!show) {
    return null;
  }

  return (
    <div className="absolute flex justify-center bg-black bg-opacity-70 items-center top-0 bottom-0 lef-0 right-0 z-10 min-h-[100vh] w-full">
      <div className="relative bg-white opacity-90  overflow-hidden mx-auto min-w-[350px] px-2 py-4 rounded-md">
        <div className="absolute top-0 right-0 z-10">
          <button
            className="absolute top-0 right-0 z-10 hover:text-gray-600"
            onClick={onClose}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="flex flex-col">
          <div className="flex items-center text-center font-bold text-lg text-gray-700 justify-center pb-1 border-b-[1px] border-gray-200 mb-3">{title}</div>
          <div className="flex justify-start items-center px-2 py-4">{children}</div>
        </div>
        <div className="flex justify-end px-4 py-2 pt-4 gap-8 border-t-[1px] border-gray-200">
          <button
            className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-sm"
            onClick={onClose}
          >
            {negativeButtonText}
          </button>
          <button
            className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-sm"
            onClick={positiveButtonClick}
          >
            {positiveButtonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
