import React, { createContext, useState, useEffect } from "react";
import { calculateHoroscope } from "../utilities/utils";
import moment from "moment";
import Loading from "../components/loading";
// import SyncStorage from "sync-storage";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [monthSign, setMonthSign] = useState(null);
  const [username, setUsername] = useState(null);
  const [userSign, setUserSign] = useState(null);
  const [userId, setUserId] = useState(null);
  const [bg, setBg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fullWidth, setFullWidth] = useState(true);
  const [loggedOut, setLoggedOut] = useState(true);

  const getItem = async (item) => {
    try {
      return await AsyncStorage.getItem(item);
    } catch (e) {
      console.log("ERROR:::", e);
    }
  };

  useEffect(() => {
    if (getItem("horoscope")) setUserSign(getItem("horoscope"));

    let date = moment().format("YYYY-MM-DD");
    let month = Number(date.split("-")[1]);
    let day = Number(date.split("-")[2]);
    let sign = calculateHoroscope(month, day);
    setMonthSign(sign);
    console.log("THIS month is => ", sign);

    typeof window !== "undefined" && window.innerWidth <= 1024
      ? setFullWidth(false)
      : setFullWidth(true);
  }, []);

  useEffect(() => {
    console.log({ loading });
  }, [loading]);

  useEffect(() => {
    console.log({ userSign }, { loggedOut });

    userSign && !loggedOut
      ? setBg({
          margin: 0,
          background: `linear-gradient(rgba(255,255,255,.1), rgba(255,255,255,.1)), url('/assets/images/backgound/${userSign}_bg.png') center left fixed`,
          // minHeight: '100vh',
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          paddingBottom: "50px",
        })
      : setBg({
          margin: 0,
          background:
            'linear-gradient(rgba(255,255,255,.1), rgba(255,255,255,.1)), url("/assets/images/landing/landing_bg.jpg") no-repeat center',
          backgroundSize: "cover",
          // minHeight: 'calc(100vh - 90px)',
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
        });
  }, [userSign, loggedOut]);

  const values = {
    monthSign,
    username,
    userSign,
    userId,
    bg,
    loading,
    fullWidth,
    loggedOut,
    setUsername,
    setUserSign,
    setUserId,
    setLoading,
    setFullWidth,
    setLoggedOut,
  };

  return (
    <AppContext.Provider value={values}>
      {loading && <Loading />}
      {children}
    </AppContext.Provider>
  );
};
