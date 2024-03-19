import React from "react";
import { Button, Nav, Navbar } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { logoutUser } from "../../../redux/actionCreators/authActionCreators";

const NavDashboard = () => {
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
    <Navbar
      bg="white"
      expand="lg"
      variant="light"
      className="border-bottom py-3 shadow-sm"
    >
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
              className="d-flex align-items-center justify-content-between"
              style={{ pointerEvents: "unset", cursor: "text" }}
            >
              Welcome,
            </Nav.Link>
            <Nav.Link
              as={Link}
              style={{ marginRight: "10px", marginLeft: "-10px" }}
              className="text-dark"
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
              onClick={() => history.push("/")}
              className="text-white"
            >
              Home
            </Nav.Link>
            <Nav.Link
              as={Button}
              variant="primary"
              active
              style={{ marginRight: "5px" }}
              size="sm"
              onClick={() => logout()}
              className="text-white"
            >
              Logout
            </Nav.Link>
          </>
        ) : (
          <>
            <Nav.Link active style={{ marginRight: "5px" }} size="sm">
              Loading...
            </Nav.Link>
          </>
        )}
      </Nav>
    </Navbar>
  );
};

export default NavDashboard;
