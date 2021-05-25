import { toast } from "react-toastify";
import { auth, database } from "../../API/firebase";
import docModel from "../../models/docs";
import {
  SET_LOADING,
  SET_ADMIN_FILES,
  SET_ADMIN_FOLDERS,
  SET_USER_FOLDERS,
  ADD_USER_FOLDER,
} from "../actions/filefoldersActions";

const setLoading = (data) => ({
  type: SET_LOADING,
  payload: data,
});
const setAdminFiles = (data) => ({
  type: SET_ADMIN_FILES,
  payload: data,
});
const setAdminFolders = (data) => ({
  type: SET_ADMIN_FOLDERS,
  payload: data,
});

export const getAdminFolders = () => (dispatch) => {
  dispatch(setLoading(true));

  database.docs
    .where("createdBy", "==", "admin")
    .get()
    .then((folders) => {
      const allFolders = [];
      folders.docs.forEach((doc) => {
        allFolders.push({ data: doc.data(), docId: doc.id });
      });
      dispatch(setAdminFolders(allFolders));
      dispatch(setLoading(false));
    })
    .catch((err) => {
      toast.error("Failed to fetch data!");
    });
};
export const getAdminFiles = () => (dispatch) => {
  database.files
    .where("createdBy", "==", "admin")
    .get()
    .then((files) => {
      const allFiles = [];
      files.docs.forEach((doc) => {
        allFiles.push({ data: doc.data(), docId: doc.id });
      });
      dispatch(setAdminFiles(allFiles));
    })
    .catch((err) => {
      toast.error("Failed to fetch data!");
    });
};

const setUserFolders = (data) => ({
  type: SET_USER_FOLDERS,
  payload: data,
});

export const getUserFolders = (userId) => async (dispatch) => {
  if (userId) {
    database.docs
      .where("createdBy", "==", userId)
      .get()
      .then((folders) => {
        const allFolders = [];
        folders.docs.forEach((doc) => {
          allFolders.push({ data: doc.data(), docId: doc.id });
        });
        dispatch(setUserFolders(allFolders));
      })
      .catch((err) => {
        console.log("foldererr", err);
        toast.error("Failed to fetch data!");
      });
  }
};

const addUserFolder = (data) => ({
  type: ADD_USER_FOLDER,
  payload: data,
});

export const addFolderUser = (name, userId, parent, path) => (dispatch) => {
  database.docs
    .add(docModel(userId, name, path, parent))
    .then(async (doc) => {
      const data = await doc.get();
      dispatch(addUserFolder({ data: data.data(), docId: data.id }));
      toast.success("Folder added Successfully!");
    })
    .catch((err) => {
      console.log(err);
      toast.error("Something went wrong!");
    });
};
