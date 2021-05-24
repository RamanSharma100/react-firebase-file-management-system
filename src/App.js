import React from "react";
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Register from "./components/authentication/Register";

import "./App.css";

const App = () => {
  return (
    <div className="App">
      <ToastContainer position="bottom-right" />
      <Switch>
        <Route exact path={"/"}>
          <h1>Welcome to file management system</h1>
        </Route>
        <Route path="/signup" component={() => <Register />}></Route>
      </Switch>
    </div>
  );
};

export default App;
