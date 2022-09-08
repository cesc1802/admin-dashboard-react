import classNames from "classnames";
import React, { HTMLProps } from "react";

type InputProps = HTMLProps<HTMLInputElement>;

const Input = ({ className, ...restProps }: InputProps) => (
  <input
    {...restProps}
    className={classNames("input input-bordered autofill:bg-transparent", className)}
  />
);

export default Input;
