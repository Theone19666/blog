import ButtonMaterial from "@material-ui/core/Button";
import { IObject } from "../../interfaces";
import React from "react";
import PropTypes from "prop-types";

function Button(props: IObject) {
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

Button.propTypes = {
  variant: PropTypes.string,
  size: PropTypes.string,
  classNames: PropTypes.string,
  text:PropTypes.string,
  color:PropTypes.string,
  rootClassName:PropTypes.string,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  variant: "",
  size: "large",
  classNames: '',
  text: '',
  color: '',
  rootClassName: '',
  onClick: () => {}
};

export default Button;
