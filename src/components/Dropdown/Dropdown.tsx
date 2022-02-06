import React, { useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";

interface Props {
  label: string;
  options: Array<string>;
  parentSelectedOption?: number;
  selectOption: (optionIndex: number) => void;
  className?: string;
}

function Dropdown({
  label,
  options,
  parentSelectedOption,
  selectOption,
  className,
}: Props) {
  const [isOptionsVisible, setIsOptionsVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>();

  return (
    <>
      {isOptionsVisible && (
        <div className="absolute w-screen h-screen bg-gray-500 z-10 top-0 left-0 pt-[80px] text-xl">
          {options.map((option, index) => {
            return (
              <button
                key={option + Math.random() * 10}
                type="button"
                className={`w-full border-b-2 border-gray-700 capitalize py-[10px] ${
                  index === 0 ? "border-t-2" : ""
                }`}
                onClick={() => {
                  setIsOptionsVisible(false);
                  setSelectedOption(option);
                  selectOption(index);
                }}
              >
                {option}
              </button>
            );
          })}
        </div>
      )}
      <button
        type="button"
        className={`cursor-pointer relative w-full bg-white h-[40px] flex items-center justify-center text-black capitalize ${
          className || ""
        }`}
        onClick={() => {
          setIsOptionsVisible(true);
        }}
      >
        {parentSelectedOption === -1 ? label : selectedOption ?? label}
        <RiArrowDropDownLine className="absolute w-[35px] h-[35px] right-0" />
      </button>
    </>
  );
}

export default Dropdown;
