import Webcam from "react-webcam";
import React, { useEffect, useRef } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Image from "react-bootstrap/Image";
import Form from "react-bootstrap/Form";

import Resizer from "react-image-file-resizer";

const videoConstraints = {
  width: 300,
  facingMode: "environment"
};

const ModalCamera = (props) => {
  const webcamRef = useRef(null);
  const [show, setShow] = React.useState(false);
  const [userMedia, setUserMedia] = React.useState(false);

  const [currTab, setCurrTab] = React.useState(0);

  const [url, setUrl] = React.useState([]);

  const handleClose = React.useCallback(() => {
    setShow(false);
    setUserMedia(false);
  }, [setShow, setUserMedia]);

  const capturePhoto = React.useCallback(async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setUrl((prevState) => [...prevState, imageSrc]);
    //console.log(imageSrc);

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
    return <Image src={item} alt="thumbnail" width="100" />;
  }

  /**
   * Convert a File to a base64 string
   * @param {File} file
   * @return {string}
   */
  /*const toBase64 = (file) => {
    if (!(file instanceof File) && !(file instanceof Blob)) return;

    console.dir(file);
    //console.log(JSON.stringify(file));

    const reader = new FileReader();
    let resolve = null;
    let reject = null;

    reader.readAsDataURL(file, 1);
    reader.onload = function onReaderLoad() {
      resolve(reader.result);
    };

    reader.onerror = function onReaderError(error) {
      reject(error);
    };

    return new Promise((res, rej) => {
      resolve = res;
      reject = rej;
    });
  };*/

  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        400,
        400,
        "JPEG",
        100,
        0,
        (uri) => {
          resolve(uri);
        },
        "base64"
      );
    });

  /*const _onChange = async (event) => {
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      const imageSrc = await toBase64(file);
      setUrl((prevState) => [...prevState, imageSrc]);
      //console.log(imageSrc);

      if (props.onChange) {
        props.onChange(imageSrc);
      }

      handleClose();
    }
  };*/

  const onChange = async (event) => {
    try {
      const file = event.target.files[0];
      const imageSrc = await resizeFile(file);
      setUrl((prevState) => [...prevState, imageSrc]);
      //console.log(imageSrc);

      if (props.onChange) {
        props.onChange(imageSrc);
      }

      handleClose();
    } catch (err) {
      console.log(err);
    }
  };

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
          <Form.Control
            type="file"
            id="capture-environment"
            type="file"
            accept="image/*"
            onChange={onChange}
            capture="filesystem"
          />
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
