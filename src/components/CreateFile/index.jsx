import React, { useState } from "react";
import { faFileAlt, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Button, Form, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { addFileUser } from "../../redux/actionCreators/filefoldersActionCreators";

const CreateFile = ({ currentFolder }) => {
  const [showModal, setShowModal] = useState(false);
  const [file, setFile] = useState("");

  const dispatch = useDispatch();
  const { userId, userFiles } = useSelector(
    (state) => ({
      userId: state.auth.userId,
      userFiles: state.filefolders.userFiles,
    }),
    shallowEqual
  );

  const handleFileSubmit = (e) => {
    e.preventDefault();

    if (!file) return toast.dark("Please add file name!");
    const fileExtension =
      file.split(".").length > 1
        ? file.split(".")[file.split(".").length - 1].toLowerCase()
        : "txt";
    const allowedExtensions = [
      "html",
      "php",
      "js",
      "jsx",
      "txt",
      "xml",
      "css",
      "c",
      "cpp",
      "java",
      "cs",
      "py",
      "json",
    ];

    if (allowedExtensions.indexOf(fileExtension) === -1) {
      return toast.dark(`File with extension ${fileExtension} not allowed!`);
    }
    const fileName =
      file.split(".").length > 1 ? file : file + "." + fileExtension;

    const filteredFiles =
      currentFolder === "root folder"
        ? userFiles.filter(
            (file) =>
              file.data.parent === "" && file.data.name === fileName.trim()
          )
        : userFiles.filter(
            (file) =>
              file.data.parent === currentFolder.docId &&
              file.data.name === fileName.trim()
          );

    if (filteredFiles.length > 0)
      return toast.dark("This is alredy present in folder");

    if (currentFolder === "root folder") {
      dispatch(
        addFileUser({
          uid: userId,
          parent: "",
          data: "",
          name: fileName,
          url: "",
          path: [],
        })
      );
      setFile("");
      setShowModal(false);
      return;
    }

    const path =
      currentFolder.data.path.length > 0
        ? [
            ...currentFolder.data.path,
            { id: currentFolder.docId, name: currentFolder.data.name },
          ]
        : [{ id: currentFolder.docId, name: currentFolder.data.name }];

    dispatch(
      addFileUser({
        uid: userId,
        parent: currentFolder.docId,
        data: "",
        name: fileName,
        url: "",
        path: path,
      })
    );
    setFile("");
    setShowModal(false);
    return;
  };

  return (
    <>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header>
          <Modal.Title>Create File</Modal.Title>
          <Button
            variant="white"
            style={{ cursor: "pointer" }}
            onClick={() => setShowModal(false)}
          >
            <FontAwesomeIcon icon={faTimes} />
          </Button>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFileSubmit}>
            <Form.Group controlId="formBasicFolderName" className="my-2">
              <Form.Control
                type="text"
                placeholder="eg. index.html, index.js, index.php, index.txt"
                value={file}
                onChange={(e) => setFile(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicFolderSubmit" className="mt-5">
              <Button type="submit" className="form-control" variant="primary">
                Add File
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
        <FontAwesomeIcon icon={faFileAlt} />
        &nbsp; Create File
      </Button>
    </>
  );
};

export default CreateFile;
