import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";

import ModalDisplay from "./components/ModalDisplay";

import Header from "./Header";
import { useNavigate, Link } from "react-router-dom";

// try home() with hooks instead of class and compare with others.
function Home() {
  // data state variable defaulted to an empty array
  const [modalview, setModalview] = useState(false);
  const [vid, setVid] = useState(0);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  // https://mocki.io/v1/50bbcc4e-bd7f-4309-888b-d71056adc58e
  //https://mocki.io/v1/be2d3302-db21-45e6-a930-7cd4a189959d
  const fetchRecords = () => {
    fetch("/get_patients")
      //fetch("https://mocki.io/v1/be2d3302-db21-45e6-a930-7cd4a189959d")
      .then((res) => res.json())
      .then((json) => setData(json.p_items));
  };

  function handleVisitForm(event, patient_id, patient_name, diagnosis_id) {
    navigate("/visit", {
      state: {
        patient_name: patient_name,
        id: patient_id,
        diagnosis: diagnosis_id
      }
    });
  }
  function handleDiagnosisForm(event, patient_id, patient_name) {
    navigate("/diagnosis", {
      state: { patient_name: patient_name, id: patient_id, diagnosis: "new" }
    });
  }

  // Calling the function on component mount
  useEffect(() => {
    fetchRecords();
  }, []);

  function renderdiagnosis(item, index) {
    let treat_count = item.treatement_count;
    //console.log(treat_count);
    let tag = "";
    for (let i = 0; i < treat_count; i++) {
      tag += "<td></td>";
    }
    //console.log(tag);
    return (
      <tr>
        <td>{item.diagnosis}</td>
      </tr>
    );
  }
  function rendertreatement(item, index) {
    return (
      <tr>
        <td>
          <Button
            variant="link"
            onClick={(e) => {
              e.preventDefault();
              setVid(item.visit_id);
              setModalview(true);
            }}
          >
            {item.date.split(" ")[0]}
          </Button>
        </td>
      </tr>
    );
  }

  function renderitem(item, index) {
    return (
      <tr key={index}>
        <td>
          {item.patient_name}{" "}
          <tr>
            <Button
              variant="primary"
              size="sm"
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                handleDiagnosisForm(e, item.patient_id, item.patient_name);
              }}
            >
              Add Diagnosis
            </Button>
          </tr>
        </td>

        <td>{item.d_items.map(renderdiagnosis)}</td>
        <td>
          {item.d_items.length > 0
            ? item.d_items[0].t_items.map(rendertreatement)
            : null}{" "}
          <Button
            variant="primary"
            size="sm"
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              handleVisitForm(
                e,
                item.patient_id,
                item.patient_name,
                item.d_items[0].id
              );
            }}
          >
            +
          </Button>
        </td>
      </tr>
    );
  }

  return (
    <div>
      <Header />
      <Container className="p-3">
        <Container className="p-5 mb-4 bg-light rounded-3">
          <div>
            <ModalDisplay
              show={modalview}
              setshow={setModalview}
              visit_id={vid}
            />
          </div>
          <Table responsive condensed>
            <thead>
              <tr>
                <th>Patient</th>
                <th>Diagnosis</th>
                <th>Visit date</th>
              </tr>
            </thead>
            <tbody>{data.map(renderitem)}</tbody>
            {/*
            <tbody>
              <tr>
                <td> {data.p_items[0].patient_name}</td>
                <td>
                  {data.p_items[0].d_items[0].diagnosis}
                  <Button
                    variant="primary"
                    type="submit"
                    onClick={(e) => {
                      e.preventDefault();
                      handleDiagnosisForm(e);
                    }}
                  >
                    New Diagnosis
                  </Button>
                </td>
                <td>
                  {data.p_items[0].d_items[0].t_items[0].date}
                  <Button
                    variant="primary"
                    type="submit"
                    onClick={(e) => {
                      e.preventDefault();
                      handleVisitForm(e);
                    }}
                  >
                    New Visit
                  </Button>
                </td>

                <td />
              </tr>

            </tbody>
                              */}
          </Table>
        </Container>
      </Container>
    </div>
  );
}

export default Home;
