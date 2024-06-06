import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";

const BBnavbar = () => {
  return (
    <Navbar bg="light" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand href="/homepage">BudgetBuddy</Navbar.Brand>      
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/transactionpage">Transactions</Nav.Link>
            <Nav.Link href="/goalspage">Goals</Nav.Link>
            <Nav.Link href="/login">Sign Out</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default BBnavbar;
