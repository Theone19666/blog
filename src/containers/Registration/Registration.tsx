import React, { useState } from "react";

import { Alert } from "@material-ui/lab";
import { AppConsumer } from "../../contexts/app-context";
import Button from "../../components/Button";
import Checkbox from "../../components/Checkbox";
import FormField from "../../components/FormField";
import { IObject } from "../../interfaces";
import Service from "../../services/service";
import classes from "./Registration.module.scss";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

const classNames = require("classnames");

function Registration(props: IObject) {
  const { register, handleSubmit, errors, getValues, setError } = useForm();
  const [error, setRegistrationError] = useState(false);
  const { setIsLoading } = props?.setIsLoading;
  const RegitstrationClassName = classNames("Profile-Contaier");
  const TitleClassName = classNames(classes.Title);
  const FieldTitleClassName = classNames(classes.FieldTitle);
  const FieldClassName = classNames(classes.Field);
  const usernameFieldClassName = classNames(FieldClassName, {
    [classes.Field__error]: errors.username,
  });
  const emailFieldClassName = classNames(FieldClassName, {
    [classes.Field__error]: errors.email,
  });
  const passwordFieldClassName = classNames(FieldClassName, {
    [classes.Field__error]: errors.password,
  });
  const repeatPasswordFieldClassName = classNames(FieldClassName, {
    [classes.Field__error]: errors.repeatPassword,
  });
  const DelimiterClassName = classNames(classes.Delimiter);
  const CheckboxBlockClassName = classNames(classes.CheckboxBlock);
  const ButtonClassName = classNames(classes.Button);
  const SignInWrapperClassName = classNames(classes.SignInWrapper);
  const ErrorClassName = classNames(classes.Error);
  const AgreementWrapperClassName = classNames(classes.AgreementWrapper);
  let history = useHistory();

  const onRepeatPasswordInput = () => {
    if (getValues().password !== getValues().repeatPassword) {
      setError("repeatPassword", {});
    }
  };

  const registerUser = (userInfo: IObject) => {
    return Service.registerUser(userInfo);
  };

  const loginUser = (userInfo: IObject) => {
    return Service.loginUser(userInfo);
  };

  const onSubmit = (data: any) => {
    const userInfo = { ...data };
    delete userInfo.repeatPassword;
    delete userInfo.agreement;
    setIsLoading(true);
    registerUser({ body: { user: userInfo } })
      .then((resp: IObject) => {
        const { user } = resp;
        const body = {
          user: {
            email: user.email,
            password: user.password,
          },
        };
        return loginUser({
          body,
        });
      })
      .then((resp: any) => {
        localStorage.setItem("user", resp.user);
      })
      .then((resp: any) => {
        history.push({
          pathname: "/",
        });
      })
      .catch((error: any) => {
        setIsLoading(false);
        setRegistrationError(true);
        //throw new Error("Произошла ошибка при регистрации");
      });
  };
  return (
    <div className={RegitstrationClassName}>
      <h4 className={TitleClassName}>Create new account</h4>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormField
          title="Username"
          name="username"
          placeholder="Username"
          titleClassNames={FieldTitleClassName}
          inputClassNames={usernameFieldClassName}
          register={register}
          rules={{ required: true, maxLength: 20, minLength: 3 }}
          ref={register({ required: true, maxLength: 20, minLength: 3 })}
        />
        {errors.username && (
          <div className={ErrorClassName}>
            username должен быть от 3 до 20 символов (включительно)
          </div>
        )}
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
        <FormField
          title="Repeat Password"
          name="repeatPassword"
          placeholder="Password"
          type="password"
          titleClassNames={FieldTitleClassName}
          inputClassNames={repeatPasswordFieldClassName}
          register={register}
          ref={register({ required: true })}
          onInput={onRepeatPasswordInput}
        />
        {getValues().password !== getValues().repeatPassword && (
          <div className={ErrorClassName}>
            password и repeat password должны совпадать
          </div>
        )}
        <div className={DelimiterClassName}></div>

        <Checkbox
          name="agreement"
          text="I agree to the processing of my personal information"
          required={true}
          classNamesList={CheckboxBlockClassName}
          ref={register({ required: true })}
          register={register}
          rules={{ required: true }}
        />
        {errors.agreement && (
          <div className={ErrorClassName}>
            галочка согласия с обработкой персональных данных должна быть
            отмечена
          </div>
        )}
        <button type="submit" className={ButtonClassName}>
          Create
        </button>
        <div className={SignInWrapperClassName}>
          Already have an account? Sign In.
        </div>
        {error && (
          <Alert color="error">
            Произошла ошибка при региастрации. Пожалуйста, повторите попытку.
          </Alert>
        )}
      </form>
    </div>
  );
}

export default Registration;