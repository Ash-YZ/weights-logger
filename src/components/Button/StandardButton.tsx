import React from "react";

interface Props {
  label: string;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
}

function StandardButton({ label, onClick, className, disabled }: Props) {
  return (
    <button
      type="button"
      className={`bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded ${
        className ?? ""
      } ${disabled ? "bg-gray-400 hover:bg-gray-400 text-gray-500" : ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
}

export default StandardButton;
