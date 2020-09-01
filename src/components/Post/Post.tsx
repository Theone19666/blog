import { FavoriteBorderOutlined, Mood } from "@material-ui/icons";

import { IObject } from "../../interfaces";
import React from "react";
import classes from "./Post.module.scss";
import moment from "moment";

const classNames = require("classnames");

function checkIsImage(imageName: string) {
  return (
    imageName.includes(".png") ||
    imageName.includes(".jpg") ||
    imageName.includes(".jpeg") ||
    imageName.includes(".gif")
  );
}

function Post(props: IObject) {
  const {
    author,
    body,
    createdAt,
    tagList,
    favoritesCount,
    favorited,
    description,
    title,
    updatedAt,
    classNamesList,
  } = props;

  const Ticket = classNames(classes.Ticket, classNamesList);
  const TicketTitleWrapper = classNames(classes.TicketTitleWrapper);
  const Title = classNames(classes.Title);
  const TicketHeaderWrapper = classNames(classes.TicketHeaderWrapper);
  const Like = classNames(classes.Like);
  const UserInfo = classNames(classes.UserInfo);
  const UserInfoWrapper = classNames(classes.UserInfoWrapper);
  const Login = classNames(classes.Login);
  const Date = classNames(classes.Date);
  const LoginImg = classNames(classes.LoginImg);
  const FavoriteCount = classNames(classes.FavoriteCount);
  const TagsContainer = classNames(classes.TagsContainer);
  const Tag = classNames(classes.Tag);

  const tagsHtml = tagList.map((item: string, index: number) => {
    return (
      <div className={Tag} key={String(index)}>
        {item}
      </div>
    );
  });

  return (
    <div className={Ticket}>
      <div className={TicketHeaderWrapper}>
        <div className={TicketTitleWrapper}>
          <h4 className={Title}>{title}</h4>
          <FavoriteBorderOutlined />
          <div className={FavoriteCount}>{favoritesCount}</div>
        </div>
        <div className={UserInfoWrapper}>
          <div className={UserInfo}>
            <div className={Login}>{author.username}</div>
            <div className={Date}>
              {moment(createdAt).format("MMMM D, yyyy")}
            </div>
          </div>
          {checkIsImage(author?.image) ? (
            <img
              src={author.image}
              alt={author.username}
              className={LoginImg}
            />
          ) : (
            <Mood style={{ width: "46px", height: "46" }} />
          )}
        </div>
      </div>
      <div className={TagsContainer}>{tagsHtml}</div>
    </div>
  );
}

export default Post;
