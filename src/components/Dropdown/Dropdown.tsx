import React, { useEffect, useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { AiOutlineCloseCircle } from "react-icons/ai";
import Modal from "../Modal/Modal";

interface Props {
  label: string;
  options: Array<string>;
  parentSelectedOption?: number;
  setParentSelectedOption?: (optionIndex: number) => void;
  selectOption: (optionIndex: number) => void;
  className?: string;
  warningMessage?: string;
  autoSelectSingleOption?: boolean;
}

function Dropdown({
  label,
  options,
  parentSelectedOption,
  setParentSelectedOption,
  selectOption,
  className,
  warningMessage,
  autoSelectSingleOption,
}: Props) {
  const [isOptionsVisible, setIsOptionsVisible] = useState(false);
  const [isWarningVisible, setIsWarningVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>();

  useEffect(() => {
    if (parentSelectedOption === -1) setSelectedOption(null);
  }, [parentSelectedOption]);

  useEffect(() => {
    if (options.length === 1 && autoSelectSingleOption) {
      setSelectedOption(options[0]);
      selectOption(0);
      setParentSelectedOption(0);
    }
  }, [options]);
  return (
    <div>
      {isWarningVisible && (
        <div className="absolute left-[50%] z-10">
          <Modal
            title="Warning"
            description={warningMessage}
            closeButtonLabel="Cancel"
            onClose={() => setIsWarningVisible(false)}
            saveButtonLabel="Continue"
            onSave={() => {
              setIsWarningVisible(false);
              setIsOptionsVisible(true);
            }}
          />
        </div>
      )}

      {isOptionsVisible && (
        <div className="absolute w-screen h-screen bg-gray-500 z-10 top-0 left-0 pt-[80px] text-xl">
          <button
            type="button"
            className="w-full border-b-2 border-gray-700 py-[20px] flex justify-center"
            onClick={() => {
              setIsOptionsVisible(false);
            }}
          >
            <div className="scale-150 ">
              <AiOutlineCloseCircle />
            </div>
          </button>
          {options.map((option, index) => {
            return (
              <button
                key={option + Math.random() * 10}
                type="button"
                className="w-full border-b-2 border-gray-700 capitalize py-[10px]"
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
          if (warningMessage && selectedOption) setIsWarningVisible(true);
          else setIsOptionsVisible(true);
        }}
      >
        {parentSelectedOption === -1 ? label : selectedOption ?? label}
        <RiArrowDropDownLine className="absolute w-[35px] h-[35px] right-0" />
      </button>
    </div>
  );
}

export default Dropdown;
