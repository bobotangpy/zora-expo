/* eslint-disable react-native/no-inline-styles */
import { useNavigation } from "@react-navigation/core";
import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Image,
  Dimensions,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from "react-native";
import { useDispatch } from "react-redux";
import { updateMainCat } from "../redux/mainCatSlice";
import commonStyles from "../styles/common.js";

const banners = [
  { img: require("../assets/imgs/horoscope2.jpg"), mainCat: "horoscope" },
  { img: require("../assets/imgs/women1.jpg"), mainCat: "women" },
  { img: require("../assets/imgs/men1.jpg"), mainCat: "men" },
];

const Title = ({ mainCat }) => {
  let txt =
    mainCat === "horoscope"
      ? "Horoscope of the Month"
      : mainCat === "women"
      ? "Shop Women"
      : mainCat === "men"
      ? "Shop Men"
      : "";

  let imgPath = SyncStorage.get("imgPath");

  return (
    <View style={styles.title}>
      <Text
        style={[
          commonStyles.lightTxt,
          {
            fontSize: 28,
            textDecorationLine: "underline",
            marginBottom: 0,
            backgroundColor: "#000",
            opacity: 0.8,
          },
        ]}
      >
        {txt}
      </Text>
      {mainCat === "horoscope" && (
        <View
          style={[
            styles.title,
            {
              flexDirection: "row",
              height: "40%",
            },
          ]}
        >
          <Text
            style={[
              commonStyles.lightTxt,
              { fontSize: 28, backgroundColor: "#000", opacity: 0.8 },
            ]}
          >
            {SyncStorage.get("monthSign")}
          </Text>
          <Image
            source={imgPath}
            style={{
              width: 40,
              height: 40,
            }}
          />
        </View>
      )}
    </View>
  );
};

export default function Home() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  return (
    <ImageBackground
      source={require("../assets/images/starryBg.jpeg")}
      style={{ width: "100%", height: "100%" }}
    >
      <View
        style={[
          commonStyles.overlay,
          {
            height: "100%",
            width: "100%",
          },
        ]}
      >
        {banners.map((item, i) => (
          <View key={i} style={{ flex: 1 }}>
            <TouchableOpacity
              onPress={() => {
                dispatch(updateMainCat(item.mainCat));
                item.mainCat === "horoscope"
                  ? navigation.navigate("Category", { mainCat: "horoscope" })
                  : navigation.navigate("SubCategory");
              }}
            >
              <ImageBackground
                source={item.img}
                style={{
                  height: "100%",
                  width: Dimensions.get("window").width,
                  resizeMode: "cover",
                }}
              >
                <Title mainCat={item.mainCat} />
                {/* TODO: overlay => hide month sign icon */}
                <ImageBackground style={styles.overlay}></ImageBackground>
              </ImageBackground>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  title: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    flex: 1,
    width: null,
    height: null,
    backgroundColor: "#000",
    opacity: 0.2,
  },
});
