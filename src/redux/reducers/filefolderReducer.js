import {
  ADD_USER_FILE,
  ADD_USER_FOLDER,
  RESET_FOLDERS_FILES,
  SELECT_ITEM,
  SELECT_ITEMS,
  DESELECT_ITEM,
  DESELECT_ITEMS,
  DESELECT_ALL,
  SET_ADMIN_FILES,
  SET_ADMIN_FOLDERS,
  SET_LOADING,
  SET_USER_FILES,
  SET_USER_FOLDERS,
  UPDATE_USER_FILE_DATA,
  DELETE_FILES,
  DELETE_FOLDERS,
} from '../actions/filefoldersActions';

const initialState = {
  isLoading: true,
  folder: 'root',
  userFolders: null,
  userFiles: null,
  adminFolders: null,
  adminFiles: null,
  selectedItems: [],
};

const filefolderReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_LOADING:
      state = { ...state, isLoading: payload };
      return state;
    case SET_ADMIN_FILES:
      state = { ...state, adminFiles: payload };
      return state;
    case SET_ADMIN_FOLDERS:
      state = { ...state, adminFolders: payload };
      return state;
    case SET_USER_FOLDERS:
      state = { ...state, userFolders: payload };
      return state;
    case ADD_USER_FOLDER:
      state = { ...state, userFolders: [...state.userFolders, payload] };
      return state;
    case RESET_FOLDERS_FILES:
      state = initialState;
      return state;
    case SET_USER_FILES:
      state = { ...state, userFiles: payload };
      return state;
    case ADD_USER_FILE:
      state = { ...state, userFiles: [...state.userFiles, payload] };
      return state;
    case UPDATE_USER_FILE_DATA:
      const currentUserFile = state.userFiles.find(
        (file) => file.docId === payload.docId
      );
      currentUserFile.data.data = payload.data;
      state = {
        ...state,
        userFiles: state.userFiles.map((file) =>
          file.docId === payload.docId ? currentUserFile : file
        ),
      };
      return state;
    case SELECT_ITEM:
      state = { ...state, selectedItems: [...state.selectedItems, payload] };
      return state;
    case SELECT_ITEMS:
      state = { ...state, selectedItems: [...state.selectedItems, ...payload] };
      return state;
    case DESELECT_ITEM:
      state = {
        ...state,
        selectedItems: state.selectedItems.filter(
          (item) => item.docId !== payload.docId
        ),
      };
      return state;
    case DESELECT_ITEMS:
      state = {
        ...state,
        selectedItems: state.selectedItems.filter(
          (item) => !payload.includes(item.docId)
        ),
      };
      return state;
    case DESELECT_ALL:
      state = { ...state, selectedItems: [] };
      return state;
    case DELETE_FILES:
      state = {
        ...state,
        userFiles: state.userFiles.filter(
          (file) => !payload.includes(file.docId)
        ),
      };
      return state;
    case DELETE_FOLDERS:
      state = {
        ...state,
        userFolders: state.userFolders.filter(
          (folder) => !payload.includes(folder.docId)
        ),
      };
      return state;
    default:
      return state;
  }
};
export default filefolderReducer;
