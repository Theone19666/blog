import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

import { Alert } from "@material-ui/lab";
import FormField from "../../components/FormField";
import { ICreatedEditPost } from "./interfaces";
import { IState } from "../../interfaces";
import PostService from "../../services/postService";
import Tags from "../../components/Tags";
import classes from "../../containers/Registration/Registration.module.scss";
import classesCreateEdit from "./CreateEditPost.module.scss";
import { connect } from "react-redux";
import { setIsLoading } from "../../store/actions/postsActions";
import { useForm } from "react-hook-form";

const classNames = require("classnames");

function CreateEditPost(props: ICreatedEditPost) {
  const { setIsLoading, user, isLoading } = props;
  let history = useHistory();
  const { slug } = useParams() as any;
  const [post, setPost] = useState("");
  const [pageType, setPageType] = useState("create");
  const [tags, setTags] = useState([""]);
  const [success, setSuccess] = useState(false);

  const { register, handleSubmit, errors, setError, clearErrors } = useForm();
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
  const tagContainerClass = classNames(classesCreateEdit.TagsContainer);
  const ButtonClassName = classNames(
    classes.Button,
    classesCreateEdit.SubmitButton
  );
  const ErrorClassName = classNames(classes.Error);
  useEffect(() => {
    if (!slug) return;
    setPageType("edit");
    setIsLoading(true);
    PostService.getPost(slug)
      .then((resp: any) => {
        if (resp.errors || resp.error) {
          const error = resp.errors || resp.error;
          const keyError = Array.isArray(error)
            ? Object.keys(error)[0]
            : "ошибка";
          const text = Array.isArray(error)
            ? resp.errors[Object.keys(resp.errors)[0]]
            : error;
          setError("requestError", {
            message: `${keyError} ${text}`,
          });
          setTimeout(
            () =>
              history.push({
                pathname: "/articles",
              }),
            5000
          );
          return;
        }
        setPost(resp.article);
        setTags(resp.article?.tagList?.length ? resp.article.tagList : [""]);
      })
      .catch((error) => {
        console.log(error);
        setError("requestError", {
          message: error,
        });
        setTimeout(() => {
          history.push({
            pathname: "/articles",
          });
        }, 5000);
      })
      .finally(() => setIsLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const addTag = () => {
    const newTagsList: any = [...tags, ""];
    setTags(newTagsList);
  };
  const deleteTag = (index: number) => {
    const tagsAfterDelete = [...tags.slice(0, index), ...tags.slice(index + 1)];
    if (tagsAfterDelete.length) {
      setTags([...tags.slice(0, index), ...tags.slice(index + 1)]);
    } else {
      setTags([""]);
    }
  };
  const onTagNameChange = (index: number, value: string) => {
    setTags([...tags.slice(0, index), value, ...tags.slice(index + 1)]);
  };
  const onSubmit = (data: any) => {
    if (!user?.token) {
      history.push({
        pathname: "/articles",
      });
      return;
    }
    setIsLoading(true);
    const body = {
      article: {
        ...data,
        tagList: tags,
      },
    };
    const headers = {
      Authorization: `Token ${user.token}`,
    };
    const requestMethod =
      pageType === "create"
        ? PostService.addNewPost(body, headers)
        : PostService.updatePost(body, headers, slug);
    requestMethod
      ?.then((resp: any) => {
        if (resp.errors) {
          const keyError = Object.keys(resp.errors)[0];
          setError("requestError", {
            message: `${keyError} ${resp.errors[Object.keys(resp.errors)[0]]}`,
          });
          setTimeout(() => clearErrors(), 3000);
          throw new Error(
            "Произошла ошибка при редактировании/добавлении поста"
          );
        }
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          history.push({
            pathname: `/articles/${resp.article?.slug}`,
          });
        }, 3000);
      })
      .catch((error: any) => {
        console.log(error);
        setError("requestError", {
          message: "Произошла ошибка при редактировании/добавлении поста",
        });
        setTimeout(() => clearErrors(), 3000);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const { title, description, body }: any = post || {};
  if (isLoading) {
    return null;
  }
  return (
    <div className={CreateEditPostClassName}>
      <h4 className={TitleClassName}>
        {pageType === "create" ? "Create new article" : "Edit article"}
      </h4>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormField
          title="Title"
          name="title"
          placeholder="Title"
          inputType="text"
          titleClassNames={FieldTitleClassName}
          inputClassNames={titleFieldClassName}
          ref={register({ required: true })}
          defaultValue={title}
        />
        {errors.title && (
          <div className={ErrorClassName}>title не должен быть пустым</div>
        )}
        <FormField
          title="Short description"
          name="description"
          placeholder="Short description"
          inputType="text"
          titleClassNames={FieldTitleClassName}
          inputClassNames={shortDescriptionFieldClassName}
          ref={register({ required: true })}
          defaultValue={description}
        />
        {errors.description && (
          <div className={ErrorClassName}>
            short description не должен быть пустым
          </div>
        )}
        <FormField
          title="Text"
          name="body"
          placeholder="Text"
          type="textarea"
          titleClassNames={FieldTitleClassName}
          inputClassNames={textFieldClassName}
          ref={register({ required: true })}
          defaultValue={body}
        />
        {errors.body && (
          <div className={ErrorClassName}>text не должен быть пустым</div>
        )}
        <Tags
          tagsList={tags}
          tagContainerClass={tagContainerClass}
          addTag={addTag}
          deleteTag={deleteTag}
          onTagNameChange={onTagNameChange}
        />
        {errors.requestError && (
          <Alert color="error">{errors.requestError.message}</Alert>
        )}
        <button type="submit" className={ButtonClassName}>
          Send
        </button>
        {success && (
          <Alert color="success">
            {" "}
            {pageType === "create"
              ? "Добавление нового поста прошло успешно"
              : "Изменение поста прошло успешно"}
          </Alert>
        )}
      </form>
    </div>
  );
}

const mapStateToProps = (state: IState) => {
  return {
    user: state.user,
    isLoading: state.posts.isLoading,
  };
};

const mapDispatchToProps = (dispatch: Function) => ({
  setIsLoading: (isLoading: boolean) => dispatch(setIsLoading(isLoading)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateEditPost);
