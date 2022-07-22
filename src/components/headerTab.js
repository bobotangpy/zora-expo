import React from "react";
import { Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/core";
import "react-native-gesture-handler";

export const HeaderTitle = () => {
  const navigation = useNavigation();

  return (
    <Text style={styles.text} onPress={() => navigation.navigate("HomeScreen")}>
      Zora
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    textAlign: "center",
    fontSize: 19,
    fontWeight: "bold",
    color: "#00296b",
  },
});
