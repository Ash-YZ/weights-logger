import React, { useRef, useState } from "react";

interface Props {
  initialValue: string;
  type: string;
  update: (value: string) => void;
  className?: string;
}

function EditableInput({ initialValue, type, update, className }: Props) {
  const [editedValue, setEditedValue] = useState(initialValue);
  const [isEditing, setIsEditing] = useState(false);

  const ref = useRef(null);

  return (
    <>
      {!isEditing && (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
        <div
          onClick={() => {
            setIsEditing(true);
            ref.current.focus();
          }}
          className={`flex gap-1 items-center ${
            type !== "text" ? "justify-center" : ""
          }`}
        >
          {initialValue}
        </div>
      )}

      <input
        type={type}
        ref={ref}
        value={editedValue}
        className={`border-none focus:outline-none resize-none  ${
          type === "number" ? "max-w-[30px] text-center" : ""
        } ${!isEditing ? "absolute -left-[10000px]" : ""} ${className || ""}`}
        onChange={(e) => {
          setEditedValue(e.target.value);
        }}
        onBlur={() => {
          update(editedValue);
          setIsEditing(false);
        }}
      />
    </>
  );
}

export default EditableInput;
