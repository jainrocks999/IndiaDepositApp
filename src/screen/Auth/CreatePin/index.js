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
import StatusBar from '../../../component/StatusBar';
import {useDispatch, useSelector} from 'react-redux';
import Loader from '../../../component/loader';
import {Formik} from 'formik';
import * as yup from 'yup';
import colors from '../../../component/colors';
import Storage from '../../../component/AsyncStorage';
import AsyncStorage from '@react-native-community/async-storage';

const loginValidationSchema = yup.object().shape({
  newPassword: yup
    .string()
    .min(4, ({min}) => `Pin must be 4 digits`)
    .required('Please enter new Pin'),
  confirmPassword: yup
    .string()
    .when('newPassword', {
      is: val => (val && val.length > 0 ? true : false),
      then: yup
        .string()
        .oneOf([yup.ref('newPassword')], 'Both pin need to be the same'),
    })
    .required('Please confirm new Pin'),
});

const ChangePassword = ({route}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const data = route.params;
  const isFetching = useSelector(state => state.isFetching);
  const [visible, setVisible] = useState(true);
  const [visible1, setVisible1] = useState(true);
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
            style={{width: 19, height: 13}}
            source={require('../../../assets/Image/eye.png')}
          />
        ) : (
          <Image
            style={{width: 19, height: 13}}
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
            style={{width: 19, height: 13}}
            source={require('../../../assets/Image/eye.png')}
          />
        ) : (
          <Image
            style={{width: 19, height: 13}}
            source={require('../../../assets/Image/eye1.png')}
          />
        )}
      </TouchableOpacity>
    );
  };
  const validateUser = async values => {
    const user_id = await AsyncStorage.getItem(Storage.user_id);
    if (data.mobile) {
      dispatch({
        type: 'Create_Pin_Request',
        url: 'forgetpassword',
        user_id,
        pin: values.newPassword,
        mobile: data.mobile,
        navigation,
      });
    } else {
      dispatch({
        type: 'Create_Pin_Request',
        url: 'forgetpassword',
        user_id,
        pin: values.newPassword,
        email: data.email,
        navigation,
      });
    }
  };
  return (
    <Formik
      initialValues={{newPassword: '', confirmPassword: ''}}
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

          <ScrollView>
            <View style={styles.imageContainer}>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
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
                    keyboardType="number-pad"
                    maxLength={4}
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
                <Text style={styles.heading}>Confirm New Pin</Text>
                <View style={styles.input}>
                  {showVisible()}
                  <TextInput
                    ref={ref2}
                    onFocus={() => setFocus2(true)}
                    style={styles.input1}
                    placeholder="Confirm New Pin"
                    placeholderTextColor={colors.heading1}
                    onChangeText={handleChange('confirmPassword')}
                    onBlur={handleBlur('confirmPassword')}
                    value={values.confirmPassword}
                    secureTextEntry={visible}
                    keyboardType="number-pad"
                    returnKeyType="go"
                    maxLength={4}
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
                  title="CREATE PIN"
                  onPress={() => handleSubmit()}
                />
              </View>
            </View>
          </ScrollView>
          <StatusBar />
        </View>
      )}
    </Formik>
  );
};
export default ChangePassword;
