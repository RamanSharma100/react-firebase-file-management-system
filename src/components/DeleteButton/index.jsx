import React from 'react';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { deleteItems } from '../../redux/actionCreators/filefoldersActionCreators';

const DeleteButton = ({ currentFolder }) => {
  const dispatch = useDispatch();
  const { userId, selectedItems } = useSelector(
    (state) => ({
      userId: state.auth.userId,
      selectedItems: state.filefolders.selectedItems,
    }),
    shallowEqual
  );

  const handleFileSubmit = () => {
    dispatch(deleteItems());
  };

  if (selectedItems.length === 0) {
    return null;
  }

  return (
    <Button
      onClick={() => handleFileSubmit()}
      variant="danger"
      className="border-1 d-flex align-items-center justify-content-between rounded-2">
      <FontAwesomeIcon icon={faTrashAlt} />
      &nbsp; Delete {selectedItems.length > 1 ? 'Items' : 'Item'}
    </Button>
  );
};

export default DeleteButton;
