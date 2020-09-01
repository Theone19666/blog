import React from "react";
import ButtonMaterial from "@material-ui/core/Button";
import { IObject } from "../../interfaces";

function Button(props: IObject) {
  const { variant, size = "large", classNames, text = "" } = props;
  return (
    <ButtonMaterial variant={variant} className={classNames} size={size}>
      {text}
    </ButtonMaterial>
  );
}

export default Button;
