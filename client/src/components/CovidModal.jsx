import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import './CovidModal.css'

export default function CovidModal(props) {
  return (
    <Modal className="covidModal"
      show={props.show} onHide={props.handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Important COVID 19 Information</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        Enter COVID 19 information here!
      </Modal.Body>

      <Modal.Footer>
        I understand. &nbsp;
        <Button variant="secondary" onClick={props.handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
