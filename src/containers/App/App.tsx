import { Route, Switch, withRouter } from "react-router-dom";

import Header from "../../components/Header";
import PostPage from "../../components/PostPage";
import PostsContainer from "../../componentContainers/PostsContainer";
import React from "react";
import Service from "../../services/service";
import ServiceContext from "../../contexts/service-context";
import classes from "./App.module.scss";

function App() {
  return (
    <div className="App">
      <Header />
      <Route exact path="/" component={PostsContainer} />
      <Route exact path="/?page=:page?" component={PostsContainer} />
      <Route exact path="/articles" component={PostsContainer} />
      <Route exact path="/articles?page=:page?" component={PostsContainer} />
      <Route path="/articles/:slug" component={PostPage} />
    </div>
  );
}

export default App;
