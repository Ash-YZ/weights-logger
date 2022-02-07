import React, { ChangeEvent } from "react";

interface Props {
  value: string | number;
  type?: string;
  name: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  label?: string;
  placeholder?: string;
  autoFocus?: boolean;
}

function StandardInput({
  value,
  type,
  name,
  onChange,
  className,
  label,
  placeholder,
  autoFocus,
}: Props) {
  return (
    <>
      {label && <h3 className="text-xl">{label}</h3>}
      <input
        value={value}
        className={`border py-2 px-3 w-full text-black ${className || ""}`}
        type={type || "text"}
        name={name}
        onChange={onChange}
        placeholder={placeholder ?? ""}
        autoFocus={autoFocus}
      />
    </>
  );
}

export default StandardInput;
