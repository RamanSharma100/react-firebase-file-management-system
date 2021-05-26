import { faFile, faFolder } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import {
  getAdminFiles,
  getAdminFolders,
  getUserFolders,
} from "../../../redux/actionCreators/filefoldersActionCreators";
import SubNav from "../SubNav.js";

const FolderComponent = () => {
  const { folderId } = useParams();

  const { folders, isLoading, userId } = useSelector(
    (state) => ({
      folders: state.filefolders.userFolders,
      isLoading: state.filefolders.isLoading,
      userId: state.filefolders.userId,
    }),
    shallowEqual
  );
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (isLoading && !folders) {
      dispatch(getAdminFolders());
      dispatch(getAdminFiles());
      dispatch(getUserFolders(userId));
    }
  }, [dispatch, isLoading]);
  const userFolders =
    folders && folders.filter((file) => file.data.parent === folderId);

  const currentFolder =
    folders && folders.find((folder) => folder.docId === folderId);
  if (isLoading) {
    return (
      <Row>
        <Col md="12">
          <h1 className="text-center my-5">Fetching data...</h1>
        </Col>
      </Row>
    );
  }

  if (userFolders && userFolders.length < 1) {
    return (
      <>
        <SubNav currentFolder={currentFolder} />
        <Row>
          <Col md="12">
            <p className="small text-center my-5">Empty Folder</p>
          </Col>
        </Row>
      </>
    );
  }
  return (
    <>
      <SubNav currentFolder={currentFolder} />
      {userFolders && userFolders.length > 0 && (
        <>
          <p className="border-bottom py-2">Created Folders</p>
          <Row
            md="2"
            style={{ height: "auto" }}
            className="pt-2  gap-2 pb-4 px-5"
          >
            {!folders ? (
              <h1 className="text-center">Fetching Files....</h1>
            ) : (
              userFolders.map(({ data, docId }) => (
                <Col
                  onDoubleClick={() =>
                    history.push(`/dashboard/folder/${docId}`)
                  }
                  onClick={(e) => {
                    if (e.currentTarget.classList.contains("text-white")) {
                      e.currentTarget.style.background = "#fff";
                      e.currentTarget.classList.remove("text-white");
                      e.currentTarget.classList.remove("shadow-sm");
                    } else {
                      e.currentTarget.style.background = "#017bf562";
                      e.currentTarget.classList.add("text-white");
                      e.currentTarget.classList.add("shadow-sm");
                    }
                  }}
                  key={docId}
                  md={2}
                  className="border h-100 mr-2 d-flex align-items-center justify-content-around flex-column py-1 rounded-2"
                >
                  <FontAwesomeIcon
                    icon={faFolder}
                    className="mt-3"
                    style={{ fontSize: "3rem" }}
                  />
                  <p className="mt-3">{data.name}</p>
                </Col>
              ))
            )}
          </Row>
        </>
      )}
    </>
  );
};

export default FolderComponent;
