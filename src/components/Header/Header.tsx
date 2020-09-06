import Button from "../Button";
import { Link } from "react-router-dom";
import React from "react";
import classes from "./Header.module.scss";
import classnames from "classnames";

function Header() {
  const HeaderClass = classnames(classes.Header);
  const TitleClass = classnames(classes.Title);
  const AuthorizationButtonsClass = classnames(classes.AuthorizationButtons);
  const ButtonLoginClass = classnames(classes.Button);
  const ButtonRegistrationClass = classnames(
    classes.Button,
    classes.Button__Registration
  );
  return (
    <header className={HeaderClass}>
      <Link to="/">
        <h3 className={TitleClass}>Realworld Blog</h3>
      </Link>
      <div className={AuthorizationButtonsClass}>
        <Button text="Sign In" classNames={ButtonLoginClass} />
        <Button
          variant="outlined"
          text="Sign Up"
          classNames={ButtonRegistrationClass}
        />
      </div>
    </header>
  );
}

export default Header;
