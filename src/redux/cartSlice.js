import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";
// import SyncStorage from "sync-storage";
import AsyncStorage from "@react-native-async-storage/async-storage";

const createItems = async (items) => {
  try {
    await AsyncStorage.setItem("cartItems", items);
  } catch (e) {
    console.log("ERROR:::", e);
  }
};
const getItems = async () => {
  try {
    return await AsyncStorage.getItem("cartItems");
  } catch (e) {
    console.log("ERROR:::", e);
  }
};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    // cartItems: SyncStorage.get("cartItems") || [],
    cartItems: (await getItems("cartItems")) || [],
    total: null,
  },
  reducers: {
    updateCart: (state, action) => {
      state.cartItems = action.payload;
      // Update localStorage to persist data when page refresh
      // SyncStorage.set("cartItems", state.cartItems);
      createItems(state.cartItems);
    },
    deleteItem: (state, action) => {
      _.remove(state.cartItems, (item) => {
        return (
          item.id === action.payload.id && item.size === action.payload.size
        );
      });
      // SyncStorage.set("cartItems", state.cartItems);
      createItems(state.cartItems);
    },
    updateTotal: (state) => {
      let prices = [];
      if (state.cartItems.length > 0) {
        _.forEach(state.cartItems, (item) => {
          prices.push(Number(item.price.split("$")[1].replaceAll(",", "")));
        });

        let t = _.reduce(
          prices,
          (sum, i) => {
            return sum + i;
          },
          0
        );

        state.total = t.toFixed(2);
      }
    },
  },
});

export const { updateCart, deleteItem, updateTotal } = cartSlice.actions;

export default cartSlice.reducer;
