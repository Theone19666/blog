import { sendGetRequest, sendPostRequest } from "./utils";

export default class UserService {
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
  static updateUser = (body = {}, token: string) => {
    return sendPostRequest({
      url: "user",
      method: "PUT",
      body,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: `Token ${token}`,
      },
    });
  };
}
