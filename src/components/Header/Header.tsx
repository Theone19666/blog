import React from "react";
import classnames from "classnames";

import classes from "./Header.module.scss";
import Button from "../Button";

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
      <h3 className={TitleClass}>Realworld Blog</h3>
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
