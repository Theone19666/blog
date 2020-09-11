import Button from "../Button";
import { IObject } from "../../interfaces";
import React from "react";
import classes from "../FormField/FormField.module.scss";
import tagsClasses from "./Tags.module.scss";

const classNames = require("classnames");

function Tags(props: IObject) {
  const { titleClassNames, tagsList, tagContainerClass } = props;
  const TagsContainerWrapperClass = classNames(tagContainerClass);
  const FieldTitleClassName = classNames(classes.FieldTitle, titleClassNames);
  const tagWrapperClassName = classNames(tagsClasses.TagWrapper);
  const tagInputClassName = classNames(classes.Field, tagsClasses.TagInput);

  const tagsHtml = tagsList?.map((item: string, index: number) => {
    return (
      <div className={tagWrapperClassName}>
        <input className={tagInputClassName} defaultValue={item} />
        <Button size="small" variant="outlined" text="Delete" />
        {index === tagsList.length - 1 && (
          <Button size="small" variant="outlined" text="Add tag" />
        )}
      </div>
    );
  });
  return (
    <div className={TagsContainerWrapperClass}>
      <div className={FieldTitleClassName}>Tags</div>
      {tagsHtml}
    </div>
  );
}

export default Tags;
