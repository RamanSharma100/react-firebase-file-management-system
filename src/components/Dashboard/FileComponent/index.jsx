import React, { useEffect, useState } from "react";
import { Button, Col, Image, Row } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {
  getAdminFiles,
  getAdminFolders,
  getUserFiles,
  getUserFolders,
} from "../../../redux/actionCreators/filefoldersActionCreators";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/eclipse.css";
import "codemirror/mode/xml/xml";
import "codemirror/mode/php/php";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/textile/textile";
import "codemirror/mode/jsx/jsx";
import "codemirror/mode/css/css";
import "codemirror/mode/python/python";
import "codemirror/mode/clike/clike";
import { Controlled as CodeMirror } from "react-codemirror2";
import FileViewer from "react-file-viewer";

import "./FileComponent.css";
import Header from "./Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faEye } from "@fortawesome/free-solid-svg-icons";

const FileComponent = () => {
  const { fileId } = useParams();
  const history = useHistory();

  const { isLoading, userId, currentFile, folders } = useSelector(
    (state) => ({
      userId: state.auth.userId,
      isLoading: state.filefolders.isLoading,
      folders: state.filefolders.UserFolders,
      currentFile: state.filefolders.userFiles?.find(
        (file) => file.docId === fileId
      ),
    }),
    shallowEqual
  );
  const [prevData, setPrevData] = useState("");
  const [data, setData] = useState("");

  const codes = {
    html: "xml",
    php: "php",
    js: "javascript",
    jsx: "jsx",
    txt: "textile",
    xml: "xml",
    css: "css",
    c: "clike",
    cpp: "clike",
    java: "textile",
    cs: "clike",
    py: "python",
    json: "javascript",
  };

  const dispatch = useDispatch();

  const extension =
    currentFile &&
    currentFile.data.name.split(".")[
      currentFile.data.name.split(".").length - 1
    ];
  useEffect(() => {
    if (isLoading && !folders && !currentFile) {
      dispatch(getAdminFolders());
      dispatch(getAdminFiles());
      dispatch(getUserFolders(userId));
      dispatch(getUserFiles(userId));
    }

    if (
      currentFile &&
      (currentFile.data.url === "" ||
        !currentFile.data.name.includes(".jpg") ||
        !currentFile.data.name.includes(".png") ||
        !currentFile.data.name.includes(".jpeg") ||
        !currentFile.data.name.includes(".doc") ||
        !currentFile.data.name.includes(".ppt") ||
        !currentFile.data.name.includes(".pptx") ||
        !currentFile.data.name.includes(".xls") ||
        !currentFile.data.name.includes(".rar"))
    ) {
      setData(currentFile.data.data);
      setPrevData(currentFile.data.data);
    }
  }, [dispatch, isLoading, currentFile && currentFile.data.data]);

  if (isLoading) {
    return (
      <Row className="m-0 w-100 h-100">
        <Col md={12} className="bg-white m-0">
          <h1 className="text-center my-5">Fetching file...</h1>
        </Col>
      </Row>
    );
  }
  return (
    <>
      {currentFile ? (
        currentFile.data.url === "" &&
        (!currentFile.data.name.includes(".jpg") ||
          !currentFile.data.name.includes(".png") ||
          !currentFile.data.name.includes(".jpeg") ||
          !currentFile.data.name.includes(".doc") ||
          !currentFile.data.name.includes(".ppt") ||
          !currentFile.data.name.includes(".pptx") ||
          !currentFile.data.name.includes(".xls") ||
          !currentFile.data.name.includes(".rar")) ? (
          <>
            <Header
              currentFile={currentFile}
              data={data}
              prevData={prevData}
              userId={userId}
              setPrevData={setPrevData}
              setData={setData}
            />
            <Row
              className="m-0 w-100 "
              style={{ overflowX: "hidden", overflowY: "auto" }}
            >
              <Col md={12} className="bg-white">
                <CodeMirror
                  value={data}
                  options={{
                    mode: {
                      name: codes[extension],
                      json: extension === "json",
                    },
                    theme: "eclipse",
                    lineNumbers: true,
                    inputStyle: "textarea",
                    autofocus: true,
                    lineWrapping: true,
                  }}
                  onBeforeChange={(editor, data, value) => {
                    setData(value);
                  }}
                  style={{ textAlign: "left !important" }}
                />
              </Col>
            </Row>
          </>
        ) : currentFile.data.name
            .split(".")
            [currentFile.data.name.split(".").length - 1].includes("png") ||
          currentFile.data.name
            .split(".")
            [currentFile.data.name.split(".").length - 1].includes("jpg") ||
          currentFile.data.name
            .split(".")
            [currentFile.data.name.split(".").length - 1].includes("jpeg") ||
          currentFile.data.name
            .split(".")
            [currentFile.data.name.split(".").length - 1].includes("svg") ||
          currentFile.data.name
            .split(".")
            [currentFile.data.name.split(".").length - 1].includes("gif") ? (
          <Row
            className="position-fixed top-0 left-0 m-0 w-100 h-100"
            style={{ background: "rgba(0, 0, 0, 0.98)" }}
          >
            <Col md={12}>
              <div
                className="d-flex align-items-center mt-5 mb-3"
                style={{ height: "40px" }}
              >
                <p
                  className="text-left px-5 my-5 text-white"
                  style={{ width: "85%" }}
                >
                  {currentFile.data.name}
                </p>
                <div className="btns top-5 right-0 ml-auto mr-5">
                  <Button
                    variant="outline-light"
                    onClick={() => history.goBack()}
                  >
                    Go Back
                  </Button>
                  &nbsp;
                  <a
                    className="btn btn-primary"
                    target="_blank"
                    href={currentFile.data.url}
                    download
                  >
                    <FontAwesomeIcon icon={faDownload} />
                    &nbsp; Download
                  </a>
                </div>
              </div>
              <Col md={12} style={{ height: "65%" }}>
                <Image
                  src={currentFile.data.url}
                  alt={currentFile.data.url}
                  className="mb-5"
                  height="100%"
                  width="100%"
                />
              </Col>
            </Col>
          </Row>
        ) : (
          <Row
            className="position-fixed top-0 left-0 m-0 w-100 h-100"
            style={{ background: "rgba(0, 0, 0, 0.98)" }}
          >
            <Col md={12}>
              <div
                className="d-flex align-items-center mt-4 mb-3"
                style={{ height: "40px" }}
              >
                <p
                  className="text-left px-5 my-5 text-white"
                  style={{ width: "85%" }}
                >
                  {currentFile.data.name}
                </p>
                <div className="btns top-5 right-0 ml-auto mr-5">
                  <Button
                    variant="outline-light"
                    onClick={() => history.goBack()}
                  >
                    Go Back
                  </Button>
                  &nbsp;
                  <a
                    className="btn btn-primary"
                    target="_blank"
                    href={currentFile.data.url}
                    download
                  >
                    <FontAwesomeIcon icon={faDownload} />
                    &nbsp; Download
                  </a>
                </div>
              </div>
              <Col md={12} style={{ height: "83%" }}>
                {currentFile.data.name
                  .split(".")
                  [currentFile.data.name.split(".").length - 1].includes(
                    "pdf"
                  ) ? (
                  <a
                    className="btn btn-primary mx-auto mt-5"
                    target="_blank"
                    href={currentFile.data.url}
                  >
                    <FontAwesomeIcon icon={faEye} />
                    &nbsp; View{" "}
                    {
                      currentFile.data.name.split(".")[
                        currentFile.data.name.split(".").length - 1
                      ]
                    }{" "}
                    file
                  </a>
                ) : currentFile.data.name
                    .split(".")
                    [currentFile.data.name.split(".").length - 1].includes(
                      "csv"
                    ) ||
                  currentFile.data.name
                    .split(".")
                    [currentFile.data.name.split(".").length - 1].includes(
                      "xslx"
                    ) ||
                  currentFile.data.name
                    .split(".")
                    [currentFile.data.name.split(".").length - 1].includes(
                      "docx"
                    ) ||
                  currentFile.data.name
                    .split(".")
                    [currentFile.data.name.split(".").length - 1].includes(
                      "mp4"
                    ) ||
                  currentFile.data.name
                    .split(".")
                    [currentFile.data.name.split(".").length - 1].includes(
                      "webm"
                    ) ||
                  currentFile.data.name
                    .split(".")
                    [currentFile.data.name.split(".").length - 1].includes(
                      "mp3"
                    ) ? (
                  <FileViewer
                    fileType={
                      currentFile.data.name.split(".")[
                        currentFile.data.name.split(".").length - 1
                      ]
                    }
                    filePath={currentFile.data.url}
                    errorComponent={
                      <>
                        <h1>This file is not viewable</h1>
                        <a
                          className="btn btn-primary"
                          target="_blank"
                          href={currentFile.data.url}
                          download
                        >
                          <FontAwesomeIcon icon={faDownload} />
                          &nbsp; Download
                        </a>
                      </>
                    }
                    style={{ height: "100%", width: "100%" }}
                  />
                ) : (
                  <a
                    className="btn btn-primary mx-auto mt-5"
                    target="_blank"
                    href={currentFile.data.url}
                  >
                    <FontAwesomeIcon icon={faEye} />
                    &nbsp; View{" "}
                    {
                      currentFile.data.name.split(".")[
                        currentFile.data.name.split(".").length - 1
                      ]
                    }{" "}
                    file
                  </a>
                )}
              </Col>
            </Col>
          </Row>
        )
      ) : (
        <Row className="m-0 w-100 h-100">
          <Col md={12}>File Not Present</Col>
        </Row>
      )}
    </>
  );
};

export default FileComponent;
