import React, {useState} from 'react';
// import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
// import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
// import {DrawerActions} from '@react-navigation/native';
// import {createDrawerNavigator} from '@react-navigation/drawer';
import 'react-native-gesture-handler';
// import Entypo from 'react-native-vector-icons/Entypo';
// import Home from '../screens/_Home.js';
// import Category from '../screens/Category';
// import ProductInfo from '../screens/ProductInfo';
// import Login from '../screens/Login';
// import Signup from '../screens/Signup.js';
// import {HeaderMenu, HeaderTitle} from '../components/headerTab';
import BottomTabNavigator from './BottomTabNav.js';

import {Provider} from 'react-redux';
import {reduxStore} from '../redux/_index';
// import {useDispatch} from 'react-redux';
// import {resetMainCat, updateMainCat} from '../redux/mainCatSlice';
// import {logoutUser} from '../redux/authSlice.js';
import {AppProvider} from '../services/appProvider';

// import SyncStorage from 'sync-storage';

// const Drawer = createDrawerNavigator();

// const drawerItemsMain = [
//   {
//     key: 'Home',
//     title: 'Home',
//     routes: [{routeName: 'Home', title: 'Home'}],
//   },
//   {
//     key: 'Discover',
//     title: 'Discover',
//     routes: [
//       {
//         nav: 'MainDrawer',
//         routeName: 'Category',
//         title: 'Horoscope of The Month',
//         type: 'horoscope',
//       },
//       {routeName: 'Category', title: 'Women', type: 'women'},
//       {routeName: 'Category', title: 'Men', type: 'men'},
//     ],
//   },
//   {
//     key: 'Login',
//     title: 'Login / Sign Up',
//     routes: [{routeName: 'Login', title: 'Login / Sign Up'}],
//   },
// ];

// const drawerItemsMainUser = [
//   {
//     key: 'Home',
//     title: 'Home',
//     routes: [{routeName: 'Home', title: 'Home'}],
//   },
//   {
//     key: 'Discover',
//     title: 'Discover',
//     routes: [
//       {
//         nav: 'MainDrawer',
//         routeName: 'Category',
//         title: 'Horoscope of The Month',
//         type: 'horoscope',
//       },
//       {routeName: 'Category', title: 'Women', type: 'women'},
//       {routeName: 'Category', title: 'Men', type: 'men'},
//     ],
//   },
//   {
//     key: 'Logout',
//     title: 'Logout',
//     routes: [{routeName: 'Home', title: 'Logout'}],
//   },
// ];

// const CustomDrawerContent = props => {
//   const navigation = useNavigation();
//   const dispatch = useDispatch();

//   const [mainDrawer, setMainDrawer] = useState(true);
//   const [filteredItems, setFilteredItems] = useState([]);

//   const toggleMainDrawer = () => {
//     setMainDrawer(true);
//     setFilteredItems([]);
//   };

//   const handleLogout = () => {
//     dispatch(logoutUser());
//   };

//   const onItemPress = key => {
//     const filteredMainDrawerRoutes = props.drawerItems.find(e => {
//       if (e.key === key) return e;
//     });

//     if (filteredMainDrawerRoutes.routes.length === 1) {
//       const selectedRoute = filteredMainDrawerRoutes.routes[0];
//       navigation.dispatch(DrawerActions.toggleDrawer());

//       if (selectedRoute.title === 'Home') dispatch(resetMainCat());
//       if (selectedRoute.title === 'Logout') handleLogout();

//       navigation.navigate(selectedRoute.routeName, {
//         screen: selectedRoute.routeName,
//       });
//     } else {
//       setMainDrawer(false);
//       setFilteredItems(filteredMainDrawerRoutes);
//     }
//   };

//   const handleChangeMainCat = (route, mainCat) => {
//     dispatch(updateMainCat(mainCat));
//     navigation.navigate(route, {
//       screen: route,
//       mainCat: mainCat,
//     });
//   };

//   const renderMainDrawer = () => (
//     <View style={{marginTop: 50}}>
//       {props.drawerItems.map(parent => (
//         <View key={parent.key}>
//           <TouchableOpacity
//             key={parent.key}
//             onPress={() => {
//               onItemPress(parent.key);
//             }}>
//             <View>
//               <Text style={styles.text}>{parent.title}</Text>
//             </View>
//           </TouchableOpacity>
//         </View>
//       ))}
//     </View>
//   );

