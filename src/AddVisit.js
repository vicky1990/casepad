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
  const [formData, setFormData] = useState({
    symptoms: [],
    diagnosis: "",
    images: "",
    treatement: "",
    comments: ""
  });
  //const [symptoms, setSymptomsData] = useState([]);
  //const [images, setImageData] = useState({});

  function handleSubmitForm(event) {
    //setFormData({ ...formData, symtom: symptoms });
    //setFormData({ ...formData, images: images });

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

  const eventhandler = (data) => {
    //console.log(data.length);
    data.forEach((element) => {
      //setSymptomsData(element.login);
      setFormData({
        ...formData,
        symptoms: [...formData.symptoms, element.login]
      });
    });
  };
  const addImage = (data) => {
    //setImageData(data);
    setFormData({ ...formData, images: data });
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
                placeholder=""
                onChange={(e) => {
                  setFormData({ ...formData, patient_id: e.target.value });
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridsymptom">
              <Form.Label>Symptoms</Form.Label>
              <Asynautocomplete onChange={eventhandler} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridDiagnosis">
              <Form.Label>Diagnosis</Form.Label>
              <Form.Control
                placeholder="Diagnosis"
                onChange={(e) => {
                  setFormData({ ...formData, diagnosis: e.target.value });
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
