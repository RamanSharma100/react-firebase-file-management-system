import { faFolderPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addFolderUser } from "../../redux/actionCreators/filefoldersActionCreators";

const CreateFolder = ({ currentFolder }) => {
  const [showModal, setShowModal] = useState(false);
  const [folderName, setFolderName] = useState("");

  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.userId);

  const handleFolderSubmit = (e) => {
    e.preventDefault();

    if (!folderName) return toast.dark("Please enter folder name!");

    if (currentFolder === "root folder") {
      dispatch(addFolderUser(folderName, userId, [], []));
      setFolderName("");
      setShowModal(false);
      return;
    }

    dispatch(
      addFolderUser(
        folderName,
        userId,
        currentFolder.docId,
        currentFolder.data.path
      )
    );
    setFolderName("");
    setShowModal(false);
    return;
  };
  return (
    <>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header>
          <Modal.Title>Create Folder</Modal.Title>
          <Button
            variant="white"
            style={{ cursor: "pointer" }}
            onClick={() => setShowModal(false)}
          >
            <FontAwesomeIcon icon={faTimes} />
          </Button>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFolderSubmit}>
            <Form.Group controlId="formBasicFolderName" className="my-2">
              <Form.Control
                type="text"
                placeholder="Enter folder name..."
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicFolderSubmit" className="mt-5">
              <Button type="submit" className="form-control" variant="primary">
                Add Folder
              </Button>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
      <Button
        onClick={() => setShowModal(true)}
        variant="outline-dark"
        className="border-1 d-flex align-items-center justify-content-between rounded-2"
      >
        <FontAwesomeIcon icon={faFolderPlus} />
        &nbsp; Create Folder
      </Button>
    </>
  );
};

export default CreateFolder;
