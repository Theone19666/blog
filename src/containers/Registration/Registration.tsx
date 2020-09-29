import { IObject, IUser } from "../../interfaces";
import React, { useState } from "react";
import {
  logOutUser,
  loginUser,
  setUser,
} from "../../store/actions/userActions";

import { Alert } from "@material-ui/lab";
import Checkbox from "../../components/Checkbox";
import FormField from "../../components/FormField";
import { IRegistration } from "./interfaces";
import { Link } from "react-router-dom";
import classes from "./Registration.module.scss";
import { connect } from "react-redux";
import { onSubmit } from "./services";
import { setIsLoading } from "../../store/actions/postsActions";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

const classNames = require("classnames");

function Registration(props: IRegistration) {
  const {
    register,
    handleSubmit,
    errors,
    getValues,
    setError,
    clearErrors,
  } = useForm();
  const [success, setSuccess] = useState(false);
  const { setIsLoading } = props;
  const RegitstrationClassName = classNames("Profile-Contaier");
  const TitleClassName = classNames("FormTitle");
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
  let history = useHistory();

  const onRepeatPasswordInput = () => {
    if (getValues().password !== getValues().repeatPassword) {
      setError("repeatPassword", {});
    }
  };

  return (
    <div className={RegitstrationClassName}>
      <h4 className={TitleClassName}>Create new account</h4>
      <form
        onSubmit={handleSubmit((data) =>
          onSubmit(
            data,
            setIsLoading,
            setError,
            clearErrors,
            setSuccess,
            history
          )
        )}
      >
        <FormField
          title="Username"
          name="username"
          placeholder="Username"
          titleClassNames={FieldTitleClassName}
          inputClassNames={usernameFieldClassName}
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
          inputType="email"
          titleClassNames={FieldTitleClassName}
          inputClassNames={emailFieldClassName}
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
          inputType="password"
          titleClassNames={FieldTitleClassName}
          inputClassNames={passwordFieldClassName}
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
          inputType="password"
          titleClassNames={FieldTitleClassName}
          inputClassNames={repeatPasswordFieldClassName}
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
          classNamesList={CheckboxBlockClassName}
          ref={register({ required: true })}
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
          Already have an account?{" "}
          <Link to="/sign-in" className="link">
            Sign In.
          </Link>
        </div>
        {errors.registrationError && (
          <Alert color="error">{errors.registrationError.message}</Alert>
        )}
        {success && (
          <Alert color="success">
            Регистрация успешно пройдена. Вы будете переброшены на страницу
            авторизации
          </Alert>
        )}
      </form>
    </div>
  );
}

const mapStateToProps = (state: IObject) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch: Function) => ({
  loginUser: (user: IUser) => dispatch(loginUser(user)),
  setUser: (user: IUser) => dispatch(setUser(user)),
  logOutUser: () => dispatch(logOutUser()),
  setIsLoading: (isLoading: boolean) => dispatch(setIsLoading(isLoading)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Registration);
