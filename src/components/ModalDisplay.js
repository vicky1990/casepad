import React, { useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Image from "react-bootstrap/Image";
import Table from "react-bootstrap/Table";

const ModalDisplay = (props) => {
  const [data, setData] = useState();

  //const [show, setShow] = React.useState(false);
  const [userMedia, setUserMedia] = React.useState(false);

  const fetchRecords = () => {
    fetch(`/visit_id?q=${props.visit_id}`)
      //fetch("https://mocki.io/v1/e9c29b17-2168-4484-a0d4-5abf15623d83")
      .then((res) => res.json())
      .then((json) => setData(json));
  };

  const handleClose = React.useCallback(() => {
    setUserMedia(false);
    props.setshow(false);
  }, [props, setUserMedia]);

  function handleModalShow() {
    console.log(props.visit_id);
    fetchRecords();
  }

  function displayImages(item, index) {
    return <Image src={"data:image/webp;base64," + item} alt="thumbnail" />;
  }

  return (
    <div>
      <Modal
        show={props.show}
        onHide={handleClose}
        onShow={handleModalShow}
        size="lg"
        dialogClassName={`my-modal my-modal--${userMedia ? "show" : "hide"}`}
      >
        <Modal.Header>
          <Modal.Title>Visit Record</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            {data && (
              <Table responsive condensed>
                <thead>
                  <tr>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {" "}
                  <tr>
                    {" "}
                    <td> Patient Name </td> <td> {data.patient_name}</td>{" "}
                  </tr>
                  <tr>
                    <td> Doctor Name </td> <td> {data.doctor_name}</td>{" "}
                  </tr>
                  <tr>
                    <td> Diagnosis </td> <td> {data.diagnosis}</td>{" "}
                  </tr>
                </tbody>
              </Table>
            )}
            {data && data.reports[0].images.map(displayImages)}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModalDisplay;
