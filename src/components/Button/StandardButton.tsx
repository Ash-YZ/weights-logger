import React from "react";
import Loader from "../Loader/Loader";

interface Props {
  label: string;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  type?: "primary" | "secondary";
}

function StandardButton({
  label,
  onClick,
  className,
  disabled,
  loading,
  type,
}: Props) {
  return (
    <button
      type="button"
      className={`flex bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded ${
        className ?? ""
      } ${disabled ? "bg-gray-400 hover:bg-gray-400 text-gray-700" : ""}
      ${type === "secondary" ? "bg-blue-900" : ""}`}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? <Loader /> : label}
    </button>
  );
}

export default StandardButton;
