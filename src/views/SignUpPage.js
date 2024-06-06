import React, { useState } from "react";
import { Button, Container, Form, Alert } from "react-bootstrap";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

export default function SignUpPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  return (
    <Container>
      <h1 className="my-3">Sign up for an account</h1>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Form.Text>
            <a href="/login">Have an existing account? Login here.</a>
          </Form.Text>
        </Form.Group>

        {error && (
          <Alert variant="danger" className="mb-3">
            {error}
          </Alert>
        )}

        <Button
          variant="primary"
          onClick={async (e) => {
            e.preventDefault(); // Prevent default form submission
            setError(""); // Clear any previous error
            const canSignup = username && password;
            if (canSignup) {
              try {
                await createUserWithEmailAndPassword(auth, username, password);
                navigate("/homepage");
              } catch (error) {
                setError(error.message);
              }
            } else {
              setError("Please enter both email and password.");
            }
          }}
        >
          Sign Up
        </Button>
      </Form>
    </Container>
  );
}
