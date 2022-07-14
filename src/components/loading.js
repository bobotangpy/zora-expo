import React from 'react';
import {View, StyleSheet, SafeAreaView} from 'react-native';
import LottieView from 'lottie-react-native';

const Loading = () => {
  return (
    <SafeAreaView
    // style={{height: '100%', backgroundColor: 'rgba(52, 52, 52, 0.5)'}}
    >
      <View style={styles.loading}>
        <LottieView
          style={{
            height: 200,
            width: 200,
          }}
          source={require('../assets/animations/loading.json')}
          autoPlay
          speed={1}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loading: {
    // backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
});

export default Loading;
