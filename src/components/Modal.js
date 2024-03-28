import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function C_Modal({ title, children, show, setShow, footer, modalWidth }) {
  const handleClose = () => setShow(false);

  return (
    <>
      <Modal show={show} onHide={handleClose} className={`modal-${modalWidth}`}>
        <Modal.Header closeButton className="close-button">
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
        {footer && (
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        )}
      </Modal>
    </>
  );
}

export default C_Modal;
