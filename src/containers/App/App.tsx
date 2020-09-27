import { IState, IUser } from "../../interfaces";
import React, { useEffect } from "react";
import { logOutUser, loginUser } from "../../store/actions/userActions";

import { CircularProgress } from "@material-ui/core";
import CreateEditPostContainer from "../../componentContainers/CreateEditPostContainer";
import EditProfileContainer from "../../componentContainers/EditProfileContainer";
import Header from "../../components/Header";
import { IApp } from "./interfaces";
import LoginContainer from "../../componentContainers/LoginContainer";
import PostPageContainer from "../../componentContainers/PostPageContainer";
import PostsContainer from "../../componentContainers/PostsContainer";
import RegisterContainer from "../../componentContainers/RegisterContainer";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import { setIsLoading } from "../../store/actions/postsActions";

function App(props: IApp) {
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

const mapStateToProps = (state: IState) => {
  return {
    isLoading: state.posts.isLoading,
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch: Function) => ({
  setIsLoading: (isLoading: boolean) => dispatch(setIsLoading(isLoading)),
  loginUser: (user: IUser) => dispatch(loginUser(user)),
  logoutUser: () => dispatch(logOutUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
