import React, { useEffect } from "react";

import { CircularProgress } from "@material-ui/core";
import CreateEditPostContainer from "../../componentContainers/CreateEditPostContainer";
import EditProfileContainer from "../../componentContainers/EditProfileContainer";
import Header from "../../components/Header";
import { IObject } from "../../interfaces";
import LoginContainer from "../../componentContainers/LoginContainer";
import PostPageContainer from "../../componentContainers/PostPageContainer";
import PostsContainer from "../../componentContainers/PostsContainer";
import RegisterContainer from "../../componentContainers/RegisterContainer";
import { Route } from "react-router-dom";

function App(props: IObject) {
  const { isLoading, loginUser, logoutUser, user } = props;
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      loginUser(JSON.parse(savedUser));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="App">
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
      <Route path="/sign-up" component={RegisterContainer} />
      <Route path="/sign-in" component={LoginContainer} />
      <Route exact path="/profile" component={EditProfileContainer} />
      <Route
        exact
        path="/articles/:slug/edit"
        component={CreateEditPostContainer}
      />
      <Route exact path="/new-article" component={CreateEditPostContainer} />
    </div>
  );
}

export default App;
