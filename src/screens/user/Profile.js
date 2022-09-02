/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import DatePicker from "react-native-modern-datepicker";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/authSlice.js";
import { calculateHoroscope } from "../../utilities/utils";
import { AppContext } from "../../services/appProvider";
import Loading from "../../components/loading";
import { BgWrapper } from "../../components/bgWrapper";
import commonStyles from "../../styles/common.js";
import loginStyles from "../../styles/loginStyles";
import { images } from "../../utilities/images";
import API from "../../services/api";
import moment from "moment";
// import SyncStorage from "sync-storage";
import AsyncStorage from "@react-native-async-storage/async-storage";

const api = new API();

export default function Profile() {
  const context = useContext(AppContext);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [email, setEmail] = useState(null);
  const [name, setName] = useState(null);
  const [pwd, setPwd] = useState(null);
  const [confirmPwd, setConfirmPwd] = useState(null);
  const [bday, setBday] = useState(null);
  const [sign, setSign] = useState(null);
  const [pwdErr, setPwdErr] = useState(false);
  const [imgPath, setImgPath] = useState();

  useEffect(() => {
    getUserInfo();

    // context.setLoading(true);
    // let user = SyncStorage.get("user_id");
    // let user = getItem("user_id");
    // if (user) {
    //   setEmail(SyncStorage.get("email"));
    //   setName(SyncStorage.get("username"));
    //   setSign(SyncStorage.get("horoscope"));

    //   api
    //     .queryUserProfile(user)
    //     .then((res) => {
    //       // console.log('USER DATA:::', res);
    //       if (res && res.hasOwnProperty("name")) {
    //         setBday(moment(res.birthday).format("YYYY/MM/DD"));
    //       } else {
    //         console.log("No user data");
    //       }
    //     })
    //     .catch((err) => console.log(err));
    // }
  }, []);

  useEffect(() => {
    if (sign) {
      let signName = sign.toLowerCase();
      setImgPath(images[signName]);
    }

    if (email && name && bday && sign) context.setLoading(false);
  }, [email, name, bday, sign]);

  useEffect(() => {
    if ((!pwd && !confirmPwd) || (pwd.length < 1 && confirmPwd.length < 1))
      setPwdErr(false);
    pwd !== confirmPwd ? setPwdErr(true) : setPwdErr(false);
  }, [pwd, confirmPwd]);

  useEffect(() => {
    if (bday) {
      console.log(bday);
      let date = bday.length !== 10 ? moment(bday).format("YYYY/MM/DD") : bday;
      let month = Number(date.split("/")[1]);
      let day = Number(date.split("/")[2]);

      let sign = calculateHoroscope(month, day);
      setSign(sign);
    }
  }, [bday]);

  const getUserInfo = async () => {
    context.setLoading(true);
    let user = await AsyncStorage.getItem("user");
    if (user) {
      setEmail(await AsyncStorage.getItem("email"));
      setName(await AsyncStorage.getItem("username"));
      setSign(await AsyncStorage.getItem("horoscope"));

      await api
        .queryUserProfile(user)
        .then((res) => {
          if (res && res.hasOwnProperty("name")) {
            setBday(moment(res.birthday).format("YYYY/MM/DD"));
          } else {
            console.log("No user data");
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const handleUpdateProfile = () => {
    api.updateUserProfile(context.userId, name, pwd, bday, sign).then((res) => {
      console.log(res);
    });
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    context.setLoggedOut(true);
    navigation.navigate("HomeScreen");
  };

  return (
    <BgWrapper>
      <SafeAreaView>
        {/* <ImageBackground source={bgPath} style={styles.imgBg}> */}
        <ScrollView>
          {/* <View style={[commonStyles.overlay, loginStyles.wrapper]}> */}
          <View style={loginStyles.wrapper}>
            <View style={styles.container}>
              <Text style={[loginStyles.title, commonStyles.lightTxt]}>
                Profile
              </Text>

              <Text style={[loginStyles.label, commonStyles.lightTxt]}>
                Email
              </Text>
              <TextInput
                style={commonStyles.input}
                defaultValue={email}
                editable={false}
              />

              <Text style={[loginStyles.label, commonStyles.lightTxt]}>
                Username
              </Text>
              <TextInput
                style={commonStyles.input}
                defaultValue={name}
                editable={false}
              />

              <Text style={[loginStyles.label, commonStyles.lightTxt]}>
                Password
              </Text>
              <TextInput
                style={commonStyles.input}
                selectionColor="#fef9ef"
                secureTextEntry={true}
                onChangeText={(text) => setPwd(text)}
              />

              <Text style={[loginStyles.label, commonStyles.lightTxt]}>
                Confirm Password
              </Text>
              <TextInput
                style={commonStyles.input}
                selectionColor="#fef9ef"
                secureTextEntry={true}
                onChangeText={(text) => setConfirmPwd(text)}
              />
              {pwdErr && (
                <Text style={commonStyles.inputErrTxt}>
                  Password does not match.
                </Text>
              )}

              <Text
                style={[
                  commonStyles.lightTxt,
                  { fontSize: 16, textAlign: "center", marginBottom: 15 },
                ]}
              >
                Birthday
              </Text>
              {!bday ? (
                <Loading />
              ) : (
                // <DatePicker
                //   date={new Date(bday).toString()}
                //   onChange={(date) =>
                //     setBday(moment(date).format("YYYY/MM/DD"))
                //   }
                // />
                <DatePicker
                  mode="calendar"
                  current={`${bday}`}
                  selected={`${bday}`}
                  onSelectedChange={(date) => setBday(date)}
                />
              )}

              {imgPath && (
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={[
                      commonStyles.lightTxt,
                      { fontSize: 16, marginTop: 17 },
                    ]}
                  >
                    {sign}
                  </Text>
                  <Image
                    source={imgPath}
                    style={{
                      width: 25,
                      height: 25,
                      marginTop: 17,
                      marginLeft: 5,
                    }}
                  />
                </View>
              )}

              <View style={{ marginTop: 30 }}>
                <TouchableOpacity
                  style={commonStyles.borderBtn}
                  onPress={handleUpdateProfile}
                >
                  <Text style={commonStyles.lightTxt}>Update Profile</Text>
                </TouchableOpacity>
              </View>

              <View style={{ marginTop: 20 }}>
                <TouchableOpacity
                  style={commonStyles.blockBtn}
                  onPress={handleLogout}
                >
                  <Text style={commonStyles.label}>Logout</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
        {/* </ImageBackground> */}

        {context.loading && <Loading />}
      </SafeAreaView>
    </BgWrapper>
  );
}

const styles = StyleSheet.create({
  // imgBg: {
  //   position: 'absolute',
  //   top: 0,
  //   left: 0,
  //   resizeMode: 'contain',
  //   height: Dimensions.get('window').height,
  //   width: '100%',
  // },
  container: {
    display: "flex",
    flexDirection: "column",
    paddingTop: 40,
    width: Dimensions.get("window").width - 80,
    height: Dimensions.get("window").height + 270,
    // "@media (max-height: 667px)": {
    //   height: Dimensions.get("window").height + 670,
    // },
  },
});
