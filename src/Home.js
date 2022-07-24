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
    /*   fetch("https://mocki.io/v1/896f0bf3-05eb-4fff-bace-2595305762c8")
      .then((res) => res.json())
      .then((json) => setData(json.records));*/
  };

  function handleVisitForm(event) {
    navigate("/visit", {
      state: { patient_name: "sabaoon", id: "0", diagnosis: "0" }
    });
  }
  function handleDiagnosisForm(event) {
    navigate("/diagnosis", {
      state: { patient_name: "sabaoon", id: "0", diagnosis: "new" }
    });
  }

  // Calling the function on component mount
  useEffect(() => {
    fetchRecords();
  }, []);

  return (
    <div>
      <Header />
      <Container className="p-3">
        <Container className="p-5 mb-4 bg-light rounded-3">
          <Table striped condensed hover>
            <thead>
              <tr>
                <th>Patient</th>
                <th>Date</th>
                <th>Diagnosis</th>
                <th>Treatement</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td>
                <td>1</td>
                <td>
                  {" "}
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
                  {" "}
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
          </Table>
        </Container>
      </Container>
    </div>
  );
}

export default Home;
