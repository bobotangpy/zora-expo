import React, {useEffect, useState} from 'react';
import {Dimensions, Text} from 'react-native';
import {Card} from 'react-native-paper';
import {useNavigation} from '@react-navigation/core';
import commonStyles from '../styles/common';

// import info from '../assets/data.json';

const ProductCard = ({data}) => {
  const navigation = useNavigation();
  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   if (info) {
  //     setData(Object.values(info));
  //   }
  // }, []);

  return (
    <>
      {data?.map((item, i) => (
        <Card
          key={i}
          style={{
            width: (Dimensions.get('screen').width - 12 * 2) / 2,
            margin: 6,
          }}
          onPress={() => {
            navigation.navigate('ProductInfo', {item: item});
          }}>
          <Card.Cover source={{uri: item.img}} />
          <Card.Content style={{marginTop: 10}}>
            <Text style={commonStyles.label}>{item.name}</Text>
            <Text style={{marginTop: 5, color: '#6c6c6c'}}>{item.price}</Text>
          </Card.Content>
        </Card>
      ))}
    </>
  );
};

export default ProductCard;
