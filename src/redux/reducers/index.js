import { combineReducers } from "redux";

import authReducer from "./authReducer";
import fileFoldersReducer from "./fileFoldersReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  filefolders: fileFoldersReducer,
});

export default rootReducer;
