import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Figure from "react-bootstrap/Figure";
import { useLocation } from "react-router-dom";
import useAuth from "./components/useAuth";

import ModalCamera from "./components/ModalCamera";

import Header from "./Header";
import axios from "axios";

function AddVisit() {
  const location = useLocation();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    diagnosis: location.state.diagnosis,
    images: [],
    treatement: "",
    comments: "",
    patient_id: location.state.id,
    doctor_id: user.id
  });

  function handleSubmitForm(event) {
    //setFormData({ ...formData, patient_id: location.state.id });
    //setFormData({ ...formData, diagnosis: location.state.diagnosis });

    console.log(formData);
    axios
      .post("/addvisit", JSON.stringify(formData), {
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

  const addImage = (data) => {
    //setImageData(data);
    setFormData({ ...formData, images: [...formData.images, data] });
  };

  return (
    <div>
      <Header />
      <Container className="p-3">
        <Container className="p-5 mb-4 bg-light rounded-3">
          <h1 className="header">Add a Visit</h1>
          <Form>
            <Form.Group className="mb-3" controlId="formGridPatientId">
              <Form.Label>Patient Name</Form.Label>
              <Form.Control
                readOnly
                placeholder={location.state.patient_name}
                onChange={(e) => {
                  setFormData({ ...formData, patient_id: e.target.value });
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridTreatment">
              <Form.Label>Treatement</Form.Label>
              <Form.Control
                placeholder="Treatement"
                onChange={(e) => {
                  setFormData({ ...formData, treatement: e.target.value });
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridComments">
              <Form.Label>Comments</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                onChange={(e) => {
                  setFormData({ ...formData, comments: e.target.value });
                }}
              />
            </Form.Group>

            <div>
              <ModalCamera onChange={addImage} />
            </div>

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

export default AddVisit;
