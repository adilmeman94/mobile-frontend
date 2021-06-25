import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

export const DeleteAlert = (props) => {
  const { onHideModal, onDelete } = props;
  return (
    <>
      <Modal
        isOpen={true}
        toggle={onHideModal}
        className="modal-dialog-centered modal-sm"
      >
        <ModalHeader toggle={onHideModal} className="bg-danger">
          Delete Alert
        </ModalHeader>
        <ModalBody className="modal-dialog-centered">
          <h5>Are you sure wants to Delete ?</h5>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={onHideModal}>
            Cancel
          </Button>
          <Button color="danger" onClick={onDelete}>
            Delete
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};
