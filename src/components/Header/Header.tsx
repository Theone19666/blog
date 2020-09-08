import Button from "../Button";
import { IObject } from "../../interfaces";
import { Link } from "react-router-dom";
import { Mood } from "@material-ui/icons";
import React from "react";
import { checkIsImage } from "../../utils";
import classes from "./Header.module.scss";
import classnames from "classnames";

const HeaderClass = classnames(classes.Header);
const TitleClass = classnames(classes.Title);
const AuthorizationButtonsClass = classnames(classes.AuthorizationButtons);
const ButtonLoginClass = classnames(classes.Button);
const ButtonNewArticle = classnames(
  classes.Button__Green,
  classes.Button__NewArticle
);
const ButtonRegistrationClass = classnames(
  classes.Button,
  classes.Button__Registration
);
const ButtonLogOut = classnames(classes.Button__Black);
const LoginClass = classnames(classes.Login);
const LoginImg = classnames("LoginImg", classes.LoginImg);

function getHtml(userInfo: IObject, logOut: Function) {
  if (userInfo?.email) {
    return (
      <React.Fragment>
        <Link to="/new-article">
          <Button
            text="Create new article"
            classNames={ButtonNewArticle}
            size="small"
            variant="outlined"
          />
        </Link>
        <Link to="/profile">
          <div className={LoginClass}>{userInfo.username}</div>
        </Link>
        <Link to="/profile">
          {checkIsImage(userInfo?.image) ? (
            <img
              src={userInfo.image}
              alt={userInfo.username}
              className={LoginImg}
            />
          ) : (
            <Mood
              style={{
                width: "46px",
                height: "46",
                marginRight: "27px",
                color: "black",
              }}
            />
          )}
        </Link>
        <Button
          text="Log out"
          classNames={ButtonLogOut}
          variant="outlined"
          onClick={logOut}
        />
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      <Link to="/sign-in">
        <Button text="Sign In" classNames={ButtonLoginClass} />
      </Link>
      <Link to="/sign-up">
        <Button
          variant="outlined"
          text="Sign Up"
          classNames={ButtonRegistrationClass}
        />
      </Link>
    </React.Fragment>
  );
}

function Header(props: IObject) {
  const { user, logoutUser } = props;
  console.log("user", user);
  const logOut = () => {
    if (user?.email) {
      //  localStorage.removeItem("user");
      logoutUser();
    }
  };
  return (
    <header className={HeaderClass}>
      <Link to="/">
        <h3 className={TitleClass}>Realworld Blog</h3>
      </Link>
      <div className={AuthorizationButtonsClass}>{getHtml(user, logOut)}</div>
    </header>
  );
}

export default Header;
