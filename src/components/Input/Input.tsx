import { IInput } from "./interfaces";
import React from "react";

function Input(props: IInput) {
  const { type = "text", name, classNames, placeholder } = props;
  return (
    <input
      type={type}
      name={name}
      className={classNames}
      placeholder={placeholder}
    />
  );
}

export default Input;
