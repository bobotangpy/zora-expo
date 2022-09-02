/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import { useRoute } from "@react-navigation/core";
import React, { useContext, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import ProductCard from "../components/card";
import { AppContext } from "../services/appProvider";
import { BgWrapper } from "../components/bgWrapper";
import Loading from "../components/loading";
import _ from "lodash";
import API from "../services/api";
import { useDispatch, useSelector } from "react-redux";
import { updateStyle } from "../redux/styleSlice";
import {
  updateTopsData,
  updateBottomsData,
  updateDressSuitsData,
  updateShoesData,
} from "../redux/productsDataSlice";
// import SyncStorage from 'sync-storage';
import AsyncStorage from "@react-native-async-storage/async-storage";

const api = new API();

const styleBtns = [
  { id: 1, type: "trending", title: "Trending" },
  { id: 2, type: "casual", title: "Casual" },
  { id: 3, type: "formal", title: "Formal" },
  { id: 4, type: "goingOut", title: "Going-out-out" },
];

export default function Category() {
  const ref = useRef();
  const route = useRoute();
  const dispatch = useDispatch();
  const context = useContext(AppContext);
  const mainCat = route.params.mainCat;
  const subCat = useSelector((state) => state.subCat.selectedSubCat);
  const style = useSelector((state) => state.style.selectedStyle);
  // const userSign = SyncStorage.get("horoscope");
  const [items, setItems] = useState();
  const [filteredItems, setFilteredItems] = useState(null);

  const userSign = async () => {
    return await AsyncStorage.get("horoscope");
  };

  useEffect(() => {
    ref.current?.scrollTo({ y: 0, animated: true });

    if (!style) {
      dispatch(updateStyle("trending"));
    }

    if (subCat && userSign) {
      updateSuggestions(subCat, getGenderId(mainCat));
    }

    api
      .queryAllProducts()
      .then((res) => {
        if (res) {
          setItems(res);
        }
      })
      .catch((err) => console.log("Get Products Err:", err));
  }, []);

  useEffect(() => {
    if (filteredItems) {
      ref.current?.scrollTo({ y: 0, animated: true });
      if (context.loading) context.setLoading(false);
    }
  }, [filteredItems]);

  useEffect(() => {
    if (subCat && userSign) {
      updateSuggestions(subCat, getGenderId(mainCat));
    }

    if (items) {
      let filtered = filterItemsForDisplay(items, mainCat);

      if (mainCat === "horoscope") {
        let styleData;
        styleData = filterStyleItems(filtered, style);
        return setFilteredItems(_.sortBy(styleData, "gender_id"));
      } else {
        let d = filterSubCatItems(filtered, subCat);
        let d2 = filterStyleItems(d, style);
        return setFilteredItems(d2);
      }
    }
  }, [items, mainCat, subCat, style]);

  const getGenderId = (gender) => {
    if (gender === "men") {
      return 0;
    } else if (gender === "women") {
      return 1;
    }
  };

  const filterItemsForDisplay = (data, category) => {
    let dataArr = [];

    switch (category) {
      case "horoscope":
        _.map(data, (item) => {
          if (item.horoscope_id === context.monthSign) {
            dataArr.push(item);
          }
        });
        break;
      case "women":
        _.map(data, (item) => {
          if (item.gender_id === 1) dataArr.push(item);
        });
        break;
      case "men":
        _.map(data, (item) => {
          if (item.gender_id === 0) dataArr.push(item);
        });
        break;
      default:
        break;
    }
    // Remove duplicate items (same name)
    let d = _.filter(
      dataArr,
      (elm, i, arr) => arr.findIndex((item) => item.name === elm.name) === i
    );
    // console.log("mainCat", d);
    return d;
  };

  const filterSubCatItems = (data, subCat) => {
    let dataArr = [];

    switch (subCat) {
      case "dressSuits":
        _.map(data, (item) => {
          if (item.type_id == 0) dataArr.push(item);
        });
        break;
      case "shoes":
        _.map(data, (item) => {
          if (item.type_id == 1) dataArr.push(item);
        });
        break;
      case "tops":
        _.map(data, (item) => {
          if (item.type_id == 2) dataArr.push(item);
        });
        break;
      case "bottoms":
        _.map(data, (item) => {
          if (item.type_id == 3) dataArr.push(item);
        });
        break;
      default:
        break;
    }
    return dataArr;
  };

  const filterStyleItems = (data, style) => {
    // console.log(data);
    let dataArr = [];

    switch (style) {
      case "trending":
        _.map(data, (item) => {
          if (item.style_id == 0) dataArr.push(item);
        });
        break;
      case "casual":
        _.map(data, (item) => {
          if (item.style_id == 1) dataArr.push(item);
        });
        break;
      case "formal":
        _.map(data, (item) => {
          if (item.style_id == 2) dataArr.push(item);
        });
        break;
      case "goingOut":
        _.map(data, (item) => {
          if (item.style_id == 3) dataArr.push(item);
        });
        break;
      default:
        break;
    }
    return dataArr;
  };

  const updateSuggestions = (subCat, genderId) => {
    let subCat_id;

    subCat === "dressSuits"
      ? (subCat_id = 0)
      : subCat === "shoes"
      ? (subCat_id = 1)
      : subCat === "tops"
      ? (subCat_id = 2)
      : subCat === "bottoms"
      ? (subCat_id = 3)
      : "";

    // if (genderId && userSign) {
    // console.log(mainCat, genderId, subCat_id);
    api.querySuggestions(userSign, genderId, subCat_id).then((res) => {
      console.log("RES:::", res);
      if (res && Array.isArray(res)) {
        subCat_id == 0
          ? dispatch(updateDressSuitsData(res))
          : subCat_id == 1
          ? dispatch(updateShoesData(res))
          : subCat_id == 2
          ? dispatch(updateTopsData(res))
          : subCat_id == 3
          ? dispatch(updateBottomsData(res))
          : "";
      }
    });
    // }
  };

  return (
    <BgWrapper>
      <View style={styles.view}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ height: 0 }}
        >
          <View style={styles.styleWrapper}>
            {styleBtns.map((item, i) => (
              <TouchableOpacity
                key={i}
                style={[
                  styles.btnWrapper,
                  {
                    backgroundColor:
                      style === item.type
                        ? "rgba(255, 255, 255, 1)"
                        : "rgba(255, 255, 255, 0.8)",
                  },
                ]}
                onPress={() => {
                  dispatch(updateStyle(item.type));
                }}
              >
                <Text
                  style={[
                    styles.styleBtn,
                    { color: style === item.type ? "#00296b" : "#003791" },
                  ]}
                >
                  {item.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        <ScrollView style={{ height: 600 }} ref={ref}>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              marginBottom: 120,
            }}
          >
            <ProductCard data={filteredItems} />
          </View>
        </ScrollView>
      </View>

      {context.loading && <Loading />}
    </BgWrapper>
  );
}

const styles = {
  view: {
    height: Dimensions.get("screen").height - 50,
  },
  styleWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
    overflow: "scroll",
  },
  btnWrapper: {
    width: 86,
    height: 86,
    justifyContent: "center",
    borderRadius: 86 / 2,
    marginHorizontal: 5,
  },
  styleBtn: {
    fontSize: 13.8,
    fontWeight: "normal",
    textAlign: "center",
    color: "#00296b",
  },
};
