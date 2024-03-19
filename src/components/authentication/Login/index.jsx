import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUser } from "../../../redux/actionCreators/authActionCreators";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const history = useHistory();
  const { pathname } = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) return toast.dark("Please fill in all fields!");
    const data = {
      email,
      password,
    };
    dispatch(loginUser(data, setError));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (isLoggedIn) {
      history.goBack();
    }
  }, [error]);
  return (
    <Container>
      <Row>
        <Col md="12">
          <h1 className="display-1 my-5 text-center">Login</h1>
        </Col>
        <Col md="5" className="mx-auto">
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail" className="mb-3">
              <Form.Control
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword" className="mb-3">
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicBtn" className="mt-3">
              <Button
                variant="primary"
                type="submit"
                className="form-control"
                block
              >
                Login
              </Button>
            </Form.Group>
            <p className=" text-right d-flex align-items-center justify-content-end gap-2 ml-auto my-4">
              Not a Member?
              <Link to="/signup" className="ml-2 text-decoration-none">
                Register
              </Link>
            </p>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
