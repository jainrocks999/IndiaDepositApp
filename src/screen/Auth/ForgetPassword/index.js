import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  BackHandler,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import CustomButton from '../../../component/button1';
import {useNavigation} from '@react-navigation/native';
import styles from './styles';
import Toast from 'react-native-simple-toast';
import StatusBar from '../../../component/StatusBar';
import {useDispatch, useSelector} from 'react-redux';
import Loader from '../../../component/loader';
import {Formik} from 'formik';
import fontSize from '../../../component/fontSize';
import * as yup from 'yup';
import colors from '../../../component/colors';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const loginValidationSchema = yup.object().shape({
  email: yup.string().email('Please enter valid Email '),
  mobile: yup
    .string()
    .min(10, ({}) => 'Mobile Number must be 10 digit number')
    .matches(/^[0]?[6-9]\d{9}$/, 'Please enter valid Mobile Number'),
});
const ForgetPassword = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isFetching = useSelector(state => state.isFetching);
  const [focus, setFocus] = useState(false);
  const [focus1, setFocus1] = useState(false);
  useEffect(() => {
    const backAction = () => {
      navigation.push('Login');
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const validateUser = (email, mobile) => {
    console.log('hi', email, mobile);
    if (email && mobile) {
      Toast.show('Please Enter Email or Mobile Number');
    } else if (email) {
      dispatch({
        type: 'Send_Otp_Request',
        url: 'sendotp',
        email,
        navigation,
      });
    } else if (mobile) {
      dispatch({
        type: 'Send_Otp_Request',
        url: 'sendotp',
        mobile,
        navigation,
      });
    }
  };

  return (
    <Formik
      initialValues={{email: '', mobile: ''}}
      onSubmit={values => validateUser(values.email, values.mobile)}
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
          {isFetching ? <Loader /> : null}
          <KeyboardAwareScrollView>
            <View style={styles.imageContainer}>
              <TouchableOpacity
                delayPressIn={0}
                onPress={() => navigation.push('Login')}>
                <Image
                  style={{width: 32, height: 24}}
                  source={require('../../../assets/Image/arrowBack.png')}
                />
              </TouchableOpacity>
              <View style={styles.round}>
                <Image
                  source={require('../../../assets/Image/logo-icon.png')}
                />
              </View>
              <View style={{width: '5%'}}></View>
            </View>
            <View style={styles.main}>
              <View
                style={[
                  styles.card,
                  {borderColor: focus && values.email ? colors.bc : '#fff'},
                ]}>
                <Text style={styles.heading}>Email</Text>
                <View style={styles.input}>
                  <Image
                    resizeMode="contain"
                    style={{width: 24, height: 24}}
                    source={require('../../../assets/Image/msg.png')}
                  />
                  <TextInput
                    onFocus={() => setFocus(true)}
                    placeholder="example@domain.com"
                    placeholderTextColor={colors.heading1}
                    style={styles.input1}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                    maxLength={35}
                    keyboardType="email-address"
                    returnKeyType="done"
                  />
                </View>
              </View>
              <View style={styles.error}>
                {errors.email && touched.email && (
                  <Text style={styles.error1}>{errors.email}</Text>
                )}
              </View>
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingVertical: 15,
                }}>
                <Text
                  style={{
                    color: colors.textColor,
                    fontSize: fontSize.fefteen,
                    fontWeight: '600',
                  }}>
                  OR
                </Text>
              </View>
              <View
                style={[
                  styles.card,
                  {borderColor: focus1 && values.mobile ? colors.bc : '#fff'},
                ]}>
                <Text style={styles.heading}>Mobile</Text>
                <View style={styles.input}>
                  <Image
                    resizeMode="contain"
                    style={{width: 24, height: 24}}
                    source={require('../../../assets/Image/phone.png')}
                  />
                  <TextInput
                    onFocus={() => setFocus1(true)}
                    placeholder="9123456789"
                    placeholderTextColor={colors.heading1}
                    style={styles.input1}
                    onChangeText={handleChange('mobile')}
                    onBlur={handleBlur('mobile')}
                    value={values.mobile}
                    maxLength={10}
                    keyboardType="number-pad"
                    returnKeyType="done"
                  />
                </View>
              </View>
              <View style={styles.error}>
                {errors.mobile && touched.mobile && (
                  <Text style={styles.error2}>{errors.mobile}</Text>
                )}
              </View>
              <View style={styles.button}>
                <CustomButton
                  title="RESET MY PIN"
                  onPress={() =>
                    values.email == '' && values.mobile == ''
                      ? Toast.show('Please Enter Email or Mobile Number')
                      : handleSubmit()
                  }
                />
              </View>
            </View>
          </KeyboardAwareScrollView>
          <StatusBar />
        </View>
      )}
    </Formik>
  );
};
export default ForgetPassword;
