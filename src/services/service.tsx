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
}
