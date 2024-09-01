import {
  faFileAlt,
  faFileAudio,
  faFileImage,
  faFileVideo,
  faFolder,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import {
  getAdminFiles,
  getAdminFolders,
  getUserFiles,
  getUserFolders,
  selectItem,
  deselectItem,
  deselectAll,
  deselctFolder,
  selectFolder,
} from '../../../redux/actionCreators/filefoldersActionCreators.js';
import SubNav from '../SubNav.js/index.jsx';

const FolderComponent = () => {
  const { folderId } = useParams();

  const { folders, isLoading, userId, files, selectedItems } = useSelector(
    (state) => ({
      folders: state.filefolders.userFolders,
      files: state.filefolders.userFiles,
      isLoading: state.filefolders.isLoading,
      userId: state.auth.userId,
      selectedItems: state.filefolders.selectedItems,
    }),
    shallowEqual
  );
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (isLoading) {
      dispatch(getAdminFolders());
      dispatch(getAdminFiles());
    }
    if (!folders && !files) {
      dispatch(getUserFolders(userId));
      dispatch(getUserFiles(userId));
    }
  }, [dispatch, folders, isLoading]);
  const userFolders =
    folders && folders.filter((file) => file.data.parent === folderId);

  const currentFolder =
    folders && folders.find((folder) => folder.docId === folderId);

  const createdFiles =
    files &&
    files.filter(
      (file) => file.data.parent === folderId && file.data.url === ''
    );

  const uploadedFiles =
    files &&
    files.filter(
      (file) => file.data.parent === folderId && file.data.url !== ''
    );

  const isItemSelected = (docId) => {
    return selectedItems.find((item) => item.docId === docId) ? true : false;
  };

  const changeRoute = (url) => {
    dispatch(deselectAll());
    history.push(url);
  };

  if (isLoading) {
    return (
      <Row>
        <Col md="12">
          <h1 className="text-center my-5">Fetching data...</h1>
        </Col>
      </Row>
    );
  }

  if (
    userFolders &&
    userFolders.length < 1 &&
    createdFiles &&
    createdFiles.length < 1 &&
    uploadedFiles &&
    uploadedFiles.length < 1
  ) {
    return (
      <>
        <SubNav currentFolder={currentFolder} />
        <Row>
          <Col md="12">
            <p className="text-center small text-center my-5">Empty Folder</p>
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
          <p className="text-center border-bottom py-2">Created Folders</p>
          <Row
            md="2"
            style={{ height: 'auto' }}
            className="pt-2  gap-2 pb-4 px-5">
            {!folders ? (
              <h1 className="text-center">Fetching Files....</h1>
            ) : (
              userFolders.map(({ data, docId }) => (
                <Col
                  onDoubleClick={() =>
                    changeRoute(`/dashboard/folder/${docId}`)
                  }
                  onClick={(e) => {
                    if (isItemSelected(docId)) {
                      dispatch(deselctFolder(docId));
                      e.currentTarget.style.background = '#fff';
                      e.currentTarget.classList.remove('text-white');
                      e.currentTarget.classList.remove('shadow-sm');
                    } else {
                      // dispatch(selectItem({ docId, data, type: 'folder' }));
                      dispatch(selectFolder({ docId, data }));
                      e.currentTarget.style.background = '#017bf562';
                      e.currentTarget.classList.add('text-white');
                      e.currentTarget.classList.add('shadow-sm');
                    }
                  }}
                  key={docId}
                  md={2}
                  className="border h-100 mr-2 d-flex align-items-center justify-content-around flex-column py-1 rounded-2">
                  <FontAwesomeIcon
                    icon={faFolder}
                    className="mt-3"
                    style={{ fontSize: '3rem' }}
                  />
                  <p className="text-center mt-3">{data.name}</p>
                </Col>
              ))
            )}
          </Row>
        </>
      )}
      {createdFiles && createdFiles.length > 0 && (
        <>
          <p className="text-center border-bottom py-2">Created Files</p>
          <Row
            md="2"
            style={{ height: 'auto' }}
            className="pt-2  gap-2 pb-4 px-5">
            {createdFiles.map(({ data, docId }) => (
              <Col
                onDoubleClick={() => changeRoute(`/dashboard/file/${docId}`)}
                onClick={(e) => {
                  if (isItemSelected(docId)) {
                    dispatch(deselectItem({ docId }));
                    e.currentTarget.style.background = '#fff';
                    e.currentTarget.classList.remove('text-white');
                    e.currentTarget.classList.remove('shadow-sm');
                  } else {
                    dispatch(selectItem({ docId, data, type: 'file' }));
                    e.currentTarget.style.background = '#017bf562';
                    e.currentTarget.classList.add('text-white');
                    e.currentTarget.classList.add('shadow-sm');
                  }
                }}
                key={docId}
                md={2}
                className="border h-100 mr-2 d-flex align-items-center justify-content-around flex-column py-1 rounded-2">
                <FontAwesomeIcon
                  icon={faFileAlt}
                  className="mt-3"
                  style={{ fontSize: '3rem' }}
                />
                <p className="text-center mt-3">{data.name}</p>
              </Col>
            ))}
          </Row>
        </>
      )}
      {uploadedFiles && uploadedFiles.length > 0 && (
        <>
          <p className="text-center border-bottom py-2">Uploaded Files</p>
          <Row
            md="2"
            style={{ height: 'auto' }}
            className="pt-2  gap-2 pb-4 px-5">
            {uploadedFiles.map(({ data, docId }) => (
              <Col
                onDoubleClick={() => changeRoute(`/dashboard/file/${docId}`)}
                onClick={(e) => {
                  if (isItemSelected(docId)) {
                    dispatch(deselectItem({ docId }));
                    e.currentTarget.style.background = '#fff';
                    e.currentTarget.classList.remove('text-white');
                    e.currentTarget.classList.remove('shadow-sm');
                  } else {
                    dispatch(selectItem({ docId, data, type: 'file' }));
                    e.currentTarget.style.background = '#017bf562';
                    e.currentTarget.classList.add('text-white');
                    e.currentTarget.classList.add('shadow-sm');
                  }
                }}
                key={docId}
                md={2}
                className="border h-100 mr-2 d-flex align-items-center justify-content-around flex-column py-1 rounded-2">
                <FontAwesomeIcon
                  icon={
                    data.name
                      .split('.')
                      [data.name.split('.').length - 1].includes('png') ||
                    data.name
                      .split('.')
                      [data.name.split('.').length - 1].includes('jpg') ||
                    data.name
                      .split('.')
                      [data.name.split('.').length - 1].includes('jpeg') ||
                    data.name
                      .split('.')
                      [data.name.split('.').length - 1].includes('svg') ||
                    data.name
                      .split('.')
                      [data.name.split('.').length - 1].includes('gif')
                      ? faFileImage
                      : data.name
                          .split('.')
                          [data.name.split('.').length - 1].includes('mp4') ||
                        data.name
                          .split('.')
                          [data.name.split('.').length - 1].includes('webm')
                      ? faFileVideo
                      : data.name
                          .split('.')
                          [data.name.split('.').length - 1].includes('mp3')
                      ? faFileAudio
                      : faFileAlt
                  }
                  className="mt-3"
                  style={{ fontSize: '3rem' }}
                />
                <p className="text-center mt-3">{data.name}</p>
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  );
};

export default FolderComponent;
