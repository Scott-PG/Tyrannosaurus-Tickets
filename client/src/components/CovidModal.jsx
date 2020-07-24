import React from "react";
// import 'bootstrap/dist/css/bootstrap.min.css'
import { Modal, Button } from "react-bootstrap";
import "./CovidModal.css";

export default function CovidModal(props) {
  return (
    <Modal
      className="covidModal"
      show={props.show}
      onHide={props.handleClose}
      backdrop="static"
      size="lg"
    >
      <Modal.Header>
        <Modal.Title>Important COVID-19 Information</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        We are conducting our event in line with the most current
        recommendations from the CDC. Please keep social distance, wear a mask,
        and wash hands frequently. We thank you for your cooperation.
      </Modal.Body>

      <Modal.Footer>
        &nbsp;
        <Button variant="secondary" onClick={props.handleClose}>
          I understand
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
