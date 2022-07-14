/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useEffect, useRef, useState} from 'react';
import {Dimensions, View, Text, FlatList} from 'react-native';
import {Card} from 'react-native-paper';
import commonStyles from '../styles/common';
import useWindowDimensions from 'react-native/Libraries/Utilities/useWindowDimensions';
import {useNavigation} from '@react-navigation/core';
import {AppContext} from '../services/appProvider';
import {useSelector} from 'react-redux';
import _ from 'lodash';

// import info from '../assets/data.json';

const Cards = ({goToTop, item}) => {
  const navigation = useNavigation();

  return (
    <Card
      style={{
        width: (Dimensions.get('screen').width - 12 * 2) / 2,
        margin: 6,
      }}
      onPress={() => {
        navigation.navigate('ProductInfo', {item: item});
        goToTop();
      }}>
      <Card.Cover source={{uri: item.img}} />
      <Card.Content style={{marginTop: 10}}>
        <Text>{item.name}</Text>
        <Text style={{marginTop: 5, color: '#6c6c6c'}}>{item.price}</Text>
      </Card.Content>
    </Card>
  );
};

const Suggestions = ({goToTop, displayItem}) => {
  const context = useContext(AppContext);
  const [horoscope, setHoroscope] = useState();
  const subCat = useSelector(state => state.subCat.selectedSubCat);
  const topsData = useSelector(state => state.productsData.topsData);
  const bottomsData = useSelector(state => state.productsData.bottomsData);
  const dressSuitsData = useSelector(
    state => state.productsData.dressSuitsData,
  );
  const shoesData = useSelector(state => state.productsData.shoesData);
  const [tops, setTops] = useState(null);
  const [bottoms, setBottoms] = useState(null);
  const [dressSuits, setDressSuits] = useState(null);
  const [shoes, setShoes] = useState(null);

  const width = useWindowDimensions().width;
  const viewConfig = useRef({itemVisiblePercentThreshold: 70});

  useEffect(() => {
    if (context.userSign) {
      setHoroscope(context.userSign);
    }
  }, []);

  useEffect(() => {
    if (topsData) {
      setTops(trimData(topsData));
    }
    if (bottomsData) {
      setBottoms(trimData(bottomsData));
    }
    if (dressSuitsData) {
      setDressSuits(trimData(dressSuitsData));
    }
    if (shoesData) {
      setShoes(trimData(shoesData));
    }
  }, []);

  const trimData = dataArr => {
    // Remove item of the same name
    let uniqueArr = _.filter(
      dataArr,
      item => item.product_id !== displayItem.id,
    );

    if (uniqueArr.length > 4) {
      return uniqueArr.slice(0, 4);
    } else {
      return uniqueArr;
    }
  };

  return (
    // <SafeAreaView style={commonStyles.centerContent}>
    <View style={commonStyles.centerContent}>
      <Text
        style={[
          commonStyles.lightTxt,
          {fontSize: 18, marginTop: 50, marginBottom: 15},
        ]}>
        Other {horoscope} also viewed:
      </Text>

      <FlatList
        // ref={flatList}
        data={
          subCat === 'tops'
            ? tops
            : subCat === 'bottoms'
            ? bottoms
            : subCat === 'dressSuits'
            ? dressSuits
            : subCat === 'shoes'
            ? shoes
            : []
        }
        renderItem={({item}) => <Cards goToTop={goToTop} item={item} />}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={width - 80}
        snapToAlignment="center"
        decelerationRate="fast"
        viewabilityConfig={viewConfig.current}
      />
    </View>
    // </SafeAreaView>
  );
};

export default Suggestions;
