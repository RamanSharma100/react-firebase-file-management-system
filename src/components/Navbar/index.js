import React from "react";
import { Button, Nav, Navbar } from "react-bootstrap";
import { shallowEqual, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";

const NavbarComponent = () => {
  const history = useHistory();

  const { isLoggedIn } = useSelector(
    (state) => ({
      isLoggedIn: state.auth.isLoggedIn,
    }),
    shallowEqual
  );
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
          "Logged in"
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
