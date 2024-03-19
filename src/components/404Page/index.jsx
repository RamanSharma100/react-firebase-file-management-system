import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const Page404 = () => {
  return (
    <Container>
      <Row>
        <Col md="12" className="text-center">
          <h1 className="mx-auto text-center mt-5 display-1">
            404 Page Not Found
          </h1>
          <Button as={Link} to="/" variant="primary" className="my-5">
            Go Home
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Page404;
