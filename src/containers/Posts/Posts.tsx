import React, { useContext, useEffect } from "react";

import { Alert } from "@material-ui/lab";
import { CircularProgress } from "@material-ui/core";
import { IObject } from "../../interfaces";
import { Pagination } from "@material-ui/lab";
import Post from "../../components/Post";
import PropTypes from "prop-types";
import ServiceContext from "../../contexts/service-context";
import classes from "./Posts.module.scss";

const classNames = require("classnames");

function getHtml(isLoading: boolean = true, isError: boolean, postsHtml: any) {
  /* if (isLoading) {
    return <CircularProgress />;
  } */
  if (isError) {
    return <Alert color="error">При загрузке данных произошла ошибка</Alert>;
  }
  return postsHtml;
}

function getAccordingPagePosts(page: number, posts: IObject[]) {
  const pagePosts: IObject = {
    1: {
      from: 0,
      to: 19,
    },
    2: {
      from: 20,
      to: 39,
    },
    3: {
      from: 40,
      to: 59,
    },
    4: {
      from: 60,
      to: 79,
    },
    5: {
      from: 80,
      to: 99,
    },
  };
  const pageNumber = !page || page < 1 || page > 5 ? 1 : page;
  const { from, to } = pagePosts[pageNumber.toString()];
  return posts.slice(from, to);
}

function Posts(props: IObject) {
  const {
    posts = [],
    fetchPostsList,
    isLoading,
    isError,
    history,
    match,
  } = props;
  // const Service = useContext(ServiceContext);
  const PostClassName = classNames(classes.Post);
  const Posts = classNames("Container");

  useEffect(() => {
    fetchPostsList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const postsHtml = Array.isArray(posts) ? (
    getAccordingPagePosts(
      history.location.search.replace(/\D/gi, ""),
      posts
    )?.map((item: IObject, key: number) => {
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
          slug={item.slug}
        />
      );
    })
  ) : (
    <Alert color="success">Нет данных</Alert>
  );

  const onPaginationChange = (event: IObject, page: number): void => {
    // console.log(history);
    history.push({
      pathname: history.location.pathname,
      search: `?page=${page}`,
    });
  };

  return getHtml(
    isLoading,
    isError,
    <div className={Posts}>
      {postsHtml}
      {posts.length && (
        <Pagination color="primary" count={5} onChange={onPaginationChange} />
      )}
    </div>
  );
}

export default Posts;

Posts.propTypes = {
  setPostsList: PropTypes.func,
};
Posts.defaultProps = {
  setPostsList: () => [],
};
