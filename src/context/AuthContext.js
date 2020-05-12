import createDataContext from "./createDataContext";
import trackerAPI from "../api/tracker";
import { AsyncStorage } from "react-native";
import { navigate } from "../navigationRef";

const authReducer = (state, action) => {
  switch (action.type) {
    case "add_error":
      return { ...state, errorMessage: action.payload };
    case "signup":
      return { token: action.payload };
    default:
      return state;
  }
};

const signUp = (dispatch) => async ({ email, password }) => {
  try {
    const response = await trackerAPI.post("/signup", { email, password });
    await AsyncStorage.setItem("token", response.data.token);
    dispatch({ type: "signup", payload: response.data.token });
    navigate("TrackList");
  } catch (err) {
    dispatch({ type: "add_error", payload: "Email already exists" });
  }
};

const signIn = (dispatch) => ({ email, password }) => {};

const signOut = (dispatch) => () => {};

export const { Provider, Context } = createDataContext(
  authReducer,
  {
    signIn,
    signUp,
    signOut,
  },
  {
    token: null,
    errorMessage: "",
  }
);
