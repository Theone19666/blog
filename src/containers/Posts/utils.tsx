import { Alert } from "@material-ui/lab";
import { IPageCosts } from "./interfaces";
import { IPost } from "../../interfaces";
import React from "react";

export function getHtml(
  isLoading: boolean = true,
  isError: boolean,
  postsHtml: any
) {
  if (isError) {
    return <Alert color="error">При загрузке данных произошла ошибка</Alert>;
  }
  return postsHtml;
}

export function getAccordingPagePosts(page: string | number, posts: IPost[]) {
  const pagePosts: IPageCosts = {
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
