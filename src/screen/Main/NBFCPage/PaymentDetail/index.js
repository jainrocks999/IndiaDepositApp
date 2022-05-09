import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  BackHandler,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import styles from './styles';
import colors from '../../../../component/colors';
import StatusBar from '../../../../component/StatusBar';
import Header from '../../../../component/header';
import CustomButton from '../../../../component/button1';
import {Formik} from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-native-date-picker';
import axios from 'axios';
import Loader from '../../../../component/loader';
import DocumentPicker from 'react-native-document-picker';
import Toast from 'react-native-simple-toast';
import BottomTab from '../../../../component/StoreButtomTab';

const loginValidationSchema = yup.object().shape({
  transaction_id: yup.string(),
  transaction_amount: yup.string().required('Please enter amount'),
});
const Payment = ({route}) => {
  const navigation = useNavigation();
  const [loader, setLoader] = useState(false);
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState('');
  const [imageName, setImageName] = useState('');
  const [imageType, setImageType] = useState('');
  const [date, setDate] = useState(new Date());
  const value1 = date.toISOString().split('T')[0];
  const [yyyy, mm, dd] = value1.split('-');
  const value = `${dd}-${mm}-${yyyy}`;

  console.log('this is routw.params. data ',route.params);

  useEffect(async () => {
    const backAction = () => {
      navigation.goBack();
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, []);

  const validateUser = async values => {
    if (image == '' && values.transaction_id == '') {
      Toast.show('Please enter transaction id or upload detail');
    } else if (image) {
      try {
        setLoader(true);
        const data = new FormData();
        data.append('transaction_id', '');
        data.append('transaction_amount', values.transaction_amount);
        data.append('transaction_date', value);
        data.append('my_fixed_deposit_id', route.params.my_fixed_deposit_id);
        data.append('mode_of_payment', 'offline');
        data.append('trans_img', {
          uri: image,
          name: imageName.substring(imageName.lastIndexOf('/') + 1),
          type: imageType,
        });
        const response = await axios({
          method: 'POST',
          data,
          headers: {
            'content-type': 'multipart/form-data',
            Accept: 'multipart/form-data',
          },
          url: 'https://indiadeposit.in/admin/public/apis/addtransactiondetail',
        });
     
        if (response.data.status == 200) {
          setLoader(false);
          navigation.navigate('PaymentDetail1', {
            id: values.transaction_id,
            amount: values.transaction_amount,
            date: value,
          });
        } else {
          setLoader(false);
        }
      } catch (error) {
      
        setLoader(false);
      }
    } else if (values.transaction_id) {
      try {
        setLoader(true);
        const data = new FormData();
        data.append('transaction_id', values.transaction_id);
        data.append('transaction_amount', values.transaction_amount);
        data.append('transaction_date', value);
        data.append('my_fixed_deposit_id', route.params.my_fixed_deposit_id);
        data.append('mode_of_payment', 'offline');
        data.append('trans_img', '');
        const response = await axios({
          method: 'POST',
          data,
          headers: {
            'content-type': 'multipart/form-data',
            Accept: 'multipart/form-data',
          },
          url: 'https://indiadeposit.in/admin/public/apis/addtransactiondetail',
        });
      
        if (response.data.status == 200) {
          setLoader(false);
          navigation.navigate('PaymentDetail1', {
            id: values.transaction_id,
            amount: values.transaction_amount,
            date: value,
          });
        } else {
          setLoader(false);
        }
      } catch (error) {
       
        setLoader(false);
      }
    }
  };

  const uploadImage = async () => {
    try {
      const res = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.pdf, DocumentPicker.types.images],
      });
      setImage(res[0].uri);
      setImageType(res[0].type);
      setImageName(res[0].name);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
        throw err;
      }
    }
  };

  return (
    <Formik
      initialValues={{
        transaction_id: '',
        transaction_amount: route.params.amount,
      }}
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
          <Header
            source={require('../../../../assets/Image/arrow2.png')}
            title={'PAYMENT DETAIL'}
            onPress={() => navigation.goBack()}
          />
          {loader ? <Loader /> : null}
          <ScrollView style={{paddingHorizontal: 15, paddingVertical: 10}}>
            <View style={styles.card}>
              <View>
                <View
                  style={{
                    marginTop: 5,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}></View>
                <View style={{marginTop: 15, alignItems: 'center'}}>
                  <TouchableOpacity onPress={() => uploadImage()} style={[styles.border, {borderWidth: image ? 0 : 1}]}>
                    {image ? (
                      <Image style={styles.image} source={{uri: image}} />
                    ) : (
                      <View>
                        <Text style={[styles.option,{textAlign:'center'}]}>Upload Transaction Copy Screenshot</Text>
                        {/* <Text style={styles.option}>Screenshot</Text> */}
                      </View>
                    )}
                  </TouchableOpacity>
                  <View style={{marginTop: 10}}>
                    {image ? (
                      <TouchableOpacity
                        delayPressIn={0}
                        onPress={() => setImage('')}
                        style={styles.button}>
                        <Text style={styles.upload}>Remove</Text>
                      </TouchableOpacity>
                    ) : (
                      <View/>
                      // <TouchableOpacity
                      //   delayPressIn={0}
                      //   onPress={() => uploadImage()}
                      //   style={styles.button}>
                      //   <Text style={styles.upload}>Upload</Text>
                      // </TouchableOpacity>
                    )}
                  </View>
                  <Text style={styles.or}>OR</Text>
                </View>
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: 'Montserrat-SemiBold',
                    color: colors.textColor,
                  }}>
                  Transaction ID
                </Text>
                <View style={[styles.drop]}>
                  <TextInput
                    style={{height: 40}}
                    placeholder="Please enter transaction id"
                    onChangeText={handleChange('transaction_id')}
                    onBlur={handleBlur('transaction_id')}
                    value={values.transaction_id}
                  />
                </View>
              </View>
              <View style={styles.error}>
                {errors.transaction_id && touched.transaction_id && (
                  <Text style={styles.warn}>{errors.transaction_id}</Text>
                )}
              </View>

              <View style={{marginTop: 15}}>
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: 'Montserrat-SemiBold',
                    color: colors.textColor,
                  }}>
                  Transaction Amount
                </Text>
                <View style={[styles.drop]}>
                  <TextInput
                    style={{height: 40, color: colors.textColor}}
                    placeholder="Please enter transaction amount"
                    onChangeText={handleChange('transaction_amount')}
                    onBlur={handleBlur('transaction_amount')}
                    value={values.transaction_amount}
                    keyboardType="number-pad"
                    editable={false}
                  />
                </View>
              </View>
              <View style={styles.error}>
                {errors.transaction_amount && touched.transaction_amount && (
                  <Text style={styles.warn}>{errors.transaction_amount}</Text>
                )}
              </View>

              <View style={{marginTop: 15}}>
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: 'Montserrat-SemiBold',
                    color: colors.textColor,
                  }}>
                  Transaction Date
                </Text>
                <TouchableOpacity
                  onPress={() => setOpen(true)}
                  style={[styles.drop1]}>
                  <Text>{value}</Text>
                  <DatePicker
                    date={date}
                    modal
                    mode={'date'}
                    open={open}
                    style={{alignItems: 'center'}}
                    onConfirm={date => {
                      setOpen(false);
                      setDate(date);
                    }}
                    onCancel={() => {
                      setOpen(false);
                    }}
                    textColor={colors.textColor}
                    maximumDate={new Date()}
                    // minimumDate={new Date()}
                  />
                  <TouchableOpacity onPress={() => setOpen(true)}>
                    <Image
                      style={{
                        marginLeft: 0,
                        width: 25,
                        height: 9,
                        marginTop: 0,
                      }}
                      source={require('../../../../assets/Image/down.png')}
                    />
                  </TouchableOpacity>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{marginTop: 130}}></View>
          </ScrollView>
          <View
            style={{
              bottom: 60,
              position: 'absolute',
              left: 0,
              right: 0,
              paddingVertical: 10,
              backgroundColor: '#fff',
            }}>
            <View style={{paddingHorizontal: 15, paddingVertical: 10}}>
              <CustomButton onPress={() => handleSubmit()} title={'SUBMIT'} />
            </View>
          </View>
          <StatusBar />
          <View>
        <BottomTab/>
      </View>
        </View>
      )}
    </Formik>
  );
};
export default Payment;
