import Header from "../../components/Header";
import PostsContainer from "../../componentContainers/PostsContainer";
import React from "react";
import { Route } from "react-router-dom";
import Service from "../../services/service";
import ServiceContext from "../../contexts/service-context";
import classes from "./App.module.scss";

function App() {
  return (
    <div className="App">
      <ServiceContext.Provider value={Service}>
        <Header />
        <Route exact path="/" component={PostsContainer} />
        <Route path="/articles" component={PostsContainer} />
      </ServiceContext.Provider>
    </div>
  );
}

export default App;
