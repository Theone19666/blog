import { IObject, IState, IUser } from "../../interfaces";
import React, { useState } from "react";
import {
  logOutUser,
  loginUser,
  setUser,
} from "../../store/actions/userActions";

import { Alert } from "@material-ui/lab";
import FormField from "../../components/FormField";
import { ILogin } from "./interfaces";
import { Link } from "react-router-dom";
import classes from "../../containers/Registration/Registration.module.scss";
import { connect } from "react-redux";
import { onSubmit } from "./services";
import { setIsLoading } from "../../store/actions/postsActions";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

const classNames = require("classnames");

function Login(props: ILogin) {
  const { setIsLoading, setUser } = props;
  let history = useHistory();
  const { register, handleSubmit, errors, setError, clearErrors } = useForm();
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

  return (
    <div className={LoginClassName}>
      <h4 className={TitleClassName}>Sign In</h4>
      <form
        onSubmit={handleSubmit((data) =>
          onSubmit(
            data,
            setIsLoading,
            setError,
            clearErrors,
            setSuccess,
            setUser,
            history
          )
        )}
      >
        <FormField
          title="Email address"
          name="email"
          placeholder="Email address"
          type="email"
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
          type="password"
          titleClassNames={FieldTitleClassName}
          inputClassNames={passwordFieldClassName}
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

const mapStateToProps = (state: IState) => {
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
