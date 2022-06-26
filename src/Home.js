import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

import Header from "./Header";

const API_HOST = "https://mocki.io/v1/896f0bf3-05eb-4fff-bace-2595305762c8";

// try home() with hooks instead of class and compare with others.
function Home() {
  // data state variable defaulted to an empty array
  const [data, setData] = useState([]);

  const fetchRecords = () => {
    /*   fetch("https://mocki.io/v1/896f0bf3-05eb-4fff-bace-2595305762c8")
      .then((res) => res.json())
      .then((json) => setData(json.records));*/
  };

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
                <td>
                  <Button
                    variant="primary"
                    type="submit"
                    onClick={(e) => {
                      e.preventDefault();
                      this.handleLoginForm(e);
                    }}
                  >
                    Login
                  </Button>
                </td>
                <td>1</td>
                <td>1</td>
                <td>1</td>

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
