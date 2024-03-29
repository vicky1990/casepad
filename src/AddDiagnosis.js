import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Figure from "react-bootstrap/Figure";
import { useLocation } from "react-router-dom";
import useAuth from "./components/useAuth";
import { useNavigate } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import ModalCamera from "./components/ModalCamera";

import Header from "./Header";
import axios from "axios";

import Asynautocomplete from "./components/Asynautocomplete";

function AddDiagnosis() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [error, setError] = useState(false);

  const [formData, setFormData] = useState({
    symptoms_list: [],
    diagnosis: location.state.diagnosis,
    diagnosis_list: [],
    images: [],
    treatement: "",
    comments: "",
    patient_id: location.state.id,
    doctor_id: user.id,
    dov: new Date().toISOString().substring(0, 10)
  });
  //const [symptoms, setSymptomsData] = useState([]);
  //const [images, setImageData] = useState({});

  function handleSubmitForm(event) {
    //setFormData({ ...formData, symtom: symptoms });
    //setFormData({ ...formData, images: images });

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
        setError(false);
        navigate("/home");
      })
      .catch((err) => {
        console.log(err);
        setError(true);
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
    data = data.replace(/^data:image\/[a-z]+;base64,/, "");
    setFormData({ ...formData, images: [...formData.images, data] });
  };

  return (
    <div>
      <Header />
      <Container className="p-3">
        <Container className="p-5 mb-4 bg-light rounded-3">
          <h1 className="header">Add a Diagnosis</h1>
          <Form>
            <Row className="mb-3">
              <Form.Group
                as={Col}
                className="mb-3"
                controlId="formGridPatientId"
              >
                <Form.Label>Patient Name</Form.Label>
                <Form.Control
                  readOnly
                  placeholder={location.state.patient_name}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridAge">
                <Form.Label>Date of visit</Form.Label>
                <Form.Control
                  type="date"
                  placeholder=""
                  defaultValue={new Date().toISOString().substring(0, 10)}
                  onChange={(e) => {
                    setFormData({ ...formData, dov: e.target.value });
                  }}
                />
              </Form.Group>
            </Row>

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

            {error && (
              <Form.Text
                id="signup_result"
                style={{
                  color: "#ff0000"
                }}
              >
                {" "}
                Invalid input!
              </Form.Text>
            )}
          </Form>
        </Container>
      </Container>
    </div>
  );
}

export default AddDiagnosis;
