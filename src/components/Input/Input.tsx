import { IObject } from "../../interfaces";
import React from "react";

function Input(props: IObject) {
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
