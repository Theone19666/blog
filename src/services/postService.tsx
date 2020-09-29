import { sendDeleteRequest, sendGetRequest, sendPostRequest } from "./utils";

import { IObject } from "../interfaces";

export default class PostService {
  static getAllPosts = () => {
    return sendGetRequest("articles?limit=100");
  };
  static getPost = (slug: string) => {
    return sendGetRequest(`articles/${slug}`);
  };
  static addNewPost = (body = {}, headers = {}) => {
    return sendPostRequest({
      url: "articles",
      body,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        ...headers,
      },
    });
  };
  static updatePost = (body = {}, headers = {}, slug: string) => {
    if (!slug) return;
    return sendPostRequest({
      url: `articles/${slug}`,
      method: "PUT",
      body,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        ...headers,
      },
    });
  };
  static deletePost = (slug: string, token: string) => {
    return sendDeleteRequest(`articles/${slug}`, {
      Authorization: `Token ${token}`,
    });
  };
  static favoritePost = (slug: string, token: string) => {
    if (!slug) return;
    return sendPostRequest({
      url: `articles/${slug}/favorite`,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: `Token ${token}`,
      },
    });
  };
  static unfavoritePost = (slug: string, token: string) => {
    return sendDeleteRequest(`articles/${slug}/favorite`, {
      Authorization: `Token ${token}`,
    });
  };
}
