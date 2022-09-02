import { createSlice } from "@reduxjs/toolkit";
import API from "../services/api";
// import SyncStorage from "sync-storage";
import AsyncStorage from "@react-native-async-storage/async-storage";

const api = new API();

// Slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    // isAuthenticated: SyncStorage.get('user_token'),
    // userId: SyncStorage.get('user_id'),
    // userName: SyncStorage.get('username'),
    // userSign: SyncStorage.get('horoscope'),
    isAuthenticated: async () => await AsyncStorage.getItem("user_token"),
    userId: async () => await AsyncStorage.getItem("user_id"),
    userName: async () => await AsyncStorage.getItem("username"),
    userSign: async () => await AsyncStorage.getItem("horoscope"),
    msg: null,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = action.payload.token;
      state.userId = action.payload.id;
      state.userName = action.payload.username;
      state.userSign = action.payload.horoscope;
      state.msg = null;
    },
    loginFailed: (state) => {
      state.isAuthenticated = false;
      state.msg = "Incorrect Email or Password";
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.userId = null;
      state.userName = null;
      state.userSign = null;
    },
  },
});
export default authSlice.reducer;

// Actions
const { loginSuccess, loginFailed, logout } = authSlice.actions;

export const loginUser = (email, password) => async (dispatch) => {
  try {
    await api.login(email, password).then((res) => {
      if (res) {
        // console.log('res:::', res);

        if (res === "Wrong Email or Password") {
          dispatch(loginFailed());
        } else if (res.token) {
          // SyncStorage.set('user_token', res.token);
          // SyncStorage.set('user_id', res.id);
          // SyncStorage.set('username', res.name);
          // SyncStorage.set('email', email);
          // SyncStorage.set('horoscope', res.horoscope);
          await AsyncStorage.setItem("user_token", res.token);
          await AsyncStorage.setItem("user_id", res.id);
          await AsyncStorage.setItem("username", res.name);
          await AsyncStorage.setItem("email", email);
          await AsyncStorage.setItem("horoscope", res.horoscope);
          await dispatch(loginSuccess(res));
        }
      }
    });
  } catch (e) {
    return console.error(e.message);
  }
};

export const logoutUser = async () => {
  return (dispatch) => {
    console.log("logging out");
    // SyncStorage.remove("user_token");
    // SyncStorage.remove("user_id");
    // SyncStorage.remove("username");
    // SyncStorage.remove("email");
    // SyncStorage.remove("horoscope");
    // SyncStorage.remove("cartItems");
    await AsyncStorage.removeItem("user_token");
    await AsyncStorage.removeItem("user_id");
    await AsyncStorage.removeItem("username");
    await AsyncStorage.removeItem("email");
    await AsyncStorage.removeItem("horoscope");
    await AsyncStorage.removeItem("cartItems");

    await dispatch(logout());
  };
};
