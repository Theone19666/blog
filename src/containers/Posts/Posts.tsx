import React, { useContext, useEffect } from "react";

import { IObject } from "../../interfaces";
import Post from "../../components/Post";
import PropTypes from "prop-types";
import ServiceContext from "../../contexts/service-context";
import classes from "./Posts.module.scss";

const classNames = require("classnames");

function Posts(props: IObject) {
  const { posts, setPostsList } = props;
  const Service = useContext(ServiceContext);
  const PostClassName = classNames(classes.Post);
  const Posts = classNames(classes.Posts);

  useEffect(() => {
    Service.getAllPosts().then((resp: IObject) => {
      setPostsList(resp.articles);
    });
  }, []);

  const postsHtml = posts.map((item: IObject, key: number) => {
    return (
      <Post
        classNamesList={PostClassName}
        key={String(key)}
        author={item.author}
        body={item.body}
        createdAt={item.createdAt}
        tagList={item.tagList}
        favoritesCount={item.favoritesCount}
        favorited={item.favorited}
        description={item.description}
        title={item.title}
        updatedAt={item.updatedAt}
      />
    );
  });

  return <div className={Posts}>{postsHtml}</div>;
}

export default Posts;

Posts.propTypes = {
  setPostsList: PropTypes.func,
};
Posts.defaultProps = {
  setPostsList: () => {},
};
