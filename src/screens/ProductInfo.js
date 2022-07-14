/* eslint-disable curly */
/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Dimensions,
} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import Suggestions from '../components/suggestions';
import {BgWrapper} from '../components/bgWrapper';
import productInfoStyles from '../styles/productInfoStyles';
import commonStyles from '../styles/common';
import {AppContext} from '../services/appProvider';
import {addToBag} from '../utilities/utils';
import {useDispatch, useSelector} from 'react-redux';
import {updateCart} from '../redux/cartSlice';
import Icon from 'react-native-vector-icons/EvilIcons';

// import info from '../assets/data.json';

const clothesSizes = ['XS', 'S', 'M', 'L', 'XL'];

const shoeSizes = () => {
  let lastNum = 34;
  let arr = [34];

  while (lastNum < 42) {
    lastNum = lastNum + 1;
    arr.push(lastNum);
  }
  return arr;
};

export default function ProductInfo(props) {
  const ref = useRef();
  const dropdownRef = useRef({});
  const context = useContext(AppContext);
  const dispatch = useDispatch();
  const [data, setData] = useState();
  const mainCat = useSelector(state => state.mainCat.selectedMainCat);
  const cartItems = useSelector(state => state.cart.cartItems);
  const [localCart, setLocalCart] = useState([]);
  const [sizeDisplay, setSizeDisplay] = useState([]);
  const [selectedSize, setSelectedSize] = useState('');
  const [qty, setQty] = useState('1');
  const [showErrMsg, setShowErrMsg] = useState(false);
  const [showAddedMsg, setShowAddedMsg] = useState(false);

  useEffect(() => {
    if (props) {
      setData(props.route.params.item);

      let shoes = shoeSizes();
      props.route.params.item.type_id == 1
        ? setSizeDisplay(shoes)
        : setSizeDisplay(clothesSizes);
    }
  }, [props]);

  useEffect(() => {
    // if (selectedSize.length < 1) dropdownRef.current.reset();
    if (selectedSize) {
      if (showErrMsg) setShowErrMsg(false);
    }
  }, [selectedSize, showErrMsg]);

  // useEffect(() => {
  //   if (dropdownRef) console.log(dropdownRef);
  // }, [dropdownRef]);

  useEffect(() => {
    if (localCart?.length > 0) {
      // console.log('LOCAL cart:::', cartItems);
      setShowAddedMsg(true);
      setTimeout(() => {
        setShowAddedMsg(false);
      }, 2000);
    }
  }, [localCart]);

  // useEffect(() => {
  //   console.log('New Qty:::', qty);
  // }, [qty]);

  const goToTop = () => {
    ref.current?.scrollTo({y: 0, animated: true});
  };

  const handleAddCart = () => {
    // console.log('ADD to CART****', data);

    if (!selectedSize) return setShowErrMsg(true);

    context.setLoading(true);

    const newItem = {
      id: data.product_id,
      name: data.name,
      img: data.img,
      price: data.price,
      size: selectedSize,
      qty: qty,
    };

    let newCartItem = addToBag(newItem, cartItems);
    dispatch(updateCart(newCartItem));
    setLocalCart([...localCart, newItem]);
  };

  return (
    <BgWrapper>
      <SafeAreaView>
        <ScrollView ref={ref}>
          {data && (
            <View>
              <Image
                source={{uri: data.img}}
                style={{
                  // width: '70%', height: '70%'
                  width: null,
                  resizeMode: 'contain',
                  height: 420,
                  marginBottom: 15,
                }}
              />

              <View style={commonStyles.centerContent}>
                <Text style={productInfoStyles.name}>{data.name}</Text>

                <Text style={productInfoStyles.price}>{data.price}</Text>

                <View style={productInfoStyles.labelWrapper}>
                  <Text style={productInfoStyles.label}>Size: </Text>
                  {/* <Picker
                selectedValue={selectedSize}
                style={{height: 50, width: 150}}
                onValueChange={itemValue => setSelectedSize(itemValue)}>
                {sizeDisplay.map((item, i) => (
                  <Picker.Item key={i} label={item} value={item} />
                ))}
              </Picker> */}

                  <SelectDropdown
                    ref={dropdownRef}
                    data={sizeDisplay}
                    onSelect={(selectedItem, index) => {
                      setSelectedSize(selectedItem);
                    }}
                    buttonTextAfterSelection={(selectedItem, index) => {
                      // text represented after item is selected
                      // if data array is an array of objects then return selectedItem.property to render after item is selected
                      return selectedItem;
                    }}
                    rowTextForSelection={(item, index) => {
                      // text represented for each item in dropdown
                      // if data array is an array of objects then return item.property to represent item in dropdown
                      return item;
                    }}
                  />
                </View>
                {showErrMsg && (
                  <Text
                    style={[
                      commonStyles.inputErrTxt,
                      {marginLeft: 100, marginTop: -20, fontWeight: 'bold'},
                    ]}>
                    Please select size.
                  </Text>
                )}

                <View style={productInfoStyles.labelWrapper}>
                  <Text style={productInfoStyles.label}>Quantity: </Text>
                  <TextInput
                    keyboardType="number-pad"
                    value={qty}
                    onChangeText={setQty}
                    style={productInfoStyles.input}
                  />
                </View>
              </View>

              <View
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginTop: 20,
                }}>
                <TouchableOpacity
                  style={showAddedMsg ? styles.btn : productInfoStyles.button}
                  disabled={showAddedMsg}
                  onPress={() => handleAddCart()}>
                  {showAddedMsg ? (
                    <View style={{display: 'flex', flexDirection: 'row'}}>
                      <Text style={styles.btnTxt}>Added to Cart</Text>
                      <Icon name="check" color="#8ab819" size={25} />
                    </View>
                  ) : (
                    <Text style={productInfoStyles.btnTxt}>Add to Cart</Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          )}

          {context.userSign && mainCat !== 'horoscope' && (
            <Suggestions
              goToTop={goToTop}
              displayItem={props.route.params.item}
            />
          )}
        </ScrollView>
      </SafeAreaView>
    </BgWrapper>
  );
}

const styles = StyleSheet.create({
  btn: {
    width: Dimensions.get('window').width - 20,
    height: 45,
    marginBottom: 15,
    backgroundColor: 'transparent',
    borderColor: '#fef9ef',
    borderWidth: 1,
    borderRadius: 4,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnTxt: {
    color: '#fef9ef',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
