import ButtonMaterial from "@material-ui/core/Button";
import { IObject } from "../../interfaces";
import React from "react";

function Button(props: IObject) {
  const {
    variant,
    size = "large",
    classNames,
    text = "",
    color,
    rootClassName = "",
    onClick = () => {},
  } = props;
  return (
    <ButtonMaterial
      variant={variant}
      className={classNames}
      size={size}
      color={color}
      classes={{ root: rootClassName }}
      onClick={onClick}
    >
      {text}
    </ButtonMaterial>
  );
}

export default Button;
