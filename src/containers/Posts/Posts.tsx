import React, { useEffect, useState } from "react";

import { Alert } from "@material-ui/lab";
import { IObject } from "../../interfaces";
import { Pagination } from "@material-ui/lab";
import Post from "../../components/Post";
import PropTypes from "prop-types";
import Service from "../../services/service";
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
    user,
    updatePost,
  } = props;
  const ininitalError: IObject = {};
  const [error, setError] = useState(ininitalError);
  const PostClassName = classNames(classes.Post);
  const Posts = classNames("Container");

  useEffect(() => {
    fetchPostsList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const favoritePost = (slug: string, favorited: boolean, index: number) => {
    if (!user?.token) {
      history.push({
        pathname: "/sign-in",
      });
      return;
    }
    const headers = {
      Authorization: `Token ${user.token}`,
    };
    let action: any;
    if (favorited) {
      action = Service.unfavoritePost(slug, headers);
    } else {
      action = Service.favoritePost(slug, headers);
    }
    action.then((resp: any) => {
      if (resp?.errors) {
        const keyError = Object.keys(resp.errors)[0];
        const errorMessage = `${keyError} ${
          resp.errors[Object.keys(resp.errors)[0]]
        }`;
        setError({ message: errorMessage, slug });
        setTimeout(() => setError({}), 5000);
        return;
      }
      updatePost(resp.article, index);
    });
  };

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
          error={error && error?.slug === item.slug ? error.message : null}
          onFavoriteIconClick={() =>
            favoritePost(item.slug, item.favorited, key)
          }
        />
      );
    })
  ) : (
    <Alert color="success">Нет данных</Alert>
  );

  const onPaginationChange = (event: IObject, page: number): void => {
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
