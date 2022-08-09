import Webcam from "react-webcam";
import React, { useEffect, useRef } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Image from "react-bootstrap/Image";

const videoConstraints = {
  width: 300,
  facingMode: "environment"
};

const ModalCamera = (props) => {
  const webcamRef = useRef(null);
  const [show, setShow] = React.useState(false);
  const [userMedia, setUserMedia] = React.useState(false);

  const [url, setUrl] = React.useState([]);

  const handleClose = React.useCallback(() => {
    setShow(false);
    setUserMedia(false);
  }, [setShow, setUserMedia]);

  const capturePhoto = React.useCallback(async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setUrl((prevState) => [...prevState, imageSrc]);
    console.log(imageSrc);

    if (props.onChange) {
      props.onChange(imageSrc);
    }

    handleClose();
  }, [webcamRef, props, handleClose]);

  const handleShow = React.useCallback(() => setShow(true), [setShow]);

  const handleOnUserMedia = React.useCallback(() => setUserMedia(true), [
    setUserMedia
  ]);

  function renderImages(item, index) {
    return <Image src={item} alt="thumbnail" />;
  }

  return (
    <div>
      {url.map(renderImages)}

      <Button variant="primary" onClick={handleShow}>
        <img src="../Images/Plane.png" />
      </Button>
      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        dialogClassName={`my-modal my-modal--${userMedia ? "show" : "hide"}`}
      >
        <Modal.Header>
          <Modal.Title>Take a shot!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Webcam
            ref={webcamRef}
            audio={false}
            onUserMedia={handleOnUserMedia}
            onUserMediaError={handleOnUserMedia}
            videoConstraints={videoConstraints}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={capturePhoto}>
            capture
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModalCamera;
