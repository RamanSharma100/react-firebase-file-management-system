import React from "react";
import { Button, Nav, Navbar } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { logoutUser } from "../../redux/actionCreators/authActionCreators";

const NavbarComponent = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { isLoggedIn, user } = useSelector(
    (state) => ({
      isLoggedIn: state.auth.isLoggedIn,
      user: state.auth.user,
    }),
    shallowEqual
  );

  const logout = () => {
    dispatch(logoutUser());
  };

  return (
    <Navbar bg="dark" expand="lg" variant="dark">
      <Navbar.Brand
        as={Link}
        to="/"
        style={{ marginLeft: "60px", marginRight: "auto" }}
      >
        File Management System
      </Navbar.Brand>
      <Nav style={{ marginRight: "60px" }}>
        {isLoggedIn ? (
          <>
            <Nav.Link
              className="text-white d-flex align-items-center justify-content-between"
              style={{ pointerEvents: "unset", cursor: "text" }}
            >
              Welcome,
            </Nav.Link>
            <Nav.Link
              as={Link}
              style={{ marginRight: "10px", marginLeft: "-10px" }}
              className="text-white"
              to="/dashboard/profile"
            >
              <strong>{user.data.displayName}</strong>
            </Nav.Link>
            <Nav.Link
              as={Button}
              variant="success"
              active
              style={{ marginRight: "5px" }}
              size="sm"
              onClick={() => history.push("/dashboard")}
            >
              Dashboard
            </Nav.Link>
            <Nav.Link
              as={Button}
              variant="primary"
              active
              style={{ marginRight: "5px" }}
              size="sm"
              onClick={() => logout()}
            >
              Logout
            </Nav.Link>
          </>
        ) : (
          <>
            <Nav.Link
              as={Button}
              variant="primary"
              onClick={() => history.push("/login")}
              active
              style={{ marginRight: "5px" }}
              size="sm"
            >
              Login
            </Nav.Link>
            <Nav.Link
              as={Button}
              variant="success"
              onClick={() => history.push("/signup")}
              active
              size="sm"
            >
              Register
            </Nav.Link>
          </>
        )}
      </Nav>
    </Navbar>
  );
};

export default NavbarComponent;
