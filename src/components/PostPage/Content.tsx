import { FavoriteBorderOutlined, Mood } from "@material-ui/icons";

import { Alert } from "@material-ui/lab";
import Button from "../Button";
import DeleteDialog from "../DeleteDialog";
import { IContent } from "./interfaces";
import { Link } from "react-router-dom";
import React from "react";
import { checkIsImage } from "./utils";
import classes from "./PostPage.module.scss";
import moment from "moment";

const ReactMarkdown = require("react-markdown");
const classNames = require("classnames");
export const Content = (props: IContent) => {
  const {
    slug,
    isError,
    post,
    user,
    toggleDeleteDialog,
    showDialog,
    deletingError,
    deletePost,
    favoritePost,
    favoriteError,
    isLoading,
  } = props;
  if (isLoading || !post) {
    return null;
  }
  if (isError) {
    return <Alert color="error">При загрузке данных произошла ошибка</Alert>;
  }
  const {
    favoritesCount,
    title,
    author,
    createdAt,
    description,
    body,
    tagList,
    favorited,
  } = post;
  const Post = classNames(classes.Post);
  const PostTitleWrapper = classNames(classes.PostTitleWrapper);
  const Title = classNames(classes.Title);
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
  const EditingButtonsWrapepr = classNames(classes.EditingButtonsWrapepr);
  const DeleteButton = classNames(classes.DeleteButton);
  const EditButton = classNames(classes.EditButton);
  const PostInfoWrapper = classNames(classes.PostInfoWrapper);
  const UserButtonsInfoWrapper = classNames(classes.UserButtonsInfoWrapper);

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
        <div className={PostInfoWrapper}>
          <div className={PostTitleWrapper}>
            <h4 className={Title}>{title}</h4>
            <FavoriteBorderOutlined
              color={favorited ? "error" : "inherit"}
              onClick={() => favoritePost(slug, favorited)}
            />
            <div className={FavoriteCount}>{favoritesCount}</div>
          </div>
          {favoriteError && <Alert color="error">{favoriteError}</Alert>}
          <div className={TagsContainer}>{tagsHtml}</div>
          <div className={Description}>{description}</div>
          {body && (
            <div className={Body}>
              <ReactMarkdown source={body} />
            </div>
          )}
          {deletingError && <Alert color="error">{deletingError}</Alert>}
        </div>
        <div className={UserButtonsInfoWrapper}>
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
          {user?.token && (
            <div className={EditingButtonsWrapepr}>
              <Button
                variant="outlined"
                size="small"
                text="Delete"
                classNames={DeleteButton}
                onClick={() => toggleDeleteDialog(true)}
              />
              <Link to={`/articles/${slug}/edit`}>
                <Button
                  variant="outlined"
                  size="small"
                  text="Edit"
                  classNames={EditButton}
                />
              </Link>
            </div>
          )}
        </div>
      </div>
      <DeleteDialog
        open={showDialog}
        close={() => toggleDeleteDialog(false)}
        deletePost={deletePost}
      />
    </div>
  );
};
