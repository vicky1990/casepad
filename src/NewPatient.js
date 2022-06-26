import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";

import Header from "./Header";

function NewPatient() {
  const [formData, setFormData] = useState({});
  const [locData, setLocData] = useState({});

  function handleSubmitForm(event) {
    setFormData({ ...formData, location: locData });
    console.log(JSON.stringify(formData));

    axios
      .post(
        "https://8271-2603-8001-7f00-75f5-87c4-4bc9-dcfb-b335.ngrok.io/newpatient",
        JSON.stringify(formData),
        {
          method: "POST",
          headers: {
            // Overwrite Axios's automatically set Content-Type
            "Content-Type": "application/json"
          }
        }
      )
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
      <Header />
      <Container className="p-3">
        <Container className="p-5 mb-4 bg-light rounded-3">
          <h1 className="header">Add a New patient</h1>
          <Form id="formElem">
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  placeholder=""
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
                  setLocData({ ...locData, address_line_1: e.target.value });
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGridAddress2">
              <Form.Label>Address 2</Form.Label>
              <Form.Control
                placeholder="Apartment, studio, or floor"
                onChange={(e) => {
                  setLocData({ ...locData, address_line_2: e.target.value });
                }}
              />
            </Form.Group>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridCity">
                <Form.Label>City</Form.Label>
                <Form.Control
                  onChange={(e) => {
                    setLocData({ ...locData, city: e.target.value });
                  }}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>State</Form.Label>
                <Form.Select
                  defaultValue="Tamil Nadu"
                  onChange={(e) => {
                    setLocData({ ...locData, state: e.target.value });
                  }}
                >
                  <option>Tamil Nadu</option>
                  <option>...</option>
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridZip">
                <Form.Label>Zip</Form.Label>
                <Form.Control
                  onChange={(e) => {
                    setLocData({ ...locData, zipcode: e.target.value });
                  }}
                />
              </Form.Group>
            </Row>
            <Form.Group className="mb-3" controlId="formGridpn">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                placeholder="Phone Number"
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

            <Button
              variant="primary"
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                handleSubmitForm(e);
              }}
            >
              Submit
            </Button>
          </Form>
        </Container>
      </Container>
    </div>
  );
}

export default NewPatient;
