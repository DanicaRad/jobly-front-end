import React, { useState, useEffect } from "react";
import { Modal, ModalBody, ModalFooter, Button } from "reactstrap";

function TimedAlert({message, color}) {
  const [modal, setModal] = useState(true);
  console.log("message in alert comp", message)

  const toggle = () => setModal(false);

  useEffect(function showTimedMessage() {
    setTimeout(() => {
      setModal(false);
    }, 7000)
  }, [modal])

  return (
    <Modal isOpen={modal} className="modal-dialog modal-dialog-centered">
      <ModalBody className="text-center">
        {message}
      </ModalBody>
      <ModalFooter>
        <Button color={color} className="btn-sm w-100" onClick={toggle}>Ok</Button>
      </ModalFooter>
    </Modal>
  )
};

export default TimedAlert;