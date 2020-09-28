import ButtonMaterial from "@material-ui/core/Button";
import { IButton } from "./interfaces";
import React from "react";

function Button(props: IButton) {
  const {
    variant,
    size,
    classNames,
    text,
    color,
    rootClassName,
    onClick,
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
