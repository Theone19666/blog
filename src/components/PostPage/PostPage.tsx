import { FavoriteBorderOutlined, Mood } from "@material-ui/icons";
import React, { useEffect, useState } from "react";

import { Alert } from "@material-ui/lab";
import { CircularProgress } from "@material-ui/core";
import { IObject } from "../../interfaces";
import Service from "../../services/service";
import classes from "./PostPage.module.scss";
import moment from "moment";

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
  const { match } = props;
  const [post, setPost] = useState({});
  const [isError, setError] = useState(false);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    const { slug } = match.params;
    if (!slug) {
      setLoading(false);
      setError(true);
      return;
    }
    Service.getPost(slug)
      .then((resp: IObject) => {
        if (resp.error) {
          throw new Error(resp.error);
        }
        setPost(resp.article);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError(true);
      });
  }, []);
  return Content(isLoading, isError, post);
}

const Content = (isLoading: boolean, isError: boolean, post: IObject) => {
  if (isLoading) {
    return <CircularProgress />;
  }
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
  const LoginImg = classNames(classes.LoginImg);
  const FavoriteCount = classNames(classes.FavoriteCount);
  const TagsContainer = classNames(classes.TagsContainer);
  const Tag = classNames(classes.Tag);
  const Description = classNames(classes.Description);
  const Body = classNames(classes.Body);

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
        <div className={Description}>{description}</div>
        <div className={Body}>{body}</div>
      </div>
    </div>
  );
};

export default PostPage;
