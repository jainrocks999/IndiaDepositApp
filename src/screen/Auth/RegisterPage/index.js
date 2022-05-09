import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Platform,
  BackHandler,
} from 'react-native';
import CustomButton from '../../../component/button1';
import {useNavigation} from '@react-navigation/native';
import styles from './style';
import Toast from 'react-native-simple-toast';
import StatusBar from '../../../component/StatusBar';
import {useDispatch, useSelector} from 'react-redux';
import Loader from '../../../component/loader';
import {Formik} from 'formik';
import * as yup from 'yup';
import colors from '../../../component/colors';
import CheckBox from '@react-native-community/checkbox';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import DeviceInfo from 'react-native-device-info';
import AsyncStorage from '@react-native-community/async-storage';
import Storage from '../../../component/AsyncStorage';
import HTMLView from 'react-native-htmlview';
import Dialog, {DialogContent} from 'react-native-popup-dialog';
import CountryPicker from 'react-native-country-picker-modal';
import { showMessage } from "react-native-flash-message";
import NetInfo from "@react-native-community/netinfo";
const loginValidationSchema = yup.object().shape({
  name: yup
    .string()
    .max(40, ({max}) => `Name must be only ${max} character`)
    .required('Please enter your full name ')
    .matches(/^[^,*+.!0-9-\/:-@\[-`{-~]+$/, 'Please enter valid name'),
  email: yup
    .string()
    .email('Please enter valid email ')
    .required('Please enter your email '),
  mobile: yup
    .string()
    .min(10, ({}) => 'Mobile number must be 10 digit number')
    .required('Please enter your mobile number')
    .matches(/^[0]?[6-9]\d{9}$/, 'Please enter valid mobile number'),
  pin: yup
    .string()
    .min(4, ({min}) => `Pin must be 4 digits`)
    .required('Please enter pin'),
  confirmPin: yup
    .string()
    .when('pin', {
      is: val => (val && val.length > 0 ? true : false),
      then: yup
        .string()
        .oneOf([yup.ref('pin')], 'Both pin need to be the same'),
    })
    .required('Please confirm pin'),
  referal: yup.string(),
});

const RegisterPage = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const selector = useSelector(state => state.Privacy);
  const selector1 = useSelector(state => state.TermCondition);
  const [code, setCode] = useState('+91');
  const [isVisible1, setIsVisible1] = useState(false);
  const [isVisible2, setIsVisible2] = useState(false);

  const isFetching = useSelector(state => state.isFetching);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [fBorder, setFBorder] = useState(false);
  const [eBorder, setEBorder] = useState(false);
  const [mBorder, setMBorder] = useState(false);
  const [pBorder, setPBorder] = useState(false);
  const [cBorder, setCBorder] = useState(false);
  const [bBorder, setBBorder] = useState(false);
  const [visible, setVisible] = useState(true);
  const [visible1, setVisible1] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showModal1, setShowModal1] = useState(false);
  const [countryCode, setcountryCode] = useState('IN');
  const [callingCode, setcallingCode] = useState('91');
  const [show, setShow] = useState(false);
  const ref = useRef(null);
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);

  useEffect(() => {
    const backAction = () => {
      BackHandler.exitApp();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    NetInfo.addEventListener(state => {
      if(!state.isConnected){
        showMessage({
          message:'Please check your network',
          type:'danger',
        })
      }
    });
  },[])


  const validateUser = async (name, email, mobile, pin, referal) => {
    const device_type = DeviceInfo.getSystemName();
    let token = await AsyncStorage.getItem(Storage.token);
  
    if (toggleCheckBox == false) {
      Toast.show('Please accept Terms & Conditions');
    } else {
     
      dispatch({
        type: 'Send_RegOtp_Request',
        url: 'sendotp1',
        name,
        email,
        mobile,
        pin,
        referal,
        code: code,
        navigation,
      });
    }
  };

  const showVisible = () => {
    return (
      <TouchableOpacity
        delayPressIn={0}
        onPressIn={() => setVisible(false)}
        onPressOut={() => setVisible(true)}>
        {!visible ? (
          <Image
            style={{width: 24, height: 24, marginLeft: '25%'}}
            source={require('../../../assets/Image/eye.png')}
          />
        ) : (
          <Image
            style={{width: 24, height: 24, marginLeft: '25%'}}
            source={require('../../../assets/Image/eye1.png')}
          />
        )}
      </TouchableOpacity>
    );
  };
  const showVisible1 = () => {
    return (
      <TouchableOpacity
        delayPressIn={0}
        onPressIn={() => setVisible1(false)}
        onPressOut={() => setVisible1(true)}>
        {!visible1 ? (
          <Image
            style={{width: 24, height: 24, marginLeft: '25%'}}
            source={require('../../../assets/Image/eye.png')}
          />
        ) : (
          <Image
            style={{width: 24, height: 24, marginLeft: '25%'}}
            resizeMode="contain"
            source={require('../../../assets/Image/eye1.png')}
          />
        )}
      </TouchableOpacity>
    );
  };
  const handleClick = () => {
    setIsVisible1(true);
    setTimeout(() => {
      setIsVisible1(false);
      setShowModal(true);
    }, 2000);
  };
  const handleClick1 = () => {
    setIsVisible2(true);
    setTimeout(() => {
      setIsVisible2(false);
      setShowModal1(true);
    }, 2000);
  };

  return (
    <Formik
      initialValues={{
        email: '',
        mobile: '',
        name: '',
        pin: '',
        confirmPin: '',
        referal: '',
      }}
      onSubmit={values =>
        validateUser(
          values.name,
          values.email,
          values.mobile,
          values.pin,
          values.referal,
        )
      }
      validateOnMount={true}
      validationSchema={loginValidationSchema}>
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        touched,
        isValid,
        errors,
      }) => (
        <View style={styles.container}>
          {isFetching || isVisible1 == true || isVisible2 == true ? (
            <Loader />
          ) : null}
          {isVisible1 == true ? <Loader /> : null}
          <ScrollView>
            <KeyboardAwareScrollView
              extraScrollHeight={10}
              enableOnAndroid={true}
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={{flex: 1}}>
              <View style={{flex: 1}}>
                <View style={styles.imageContainer}>
                  <View style={styles.round}>
                    <Image
                      source={require('../../../assets/Image/logo-icon.png')}
                    />
                  </View>
                </View>

                <View style={styles.main}>
                  <View
                    style={[
                      styles.card,
                      {
                        borderColor:
                          fBorder && values.name ? colors.bc : 'white',
                      },
                    ]}>
                    <Text style={styles.heading}>Full Name</Text>
                    <View style={styles.input}>
                      <Image
                        style={styles.image}
                        source={require('../../../assets/Image/profile.png')}
                      />
                      <TextInput
                        onFocus={() => setFBorder(true)}
                        style={[styles.input1]}
                        placeholder="John methew"
                        placeholderTextColor={colors.heading1}
                        onChangeText={handleChange('name')}
                        onBlur={handleBlur('name')}
                        value={values.name}
                        maxLength={35}
                        returnKeyType="next"
                        onSubmitEditing={() => {
                          ref.current.focus();
                        }}
                        //blurOnSubmit={false}
                      />
                    </View>
                  </View>
                  <View style={styles.error}>
                    {errors.name && touched.name && (
                      <Text style={styles.warn}>{errors.name}</Text>
                    )}
                  </View>
                  <View
                    style={[
                      styles.card,
                      {
                        borderColor:
                          eBorder && values.email ? colors.bc : 'white',
                      },
                    ]}>
                    <Text style={styles.heading}>Email</Text>
                    <View style={styles.input}>
                      <Image
                        style={styles.image}
                        source={require('../../../assets/Image/msg.png')}
                      />
                      <TextInput
                        ref={ref}
                        caretHidden={false}
                        onFocus={() => setEBorder(true)}
                        style={styles.input1}
                        placeholder="example@domain.com"
                        placeholderTextColor={colors.heading1}
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        value={values.email}
                        maxLength={35}
                        keyboardType="email-address"
                        returnKeyType="next"
                        onSubmitEditing={() => {
                          ref1.current.focus();
                        }}
                      />
                    </View>
                  </View>
                  <View style={styles.error}>
                    {errors.email && touched.email && (
                      <Text style={styles.warn}>{errors.email}</Text>
                    )}
                  </View>
                  <View
                    style={[
                      styles.card,
                      {
                        borderColor:
                          mBorder && values.mobile ? colors.bc : 'white',
                      },
                    ]}>
                    <Text style={styles.heading}>Mobile</Text>
                    <View
                      style={[styles.input, {marginTop: -6, marginBottom: 0}]}>
                      <Image
                        style={styles.image}
                        source={require('../../../assets/Image/phone.png')}
                      />
                      <Text
                        style={{
                          paddingHorizontal: 5,
                        }}>{`+${callingCode}`}</Text>
                      <CountryPicker
                        withFilter
                        countryCode={countryCode}
                        visible={show}
                        withFlag={true}
                        withAlphaFilter={false}
                        withCurrencyButton={false}
                        withFlagButton={false}
                        withCallingCode
                        onSelect={country => {
                         
                          const {cca2, callingCode} = country;
                          setcountryCode(cca2);
                          setcallingCode(callingCode[0]);
                        }}
                        onClose={() => setShow(false)}
                      />
                      <TouchableOpacity
                        delayPressIn={0}
                        onPress={() => setShow(true)}>
                        <Image
                          style={{width: 10, height: 20, marginTop: 4}}
                          source={require('../../../assets/Image/down.png')}
                        />
                      </TouchableOpacity>

                      <TextInput
                        ref={ref1}
                        onFocus={() => setMBorder(true)}
                        style={[styles.input1]}
                        placeholder="9123456789"
                        placeholderTextColor={colors.heading1}
                        onChangeText={handleChange('mobile')}
                        onBlur={handleBlur('mobile')}
                        value={values.mobile}
                        keyboardType={'number-pad'}
                        maxLength={10}
                        returnKeyType="next"
                        onSubmitEditing={() => {
                          ref2.current.focus();
                        }}
                      />
                    </View>
                  </View>

                  <View style={styles.error}>
                    {errors.mobile && touched.mobile && (
                      <Text style={styles.warn}>{errors.mobile}</Text>
                    )}
                  </View>
                  <View style={styles.view2}>
                    <View style={styles.view1}>
                      <View
                        style={[
                          styles.card1,
                          {
                            borderColor:
                              pBorder && values.pin ? colors.bc : 'white',
                          },
                        ]}>
                        <Text style={styles.heading}>Set Your Pin</Text>
                        <View style={styles.input}>
                          <Image
                            style={styles.image}
                            source={require('../../../assets/Image/lock.png')}
                          />
                          <TextInput
                            ref={ref2}
                            onFocus={() => setPBorder(true)}
                            style={[styles.input2]}
                            placeholder="0000"
                            placeholderTextColor={colors.heading1}
                            onChangeText={handleChange('pin')}
                            onBlur={handleBlur('pin')}
                            value={values.pin}
                            keyboardType={'number-pad'}
                            returnKeyType="next"
                            maxLength={4}
                            onSubmitEditing={() => {
                              ref3.current.focus();
                            }}
                            secureTextEntry={visible}
                          />
                          {showVisible()}
                        </View>
                      </View>
                      <View style={styles.error}>
                        {errors.pin && touched.pin && (
                          <Text style={styles.warn}>{errors.pin}</Text>
                        )}
                      </View>
                    </View>
                    <View style={styles.view1}>
                      <View
                        style={[
                          styles.card1,
                          {
                            borderColor:
                              cBorder && values.confirmPin
                                ? colors.bc
                                : 'white',
                          },
                        ]}>
                        <Text style={styles.heading}>Confirm Pin</Text>
                        <View style={styles.input}>
                          <Image
                            style={styles.image}
                            source={require('../../../assets/Image/lock.png')}
                          />
                          <TextInput
                            ref={ref3}
                            onFocus={() => setCBorder(true)}
                            style={[styles.input2]}
                            placeholder="0000"
                            placeholderTextColor={colors.heading1}
                            onChangeText={handleChange('confirmPin')}
                            onBlur={handleBlur('confirmPin')}
                            maxLength={4}
                            value={values.confirmPin}
                            keyboardType={'number-pad'}
                            returnKeyType="next"
                            onSubmitEditing={() => {
                              ref4.current.focus();
                            }}
                            secureTextEntry={visible1}
                          />
                          {showVisible1()}
                        </View>
                      </View>
                      <View style={styles.error}>
                        {errors.confirmPin && touched.confirmPin && (
                          <Text style={styles.warn}>{errors.confirmPin}</Text>
                        )}
                      </View>
                    </View>
                  </View>

                  <View
                    style={[
                      styles.card,
                      {
                        borderColor:
                          bBorder && values.referal ? colors.bc : 'white',
                      },
                    ]}>
                    <Text style={styles.heading}>
                      Enter Referral Code (Optional)
                    </Text>
                    <View style={styles.input}>
                      <TextInput
                        ref={ref4}
                        onFocus={() => setBBorder(true)}
                        style={[
                          styles.input1,
                          {
                            marginLeft: Platform.OS == 'android' ? -3 : 0,
                            marginTop: Platform.OS == 'android' ? 0 : 5,
                          },
                        ]}
                        placeholder="xxx111"
                        placeholderTextColor={colors.heading1}
                        onChangeText={handleChange('referal')}
                        value={values.referal}
                        returnKeyType="done"
                      />
                    </View>
                  </View>
                  <View style={styles.error}>
                    {errors.referal && touched.referal && (
                      <Text style={styles.warn}>{errors.referal}</Text>
                    )}
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingVertical: Platform.OS == 'android' ? 3 : 10,
                      width: '100%',
                      justifyContent: 'space-between',
                      marginTop: 10,
                    }}>
                    <CheckBox
                      disabled={false}
                      value={toggleCheckBox}
                      onValueChange={newValue => setToggleCheckBox(newValue)}
                      tintColors={{true: '#5A4392', false: '#5A4392'}}
                      onTintColor='#5A4392'
                      onCheckColor='#5A4392'
                    />
                    <Text style={styles.agree}>
                      {'I agree with '}
                      <Text
                        onPress={() => handleClick()}
                        style={[
                          styles.agree1,
                          {height: 50},
                        ]}>{`Terms & Conditions`}</Text>
                      <Text> and </Text>
                      <Text
                        onPress={() => handleClick1()}
                        style={styles.agree1}>{`Privacy Policy`}</Text>
                    </Text>
                  </View>
                  <View style={styles.button}>
                    <CustomButton
                      onPress={() => handleSubmit()}
                      title="SIGN UP"
                    />
                  </View>
                  <View style={[styles.bottom]}>
                    <Text style={styles.account}>Already have an account?</Text>
                    <Text
                      onPress={() => navigation.push('Login')}
                      style={styles.account1}>
                      {' '}
                      Login here
                    </Text>
                  </View>
                </View>
              </View>
            </KeyboardAwareScrollView>
          </ScrollView>
          <Dialog
            dialogStyle={{
              width: '95%',
              paddingHorizontal: 0,
              height: '90%',
              paddingTop: 10,
            }}
            visible={showModal}
            onHardwareBackPress={() => setShowModal(false)}>
            <DialogContent>
              <View style={{alignSelf: 'flex-end', padding: -20}}>
                <TouchableOpacity
                  delayPressIn={0}
                  onPress={() => setShowModal(false)}
                  style={styles.cross}>
                  <Text style={styles.x}>x</Text>
                </TouchableOpacity>
              </View>
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{marginBottom: 30}}>
                  <HTMLView
                    value={selector1[0].value
                      .trim()
                      .replace(new RegExp('<p>', 'g'), '<span>')}
                    addLineBreaks={false}
                  />
                </View>
              </ScrollView>
            </DialogContent>
          </Dialog>
          <Dialog
            dialogStyle={{
              width: '95%',
              paddingHorizontal: 0,
              height: '90%',
              paddingTop: 10,
            }}
            visible={showModal1}
            onHardwareBackPress={() => setShowModal1(false)}>
            <DialogContent>
              <View style={{alignSelf: 'flex-end'}}>
                <TouchableOpacity
                  delayPressIn={0}
                  onPress={() => setShowModal1(false)}
                  style={styles.cross}>
                  <Text style={styles.x}>x</Text>
                </TouchableOpacity>
              </View>
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{marginBottom: 30}}>
                  <HTMLView
                    value={selector[0].value
                      .trim()
                      .replace(new RegExp('<p>', 'g'), '<span>')}
                    addLineBreaks={false}
                  />
                </View>
              </ScrollView>
            </DialogContent>
          </Dialog>
          <StatusBar />
        </View>
      )}
    </Formik>
  );
};
export default RegisterPage;
