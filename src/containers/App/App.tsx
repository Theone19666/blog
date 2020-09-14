import { AppConsumer, AppProvider } from "../../contexts/app-context";
import React, { useEffect } from "react";
import { Route, Switch, withRouter } from "react-router-dom";

import { CircularProgress } from "@material-ui/core";
import CreateEditPostContainer from "../../componentContainers/CreateEditPostContainer";
import { Edit } from "@material-ui/icons";
import EditProfile from "../EditProfile";
import EditProfileContainer from "../../componentContainers/EditProfileContainer";
import Header from "../../components/Header";
import { IObject } from "../../interfaces";
import { Link } from "react-router-dom";
import Login from "../Login";
import LoginContainer from "../../componentContainers/LoginContainer";
import PostPage from "../../components/PostPage";
import PostPageContainer from "../../componentContainers/PostPageContainer";
import PostsContainer from "../../componentContainers/PostsContainer";
import RegisterContainer from "../../componentContainers/RegisterContainer";
import Registration from "../Registration";
import Service from "../../services/service";
import ServiceContext from "../../contexts/service-context";
import classes from "./App.module.scss";

function App(props: IObject) {
  const { isLoading, setIsLoading, loginUser, logoutUser, user } = props;
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      loginUser(JSON.parse(savedUser));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="App">
      <AppProvider
        value={{
          setIsLoading,
        }}
      >
        <Header user={user} logoutUser={logoutUser} />
        {isLoading && (
          <div className="CircularProgress__Wrapper">
            <CircularProgress />{" "}
          </div>
        )}
        <Route exact path="/" component={PostsContainer} />
        <Route exact path="/?page=:page?" component={PostsContainer} />
        <Route exact path="/articles" component={PostsContainer} />
        <Route exact path="/articles?page=:page?" component={PostsContainer} />
        <Route exact path="/articles/:slug" component={PostPageContainer} />
        <Route
          path="/sign-up"
          component={RegisterContainer}
          /*render={(props) => {
            return (
              <AppConsumer>
                {(setIsLoading) => <RegisterContainer {...props} />}
              </AppConsumer>
            );
          }} */
        />
        <Route
          path="/sign-in"
          /* render={(props) => {
            return (
              <AppConsumer>
                {(setIsLoading) => (
                  <Login {...props} setIsLoading={setIsLoading} />
                )}
              </AppConsumer>
            );
          }} */
          component={LoginContainer}
        />
        <Route exact path="/profile" component={EditProfileContainer} />
        <Route
          exact
          path="/articles/:slug/edit"
          component={CreateEditPostContainer}
        />
        <Route
          exact
          path="/new-article"
          component={CreateEditPostContainer}
        />
      </AppProvider>
    </div>
  );
}

export default App;
