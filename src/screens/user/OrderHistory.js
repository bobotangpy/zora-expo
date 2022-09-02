/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { View, Text, SafeAreaView, ScrollView, Image } from "react-native";
// import SyncStorage from "sync-storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppContext } from "../../services/appProvider";
import API from "../../services/api";
import moment from "moment";
import loginStyles from "../../styles/loginStyles";
import orderHistoryStyles from "../../styles/orderHistoryStyles";
import LottieView from "lottie-react-native";
import Loading from "../../components/loading";
import { BgWrapper } from "../../components/bgWrapper";
import commonStyles from "../../styles/common";

const api = new API();

export default function OrderHistory() {
  const context = useContext(AppContext);
  const [userId, setUserId] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const getId = async () => {
    try {
      return await AsyncStorage.getItem("user_id");
    } catch (e) {
      console.log("ERROR:::", e);
    }
  };

  useEffect(() => {
    // setUserId(SyncStorage.get("user_id"));
    let res = await getId();
    setUserId(res);
  }, []);

  useEffect(() => {
    if (userId) {
      context.setLoading(true);
      api
        .queryOrderHistory(userId)
        .then((res) => {
          // console.log(res);
          if (res && res.length > 0) {
            setHistory(res);
          } else return;
        })
        .catch((err) => {
          console.log("Query order history err:::", err);
        })
        .finally(() => context.setLoading(false));
    } else context.setLoading(false);
  }, [userId]);

  return (
    <BgWrapper>
      <SafeAreaView>
        <ScrollView style={{ height: "100%" }}>
          <View style={loginStyles.wrapper}>
            <Text style={[loginStyles.title, orderHistoryStyles.title]}>
              Orders
            </Text>

            <View style={orderHistoryStyles.container}>
              {history?.length > 0 ? (
                history.map((order, i) => (
                  <View key={i} style={orderHistoryStyles.card}>
                    <View>
                      <Text
                        style={{
                          fontSize: 16,
                          marginBottom: 15,
                          color: "#888",
                        }}
                      >
                        Order Date:&nbsp;
                        {moment(order.date).format("YYYY MMM DD HH:mm")}
                      </Text>
                    </View>

                    {order.orderItems.map((item, i) => (
                      <View key={i} style={orderHistoryStyles.innerWrapper}>
                        <View>
                          <Image
                            source={{ uri: item.products.img }}
                            style={{ width: 80, height: 120 }}
                          />
                        </View>

                        <View style={orderHistoryStyles.imgPrice}>
                          <Text>{item.products.name}</Text>

                          <Text style={{ marginTop: 15 }}>{item.price}</Text>
                        </View>

                        <Text style={{ marginRight: 15 }}>
                          {item.size.toUpperCase()}
                        </Text>

                        <Text style={{ marginRight: 15 }}>
                          x{item.quantity}
                        </Text>
                      </View>
                    ))}
                    <View style={{ marginTop: 20 }}>
                      <Text style={{ fontSize: 16, textAlign: "right" }}>
                        Items Total: HKD${order.orderItems[0].total}
                      </Text>
                    </View>
                  </View>
                ))
              ) : (
                <View style={{ marginTop: 50 }}>
                  {!context.loading && (
                    <Text
                      style={[commonStyles.lightTxt, { textAlign: "center" }]}
                    >
                      No order history.
                    </Text>
                  )}
                </View>
              )}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>

      {context.loading && <Loading />}
    </BgWrapper>
  );
}
