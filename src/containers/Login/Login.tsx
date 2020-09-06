import FormField from "../../components/FormField";
import { IObject } from "../../interfaces";
import React from "react";
import classes from "./Login.module.scss";
import { useForm } from "react-hook-form";

const classNames = require("classnames");

function Login(props: IObject) {
  const { success } = props;
  const LoginClassName = classNames("Profile-Contaier");
  return <div className={LoginClassName}>login</div>;
}

export default Login;
