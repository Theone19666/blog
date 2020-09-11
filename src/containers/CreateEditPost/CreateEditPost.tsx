import FormField from "../../components/FormField";
import { IObject } from "../../interfaces";
import React from "react";
import Tags from "../../components/Tags";
import classes from "../../containers/Registration/Registration.module.scss";
import classesCreateEdit from "./CreateEditPost.module.scss";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

const classNames = require("classnames");

function CreateEditPost(props: IObject) {
  const {
    register,
    handleSubmit,
    errors,
    getValues,
    setError,
    clearErrors,
  } = useForm();
  const CreateEditPostClassName = classNames(
    classesCreateEdit.CreateEditPost,
    "Profile-Contaier"
  );
  const TitleClassName = classNames("FormTitle");
  const FieldTitleClassName = classNames(
    classes.FieldTitle,
    classesCreateEdit.FieldTitle
  );
  const FieldClassName = classNames(classes.Field);
  const titleFieldClassName = classNames(FieldClassName, {
    [classes.Field__error]: errors.title,
  });
  const shortDescriptionFieldClassName = classNames(FieldClassName, {
    [classes.Field__error]: errors.shortDescription,
  });
  const textFieldClassName = classNames(FieldClassName, {
    [classes.Field__error]: errors.text,
  });
  const tagContainerClass = classNames(classesCreateEdit.tagContainerClass);

  const ErrorClassName = classNames(classes.Error);
  const onSubmit = () => console.log("hi");
  return (
    <div className={CreateEditPostClassName}>
      <h4 className={TitleClassName}>Create new article</h4>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormField
          title="Title"
          name="title"
          placeholder="Title"
          inputType="text"
          titleClassNames={FieldTitleClassName}
          inputClassNames={titleFieldClassName}
          register={register}
          ref={register({ required: true })}
        />
        {errors.title && (
          <div className={ErrorClassName}>title не должен быть пустым</div>
        )}
        <FormField
          title="Short description"
          name="shortDescription"
          placeholder="Short description"
          inputType="text"
          titleClassNames={FieldTitleClassName}
          inputClassNames={shortDescriptionFieldClassName}
          register={register}
          ref={register({ required: true })}
        />
        {errors.shortDescription && (
          <div className={ErrorClassName}>
            short description не должен быть пустым
          </div>
        )}
        <FormField
          title="Text"
          name="text"
          placeholder="Text"
          type="textarea"
          titleClassNames={FieldTitleClassName}
          inputClassNames={textFieldClassName}
          register={register}
          ref={register({ required: true })}
        />
        {errors.text && (
          <div className={ErrorClassName}>
            short description не должен быть пустым
          </div>
        )}
        <Tags tagsList={["hi"]} tagContainerClass={tagContainerClass} />
      </form>
    </div>
  );
}

export default CreateEditPost;
