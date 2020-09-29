import { IObject } from "../../interfaces";
import UserService from "../../services/userService";

const updateUser = (body: IObject, token: string) => {
  return UserService.updateUser(body, token);
};

export const onSubmit = (
  data: any,
  token: string,
  setIsLoading: Function,
  setError: Function,
  clearErrors: Function,
  setUser: Function,
  setSuccess: Function
) => {
  setIsLoading(true);
  const userInfo = { user: { ...data } };
  updateUser(userInfo, token)
    .then((resp: any) => {
      const { user } = resp;
      if (resp.errors) {
        const keyError = Object.keys(resp.errors)[0];
        setError("updatingError", {
          message: `${keyError} ${resp.errors[Object.keys(resp.errors)[0]]}`,
        });
        setTimeout(() => clearErrors(), 3000);
        throw new Error("Произошла ошибка при изменении данных пользователя");
      }
      return user;
    })
    .then((resp: any) => {
      setUser(resp);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    })
    .catch((error: any) => {
      console.log(error);
      setError("updatingError", {
        message: "Произошла ошибка при изменении данных пользователя",
      });
      setTimeout(() => clearErrors(), 3000);
    })
    .finally(() => {
      setIsLoading(false);
    });
};
