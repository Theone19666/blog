import { AppConsumer, AppProvider } from "../../contexts/app-context";
import React, { useEffect } from "react";
import { Route, Switch, withRouter } from "react-router-dom";

import { CircularProgress } from "@material-ui/core";
import { Edit } from "@material-ui/icons";
import EditProfile from "../EditProfile";
import Header from "../../components/Header";
import { IObject } from "../../interfaces";
import { Link } from "react-router-dom";
import Login from "../Login";
import LoginContainer from "../../componentContainers/LoginContainer";
import PostPage from "../../components/PostPage";
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
        <Route path="/articles/:slug" component={PostPage} />
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
        <Route exact path="/profile" component={EditProfile} />
      </AppProvider>
    </div>
  );
}

export default App;
