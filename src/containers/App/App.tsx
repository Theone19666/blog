import { AppConsumer, AppProvider } from "../../contexts/app-context";
import { Route, Switch, withRouter } from "react-router-dom";

import { CircularProgress } from "@material-ui/core";
import Header from "../../components/Header";
import { IObject } from "../../interfaces";
import { Link } from "react-router-dom";
import Login from "../../components/Login";
import PostPage from "../../components/PostPage";
import PostsContainer from "../../componentContainers/PostsContainer";
import React from "react";
import RegisterContainer from "../../componentContainers/RegisterContainer";
import Registration from "../Registration";
import Service from "../../services/service";
import ServiceContext from "../../contexts/service-context";
import classes from "./App.module.scss";

function App(props: IObject) {
  const { isLoading, setIsLoading } = props;
  return (
    <div className="App">
      <AppProvider
        value={{
          setIsLoading,
        }}
      >
        <Header />
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
          render={(props) => {
            return (
              <AppConsumer>
                {(setIsLoading) => (
                  <Registration {...props} setIsLoading={setIsLoading} />
                )}
              </AppConsumer>
            );
          }}
        />
        <Route path="/sign-in" component={Login} />
      </AppProvider>
    </div>
  );
}

export default App;
