import React from "react";
import { useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { useSelector } from "react-redux";
import Home from "../screens/_Home";
import Profile from "../screens/user/Profile";
import Login from "../screens/Login";
import Signup from "../screens/Signup.js";
import Cart from "../screens/user/Cart";
import Checkout from "../screens/user/Checkout";
import OrderHistory from "../screens/user/OrderHistory";
import CategoryTab from "../components/categoryTab";
import Category from "../screens/Category";
import ProductInfo from "../screens/ProductInfo";
import { HeaderTitle } from "../components/headerTab";
import "react-native-gesture-handler";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import { reduxStore } from "../redux/_index";
import SyncStorage from "sync-storage";

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

const HomeStackScreen = () => {
  const navigation = useNavigation();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        options={{
          headerTitle: () => <HeaderTitle />,
          headerLeft: () => <></>,
        }}
        component={Home}
      />
      <Stack.Screen
        name="SubCategory"
        options={{
          headerTitle: () => <HeaderTitle />,
          headerLeft: () => <></>,
        }}
        component={CategoryTab}
      />
      <Stack.Screen
        name="Category"
        options={{
          headerTitle: () => <HeaderTitle />,
          headerLeft: () => <></>,
        }}
        component={Category}
      />
      <Stack.Screen
        name="ProductInfo"
        component={ProductInfo}
        options={{
          headerTitle: () => <HeaderTitle />,
          headerLeft: () => (
            <Entypo
              onPress={() => navigation.goBack()}
              name="chevron-thin-left"
              color={"#00296b"}
              size={25}
              style={{ marginLeft: 10 }}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const LoginStackScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          unmountOnBlur: true,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{
          unmountOnBlur: true,
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

const CartStackScreen = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ShoppingBag"
        options={{ headerShown: false }}
        component={Cart}
      />
      {cartItems && cartItems.length > 0 && (
        <Stack.Screen
          name="Checkout"
          options={{ headerShown: false, unmountOnBlur: true }}
          component={Checkout}
        />
      )}
      <Stack.Screen
        name="LoginStack"
        component={LoginStackScreen}
        options={{ headerShown: false, unmountOnBlur: true }}
      />
    </Stack.Navigator>
  );
};

const BottomTabNavigator = ({ userTheme }) => {
  const navigation = useNavigation();
  const cartItems = useSelector((state) => state.cart.cartItems);
  // console.log({ userTheme });

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          route.name === "Home"
            ? (iconName = "home")
            : route.name === "Profile"
            ? (iconName = "user")
            : route.name === "Cart"
            ? (iconName = "shoppingcart")
            : (iconName = "profile");

          // You can return any component that you like here!
          return <AntDesign name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#00509d",
        tabBarInactiveTintColor: "gray",
        headerTitle: () => <HeaderTitle />,
        // headerTintColor: userTheme === "light" ? "black" : "white",
        // headerStyle: {
        //   backgroundColor: userTheme === "light" ? "white" : "black",
        // },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Profile"
        component={
          // reduxStore.getState().auth.isAuthenticated
          SyncStorage.get("user_token") &&
          SyncStorage.get("user_token") !== undefined
            ? Profile
            : LoginStackScreen
        }
        options={{
          unmountOnBlur: !SyncStorage.get("user_token") ? true : false,
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartStackScreen}
        options={cartItems.length > 0 ? { tabBarBadge: cartItems.length } : ""}
        listeners={{
          tabPress: () => {
            navigation.navigate("Cart");
          },
        }}
      />
      <Tab.Screen name="Orders" component={OrderHistory} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
