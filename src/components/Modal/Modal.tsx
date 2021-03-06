import React from "react";
import StandardButton from "../Button/StandardButton";

interface Props {
  title: string;
  description: string;
  closeButtonLabel: string;
  onClose: () => void;
  saveButtonLabel?: string;
  onSave?: () => void;
  isLoading?: boolean;
}

// eslint-disable-next-line react/function-component-definition
const Modal: React.FC<Props> = ({
  children,
  closeButtonLabel,
  description,
  onClose,
  onSave,
  saveButtonLabel,
  title,
  isLoading,
}) => {
  return (
    <>
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" />
      <div className="flex fixed justify-center h-full z-50 top-0 left-[50%]">
        <div className="absolute top-[20px] mx-auto p-5 border w-96 shadow-lg rounded-md bg-gray-500">
          <div className="mt-3 text-center">
            <h3 className="text-lg text-white">{title}</h3>
            <div className="mt-2 px-7 py-3">
              <p
                className="text-sm text-white"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            </div>
            {children}
            <div className="items-center px-4 py-3 flex gap-2">
              {onSave && saveButtonLabel && (
                <StandardButton
                  label={saveButtonLabel}
                  onClick={onSave}
                  className="w-full"
                  loading={isLoading}
                />
              )}
              <StandardButton
                label={closeButtonLabel}
                onClick={onClose}
                type="secondary"
                className="w-full"
                loading={isLoading}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
