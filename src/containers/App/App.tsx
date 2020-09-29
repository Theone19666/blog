import { IState, IUser } from "../../interfaces";
import React, { useEffect } from "react";
import { logOutUser, loginUser } from "../../store/actions/userActions";

import { CircularProgress } from "@material-ui/core";
import CreateEditPost from "../CreateEditPost";
import EditProfile from "../../containers/EditProfile";
import Header from "../../components/Header";
import { IApp } from "./interfaces";
import Login from "../../containers/Login";
import PostPage from "../PostPage";
import Posts from "../../containers/Posts";
import Registration from "../../containers/Registration";
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
      <Route exact path="/" component={Posts} />
      <Route exact path="/?page=:page?" component={Posts} />
      <Route exact path="/articles" component={Posts} />
      <Route exact path="/articles?page=:page?" component={Posts} />
      <Route exact path="/articles/:slug" component={PostPage} />
      <Route path="/sign-up" component={Registration} />
      <Route path="/sign-in" component={Login} />
      <Route path="/profile" component={EditProfile} />
      <Route exact path="/articles/:slug/edit" component={CreateEditPost} />
      <Route path="/new-article" component={CreateEditPost} />
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
