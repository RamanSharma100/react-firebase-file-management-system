import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { registerUser } from "../../../redux/actionCreators/authActionCreators";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !password)
      return toast.dark("Please fill in all fields!");

    if (password !== confirmPassword)
      return toast.dark("Passwords donot match!");

    if (password.length < 8) {
      return toast.dark("Password must be of length 8 or more");
    }
    if (
      !/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(password)
    ) {
      return toast.dark(
        "Password must have alteast a number and a special character!"
      );
    }

    const data = {
      name,
      email,
      password,
    };

    dispatch(registerUser(data, setError));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (isLoggedIn) {
      history.push("/dashboard");
    }
  }, [error, isLoggedIn]);
  return (
    <Container>
      <Row>
        <Col md="12">
          <h1 className="display-1 my-5 text-center">Register</h1>
        </Col>
        <Col md="5" className="mx-auto">
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicName" className="mb-3">
              <Form.Control
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
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
            <Form.Group controlId="formBasicConfirmPassword" className="mb-3">
              <Form.Control
                type="password"
                placeholder="Re-type password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicBtn" className="mt-3">
              <Button
                variant="primary"
                type="submit"
                className="form-control"
                block
              >
                Register
              </Button>
            </Form.Group>
            <p className=" text-right d-flex align-items-center justify-content-end gap-2 ml-auto my-4">
              Already a Member?
              <Link to="/login" className="ml-2 text-decoration-none">
                Login
              </Link>
            </p>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
