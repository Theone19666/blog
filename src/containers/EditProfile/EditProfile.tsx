import { IState, IUser } from "../../interfaces";
import React, { useState } from "react";
import { loginUser, setUser } from "../../store/actions/userActions";

import { Alert } from "@material-ui/lab";
import FormField from "../../components/FormField";
import { IEditProfile } from "./interfaces";
import classes from "../../containers/Registration/Registration.module.scss";
import { connect } from "react-redux";
import { onSubmit } from "./services";
import { setIsLoading } from "../../store/actions/postsActions";
import { useForm } from "react-hook-form";

const classNames = require("classnames");

function EditProfile(props: IEditProfile) {
  const { setIsLoading, setUser, user, isLoading } = props;
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
  const usernameFieldClassName = classNames(FieldClassName, {
    [classes.Field__error]: errors.username,
  });
  const avatarFieldClassName = classNames(FieldClassName, {
    [classes.Field__error]: errors.image,
  });
  const ErrorClassName = classNames(classes.Error);
  const ButtonClassName = classNames(classes.Button);
  const [success, setSuccess] = useState(false);

  if (isLoading) {
    return null;
  }
  return (
    <div className={LoginClassName}>
      <h4 className={TitleClassName}>Edit Profile</h4>
      <form
        onSubmit={handleSubmit((data) =>
          onSubmit(
            data,
            user.token,
            setIsLoading,
            setError,
            clearErrors,
            setUser,
            setSuccess
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
          defaultValue={user.username}
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
          ref={register({ required: true, pattern: /@{1}/gi })}
          defaultValue={user.email}
        />
        {errors.email && (
          <div className={ErrorClassName}>
            email должен быть корректным почтовым адресом
          </div>
        )}
        <FormField
          title="New password"
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
        <FormField
          title="Avatar image"
          name="image"
          placeholder="Avatar image"
          type="text"
          titleClassNames={FieldTitleClassName}
          inputClassNames={avatarFieldClassName}
          ref={register({ pattern: /^(ftp|http|https):\/\/[^ "]+$/gi })}
          defaultValue={user.image}
        />
        {errors.image && (
          <div className={ErrorClassName}>
            avatar image должен быть корректным url
          </div>
        )}
        <button type="submit" className={ButtonClassName}>
          Save
        </button>
        {errors.updatingError && (
          <Alert color="error">{errors.updatingError.message}</Alert>
        )}
        {success && (
          <Alert color="success">Изменение профиля прошло успешно</Alert>
        )}
      </form>
    </div>
  );
}

const mapStateToProps = (state: IState) => {
  return {
    user: state.user,
    isLoading: state.posts.isLoading,
  };
};

const mapDispatchToProps = (dispatch: Function) => ({
  loginUser: (user: IUser) => dispatch(loginUser(user)),
  setUser: (user: IUser) => dispatch(setUser(user)),
  setIsLoading: (isLoading: boolean) => dispatch(setIsLoading(isLoading)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
