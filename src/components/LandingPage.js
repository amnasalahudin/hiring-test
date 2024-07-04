import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <Container className="text-center">
      <h1 className="my-5">Welcome to Employee Directory</h1>
      <Row>
        <Col>
          <Link to="/task1">
            <Button variant="primary" className="m-2">Task 1: Employee Data</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default LandingPage;
