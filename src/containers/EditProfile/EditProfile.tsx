import React, { useState } from "react";

import { Alert } from "@material-ui/lab";
import FormField from "../../components/FormField";
import Service from "../../services/service";
import classes from "../../containers/Registration/Registration.module.scss";
import { useForm } from "react-hook-form";

const classNames = require("classnames");

function EditProfile() {
  const {
    register,
    handleSubmit,
    errors,
    getValues,
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
  const usernameFieldClassName = classNames(FieldClassName, {
    [classes.Field__error]: errors.username,
  });
  const avatarFieldClassName = classNames(FieldClassName, {
    [classes.Field__error]: errors.avatar,
  });
  const ErrorClassName = classNames(classes.Error);
  const ButtonClassName = classNames(classes.Button);
  const SignInWrapperClassName = classNames(classes.SignInWrapper);
  const [success, setSuccess] = useState(false);
  const onSubmit = () => console.log("submit");
  return (
    <div className={LoginClassName}>
      <h4 className={TitleClassName}>Sign In</h4>
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
          title="New password"
          name="password"
          placeholder="Password"
          type="password"
          titleClassNames={FieldTitleClassName}
          inputClassNames={passwordFieldClassName}
          register={register}
          ref={register({ maxLength: 40, minLength: 6 })}
        />
        {errors.password && (
          <div className={ErrorClassName}>
            password должен быть от 6 до 40 символов (включительно)
          </div>
        )}
        <FormField
          title="Avatar image"
          name="avatar"
          placeholder="Avatar image"
          type="text"
          titleClassNames={FieldTitleClassName}
          inputClassNames={avatarFieldClassName}
          register={register}
          ref={register({ pattern: /^http{s.}:\/\/{1}/gi })}
        />
        {errors.avatar && (
          <div className={ErrorClassName}>
            avatar image должен быть корректным url
          </div>
        )}
        <button type="submit" className={ButtonClassName}>
          Save
        </button>
        {errors.editingError && (
          <Alert color="error">{errors.editingError.message}</Alert>
        )}
        {success && (
          <Alert color="success">Изменение профиля прошло успешно</Alert>
        )}
      </form>
    </div>
  );
}

export default EditProfile;
