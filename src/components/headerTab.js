import React from 'react';
import {View, Text, Dimensions, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/core';
// import {DrawerActions} from '@react-navigation/native';
import 'react-native-gesture-handler';
import Entypo from 'react-native-vector-icons/Entypo';

// export const HeaderMenu = () => {
//   const navigation = useNavigation();

//   return (
//     <Entypo
//       onPress={() => {
//         navigation.dispatch(DrawerActions.openDrawer());
//       }}
//       name="menu"
//       color={'#000'}
//       size={25}
//       style={{marginLeft: 10}}
//     />
//   );
// };

export const HeaderTitle = () => {
  const navigation = useNavigation();

  return (
    // <View style={styles.textWrapper}>
    /* <Text style={styles.text} onPress={() => console.log('go home')}> */
    <Text style={styles.text} onPress={() => navigation.navigate('HomeScreen')}>
      Zora
    </Text>
    // </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    paddingVertical: 15,
    flexDirection: 'row',
  },
  textWrapper: {
    width: 45,
    top: 10,
    position: 'absolute',
    left: Dimensions.get('window').width / 2.2,
  },
  text: {
    textAlign: 'center',
    fontSize: 19,
    fontWeight: 'bold',
    color: '#00296b',
  },
  menu: {
    paddingHorizontal: 30,
  },
});
