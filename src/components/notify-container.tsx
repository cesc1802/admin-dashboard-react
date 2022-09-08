import React from "react";
import { ToastContainer, ToastContainerProps } from "react-toastify";

const NotifyContainer = (props: ToastContainerProps) => (
  <ToastContainer closeButton={false} hideProgressBar {...props} />
);

export default NotifyContainer;
