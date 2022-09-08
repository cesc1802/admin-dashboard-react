import classNames from "classnames";
import React, { HTMLProps } from "react";

interface LabelProps extends HTMLProps<HTMLLabelElement> {
  labelTextClassName?: string;
}

const Label = ({ children, className, labelTextClassName, ...restProps }: LabelProps) => (
  <label {...restProps} className={classNames("label", className)}>
    <span className={classNames("label-text", labelTextClassName)}>{children}</span>
  </label>
);

export default Label;
