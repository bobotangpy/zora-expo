import React from "react";
import "react-native-gesture-handler";
import BottomTabNavigator from "./BottomTabNav.js";

import { Provider } from "react-redux";
import { reduxStore } from "../redux/_index";
import { AppProvider } from "../services/appProvider";

const AppNavigator = ({ userTheme }) => {
  return (
    <Provider store={reduxStore}>
      <AppProvider>
        <BottomTabNavigator userTheme={userTheme} />
      </AppProvider>
    </Provider>
  );
};

export default AppNavigator;
