import React, { useState } from "react";

import { Alert } from "@material-ui/lab";
import FormField from "../../components/FormField";
import { IObject } from "../../interfaces";
import { Link } from "react-router-dom";
import Service from "../../services/service";
import classes from "../../containers/Registration/Registration.module.scss";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";

const classNames = require("classnames");

function Login(props: IObject) {
  let history = useHistory();
  const {
    register,
    handleSubmit,
    errors,
    setError,
    clearErrors,
  } = useForm();
  const LoginClassName = classNames("Profile-Contaier");
  const TitleClassName = classNames("FormTitle");
  const FieldTitleClassName = classNames(classes.FieldTitle);
  const FieldClassName = classNames(classes.Field);
  const emailFieldClassName = classNames(FieldClassName, {
    [classes.Field__error]: errors.email,
  });
  const passwordFieldClassName = classNames(FieldClassName, {
    [classes.Field__error]: errors.password,
  });
  const ErrorClassName = classNames(classes.Error);
  const ButtonClassName = classNames(classes.Button);
  const SignInWrapperClassName = classNames(classes.SignInWrapper);
  const [success, setSuccess] = useState(false);
  const loginUser = (userInfo: IObject) => {
    return Service.loginUser(userInfo);
  };
  const onSubmit = (data: any) => {
    const userInfo = { ...data };
    const { setIsLoading, setUser } = props;

    setIsLoading(true);
    loginUser({ user: userInfo })
      .then((resp: IObject) => {
        // const { user } = resp;
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
        /*setError("registrationError", {
          message: error,
        }); */
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <div className={LoginClassName}>
      <h4 className={TitleClassName}>Sign In</h4>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormField
          title="Email address"
          name="email"
          placeholder="Email address"
          type="email"
          titleClassNames={FieldTitleClassName}
          inputClassNames={emailFieldClassName}
          register={register}
          ref={register({ required: true, pattern: /@{1}/gi })}
        />
        {errors.email && (
          <div className={ErrorClassName}>
            email должен быть корректным почтовым адресом
          </div>
        )}
        <FormField
          title="Password"
          name="password"
          placeholder="Password"
          type="password"
          titleClassNames={FieldTitleClassName}
          inputClassNames={passwordFieldClassName}
          register={register}
          ref={register({ required: true, maxLength: 40, minLength: 6 })}
        />
        {errors.password && (
          <div className={ErrorClassName}>
            password должен быть от 6 до 40 символов (включительно)
          </div>
        )}
        <button type="submit" className={ButtonClassName}>
          Login
        </button>
        <div className={SignInWrapperClassName}>
          Don’t have an account?{" "}
          <Link to="/sign-up" className="link">
            Sign Up.
          </Link>
        </div>
        {errors.registrationError && (
          <Alert color="error">{errors.registrationError.message}</Alert>
        )}
        {success && <Alert color="success">Авторизация успешно пройдена</Alert>}
      </form>
    </div>
  );
}

Login.propTypes = {
  setIsLoading: PropTypes.func, setUser: PropTypes.func,
};

Login.defaultProps = {
  setUser: () => {},
  setIsLoading: () => {}
};

export default Login;
