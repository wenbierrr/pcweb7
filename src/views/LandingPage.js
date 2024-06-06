import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import backgroundImage from '../images/landingpagebg.jpg';

export default function LandingPage() {
  return (
    <div 
      style={{ 
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        color: 'white', 
        textAlign: 'center', 
      }}
    >
      <Container className="my-5">
        <Row className="justify-content-md-center">
          <Col md="auto">
            <h1>Welcome to BudgetBuddy</h1>
            <p className="lead">
              Take control of your finances with BudgetBuddy.
            </p>
            <p>
              <Link to="/login">
                <Button variant="primary" className="m-2">Login</Button>
              </Link>
              <Link to="/signup">
                <Button variant="secondary" className="m-2">Sign Up</Button>
              </Link>
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}


