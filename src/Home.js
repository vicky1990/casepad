import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

import Header from "./Header";
import { useNavigate } from "react-router-dom";

// try home() with hooks instead of class and compare with others.
function Home() {
  // data state variable defaulted to an empty array
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const fetchRecords = () => {
    fetch("https://mocki.io/v1/b48843ab-182f-495f-a3e4-22df23f24422")
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
    console.log(treat_count);
    let tag = "";
    for (let i = 0; i < treat_count; i++) {
      //tag += "<td></td>";
      console.log(i);
    }
    //console.log(tag);
    return (
      <tr>
        <td>{item.diagnosis}</td>
        {tag}
      </tr>
    );
  }
  function rendertreatement(item, index) {
    return (
      <tr>
        <td>{item.date}</td>
      </tr>
    );
  }

  function renderitem(item, index) {
    return (
      <tr key={index}>
        <td>{item.patient_name}</td>
        <td>
          {item.d_items.map(renderdiagnosis)}
          <Button
            variant="primary"
            size="sm"
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              handleDiagnosisForm(e, item.patien_id, item.patient_name);
            }}
          >
            +
          </Button>
        </td>
        <td>
          {item.d_items[0].t_items.map(rendertreatement)}{" "}
          <Button
            variant="primary"
            size="sm"
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              handleVisitForm(e, item.patien_id, item.patient_name, 0);
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
