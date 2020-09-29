import { IObject } from "../../interfaces";
import UserService from "../../services/userService";

const loginUser = (userInfo: IObject) => {
  return UserService.loginUser(userInfo);
};

export const onSubmit = (
  data: any,
  setIsLoading: Function,
  setError: Function,
  clearErrors: Function,
  setSuccess: Function,
  setUser: Function,
  history: IObject
) => {
  const userInfo = { ...data };
  setIsLoading(true);
  loginUser({ user: userInfo })
    .then((resp: any) => {
      if (resp.errors) {
        const keyError = Object.keys(resp.errors)[0];
        setError("registrationError", {
          message: `${keyError} ${resp.errors[Object.keys(resp.errors)[0]]}`,
        });
        setTimeout(() => clearErrors(), 3000);
        throw new Error("Произошла ошибка при авторизации");
      }
      setSuccess(true);
      localStorage.setItem("user", JSON.stringify(resp.user));
      setUser(resp.user);
    })
    .then((resp: any) => {
      setTimeout(
        () =>
          history.push({
            pathname: "/",
          }),
        3000
      );
    })
    .catch((error: any) => {
      console.log(error);
    })
    .finally(() => {
      setIsLoading(false);
    });
};
