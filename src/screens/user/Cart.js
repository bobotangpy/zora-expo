/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  // TextInput,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {AppContext} from '../../services/appProvider';
// import syncStorage from 'sync-storage';
// import moment from 'moment';
import commonStyles from '../../styles/common';
import loginStyles from '../../styles/loginStyles';
import orderHistoryStyles from '../../styles/orderHistoryStyles';
import {useDispatch, useSelector} from 'react-redux';
import {deleteItem} from '../../redux/cartSlice';
import Icon from 'react-native-vector-icons/EvilIcons';
import Loading from '../../components/loading';
import {BgWrapper} from '../../components/bgWrapper';

export default function Cart() {
  const navigation = useNavigation();
  const context = useContext(AppContext);
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.cartItems);
  // const [data, setData] = useState([]);s
  // const [qty, setQty] = useState(false);
  // const [qtyErr, setQtyErr] = useState(false);

  useEffect(() => {
    // cartItems.map(item => {
    //   data.push(Object.values(item));
    // });

    if (cartItems) context.setLoading(false);
  }, []);

  useEffect(() => {
    if (cartItems) context.setLoading(false);
  }, [cartItems]);

  // const handleChangeQty = (txt, id) => {
  //   setQty(txt);
  //   if (Number(qty) > 10) {
  //     return setQtyErr(true);
  //   } else setQtyErr(false);

  //   let newQty = Number(qty) || 1;
  //   let newArr = [];

  //   cartItems.map(item => {
  //     if (item.id === id) {
  //       let p = Number(item.price.split('$')[1].replaceAll(',', '')).toFixed(2);
  //       item = {
  //         ...item,
  //         qty: newQty,
  //         price: `HKD$${(p / item.qty) * newQty}`,
  //       };
  //       newArr.push(item);
  //     } else newArr.push(item);
  //   });

  //   dispatch(updateCart(newArr));
  // };

  return (
    <BgWrapper>
      <SafeAreaView>
        <View style={{height: '100%'}}>
          <ScrollView>
            <View style={loginStyles.wrapper}>
              <Text
                style={[
                  commonStyles.lightTxt,
                  loginStyles.title,
                  orderHistoryStyles.title,
                ]}>
                Cart ({cartItems.length})
              </Text>

              <View style={orderHistoryStyles.container}>
                {cartItems?.length > 0 && (
                  <View
                    style={{
                      flex: 1,
                      alignSelf: 'stretch',
                      flexDirection: 'row',
                    }}>
                    <View style={{flex: 2.5, alignSelf: 'stretch'}}>
                      <Text
                        style={[commonStyles.lightTxt, {textAlign: 'right'}]}>
                        Qty
                      </Text>
                    </View>

                    <View style={{flex: 1, alignSelf: 'stretch'}}>
                      <Text
                        style={[
                          commonStyles.lightTxt,
                          {textAlign: 'left', marginLeft: 10},
                        ]}>
                        Price
                      </Text>
                    </View>
                  </View>
                )}

                {cartItems?.length > 0 ? (
                  cartItems.map((item, i) => (
                    <View
                      key={i}
                      style={[orderHistoryStyles.card, styles.card]}>
                      <View key={i} style={styles.innerCard}>
                        <Image
                          source={{uri: item.img}}
                          style={{width: 80, height: 120}}
                        />

                        <View
                          style={[orderHistoryStyles.imgPrice, styles.imgSize]}>
                          <Text style={commonStyles.lightTxt}>{item.name}</Text>

                          <Text
                            style={[commonStyles.lightTxt, {marginTop: 15}]}>
                            Size:&nbsp;
                            {typeof item.size === 'number'
                              ? item.size
                              : item.size.toUpperCase()}
                          </Text>
                        </View>

                        <Text style={{color: '#fef9ef', marginRight: 15}}>
                          {item.qty}
                        </Text>

                        <Text style={{color: '#fef9ef', marginRight: 15}}>
                          ${item.price.split('$')[1]}
                        </Text>

                        <Icon
                          name="trash"
                          size={25}
                          color="#d73a49"
                          onPress={() =>
                            dispatch(deleteItem({id: item.id, size: item.size}))
                          }
                        />
                      </View>
                    </View>
                  ))
                ) : (
                  <View style={{marginTop: 50}}>
                    {/* {!context.loading && ( */}
                    <Text style={{textAlign: 'center', color: '#fef9ef'}}>
                      Your cart is empty.
                    </Text>
                    {/* )} */}
                  </View>
                )}
              </View>
            </View>
          </ScrollView>

          {cartItems?.length > 0 && (
            <View style={styles.checkoutBtn}>
              <TouchableOpacity
                style={commonStyles.blockBtn}
                onPress={() => navigation.navigate('Checkout')}>
                <Text style={commonStyles.label}>Checkout</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {context.loading && <Loading />}
      </SafeAreaView>
    </BgWrapper>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 0,
    backgroundColor: 'transparent',
    marginBottom: 0,
  },
  innerCard: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  imgSize: {
    maxWidth: 120,
  },
  checkoutBtn: {
    position: 'relative',
    alignSelf: 'center',
    marginVertical: 20,
    width: Dimensions.get('window').width - 30,
  },
});
