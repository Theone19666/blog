import {
  Checkbox as CheckboxElement,
  FormControlLabel,
} from "@material-ui/core";

import { ICheckbox } from "./interfaces";
import React from "react";
import classes from "./Checkbox.module.scss";

const classNames = require("classnames");

const Checkbox = React.forwardRef((props: ICheckbox, ref) => {
  const { name, text = "", classNamesList } = props;
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
