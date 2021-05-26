import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
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

import "./FileComponent.css";
import Header from "./Header";

const FileComponent = () => {
  const { fileId } = useParams();

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
  }, [dispatch, isLoading, currentFile.data.data]);

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
        currentFile.data.url === "" ||
        !currentFile.data.name.includes(".jpg") ||
        !currentFile.data.name.includes(".png") ||
        !currentFile.data.name.includes(".jpeg") ||
        !currentFile.data.name.includes(".doc") ||
        !currentFile.data.name.includes(".ppt") ||
        !currentFile.data.name.includes(".pptx") ||
        !currentFile.data.name.includes(".xls") ||
        !currentFile.data.name.includes(".rar") ? (
          <>
            <Header
              currentFile={currentFile}
              data={data}
              prevData={prevData}
              userId={userId}
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
        ) : (
          <Row className="position-fixed top-0 left-0 m-0 w-100 h-100">
            <Col md={12}>Show File</Col>
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
