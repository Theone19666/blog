import {
  Checkbox as CheckboxElement,
  FormControlLabel,
} from "@material-ui/core";

import { Controller } from "react-hook-form";
import { IObject } from "../../interfaces";
import React from "react";
import classes from "./Checkbox.module.scss";

const classNames = require("classnames");

const Checkbox = React.forwardRef((props: IObject, ref) => {
  const {
    name,
    onChange,
    text = "",
    classNamesList,
    control,
    required = true,
    register,
    rules = {},
  } = props;
  const TextClassName = classNames(classes.Text);
  return (
    <FormControlLabel
      inputRef={ref}
      classes={{ label: TextClassName, root: classNamesList }}
      label={text}
      control={<CheckboxElement color="primary" name={name} />}
    />
  );
});

export default Checkbox;
