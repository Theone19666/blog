import { IObject } from "../../interfaces";
import React from "react";
import classes from "./FormField.module.scss";
import PropTypes from "prop-types";

const classNames = require("classnames");

const FormField = React.forwardRef((props: IObject, ref: any) => {
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

FormField.propTypes = {
  title: PropTypes.string,
  inputType: PropTypes.string,
  name: PropTypes.string,
  placeholder:PropTypes.string,
  titleClassNames:PropTypes.string,
  inputClassNames:PropTypes.string,
  defaultValue:PropTypes.string,
  type:PropTypes.string,
  onInput: PropTypes.func,
};

FormField.defaultProps = {
  title: "",
  inputType: "text",
  name: '',
  placeholder: '',
  titleClassNames: '',
  inputClassNames: '',
  defaultValue: '',
  type: 'text',
  onInput: () => {}
};


export default FormField;
