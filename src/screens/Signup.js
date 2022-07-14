import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  ImageBackground,
  Dimensions,
} from 'react-native';
import DatePicker from 'react-native-modern-datepicker';
import {calculateHoroscope} from '../utilities/utils';
import {AppContext} from '../services/appProvider';
import commonStyles from '../styles/common.js';
import loginStyles from '../styles/loginStyles';
import API from '../services/api';

import {useDispatch} from 'react-redux';
import {loginUser} from '../redux/authSlice';
import {reduxStore} from '../redux/_index';
import {useNavigation} from '@react-navigation/core';

const api = new API();

const SuccessModal = ({openModal}) => {
  return (
    <Modal animationType="fade" transparent={true} visible={openModal}>
      <View style={styles.modalBg}>
        <View style={styles.modal}>
          <Text style={{fontSize: 16}}>Sign up successful !</Text>
        </View>
      </View>
    </Modal>
  );
};

export default function Signup() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const context = useContext(AppContext);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [pwd, setPwd] = useState(null);
  const [pwd2, setPwd2] = useState(null);
  const [bday, setBday] = useState(null);
  const [horoscope, setHoroscope] = useState(null);
  const [emailErr, setEmailErr] = useState(false);
  const [pwd2err, setPwd2err] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      context.setLoading(false);
    }, 3000);
  });

  useEffect(() => {
    if (bday) {
      let month = Number(bday.split('/')[1]);
      let day = Number(bday.split('/')[2]);

      let sign = calculateHoroscope(month, day);
      setHoroscope(sign);

      //   console.log(bday);
      //   console.log(sign);
    }
  }, [bday]);

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        setSuccess(false);
        navigation.navigate('Login');
      }, 3000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success]);

  const handleNext = () => {
    setShowDatePicker(true);
  };

  const handleSignup = e => {
    console.log(name, email, pwd, bday, horoscope);

    e.preventDefault();
    context.setLoading(true);
    // api.signup(name, email, pwd, bday, horoscope).then(res => {
    //   if (res) {
    //     // console.log("res:::", res);
    //     if (res === 'Sign up successful!') {
    setSuccess(true);
    //     } else {
    //       setSuccess(false);
    //       setEmailErr(true);
    //       setShowDatePicker(false);
    context.setLoading(false);
    //     }
    //   }
    // });
  };

  return (
    <SafeAreaView>
      <ImageBackground
        source={require('../assets/images/starryBg.jpeg')}
        style={{width: '100%', height: '100%'}}>
        <View style={[commonStyles.overlay, loginStyles.wrapper]}>
          <View style={loginStyles.container}>
            {showDatePicker ? (
              <>
                <Text
                  style={{
                    color: '#fef9ef',
                    fontSize: 16,
                    textAlign: 'center',
                    marginBottom: 15,
                  }}>
                  Your Birthday
                </Text>
                <DatePicker
                  mode="calendar"
                  onSelectedChange={date => setBday(date)}
                />
                {bday && (
                  <View style={{marginTop: 50}}>
                    <TouchableOpacity
                      style={commonStyles.blockBtn}
                      onPress={handleSignup}>
                      <Text style={commonStyles.label}>Create</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </>
            ) : (
              <>
                <Text style={[loginStyles.title, commonStyles.lightTxt]}>
                  Create Account
                </Text>

                <Text style={[loginStyles.label, commonStyles.lightTxt]}>
                  Email
                </Text>
                <TextInput
                  style={commonStyles.input}
                  placeholder="Please enter your email"
                  placeholderTextColor="#cacaca"
                  selectionColor="#fef9ef"
                  autoCapitalize="none"
                  autoCorrect={false}
                  value={email}
                  onChangeText={text => setEmail(text)}
                />
                {emailErr && (
                  <Text style={commonStyles.inputErrTxt}>
                    This email address is already in use.
                  </Text>
                )}

                <Text style={[loginStyles.label, commonStyles.lightTxt]}>
                  Username
                </Text>
                <TextInput
                  style={commonStyles.input}
                  placeholder="Please enter your username"
                  placeholderTextColor="#cacaca"
                  selectionColor="#fef9ef"
                  autoCapitalize="none"
                  autoCorrect={false}
                  value={name}
                  onChangeText={text => setName(text)}
                />

                <Text style={[loginStyles.label, commonStyles.lightTxt]}>
                  Password
                </Text>
                <TextInput
                  style={commonStyles.input}
                  placeholder="Please enter your password"
                  placeholderTextColor="#cacaca"
                  selectionColor="#fef9ef"
                  secureTextEntry={true}
                  value={pwd}
                  onChangeText={text => setPwd(text)}
                />

                <Text style={[loginStyles.label, commonStyles.lightTxt]}>
                  Confirm Password
                </Text>
                <TextInput
                  style={commonStyles.input}
                  placeholder="Please re-enter your password"
                  placeholderTextColor="#cacaca"
                  selectionColor="#fef9ef"
                  secureTextEntry={true}
                  value={pwd2}
                  onChangeText={text => setPwd2(text)}
                />
                {pwd2err && (
                  <Text style={styles.errTxt}>Password does not match.</Text>
                )}

                <View style={{marginTop: 30}}>
                  <TouchableOpacity
                    style={commonStyles.blockBtn}
                    onPress={handleNext}>
                    <Text style={commonStyles.label}>Next</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>

        <SuccessModal openModal={success} />
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  modalBg: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: 8,
    height: 150,
    width: Dimensions.get('window').width - 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
