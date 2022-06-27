import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import bcrypt from "bcryptjs";
import axios from "axios";

import LoginHeader from "./LoginHeader";

function Signup() {
  const [formData, setFormData] = useState({
    state: "Tamil Nadu",
    country: "India"
  });
  // const [locData, setLocData] = useState({});

  function handleSubmitForm(event) {
    event.preventDefault();

    console.log(JSON.stringify(formData));

    axios
      .post("/signup", JSON.stringify(formData), {
        method: "POST",
        headers: {
          // Overwrite Axios's automatically set Content-Type
          "Content-Type": "application/json"
        }
      })
      .then((res) => {
        console.log(res);
        console.log(res.data["result"]);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <div>
      <LoginHeader />
      <Container className="p-3">
        <Container className="p-5 mb-4 bg-light rounded-3">
          <h1 className="header">Register</h1>
          <Form id="formElem">
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  placeholder="Dr."
                  onChange={(e) => {
                    setFormData({ ...formData, first_name: e.target.value });
                  }}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  placeholder=""
                  onChange={(e) => {
                    setFormData({ ...formData, last_name: e.target.value });
                  }}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridAge">
                <Form.Label>Date of birth</Form.Label>
                <Form.Control
                  type="date"
                  placeholder=""
                  onChange={(e) => {
                    setFormData({ ...formData, dob: e.target.value });
                  }}
                />
              </Form.Group>
            </Row>
            <Form.Group className="mb-3" controlId="formGridAddress1">
              <Form.Label>Address</Form.Label>
              <Form.Control
                placeholder=""
                onChange={(e) => {
                  setFormData({ ...formData, address_line_1: e.target.value });
                }}
              />
            </Form.Group>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridAddress2">
                <Form.Label>Address 2</Form.Label>
                <Form.Control
                  placeholder="Apartment, studio, or floor"
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      address_line_2: e.target.value
                    });
                  }}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridCity">
                <Form.Label>City</Form.Label>
                <Form.Control
                  onChange={(e) => {
                    setFormData({ ...formData, city: e.target.value });
                  }}
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>State</Form.Label>
                <Form.Select
                  as="select"
                  value={"Tamil Nadu"}
                  onChange={(e) => {
                    setFormData({ ...formData, state: e.target.value });
                  }}
                >
                  <option>Tamil Nadu</option>
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridCountry">
                <Form.Label>Country</Form.Label>
                <Form.Select
                  as="select"
                  value={"India"}
                  onChange={(e) => {
                    setFormData({ ...formData, country: e.target.value });
                  }}
                >
                  <option>India</option>
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridZip">
                <Form.Label>Zip</Form.Label>
                <Form.Control
                  onChange={(e) => {
                    setFormData({ ...formData, zipcode: e.target.value });
                  }}
                />
              </Form.Group>
            </Row>
            <Form.Group className="mb-3" controlId="formGridpn">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                placeholder="Type phone number without country code"
                onChange={(e) => {
                  setFormData({ ...formData, phone_number: e.target.value });
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGridmail">
              <Form.Label>E-mail</Form.Label>
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
                  setFormData({
                    ...formData,
                    password: bcrypt.hashSync(
                      e.target.value,
                      "$2a$10$CwTycUXWue0Thq9StjUM0u"
                    )
                  });
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Re type password</Form.Label>
              <Form.Control
                type="password"
                placeholder=""
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    retyped_password: bcrypt.hashSync(
                      e.target.value,
                      "$2a$10$CwTycUXWue0Thq9StjUM0u"
                    )
                  });
                }}
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              onClick={(e) => {
                handleSubmitForm(e);
              }}
            >
              Sign up
            </Button>
          </Form>
        </Container>
      </Container>
    </div>
  );
}

export default Signup;
