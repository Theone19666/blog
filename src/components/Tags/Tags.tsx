import Button from "../Button";
import { IObject } from "../../interfaces";
import { ITags } from "./interfaces";
import React from "react";
import classes from "../FormField/FormField.module.scss";
import tagsClasses from "./Tags.module.scss";

const classNames = require("classnames");

function Tags(props: ITags) {
  const {
    titleClassNames,
    tagsList,
    tagContainerClass,
    addTag,
    deleteTag,
    onTagNameChange,
  } = props;
  const TagsContainerWrapperClass = classNames(tagContainerClass);
  const FieldTitleClassName = classNames(classes.FieldTitle, titleClassNames);
  const tagWrapperClassName = classNames(tagsClasses.TagWrapper);
  const tagInputClassName = classNames(classes.Field, tagsClasses.TagInput);
  const DeleteButtonClassName = classNames(tagsClasses.DeleteButton);
  const AddButtonClassName = classNames(tagsClasses.AddButton);

  const onDeleteTag = (index: number) => {
    return () => deleteTag(index);
  };

  const onTagNameInputWrapper = (event: IObject, index: number) => {
    onTagNameChange(index, event.target.value);
  };

  const tagsHtml = tagsList?.map((item: string, index: number) => {
    return (
      <div className={tagWrapperClassName} key={String(index)}>
        <input
          className={tagInputClassName}
          value={item}
          onChange={(event) => onTagNameInputWrapper(event, index)}
        />
        {tagsList.length > 0 && tagsList[0] && (
          <Button
            size="small"
            variant="outlined"
            text="Delete"
            classNames={DeleteButtonClassName}
            onClick={onDeleteTag(index)}
          />
        )}

        {index === tagsList.length - 1 && (
          <Button
            size="small"
            variant="outlined"
            text="Add tag"
            classNames={AddButtonClassName}
            onClick={addTag}
          />
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
