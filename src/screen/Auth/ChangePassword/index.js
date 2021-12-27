import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
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
import * as yup from 'yup';
import Header from '../../../component/header';
import colors from '../../../component/colors';
import BottomTab from '../../../component/StoreButtomTab';
import Storage from '../../../component/AsyncStorage';
import AsyncStorage from '@react-native-community/async-storage';

const loginValidationSchema = yup.object().shape({
  oldPassword: yup
    .string()
    .min(4, ({min}) => `Pin must be 4 digits`)
    .required('Please enter old Pin'),
  newPassword: yup
    .string()
    .min(4, ({min}) => `Pin must be 4 digits`)
    .required('Please enter new Pin'),
  // .matches(
  //   /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
  //   "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
  // ),
  confirmPassword: yup
    .string()
    .when('newPassword', {
      is: val => (val && val.length > 0 ? true : false),
      then: yup
        .string()
        .oneOf([yup.ref('newPassword')], 'Both pin need to be the same'),
    })
    .required('Please confirm new Pin'),
  // .matches(
  //   /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
  //   "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
  // ),
});

const ChangePassword = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isFetching = useSelector(state => state.isFetching);
  const [visible, setVisible] = useState(true);
  const [visible1, setVisible1] = useState(true);
  const [visible2, setVisible2] = useState(true);
  const [focus, setFocus] = useState(false);
  const [focus1, setFocus1] = useState(false);
  const [focus2, setFocus2] = useState(false);
  const ref1 = useRef(null);
  const ref2 = useRef(null);

  const showVisible = () => {
    return (
      <TouchableOpacity
        onPress={() => (visible ? setVisible(false) : setVisible(true))}>
        {!visible ? (
          <Image
            style={{width: 24, height: 24}}
            source={require('../../../assets/Image/eye.png')}
          />
        ) : (
          <Image
            style={{width: 24, height: 24}}
            source={require('../../../assets/Image/eye1.png')}
          />
        )}
      </TouchableOpacity>
    );
  };
  const showVisible1 = () => {
    return (
      <TouchableOpacity
        onPress={() => (visible1 ? setVisible1(false) : setVisible1(true))}>
        {!visible1 ? (
          <Image
            style={{width: 24, height: 24}}
            source={require('../../../assets/Image/eye.png')}
          />
        ) : (
          <Image
            style={{width: 24, height: 24}}
            source={require('../../../assets/Image/eye1.png')}
          />
        )}
      </TouchableOpacity>
    );
  };

  const showVisible2 = () => {
    return (
      <TouchableOpacity
        onPress={() => (visible2 ? setVisible2(false) : setVisible2(true))}>
        {!visible2 ? (
          <Image
            style={{width: 24, height: 24}}
            source={require('../../../assets/Image/eye.png')}
          />
        ) : (
          <Image
            style={{width: 24, height: 24}}
            source={require('../../../assets/Image/eye1.png')}
          />
        )}
      </TouchableOpacity>
    );
  };
  const validateUser = async values => {
    const user_id = await AsyncStorage.getItem(Storage.user_id);
    dispatch({
      type: 'Change_Password_Request',
      url: 'changepassword',
      user_id,
      password: values.oldPassword,
      newpassword: values.newPassword,
    });
  };
  return (
    <Formik
      initialValues={{oldPassword: '', newPassword: '', confirmPassword: ''}}
      onSubmit={values => validateUser(values)}
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
          <Header
            title={'CHANGE PIN'}
            source={require('../../../assets/Image/arrow2.png')}
            onPress={() => navigation.goBack()}
          />
          <ScrollView>
            <View style={styles.main}>
              <View
                style={[
                  styles.card,
                  {borderColor: focus ? colors.bc : '#fff'},
                ]}>
                <Text style={styles.heading}>Old Pin</Text>
                <View style={styles.input}>
                  {showVisible()}
                  <TextInput
                    onFocus={() => setFocus(true)}
                    style={styles.input1}
                    placeholder="Old Pin"
                    placeholderTextColor={colors.heading1}
                    onChangeText={handleChange('oldPassword')}
                    onBlur={handleBlur('oldPassword')}
                    value={values.oldPassword}
                    secureTextEntry={visible}
                    returnKeyType="next"
                    keyboardType="number-pad"
                    maxLength={4}
                    onSubmitEditing={() => {
                      ref1.current.focus();
                    }}
                  />
                </View>
              </View>
              <View style={styles.error}>
                {errors.oldPassword && touched.oldPassword && (
                  <Text style={styles.warn}>{errors.oldPassword}</Text>
                )}
              </View>
              <View
                style={[
                  styles.card,
                  {borderColor: focus1 ? colors.bc : '#fff'},
                ]}>
                <Text style={styles.heading}>New Pin</Text>
                <View style={styles.input}>
                  {showVisible1()}
                  <TextInput
                    ref={ref1}
                    onFocus={() => setFocus1(true)}
                    style={styles.input1}
                    placeholder="New Pin"
                    placeholderTextColor={colors.heading1}
                    onChangeText={handleChange('newPassword')}
                    onBlur={handleBlur('newPassword')}
                    value={values.newPassword}
                    secureTextEntry={visible1}
                    returnKeyType="next"
                    maxLength={4}
                    keyboardType="number-pad"
                    onSubmitEditing={() => {
                      ref2.current.focus();
                    }}
                  />
                </View>
              </View>
              <View style={styles.error}>
                {errors.newPassword && touched.newPassword && (
                  <Text style={styles.warn}>{errors.newPassword}</Text>
                )}
              </View>
              <View
                style={[
                  styles.card,
                  {borderColor: focus2 ? colors.bc : '#fff'},
                ]}>
                <Text style={styles.heading}>Confirm Pin</Text>
                <View style={styles.input}>
                  {showVisible2()}
                  <TextInput
                    ref={ref2}
                    onFocus={() => setFocus2(true)}
                    style={styles.input1}
                    placeholder="Confirm Pin"
                    placeholderTextColor={colors.heading1}
                    onChangeText={handleChange('confirmPassword')}
                    onBlur={handleBlur('confirmPassword')}
                    value={values.confirmPassword}
                    secureTextEntry={visible2}
                    keyboardType="number-pad"
                    returnKeyType="go"
                    onSubmitEditing={() => {
                      handleSubmit();
                    }}
                  />
                </View>
              </View>
              <View style={styles.error}>
                {errors.confirmPassword && touched.confirmPassword && (
                  <Text style={styles.warn}>{errors.confirmPassword}</Text>
                )}
              </View>
              <View style={styles.button}>
                <CustomButton
                  title="CHANGE PIN"
                  onPress={() =>
                    errors.email || errors.mobile
                      ? Toast.show('All field required')
                      : handleSubmit()
                  }
                />
              </View>
            </View>
          </ScrollView>
          <StatusBar />
          {/* <BottomTab/> */}
        </View>
      )}
    </Formik>
  );
};
export default ChangePassword;
