import React from 'react';
import {View, Text, Image, BackHandler} from 'react-native';
import CustomButton from '../../../component/button1';
import styles from './styles';
import Toast from 'react-native-simple-toast';
import StatusBar from '../../../component/StatusBar';
import colors from '../../../component/colors';
import {TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-community/async-storage';
import Storage from '../../../component/AsyncStorage';
import DeviceInfo from 'react-native-device-info';
import OtpInputs from 'react-native-otp-inputs';
class OtpVarification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      otp: '',
      timer: null,
      counter: 30,
      user_id: this.props.route.params.user_id,
      otpData: this.props.route.params.otp,
      mobile: this.props.route.params.mobile,
      name: this.props.route.params.name,
      email: this.props.route.params.email,
      type: this.props.route.params.type,
      pin: this.props.route.params.pin,
      count: 0,
      countryCode: this.props.route.params.countryCode,
      attempt: this.props.route.params.attempt,
      referal: this.props.route.params.referal,
      attemptbool: this.props.route.params.attemptbool,
      boolean2: this.props.route.params.boolean2,
      old_number: '',
      boolean: true,
      enable: true,
    };
  }

  backAction = () => {
    this.props.navigation.push(this.state.type);
    return true;
  };

  async componentDidMount() {
    const number = await AsyncStorage.getItem('old_number');
    this.setState({old_number: number});
    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.backAction,
    );
    const count = await AsyncStorage.getItem('count_value');
    this.setState({count: count});
    setTimeout(() => {}, 10000);
    const {counter} = this.state;
    let timer = setInterval(this.tick, 1000);
    this.setState({timer});
    if (this.props.attempt.attempt == 0) {
      this.setState({enable: false});
      setTimeout(() => {
        this.setState({enable: true});
      }, 65000);
    }
  }
  async componentWillUnmount() {
    let timer = setInterval(this.tick, 1000);
    this.setState({timer});
  }

  tick = () => {
    const {counter} = this.state;
    if (counter == 0) {
      clearInterval(this.state.timer);
    } else {
      this.setState({
        counter: this.state.counter - 1,
      });
    }
  };

  otpResend = async () => {
    AsyncStorage.setItem('old_number', this.state.mobile);
    if (this.state.attemptbool == undefined) {
      if (this.state.boolean == true) {
        this.props.dispatch({
          type: 'Resend_Otp_Request',
          url: 'resendotp',
          mobile: this.state.mobile,
          navigation: this.props.navigation,
          user_id: this.state.user_id,
          type1: this.state.type,
          boolean: this.state.boolean,
        });
      } else if (this.state.boolean == false) {
        this.props.dispatch({
          type: 'Resend_Otp_Request',
          url: 'resendotp',
          mobile: this.state.mobile,
          navigation: this.props.navigation,
          user_id: this.state.user_id,
          type1: this.state.type,
          boolean: '',
        });
      }
    } else if (this.state.attemptbool == 'false') {
      this.props.dispatch({
        type: 'Resend_Otp_Request',
        url: 'resendotp',
        mobile: this.state.mobile,
        navigation: this.props.navigation,
        user_id: this.state.user_id,
        type1: this.state.type,
        boolean: '',
      });
    } else if (
      this.state.boolean == false &&
      this.state.attemptbool == 'true'
    ) {
      this.props.dispatch({
        type: 'Resend_Otp_Request',
        url: 'resendotp',
        mobile: this.state.mobile,
        navigation: this.props.navigation,
        user_id: this.state.user_id,
        type1: this.state.type,
        boolean: true,
        boolean2: this.state.boolean,
      });
    } else if (this.state.boolean == true && this.state.attemptbool == 'true') {
      this.props.dispatch({
        type: 'Resend_Otp_Request',
        url: 'resendotp',
        mobile: this.state.mobile,
        navigation: this.props.navigation,
        user_id: this.state.user_id,
        type1: this.state.type,
        boolean: this.state.boolean,
      });
    }
  };
  validateUser = async () => {
    const device_type = DeviceInfo.getSystemName();
    const token = await AsyncStorage.getItem(Storage.token);
    const name = await AsyncStorage.getItem(Storage.Rname);
    const email = await AsyncStorage.getItem(Storage.Remail);
    const mobile = await AsyncStorage.getItem(Storage.Rmobile);
    const pin = await AsyncStorage.getItem(Storage.Rpin);
    const countryCode = await AsyncStorage.getItem(Storage.RcountryCode);
    const referal = await AsyncStorage.getItem(Storage.Rreferal);
    const user = await AsyncStorage.getItem('user');
    AsyncStorage.setItem('old_number', this.state.mobile);

    if (
      this.props.attempt.messages ==
      'You have reached the maximum number of attempts. Try after 1 minute!'
    ) {
    } else {
      if (this.state.type == 'Register') {
        if (this.state.otp == this.state.otpData) {
          this.props.dispatch({
            type: 'User_Register_Request',
            url: 'adduserdetails',
            name: name,
            email: email,
            mobile: mobile,
            pin: pin,
            refferal_code: referal,
            mobile_country_code: countryCode,
            father_spouse_name: 0,
            mother_maiden_name: 0,
            gender: 0,
            dob: 0,
            pan: 0,
            address1: 0,
            address2: 0,
            city: 0,
            state: 0,
            country: 0,
            pincode: 0,
            residential_status: 0,
            profile_pic: 0,
            education: 0,
            occupation: 0,
            marital_status: 0,
            navigation: this.props.navigation,
            device_token: token,
            device_type: device_type,
          });
        } else {
          if (this.state.otp == '' || this.state.otp.length < 4) {
            console.log(this.state.otp.length);
            Toast.show('Please Enter Otp');
          } else {
            this.setState({
              boolean: false,
            });
            this.props.dispatch({
              type: 'Verify_Otp_Request',
              url: 'verifyotp',
              mobile: this.state.mobile,
              navigation: this.props.navigation,
              user_id: this.state.user_id,
              type1: this.state.type,
              boolean: this.state.attemptbool == 'true' ? true : '',
              otp: this.state.otpData,
            });
          }
          this.setState({otp: ''});
        }
      } else {
        if (this.state.otp == this.state.otpData) {
          AsyncStorage.setItem('count_value', '0');
          AsyncStorage.setItem(Storage.name, name);
          AsyncStorage.setItem(Storage.user_id, user);
          AsyncStorage.setItem(Storage.mobile, mobile);
          AsyncStorage.setItem(Storage.email, email);
          AsyncStorage.setItem('KeepmeLogin', JSON.stringify(0));
          this.props.navigation.replace('Main');
        } else {
          if (this.state.otp == '' || this.state.otp.length < 4) {
            Toast.show('Please Enter Otp');
          } else {
            this.setState({
              boolean: false,
            });
            Toast.show('Please Enter Correct Otp Code');
            this.props.dispatch({
              type: 'Verify_Otp_Request',
              url: 'verifyotp',
              mobile: this.state.mobile,
              navigation: this.props.navigation,
              user_id: this.state.user_id,
              type1: this.state.type,
              boolean: this.state.attemptbool == 'true' ? true : '',
              otp: this.state.otpData,
            });
          }
          this.setState({otp: ''});
        }
      }
    }
  };
  renderCount = () => {
    if (this.state.attemptbool == 'false') {
      if (this.state.old_number == this.state.mobile) {
        if (
          this.props.attempt.messages ==
          'You have reached the maximum number of attempts. Try after 1 minute!'
        ) {
          return (
            <View style={[styles.textBottom, {marginTop: 15}]}>
              <Text style={styles.your}>
                {`You have reached the maximum number of attempts. Try after 1 minute!`}
              </Text>
            </View>
          );
        } else if (this.props.attempt.attempt == 0) {
          return <View style={[styles.textBottom, {marginTop: 15}]}> </View>;
        } else {
          return (
            <View style={[styles.textBottom, {marginTop: 15}]}>
              <Text style={styles.your}>
                {this.props.attempt
                  ? `You have entered wrong OTP, ${this.props.attempt.attempt} attempt left.`
                  : `Enter the OTP sent on ${this.state.mobile}.`}
              </Text>
            </View>
          );
        }
      } else {
        return (
          <View style={[styles.textBottom, {marginTop: 15}]}>
            <Text style={styles.your}>
              {`Enter the OTP sent on ${this.state.mobile}.`}
            </Text>
          </View>
        );
      }
    } else if (this.state.attemptbool == 'true') {
      if (this.props.attempt) {
        if (
          this.props.attempt.messages ==
          'You have reached the maximum number of attempts. Try after 1 minute!'
        ) {
          return (
            <Text style={[styles.your, {marginTop: 15}]}>
              {`You have reached the maximum number of attempts. Try after 1 minute!`}
            </Text>
          );
        } else if (this.props.attempt.attempt == 0) {
          return <Text style={[styles.your, {marginTop: 15}]}></Text>;
        } else {
          if (this.state.boolean2 == false) {
            return (
              <Text style={[styles.your, {marginTop: 15}]}>
                {`You have entered wrong OTP, ${
                  3 - this.props.attempt.attempt
                } attempt left.`}
              </Text>
            );
          } else {
            return (
              <Text style={[styles.your, {marginTop: 15}]}>
                {`${3 - this.props.attempt.attempt} attempt left.`}
              </Text>
            );
          }
        }
      } else {
        return (
          <Text style={[styles.your, {marginTop: 15}]}>
            {`Enter the OTP sent on ${this.state.mobile}.`}
          </Text>
        );
      }
    } else {
      return (
        <Text style={[styles.your, {marginTop: 15}]}>
          {`Enter the OTP sent on ${this.state.mobile}.`}
        </Text>
      );
    }
  };
  render() {
    console.log('this is otp data ', this.state.otpData);
    return (
      <View style={styles.container}>
        <KeyboardAwareScrollView
          extraScrollHeight={10}
          enableOnAndroid={true}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{flex: 1}}>
          <View style={styles.imageContainer}>
            <TouchableOpacity
              onPress={() => this.props.navigation.push(this.state.type)}>
              <Image
                style={{width: 32, height: 24}}
                source={require('../../../assets/Image/arrowBack.png')}
              />
            </TouchableOpacity>
            <View style={styles.round}>
              <Image source={require('../../../assets/Image/logo-icon.png')} />
            </View>
            <View style={{width: '5%'}}></View>
          </View>
          <View style={styles.main}>
            <View style={styles.otpView}>
              <Text style={styles.enter}>Enter OTP</Text>
              <OtpInputs
                handleChange={code => this.setState({otp: code})}
                numberOfInputs={4}
                autofillFromClipboard={true}
                keyboardType={'numeric'}
                style={{
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexDirection: 'row',
                  width: '100%',
                  marginTop: 8,
                }}
                inputContainerStyles={[styles.otp, {borderWidth: 0}]}
                focusStyles={{borderWidth: 1, borderColor: colors.bc}}
                inputStyles={{
                  fontSize: 16,
                  color: colors.textColor,
                  width: 50,
                  alignContent: 'center',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  borderRadius: 10,
                  borderWidth: 0,
                }}
              />
              {this.renderCount()}
            </View>
            <View style={styles.button}>
              <CustomButton
                title="CONFIRM OTP"
                onPress={() => this.validateUser()}
              />

              {this.state.enable == true ? (
                <View>
                  <View
                    style={[
                      styles.textBottom,
                      {
                        marginTop: 10,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                      },
                    ]}>
                    <Text style={styles.your}>{`Didn’t Receive the OTP?`}</Text>
                    <TouchableOpacity
                      disabled={this.state.counter > 0 ? true : false}
                      onPress={() => this.otpResend()}>
                      <Text
                        style={[
                          styles.your,
                          {
                            color: this.state.counter > 0 ? 'grey' : colors.bc,
                            fontWeight: '700',
                          },
                        ]}>
                        {` Resend again`}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  {this.state.counter != 0 ? (
                    <Text style={[styles.your, {textAlign: 'center'}]}>
                      {`You can request OTP Resend\nafter 0${Math.floor(
                        this.state.counter / 60,
                      )}:${
                        this.state.counter < 10
                          ? `0${this.state.counter % 60}`
                          : this.state.counter % 60
                      } sec`}
                    </Text>
                  ) : null}
                </View>
              ) : (
                <View />
              )}
            </View>
          </View>
        </KeyboardAwareScrollView>
        <StatusBar />
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    isFetching: state.isFetching,
    attempt: state.ResendData,
  };
};

export default connect(mapStateToProps)(OtpVarification);
