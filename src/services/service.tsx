import { IObject } from "../interfaces";

const APIURL = "https://conduit.productionready.io/api";
function sendGetRequest(url: string = "") {
  return fetch(`${APIURL}/${url}`)
    .then((resp: any) => {
      if (!resp) throw new Error(resp);
      return resp.json();
    })
    .catch((err: any) => {
      throw new Error(err);
    });
}
function sendDeleteRequest(url: string = "", headers: IObject) {
  return fetch(`${APIURL}/${url}`, { method: "DELETE", headers })
    .then((resp: any) => {
      if (!resp) throw new Error(resp);
      return resp.json();
    })
    .catch((err: any) => {
      throw new Error(err);
    });
}
function sendPostRequest({
  url = "",
  body = {},
  method = "POST",
  headers = {},
}) {
  return fetch(`${APIURL}/${url}`, {
    body: JSON.stringify(body),
    headers,
    method,
  })
    .then((resp: any) => {
      if (!resp) throw new Error(resp);
      return resp.json();
    })
    .catch((err: any) => {
      throw new Error(err);
    });
}

export default class Service {
  static getAllPosts = () => {
    return sendGetRequest("articles?limit=100");
  };
  static getPost = (slug: string) => {
    return sendGetRequest(`articles/${slug}`);
  };
  static getCurrentUser = () => {
    return sendGetRequest("/api/user");
  };
  static registerUser = (body = {}) => {
    return sendPostRequest({
      url: "users",
      body,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    });
  };
  static loginUser = (body = {}) => {
    return sendPostRequest({
      url: "users/login",
      body,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    });
  };
  static updateUser = (body = {}, headers = {}) => {
    return sendPostRequest({
      url: "user",
      method: "PUT",
      body,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        ...headers,
      },
    });
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
  static deletePost = (slug: string, headers: IObject) => {
    return sendDeleteRequest(`articles/${slug}`, headers);
  };
  static favoritePost = (slug: string, headers = {}) => {
    if (!slug) return;
    return sendPostRequest({
      url: `articles/${slug}/favorite`,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        ...headers,
      },
    });
  };
  static unfavoritePost = (slug: string, headers: IObject) => {
    return sendDeleteRequest(`articles/${slug}/favorite`, headers);
  };
}
