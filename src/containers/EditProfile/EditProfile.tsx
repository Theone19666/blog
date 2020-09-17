import React, { useState } from "react";

import { Alert } from "@material-ui/lab";
import FormField from "../../components/FormField";
import { IObject } from "../../interfaces";
import Service from "../../services/service";
import classes from "../../containers/Registration/Registration.module.scss";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";

const classNames = require("classnames");

function EditProfile(props: IObject) {
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
  const SignInWrapperClassName = classNames(classes.SignInWrapper);
  const [success, setSuccess] = useState(false);
  let history = useHistory();

  const updateUser = (body: IObject, headers: IObject) => {
    return Service.updateUser(body, headers);
  };
  const onSubmit = (data: any) => {
    setIsLoading(true);
    const userInfo = { user: { ...data } };
    const headers = {
      Authorization: `Token ${user.token}`,
    };
    updateUser(userInfo, headers)
      .then((resp: any) => {
        //console.log("resp", resp);
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
      .then((resp: IObject) => {
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
  if (isLoading) {
    return null;
  }
  return (
    <div className={LoginClassName}>
      <h4 className={TitleClassName}>Edit Profile</h4>
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
          register={register}
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
          register={register}
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
EditProfile.propTypes = {
  setIsLoading: PropTypes.func,
  setUser: PropTypes.func,
  user: PropTypes.object,
  isLoading: PropTypes.bool,
  rootClassName: PropTypes.string
};

EditProfile.defaultProps = {
  rootClassName: "",
  setIsLoading: () => {},
  setUser: () => {},
  user: {},
  isLoading: false
};

export default EditProfile;
