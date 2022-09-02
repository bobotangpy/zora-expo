import React, { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/navigation/AppNavigator";
// import SyncStorage from "sync-storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Theme } from "./src/utilities/themes";
import { calculateHoroscope } from "./src/utilities/utils";
import { images } from "./src/utilities/images";
import moment from "moment";
import useColorScheme from "react-native/Libraries/Utilities/useColorScheme";

const App = () => {
  const userTheme = useColorScheme();
  const [sign, setSign] = useState();
  const [imgPath, setImgPath] = useState();

  useEffect(() => {
    initStorage();
  }, []);

  useEffect(() => {
    if (sign) {
      setMonthSign(sign);
      // Storage.set("monthSign", sign);
      let signName = sign.toLowerCase();
      setImgPath(images.signName);
    }
    console.log("THIS month is => ", sign);
  }, [sign]);

  useEffect(() => {
    if (imgPath) setPath(imgPath);
    // Storage.set("imgPath", imgPath);
  }, [imgPath]);

  const setMonthSign = async (sign) => {
    try {
      await AsyncStorage.setItem("monthSign", sign);
    } catch (e) {
      console.log("ERROR:::", e);
    }
  };

  const setPath = async (imgPath) => {
    try {
      await AsyncStorage.setItem("imgPath", imgPath);
    } catch (e) {
      console.log("ERROR:::", e);
    }
  };

  const initStorage = async () => {
    // const data = await SyncStorage.init();
    console.log("AsyncStorage is ready!", data);

    let date = moment().format("YYYY-MM-DD");
    let month = Number(date.split("-")[1]);
    let day = Number(date.split("-")[2]);
    let sign = await calculateHoroscope(month, day);
    setSign(sign);
  };

  return (
    <SafeAreaProvider>
      <NavigationContainer theme={Theme}>
        {sign && <AppNavigator userTheme={userTheme} />}
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
