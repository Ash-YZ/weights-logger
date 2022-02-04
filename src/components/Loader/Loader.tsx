import React from "react";

interface Props {
  isDarkMode?: boolean;
}

function Loader({ isDarkMode }: Props) {
  return (
    <div className="flex items-center justify-center ">
      <div
        className={`w-6 h-6 border-b-2 ${
          isDarkMode ? "border-black" : "border-white"
        } rounded-full animate-spin`}
      />
    </div>
  );
}

export default Loader;
