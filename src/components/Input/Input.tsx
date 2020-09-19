import { IObject } from "../../interfaces";
import React from "react";
import PropTypes from "prop-types";

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

Input.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  classNames: PropTypes.string,
};

Input.defaultProps = {
  type: "text",
  classNames: '',
  placeholder: '',
};

export default Input;
