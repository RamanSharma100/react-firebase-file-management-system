import React from "react";
import { Col } from "react-bootstrap";
import CreateFolder from "../../CreateFolder/index.js";
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
            <div className="ml-auto">
              <CreateFolder currentFolder={currentFolder} />
            </div>
          )}
        </>
      ) : (
        <>
          <p>Root</p>
          <div className="ml-auto">
            <CreateFolder currentFolder={currentFolder} />
          </div>
        </>
      )}
    </Col>
  );
};

export default SubNav;