//   const renderFilteredItemsDrawer = () => (
//     <View style={{marginTop: 20}}>
//       <Entypo
//         onPress={() => toggleMainDrawer()}
//         name="chevron-thin-left"
//         color={'#000'}
//         size={25}
//         style={{marginLeft: 10, marginBottom: 50}}
//       />
//       {filteredItems.routes.map(route => {
//         return (
//           <TouchableOpacity
//             key={route.type}
//             onPress={() => handleChangeMainCat(route.routeName, route.type)}>
//             <Text
//               style={
//                 route.title.split(' ')[0].toLowerCase() ===
//                 reduxStore.getState().mainCat.selectedMainCat
//                   ? styles.selectedText
//                   : styles.text
//               }>
//               {route.title}
//             </Text>
//           </TouchableOpacity>
//         );
//       })}
//     </View>
//   );

//   return (
//     <SafeAreaView style={styles.container}>
//       {mainDrawer ? renderMainDrawer() : renderFilteredItemsDrawer()}
//     </SafeAreaView>
//   );
// };

///////////////////////////////////////////////////////////////////////////////////////////
const AppNavigator = () => {
  const navigation = useNavigation();

  return (
    <Provider store={reduxStore}>
      <AppProvider>
        <BottomTabNavigator />
        {/* <Drawer.Navigator
          screenOptions={{headerShown: true}}
          initialRouteName="Home"
          drawerContent={props => (
            <CustomDrawerContent
              drawerItems={
                // reduxStore.getState().auth.isAuthenticated?.length > 1
                SyncStorage.get('username')
                  ? drawerItemsMainUser
                  : drawerItemsMain
              }
              {...props}
            />
          )}>
          {/* {reduxStore.getState().auth.isAuthenticated && (
            <Drawer.Screen
              name="BottomTab"
              component={BottomTabNavigator}
              options={{
                headerShown: false,
              }}
            />
          )} */}
        {/* <Drawer.Screen
            name="BottomTab"
            component={BottomTabNavigator}
            options={{
              headerShown: false,
            }}
          />
          <Drawer.Screen
            name="MainDrawer"
            component={AppNavigator}
            options={{
              headerShown: false,
            }}
          />
          <Drawer.Screen
            name="Home"
            component={Home}
            options={{
              headerLeft: () => <HeaderMenu />,
              headerTitle: () => <HeaderTitle />,
            }}
          />
          <Drawer.Screen
            name="Login"
            component={Login}
            options={{
              unmountOnBlur: true,
              headerLeft: () => <HeaderMenu />,
              headerTitle: () => <HeaderTitle />,
            }}
          />
          <Drawer.Screen
            name="Signup"
            component={Signup}
            options={{
              unmountOnBlur: true,
              headerLeft: () => <HeaderMenu />,
              headerTitle: () => <HeaderTitle />,
            }}
          />
          <Drawer.Screen
            name="Category"
            component={Category}
            options={{
              headerLeft: () => <HeaderMenu />,
              headerTitle: () => <HeaderTitle />,
            }}
          />
          <Drawer.Screen
            name="ProductInfo"
            component={ProductInfo}
            options={{
              // headerShown: false,
              headerTitle: () => <Text></Text>,
              headerLeft: () => (
                <Entypo
                  onPress={() => navigation.goBack()}
                  // onPress={() =>
                  //   navigation.navigate('Category', {
                  //     mainCat: reduxStore.getState().selectedMainCat,
                  //   })
                  // }
                  name="chevron-thin-left"
                  color={'#000'}
                  size={25}
                  style={{marginLeft: 10}}
                />
              ),
            }}
          />
        </Drawer.Navigator> */}
      </AppProvider>
    </Provider>
  );
};

export default AppNavigator;

// const styles = StyleSheet.create({
//   container: {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'flex-start',
//   },
//   text: {
//     fontSize: 19,
//     fontWeight: 'bold',
//     color: '#000',
//     padding: 15,
//   },
//   selectedText: {
//     fontSize: 19,
//     fontWeight: 'bold',
//     color: '#595959',
//     padding: 15,
//   },
// });
