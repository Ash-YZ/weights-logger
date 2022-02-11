import { Slide, ToastContainer } from "react-toastify";
import React from "react";

function ToastNotification() {
  return (
    <ToastContainer
      position="top-center"
      autoClose={1000}
      closeOnClick
      theme="dark"
      transition={Slide}
      newestOnTop
    />
  );
}

export default ToastNotification;
