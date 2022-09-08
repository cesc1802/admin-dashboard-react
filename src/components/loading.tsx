import classNames from "classnames";
import React from "react";

interface LoadingProps {
  className?: string;
}

const Loading = ({ className }: LoadingProps) => (
  <div
    className={classNames(
      "inline-block h-10 w-10 animate-spin rounded-full border-4 border-r-primary border-b-primary border-t-transparent border-l-primary",
      className
    )}
  />
);

export default Loading;
