import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Box, CircularProgress } from '@mui/material';

function C_Modal({ title, children, show, setShow, footer, modalWidth, backdrop, isLoading, handle }) {
  const handleAccept = () => {
    handle();
    setShow(false);
  };
  const handleClose = () => {
    setShow(false);
  };
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        className={`modal-${modalWidth}`}
        backdrop={backdrop ? 'static' : 'unset'}
      >
        <Modal.Header closeButton className="close-button">
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {children}
          {isLoading && (
            <Box
              className="flex-center"
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0,0,0,0.1)',
                zIndex: 100,
              }}
            >
              <CircularProgress />
            </Box>
          )}
        </Modal.Body>
        {footer && (
          <Modal.Footer>
            <Button style={{ fontSize: '1.4rem' }} variant="secondary" onClick={handleAccept}>
              Yes
            </Button>
            <Button style={{ fontSize: '1.4rem' }} variant="primary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        )}
      </Modal>
    </>
  );
}

export default C_Modal;
