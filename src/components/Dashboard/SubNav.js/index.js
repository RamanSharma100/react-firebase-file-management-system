import React from "react";
import { Col } from "react-bootstrap";
import CreateFile from "../../CreateFile/index.js";
import CreateFolder from "../../CreateFolder/index.js";
import UploadFile from "../../UploadFile/index.js";
import BreadCrum from "../BreadCrum.js";

const SubNav = ({ currentFolder }) => {
  return (
    <Col
      md={12}
      className={"d-flex align-items-center px-5 pt-3 justify-content-between"}
    >
      {currentFolder && currentFolder !== "root folder" ? (
        <>
          <BreadCrum currentFolder={currentFolder} />
          {currentFolder.data.createdBy !== "admin" && (
            <div className="ml-auto col-md-5 d-flex justify-content-end">
              <UploadFile currentFolder={currentFolder} />
              &nbsp;
              <CreateFile currentFolder={currentFolder} />
              &nbsp;
              <CreateFolder currentFolder={currentFolder} />
            </div>
          )}
        </>
      ) : (
        <>
          <p>Root</p>
          <div className="ml-auto col-md-5 d-flex justify-content-end">
            <UploadFile currentFolder={currentFolder} />
            &nbsp;
            <CreateFile currentFolder={currentFolder} />
            &nbsp;
            <CreateFolder currentFolder={currentFolder} />
          </div>
        </>
      )}
    </Col>
  );
};

export default SubNav;
