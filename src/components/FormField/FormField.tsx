import { IObject } from "../../interfaces";
import Input from "../Input";
import React from "react";
import classes from "./FormField.module.scss";

const classNames = require("classnames");

const FormField = React.forwardRef((props: IObject, ref: any) => {
  // function FormField(props: IObject) {
  const {
    title = "",
    inputType = "text",
    name = "",
    placeholder = "",
    titleClassNames = "",
    inputClassNames = "",
    onInput = () => {},
  } = props;
  const FieldTitleClassName = classNames(classes.FieldTitle, titleClassNames);
  const FieldClassName = classNames(classes.Field, inputClassNames);
  return (
    <React.Fragment>
      <div className={FieldTitleClassName}>{title}</div>
      <input
        ref={ref}
        type={inputType}
        name={name}
        className={FieldClassName}
        placeholder={placeholder}
        onInput={onInput}
      />
    </React.Fragment>
  );
  // }
});

export default FormField;
