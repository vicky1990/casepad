import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { useNavigate } from "react-router-dom";

import LoginHeader from "./LoginHeader";

import useAuth from "./components/useAuth";

import bcrypt from "bcryptjs";
import axios from "axios";

// SALT should be created ONE TIME upon sign up
const salt = bcrypt.genSaltSync(10);

function Login() {
  const navigate = useNavigate();
  const { login, authed } = useAuth();
  const [formData, setFormData] = useState({});

  const [error, setError] = useState(false);

  function handleLoginForm(event) {
    const { email, password } = formData;

    /*var res = await login(email, password);

    if (res === null) {
      console.log("Bad login");
    } else {
      if (res.data.result === "success") {
        navigate("/home");
      }
    }*/

    login(email, password)
      .then((res) => {
        console.log("In success");
        console.log(res);
        if (res.data.result === "success") {
          navigate("/home");
          setError(false);
        }
      })
      .catch((err) => {
        console.log("Bad login");
        setError(true);
        navigate("/home");
      });
  }

  return (
    <div>
      <LoginHeader />

      <Container className="p-3">
        <Container className="p-5 mb-4 bg-light rounded-3">
          <h1 className="header">Welcome To CasePad</h1>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder=""
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder=""
                onChange={(e) => {
                  setFormData({ ...formData, password: e.target.value });
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Remember me" />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                handleLoginForm(e);
              }}
            >
              Login
            </Button>
            {error && (
              <Form.Text
                id="signup_result"
                style={{
                  color: "#ff0000"
                }}
              >
                {" "}
                Login Error!
              </Form.Text>
            )}
          </Form>
        </Container>
      </Container>
    </div>
  );
}

export default Login;
