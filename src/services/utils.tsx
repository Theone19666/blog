import { IObject } from "../interfaces";

const APIURL = "https://conduit.productionready.io/api";

export function sendGetRequest(url: string = "") {
  return fetch(`${APIURL}/${url}`)
    .then((resp: any) => {
      if (!resp) throw new Error(resp);
      return resp.json();
    })
    .catch((err: any) => {
      throw new Error(err);
    });
}
export function sendDeleteRequest(url: string = "", headers: IObject) {
  return fetch(`${APIURL}/${url}`, { method: "DELETE", headers })
    .then((resp: any) => {
      if (!resp) throw new Error(resp);
      return resp.json();
    })
    .catch((err: any) => {
      throw new Error(err);
    });
}
export function sendPostRequest({
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
