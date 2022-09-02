/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
// import SyncStorage from "sync-storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppContext } from "../../services/appProvider";
import API from "../../services/api";
import loginStyles from "../../styles/loginStyles";
import orderHistoryStyles from "../../styles/orderHistoryStyles";
import { useDispatch, useSelector } from "react-redux";
import commonStyles from "../../styles/common";
import { updateTotal, updateCart } from "../../redux/cartSlice";
import { useNavigation } from "@react-navigation/core";
import { BgWrapper } from "../../components/bgWrapper";

const api = new API();

export default function Checkout() {
  const ref = useRef();
  const navigation = useNavigation();
  const context = useContext(AppContext);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const total = useSelector((state) => state.cart.total);
  const [disabled, setDisabled] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (cartItems) dispatch(updateTotal());
  }, [cartItems]);

  const getItem = async () => {
    try {
      return await AsyncStorage.getItem("user_id");
    } catch (e) {
      console.log("ERROR:::", e);
    }
  };

  const handlePlaceOrder = async () => {
    setDisabled(true);
    context.setLoading(true);
    // let id = SyncStorage.get("user_id");
    let id = await getItem();

    if (!id) navigation.navigate("LoginStack");

    // api.createOrder(id, cartItems, total).then(res => {
    //   console.log(res);
    //   if (res && res === 'Order success') {

    // setOpenModal(true);
    // setTimeout(() => {
    //   dispatch(updateCart([]));
    //   dispatch(updateTotal(null));
    //   setOpenModal(false);
    //   ref.current?.scrollTo({y: 0, animated: true});
    //   navigation.navigate('Orders');
    // }, 3000);

    //   } else {
    // setDisabled(false);
    // context.setLoading(false);
    //   }
    // });
  };

  return (
    <BgWrapper>
      <SafeAreaView style={{ height: "100%" }}>
        <ScrollView ref={ref}>
          <View style={loginStyles.wrapper}>
            <Text style={[loginStyles.title, orderHistoryStyles.title]}>
              Order Summary
            </Text>

            <View style={orderHistoryStyles.container}>
              <View style={orderHistoryStyles.card}>
                {cartItems?.map((item, i) => (
                  <View key={i} style={orderHistoryStyles.innerWrapper}>
                    <View>
                      <Image
                        source={{ uri: item.img }}
                        style={{ width: 80, height: 120 }}
                      />
                    </View>

                    <View style={orderHistoryStyles.imgPrice}>
                      <Text>{item.name}</Text>

                      <Text style={{ marginTop: 15 }}>{item.price}</Text>
                    </View>

                    <Text style={{ marginRight: 15 }}>
                      Size:&nbsp;
                      {typeof item.size === "number"
                        ? item.size
                        : item.size.toUpperCase()}
                    </Text>

                    <Text style={{ marginRight: 15 }}>x{item.qty}</Text>
                  </View>
                ))}
                <View style={{ marginTop: 20 }}>
                  <Text style={{ fontSize: 16, textAlign: "right" }}>
                    {`Items Total: HKD$${total}`}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>

        {!openModal && (
          <View style={styles.checkoutBtn}>
            <TouchableOpacity
              disabled={disabled}
              style={commonStyles.blockBtn}
              onPress={handlePlaceOrder}
            >
              <Text style={commonStyles.label}>Pay and Place Order</Text>
            </TouchableOpacity>
          </View>
        )}

        {openModal && (
          <View style={styles.darkBg}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={openModal}
              onRequestClose={() => {
                setOpenModal(false);
              }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={styles.modalText}>
                    Your order is placed successfully!
                  </Text>
                </View>
              </View>
            </Modal>
          </View>
        )}
      </SafeAreaView>
    </BgWrapper>
  );
}

const styles = StyleSheet.create({
  darkBg: {
    backgroundColor: "#000",
    opacity: 0.8,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: Dimensions.get("window").height,
  },
  checkoutBtn: {
    position: "relative",
    alignSelf: "center",
    marginVertical: 20,
    width: Dimensions.get("window").width - 30,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    // borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
