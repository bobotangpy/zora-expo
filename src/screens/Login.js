import {useNavigation} from '@react-navigation/core';
import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
  TextInput,
} from 'react-native';
import {AppContext} from '../services/appProvider';
import commonStyles from '../styles/common.js';
import loginStyles from '../styles/loginStyles';

import {useDispatch} from 'react-redux';
import {loginUser} from '../redux/authSlice';
import {reduxStore} from '../redux/_index';

export default function Login() {
  const navigation = useNavigation();
  const context = useContext(AppContext);
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [err, setErr] = useState(null);

  useEffect(() => {
    context.setLoading(false);
  });

  const handleLogin = e => {
    console.log(email, pwd);

    e.preventDefault();
    context.setLoading(true);

    if (email && pwd) {
      // console.log('sign in', email, pwd);

      dispatch(loginUser(email, pwd)).then(() => {
        if (reduxStore.getState().auth.isAuthenticated) {
          context.setUserSign(reduxStore.getState().auth.userSign);
          navigation.navigate('Home');
        } else {
          setErr(reduxStore.getState().auth.msg);
        }
        context.setLoading(false);
      });
    } else {
      return context.setLoading(false);
    }
  };

  const handleSignup = () => {
    context.setLoading(true);
    navigation.navigate('Signup');
  };

  return (
    <SafeAreaView>
      <ImageBackground
        source={require('../assets/images/starryBg.jpeg')}
        style={{width: '100%', height: '100%'}}>
        <View style={[commonStyles.overlay, loginStyles.wrapper]}>
          {/* <View> */}
          <View style={loginStyles.container}>
            <Text style={[commonStyles.lightTxt, loginStyles.title]}>
              Login
            </Text>

            <Text style={[loginStyles.label, commonStyles.lightTxt]}>
              Email
            </Text>
            <TextInput
              style={commonStyles.input}
              placeholder="admin@gmail.com"
              placeholderTextColor="#cacaca"
              selectionColor="#fef9ef"
              value={email}
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={text => setEmail(text)}
            />

            <Text style={[loginStyles.label, commonStyles.lightTxt]}>
              Password
            </Text>
            <TextInput
              style={commonStyles.input}
              placeholder="admin"
              placeholderTextColor="#cacaca"
              selectionColor="#fef9ef"
              secureTextEntry={true}
              value={pwd}
              onChangeText={text => setPwd(text)}
            />
            {err && (
              <Text
                style={{marginTop: -20, marginBottom: 50, color: '#f44336'}}>
                {err}
              </Text>
            )}

            <View>
              <TouchableOpacity
                style={commonStyles.blockBtn}
                onPress={handleLogin}>
                <Text style={commonStyles.label}>Login</Text>
              </TouchableOpacity>
            </View>

            <View style={{marginTop: 30}}>
              <TouchableOpacity
                style={commonStyles.borderBtn}
                onPress={handleSignup}>
                <Text style={commonStyles.lightTxt}>Create Account</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}
