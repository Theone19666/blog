import { IFormField } from "./interfaces";
import React from "react";
import classes from "./FormField.module.scss";

const classNames = require("classnames");

const FormField = React.forwardRef((props: IFormField, ref: any) => {
  const {
    title,
    inputType,
    name,
    placeholder,
    titleClassNames,
    inputClassNames,
    onInput,
    defaultValue,
    type,
  } = props;
  const FieldTitleClassName = classNames(classes.FieldTitle, titleClassNames);
  const FieldClassName = classNames(classes.Field, inputClassNames);
  const TextareaClassName = classNames(
    classes.Field,
    classes.TextArea,
    inputClassNames
  );
  return (
    <React.Fragment>
      <div className={FieldTitleClassName}>{title}</div>
      {type === "textarea" ? (
        <textarea
          ref={ref}
          name={name}
          className={TextareaClassName}
          placeholder={placeholder}
          onInput={onInput}
          defaultValue={defaultValue}
        ></textarea>
      ) : (
        <input
          ref={ref}
          type={inputType}
          name={name}
          className={FieldClassName}
          placeholder={placeholder}
          onInput={onInput}
          defaultValue={defaultValue}
        />
      )}
    </React.Fragment>
  );
});

export default FormField;
