import React, { useEffect } from "react";
import "./App.css";
import WebcamCapture from "./WebcamCapture";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Preview from "./Preview.js";
import Chats from "./Chats.js";
import Login from "./Login";
import ChatView from "./ChatView";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./features/appSlice";
import { auth } from "./firebase";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            username: authUser.displayName,
            profilePic: authUser.photoURL,
            id: authUser.uid,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  });
  return (
    <div className="app">
      <Router>
        {!user ? (
          <Login />
        ) : (
          <>
            <img
              className="applogo"
              src="https://upload.wikimedia.org/wikipedia/en/thumb/c/c4/Snapchat_logo.svg/800px-Snapchat_logo.svg.png"
              alt="SHIT"
            />
            <div className="app_body">
              <div className="app_bodyBackground">
                <Switch>
                  <Route exact path="/chats/view">
                    <ChatView />
                  </Route>
                  <Route exact path="/chats">
                    <Chats />
                  </Route>
                  <Route exact path="/preview">
                    <Preview />
                  </Route>
                  <Route exact path="/">
                    <WebcamCapture />
                  </Route>
                </Switch>
              </div>
              {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
            </div>
          </>
        )}
      </Router>
    </div>
  );
}

export default App;
