import React from "react";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-gray-300">
      <div className="relative mb-4">
        <div className="w-16 h-16 border-4 border-t-transparent border-b-transparent border-gray-500 rounded-full animate-spin"></div>
        <span className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 text-sm font-semibold text-gray-400">
          🧠
        </span>
      </div>
      <p className="text-sm md:text-base text-center max-w-xs px-4">
        Brewing some productivity stats... Grab a tea ☕ or stretch a little 🧘
        while we load your excellence.
      </p>
    </div>
  );
};

export default Loading;
