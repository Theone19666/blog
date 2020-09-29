import { IObject, IState } from "../../interfaces";
import React, { useEffect, useState } from "react";
import { fetchPostsList, updatePost } from "../../store/actions/postsActions";
import { getAccordingPagePosts, getHtml } from "./utils";

import { Alert } from "@material-ui/lab";
import { IPosts } from "./interfaces";
import { Pagination } from "@material-ui/lab";
import Post from "../../components/Post";
import classes from "./Posts.module.scss";
import { connect } from "react-redux";
import { favoritePost } from "./services";
import { useHistory } from "react-router-dom";

const classNames = require("classnames");

function Posts(props: IPosts) {
  const {
    posts = [],
    fetchPostsList,
    isLoading,
    isError,
    user,
    updatePost,
  } = props;
  const ininitalError: IObject = {};
  const [error, setError] = useState(ininitalError);
  const PostClassName = classNames(classes.Post);
  const PostsClassName = classNames("Container");
  const history = useHistory();

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
          error={error && error?.slug === item.slug ? error.message : null}
          onFavoriteIconClick={() =>
            favoritePost(
              item.slug,
              item.favorited,
              key,
              user.token,
              history,
              setError,
              updatePost
            )
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
    <div className={PostsClassName}>
      {postsHtml}
      {posts.length && (
        <Pagination color="primary" count={5} onChange={onPaginationChange} />
      )}
    </div>
  );
}

const mapStateToProps = (state: IState) => {
  return {
    posts: state.posts.posts,
    isLoading: state.posts.isLoading,
    isError: state.posts.isError,
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch: Function) => ({
  fetchPostsList: () => dispatch(fetchPostsList()),
  updatePost: (updatedPostInfo: {}, index: number) =>
    dispatch(updatePost(updatedPostInfo, index)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
