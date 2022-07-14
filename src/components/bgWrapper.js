import React, {useContext, useEffect, useState} from 'react';
import {ImageBackground, View} from 'react-native';
import {AppContext} from '../services/appProvider';
import commonStyles from '../styles/common';
import {bg} from '../utilities/images';

export const BgWrapper = ({children}) => {
  const context = useContext(AppContext);
  const [bgPath, setBgPath] = useState('');

  useEffect(() => {
    context.userSign
      ? setBgPath(bg[context.userSign.toLowerCase()])
      : setBgPath(null);
  }, [context.userSign]);

  return (
    <View className="bgWrapper">
      <ImageBackground
        source={
          bgPath ? bgPath : require('../assets/images/landing/landing_bg.jpg')
        }
        imageStyle={{
          resizeMode: 'cover',
        }}>
        <View style={commonStyles.overlay} />
        {children}
      </ImageBackground>
    </View>
  );
};
