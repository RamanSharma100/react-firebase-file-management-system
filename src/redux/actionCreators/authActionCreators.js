import { toast } from "react-toastify";
import { auth, database } from "../../API/firebase";
import userModel from "../../models/users";
import { RESET_USER, SET_USER } from "../actions/authActions";

const setUser = (data) => ({
  type: SET_USER,
  payload: data,
});

const resetUser = () => ({
  type: RESET_USER,
});

export const registerUser =
  ({ name, email, password }, setError) =>
  (dispatch) => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        setError("");
        const newUser = userModel(email, name, user.user.uid);
        auth.currentUser.updateProfile({
          displayName: name,
        });

        database.users.add(newUser).then((usr) => {
          dispatch(
            setUser({
              userId: user.user.uid,
              user: { data: user.user.providerData[0] },
            })
          );
          toast.success("User registered successfully!!");
        });
      })
      .catch((err) => {
        console.log(err);
        if (err.code === "auth/email-already-in-use") {
          setError("Email Already Exists!");
        }
      });
  };

export const getUser = () => (dispatch) => {
  auth.onAuthStateChanged(function (user) {
    if (user) {
      dispatch(
        setUser({
          userId: auth.currentUser.uid,
          user: { data: auth.currentUser.providerData[0] },
        })
      );
    } else {
      dispatch(resetUser());
    }
  });
};
