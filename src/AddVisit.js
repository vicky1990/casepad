import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Figure from "react-bootstrap/Figure";

import ModalCamera from "./components/ModalCamera";

import Header from "./Header";
import axios from "axios";

import Asynautocomplete from "./components/Asynautocomplete";

function AddVisit() {
  const [formData, setFormData] = useState({});
  const [symptoms, setSymptomsData] = useState({});
  const [images, setImageData] = useState({});

  function handleSubmitForm(event) {
    setFormData({ ...formData, symtoms: symptoms });
    setFormData({ ...formData, images: images });

    console.log(JSON.stringify(formData));
    axios
      .post(
        "https://8271-2603-8001-7f00-75f5-87c4-4bc9-dcfb-b335.ngrok.io/addvisit",
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

  const eventhandler = (data) => setSymptomsData(data);
  const addImage = (data) => setImageData(data);

  return (
    <div>
      <Header />
      <Container className="p-3">
        <Container className="p-5 mb-4 bg-light rounded-3">
          <h1 className="header">Add a Visit</h1>
          <Form>
            <Form.Group className="mb-3" controlId="formGridPatientId">
              <Form.Label>Patient Id</Form.Label>
              <Form.Control
                placeholder=""
                onChange={(e) => {
                  setFormData({ ...formData, patient_id: e.target.value });
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridsymptom">
              <Form.Label>Symptoms</Form.Label>
              <Form.Control placeholder="" />
            </Form.Group>

            <Asynautocomplete onChange={eventhandler} />

            <Form.Group className="mb-3" controlId="formGridDiagnosis">
              <Form.Label>Diagnosis</Form.Label>
              <Form.Control placeholder="Diagnosis" />
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
