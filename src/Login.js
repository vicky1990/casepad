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

  function handleLoginForm(event) {
    const { email, password } = formData;

    login(email, password).then(() => {
      if (authed === true) {
        navigate("/home");
      }
    });

    ///@todo fetch response from back end, stay in login page if error or move to home
    /*fetch(
      "https://8867-2603-8001-7f00-75f5-acbf-c142-9fb5-d3da.ngrok.io/login",
      {
        method: "POST",
        mode: "cors",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email,
          password: hashedPassword
        })
      }
    )
      .then((res) => {
        console.log(res);
        console.log(res.json());
        //window.localStorage.setItem("token", res.data.token);
        //this.props.navigate("/home");
        // return <Redirect to="/home" />;
      })
      .catch((err) => {
        console.log(err);
      });*/

    //this.props.navigate("/home");
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
          </Form>
        </Container>
      </Container>
    </div>
  );
}

export default Login;
