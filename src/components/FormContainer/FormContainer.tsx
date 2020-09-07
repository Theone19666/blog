import React, { useState } from "react";

import { IObject } from "../../interfaces";
import classes from "./FormContainer.module.scss";

const classNames = require("classnames");

function FormContainer(props: IObject) {
  const { onSubmit, fieldsHtml, messagesHtml } = props;
  const RegitstrationClassName = classNames(classes.FormContaier);
  const TitleClassName = classNames(classes.Title);
  // const FieldTitleClassName = classNames(classes.FieldTitle);
  const ButtonClassName = classNames(classes.Button);
  return (
    <div className={RegitstrationClassName}>
      <h4 className={TitleClassName}>Create new account</h4>
      <form onSubmit={onSubmit}>
        {fieldsHtml}
        <button type="submit" className={ButtonClassName}>
          Create
        </button>
        {messagesHtml}
      </form>
    </div>
  );
}

export default FormContainer;
