import { FavoriteBorderOutlined, Mood } from "@material-ui/icons";
import React, { useEffect, useState } from "react";

import { Alert } from "@material-ui/lab";
import Button from "../Button";
import { CircularProgress } from "@material-ui/core";
import DeleteDialog from "../DeleteDialog";
import { IObject } from "../../interfaces";
import Service from "../../services/service";
import classes from "./PostPage.module.scss";
import moment from "moment";
import { useHistory } from "react-router-dom";

const ReactMarkdown = require("react-markdown");
const classNames = require("classnames");

function checkIsImage(imageName: string) {
  if (!imageName) return false;
  return (
    imageName.includes(".png") ||
    imageName.includes(".jpg") ||
    imageName.includes(".jpeg") ||
    imageName.includes(".gif")
  );
}

function PostPage(props: IObject) {
  const { match, setIsLoading, user } = props;
  const { slug } = match.params;
  let history = useHistory();
  const [post, setPost] = useState({});
  const [isError, setError] = useState(false);
  const [deletingError, setDeletingError] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const toggleDeleteDialog = (showDialog: boolean) => {
    setShowDialog(showDialog);
  };

  const deletePost = () => {
    if (!user.token) {
      history.push({
        pathname: "/sign-in",
      });
      return;
    }
    if (!slug) return;
    const headers = {
      Authorization: `Token ${user.token}`,
    };
    setIsLoading(true);
    Service.deletePost(slug, headers)
      .then((resp: any) => {
        if (resp?.errors) {
          const keyError = Object.keys(resp.errors)[0];
          const errorMessage = `${keyError} ${
            resp.errors[Object.keys(resp.errors)[0]]
          }`;
          setDeletingError(errorMessage);
          setTimeout(() => setDeletingError(""), 5000);
          return;
        }
        history.push({
          pathname: "/sign-in",
        });
      })
      .catch((error) => {
        setDeletingError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  useEffect(() => {
    if (!slug) {
      setIsLoading(false);
      setError(true);
      return;
    }
    Service.getPost(slug)
      .then((resp: IObject) => {
        if (resp.error) {
          throw new Error(resp.error);
        }
        setPost(resp.article);
      })
      .catch((error) => {
        setError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);
  return Content(
    isError,
    post,
    user,
    toggleDeleteDialog,
    showDialog,
    deletingError,
    deletePost
  );
}

const Content = (
  isError: boolean,
  post: IObject,
  user: IObject,
  toggleDeleteDialog: any,
  showDialog: boolean,
  deletingError: string,
  deletePost: any
) => {
  if (isError) {
    return <Alert color="error">При загрузке данных произошла ошибка</Alert>;
  }
  if (!post) {
    return null;
  }
  const {
    favoritesCount,
    title,
    author,
    createdAt,
    description,
    body,
    tagList,
  } = post;
  const Post = classNames(classes.Post);
  const PostTitleWrapper = classNames(classes.PostTitleWrapper);
  const Title = classNames(classes.Title);
  const PostHeaderWrapper = classNames(classes.PostHeaderWrapper);
  const Like = classNames(classes.Like);
  const UserInfo = classNames(classes.UserInfo);
  const UserInfoWrapper = classNames(classes.UserInfoWrapper);
  const Login = classNames(classes.Login);
  const Date = classNames(classes.Date);
  const LoginImg = classNames("LoginImg");
  const FavoriteCount = classNames(classes.FavoriteCount);
  const TagsContainer = classNames(classes.TagsContainer);
  const Tag = classNames(classes.Tag);
  const Description = classNames(classes.Description);
  const Body = classNames(classes.Body);
  const DescriptionWrapepr = classNames(classes.DescriptionWrapepr);
  const EditingButtonsWrapepr = classNames(classes.EditingButtonsWrapepr);
  const DeleteButton = classNames(classes.DeleteButton);
  const EditButton = classNames(classes.EditButton);

  const tagsHtml = tagList?.map((item: string, index: number) => {
    return (
      <div className={Tag} key={String(index)}>
        {item}
      </div>
    );
  });
  return (
    <div className="Container">
      <div className={Post}>
        <div className={PostHeaderWrapper}>
          <div className={PostTitleWrapper}>
            <h4 className={Title}>{title}</h4>
            <FavoriteBorderOutlined />
            <div className={FavoriteCount}>{favoritesCount}</div>
          </div>
          <div className={UserInfoWrapper}>
            <div className={UserInfo}>
              <div className={Login}>{author?.username}</div>
              <div className={Date}>
                {moment(createdAt).format("MMMM D, yyyy")}
              </div>
            </div>
            {checkIsImage(author?.image) ? (
              <img
                src={author?.image}
                alt={author?.username}
                className={LoginImg}
              />
            ) : (
              <Mood style={{ width: "46px", height: "46" }} />
            )}
          </div>
        </div>
        <div className={TagsContainer}>{tagsHtml}</div>
        <div className={DescriptionWrapepr}>
          <div className={Description}>{description}</div>
          {user && (
            <div className={EditingButtonsWrapepr}>
              <Button
                variant="outlined"
                size="small"
                text="Delete"
                classNames={DeleteButton}
                onClick={() => toggleDeleteDialog(true)}
              />
              <Button
                variant="outlined"
                size="small"
                text="Edit"
                classNames={EditButton}
              />
            </div>
          )}
        </div>

        {body && (
          <div className={Body}>
            <ReactMarkdown source={body} />
          </div>
        )}
        <DeleteDialog
          open={showDialog}
          close={() => toggleDeleteDialog(false)}
          error={deletingError}
          deletePost={deletePost}
        />
      </div>
    </div>
  );
};

export default PostPage;
