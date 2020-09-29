import { IObject } from "../../interfaces";
import UserService from "../../services/userService";

const registerUser = (userInfo: IObject) => {
  return UserService.registerUser(userInfo);
};

export const onSubmit = (
  data: any,
  setIsLoading: Function,
  setError: Function,
  clearErrors: Function,
  setSuccess: Function,
  history: IObject
) => {
  const userInfo = { ...data };
  delete userInfo.repeatPassword;
  delete userInfo.agreement;
  setIsLoading(true);
  registerUser({ user: userInfo })
    .then((resp: any) => {
      if (resp?.errors) {
        const keyError = Object.keys(resp.errors)[0];
        setError("registrationError", {
          message: `${keyError} ${resp.errors[Object.keys(resp.errors)[0]]}`,
        });
        setTimeout(() => clearErrors(), 3000);
        throw new Error("Произошла ошибка при регистрации");
      }
    })
    .then((resp: any) => {
      setSuccess(true);
      setTimeout(() => {
        history.push({
          pathname: "/sign-in",
        });
      }, 3000);
    })
    .catch((error: any) => {
      console.log(error);
    })
    .finally(() => {
      setIsLoading(false);
    });
};
