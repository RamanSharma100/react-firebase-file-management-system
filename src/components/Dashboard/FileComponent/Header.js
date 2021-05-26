import React, { useEffect, useState } from "react";
import { faArrowLeft, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { userFileDataUpdate } from "../../../redux/actionCreators/filefoldersActionCreators";
import { useDispatch } from "react-redux";

const Header = ({ data, prevData, currentFile }) => {
  const history = useHistory();
  const [update, setUPdate] = useState(data.trim() !== prevData.trim());

  useEffect(() => {
    setUPdate(data.trim() !== prevData.trim());
  }, [prevData]);

  const dispatch = useDispatch();
  const pushItBack = () => {
    if (data.trim() !== prevData.trim()) {
      if (window.confirm("are your sure to leave without saving data?")) {
        history.push(
          currentFile.data.parent === ""
            ? "/dashboard"
            : `dashboard/folder/${currentFile.data.parent}`
        );
      } else {
        return;
      }
    }
  };
  const saveFile = () => {
    dispatch(userFileDataUpdate(data.trim(), currentFile.docId));
  };

  return (
    <Row className="px-5 d-flex align-items-center border-bottom mb-3 justify-content-between border-2 py-2 pt-3">
      <Col md={5} className="d-flex align-items-center justify-content-between">
        <h5 className="font-weight-bold">
          {currentFile.data.name}
          {update && " [* . Modified]"}
        </h5>
      </Col>
      <Col md={5} className="d-flex align-items-center justify-content-end">
        <Button variant="success" disabled={!update}>
          <FontAwesomeIcon icon={faSave} onClick={() => saveFile()} />
          &nbsp; Save
        </Button>
        &nbsp;
        <Button variant="dark" onClick={() => pushItBack()}>
          <FontAwesomeIcon icon={faArrowLeft} />
          &nbsp; Go Back
        </Button>
      </Col>
    </Row>
  );
};

export default Header;
