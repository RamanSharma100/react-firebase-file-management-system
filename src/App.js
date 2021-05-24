import React from "react";
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Register from "./components/authentication/Register";
import Login from "./components/authentication/Login";
import NavbarComponent from "./components/Navbar";

import "./App.css";

const App = () => {
  return (
    <div className="App">
      <ToastContainer position="bottom-right" />

      <Switch>
        <Route exact path="/login" component={() => <Login />}></Route>
        <Route exact path="/signup" component={() => <Register />}></Route>
        <Route path={""}>
          <NavbarComponent />
          <Route
            exact
            path="/"
            component={() => <h1>Welcome to file management system</h1>}
          />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
