/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/core';
import {
  Animated,
  View,
  TouchableOpacity,
  FlatList,
  Text,
  StyleSheet,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {updateMainCat} from '../redux/mainCatSlice';
import {updateSubCat} from '../redux/subCatSlice';
import {AppContext} from '../services/appProvider';
import {BgWrapper} from './bgWrapper';
import commonStyles from '../styles/common';

const titles = ['Horoscope', 'Women', 'Men'];
const womenCat = ['Tops', 'Bottoms', 'Dresses', 'Shoes'];
const menCat = ['Tops', 'Bottoms', 'Suits', 'Shoes'];

export default function CategoryTab() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const context = useContext(AppContext);
  const mainCat = useSelector(state => state.mainCat.selectedMainCat);
  const [selected, setSelected] = useState();

  useEffect(() => {
    if (mainCat === 'horoscope') setSelected('Women');
  }, []);

  useEffect(() => {
    if (selected) {
      dispatch(updateMainCat(selected.toLocaleLowerCase()));
      selected === 'Horoscope'
        ? navigation.navigate('Category', {mainCat: 'horoscope'})
        : '';
    }
  }, [selected]);

  const handleUpdateSubCat = label => {
    let subcat;
    label === 'Dresses' || label === 'Suits'
      ? (subcat = 'dressSuits')
      : (subcat = label.toLocaleLowerCase());
    dispatch(updateSubCat(subcat));
    navigation.navigate('Category', {mainCat: mainCat});
    context.setLoading(true);
  };

  return (
    <BgWrapper>
      <View style={{height: '100%'}}>
        <View
          style={{
            flexDirection: 'row',
          }}>
          {titles.map((item, i) => (
            <TouchableOpacity
              key={i}
              accessibilityRole="button"
              onPress={() => setSelected(item)}
              style={{flex: 1}}>
              <Animated.Text
                style={
                  item.toLocaleLowerCase() === mainCat
                    ? [styles.boldTxt, commonStyles.lightTxt]
                    : [styles.boldTxt, {color: '#c1c1c1c9'}]
                }>
                {item}
              </Animated.Text>
            </TouchableOpacity>
          ))}
        </View>

        {mainCat !== 'horoscope' && (
          <View style={{alignItems: 'center'}}>
            <FlatList
              data={mainCat === 'men' ? menCat : womenCat}
              renderItem={({item}) => (
                <TouchableOpacity onPress={() => handleUpdateSubCat(item)}>
                  <Text
                    key={item}
                    style={[commonStyles.lightTxt, styles.subCatTxt]}>
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        )}
      </View>
    </BgWrapper>
  );
}

const styles = StyleSheet.create({
  boldTxt: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 15,
    // marginHorizontal: 5,
  },
  subCatTxt: {
    // color: '#00296b',
    fontSize: 20,
    fontWeight: '400',
    marginVertical: 25,
  },
});
