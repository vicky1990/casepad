import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Figure from "react-bootstrap/Figure";
import { useLocation } from "react-router-dom";

import ModalCamera from "./components/ModalCamera";

import Header from "./Header";
import axios from "axios";

import Asynautocomplete from "./components/Asynautocomplete";

function AddDiagnosis() {
  const location = useLocation();

  const [formData, setFormData] = useState({
    symptoms_list: [],
    diagnosis: "",
    diagnosis_list: [],
    images: "",
    treatement: "",
    comments: "",
    patient_id: "",
    doctor_id: ""
  });
  //const [symptoms, setSymptomsData] = useState([]);
  //const [images, setImageData] = useState({});

  function handleSubmitForm(event) {
    //setFormData({ ...formData, symtom: symptoms });
    //setFormData({ ...formData, images: images });

    setFormData({ ...formData, patient_id: location.state.id });
    setFormData({ ...formData, diagnosis: location.state.diagnosis });

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
    console.log(data);
    data.forEach((element) => {
      let n = element.id;
      if ("customOption" in element) {
        n = element.name;
      }
      setFormData({
        ...formData,
        symptoms_list: [...formData.symptoms_list, n]
      });
    });
  };

  const diagnosis_eventhandler = (data) => {
    console.log(data);
    data.forEach((element) => {
      let n = element.id;
      if ("customOption" in element) {
        n = element.name;
      }
      setFormData({
        ...formData,
        diagnosis_list: [...formData.diagnosis_list, n]
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
          <h1 className="header">Add a Diagnosis</h1>
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

            <Form.Group className="mb-3" controlId="formGridsymptom">
              <Form.Label>Symptoms</Form.Label>
              <Asynautocomplete onChange={eventhandler} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridsymptom">
              <Form.Label>Diagnosis</Form.Label>
              <Asynautocomplete onChange={diagnosis_eventhandler} />
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

export default AddDiagnosis;
