import {
  ADD_USER_FOLDER,
  RESET_FOLDERS_FILES,
  SET_ADMIN_FILES,
  SET_ADMIN_FOLDERS,
  SET_LOADING,
  SET_USER_FOLDERS,
} from "../actions/filefoldersActions";

const initialState = {
  isLoading: true,
  folder: "root",
  userFolders: null,
  userFiles: null,
  adminFolders: null,
  adminFiles: null,
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
    default:
      return state;
  }
};
export default filefolderReducer;
