import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Linking,
} from 'react-native';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import colors from '../../../../component/colors';
import Header from '../../../../component/header';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import styles from './styles';
import CustomButton from '../../../../component/button1';
import AsyncStorage from '@react-native-community/async-storage';
import Storage from '../../../../component/AsyncStorage';
import {CheckBox} from 'react-native-elements';
import Loader from '../../../../component/loader';
import Dialog, {DialogContent} from 'react-native-popup-dialog';
import RNPickerSelect from 'react-native-picker-select';
import Clipboard from '@react-native-clipboard/clipboard';
import Constants from '../../../../component/Constants';

import Toast from 'react-native-simple-toast';
import axios from 'axios';

const MyFDDetail = ({route}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const selector = useSelector(state => state.BankList);
  const isFetching = useSelector(state => state.isFetching);
  const [ids, setIds] = useState([]);
  const [data, setData] = useState('');
  const selector1 = useSelector(state => state.BankNameList);
  const [bank_name, set_bank_name] = useState('');
  const [account_type, set_account_type] = useState('');
  const [account_number, set_account_number] = useState('');
  const [ifsc_code, set_ifsc_code] = useState('');
  const [showModal1, setShowModal1] = useState(false);
  console.log('this is route.params data',route.params);

  useEffect(async () => {
    const user_id = await AsyncStorage.getItem(Storage.user_id);
    // dispatch({
    //   type: 'Bank_List_Request',
    //   url: 'userbanklist',
    //   user_id,
    // });
  }, []);

  const isChecked = itemId => {
    const isThere = ids.includes(itemId);
    return isThere;
  };

  const toggleChecked = (itemId, item) => {
    if (ids.includes(itemId)) {
      setIds([]);
    }
    setIds(itemId);
    setData(item);
  };

  const copyToClipboard = () => {
    Clipboard.setString(route.params.beneficiaryname);
    Toast.show('copied to clipboard');
  };

  const copyToClipboard1 = () => {
    Clipboard.setString(route.params.accountnumber);
    Toast.show('copied to clipboard');
  };

  const copyToClipboard2 = () => {
    Clipboard.setString(route.params.bankifsc);
    Toast.show('copied to clipboard');
  };
  const renderItem = item => {
    return (
      <View style={styles.cont}>
        <View style={styles.card}>
          <View>
            <View style={styles.cardView}>
              <Image
                resizeMode="contain"
                style={{height: 20, width: 70}}
                source={{
                  uri: `${Constants.imageUrl}${item.bank_logo}`,
                }}
              />
              <View style={{width: '20%', alignItems: 'flex-end'}}></View>
            </View>
            <View style={[styles.row, {marginTop: item.bank_logo ? 5 : 0}]}>
              <Text
                style={
                  styles.same
                }>{`Account No : XXXXXXXXXX${item.account_number.substr(
                -4,
              )}`}</Text>
            </View>
            <View style={styles.row}>
              <Text
                style={[
                  styles.same,
                  {marginTop: 5},
                ]}>{`IFSC Code : ${item.ifsc_code}`}</Text>
            </View>
            <View style={[styles.row, {marginTop: 5}]}>
              <Text
                style={
                  styles.same
                }>{`Account Type : ${item.account_type}`}</Text>
            </View>
          </View>
          <CheckBox
            center
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            checkedColor={colors.bc}
            checked={isChecked(item.user_bank_id)}
            onPress={() => toggleChecked(item.user_bank_id, item)}
          />
        </View>
      </View>
    );
  };

  // const addBank = async () => {
  //   const user_id = await AsyncStorage.getItem(Storage.user_id);

  //   if (bank_name == '' || bank_name == null || bank_name == 0) {
  //     Toast.show('Please select bank name');
  //   } else if (account_number == '' || account_number == null) {
  //     Toast.show('Please enter account number');
  //   } else if (
  //     account_type == '' ||
  //     account_type == null ||
  //     account_type == 0
  //   ) {
  //     Toast.show('Please select account type');
  //   } else if (ifsc_code == '') {
  //     Toast.show('Please enter valid ifsc code');
  //   } else {
  //     try {
  //       const data = new FormData();
  //       data.append('user_id', user_id);
  //       data.append('bank_id', bank_name);
  //       data.append('account_number', account_number);
  //       data.append('account_type', account_type);
  //       data.append('ifsc_code', ifsc_code);
  //       data.append('other1', 'test');
  //       data.append('other2', 'test');
  //       const response = await axios({
  //         method: 'POST',
  //         data,
  //         headers: {
  //           'content-type': 'multipart/form-data',
  //           Accept: 'multipart/form-data',
  //         },
  //         url: 'https://demo.webshowcase-india.com/indiadeposit/public/apis/adduserbank',
  //       });
  //       console.log('this user resposens', response);
  //       if (response.data.status == 200) {
  //         setShowModal1(false);
  //         dispatch({
  //           type: 'Bank_List_Request',
  //           url: 'userbanklist',
  //           user_id,
  //         });
  //         Toast.show('Bank add successful');
  //       } else {
  //         Toast.show(response.data.messages);
  //       }
  //     } catch (error) {
  //       throw error;
  //     }
  //   }
  // };
  console.log('this is narenra here');
  return (
    <View style={styles.container}>
      <Header
        title={'PAYMENT MODE'}
        source={require('../../../../assets/Image/arrow2.png')}
        onPress={() => navigation.goBack()}
      />
      {isFetching ? <Loader /> : null}
      <View style={{paddingHorizontal: 15, flex: 1}}>
        <View style={[styles.card, {paddingBottom: 30,paddingTop:20, marginVertical: 20}]}>
          <Text style={{fontSize:13,fontFamily:'Montserrat-Regular'}}>{`Kindly make the payment directly to ${route.params.beneficiaryname}. Company's bank details are mentioned below`} </Text>
          <Text style={{marginTop:5,fontFamily:'Montserrat-Regular',fontSize:13}}>{`Note: NEFT/RTGS are the only acceptable mode of payment.Amy other payment,including IMPS,will not be accepted.The same has been emailed you`} </Text>

          {/* <Text style={{fontSize: 16, fontFamily: 'Montserrat-SemiBold'}}>
            Account Detail
          </Text> */}
          <Text
            style={{
              fontFamily: 'Montserrat-Regular',
              fontSize: 13,
              marginTop: 10,
            }}>
            Beneficiary Name
          </Text>
          <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
            <Text 
              style={{
                fontFamily: 'Montserrat-SemiBold',
                color: colors.textColor,
              }}>
              {route.params.beneficiaryname}
            </Text>
            <Text onPress={() => copyToClipboard()} style={{color:colors.bc}}>Copy</Text>
          </View>
          <Text
            style={{
              fontFamily: 'Montserrat-Regular',
              fontSize: 13,
              marginTop: 8,
            }}>
            Account Number
          </Text>
          <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
            <Text
              style={{
                fontFamily: 'Montserrat-SemiBold',
                color: colors.textColor,
              }}>
              {route.params.accountnumber}
            </Text>
            <Text onPress={() => copyToClipboard1()} style={{color:colors.bc}}>Copy</Text>

          </View>
          <Text
            style={{
              fontFamily: 'Montserrat-Regular',
              fontSize: 13,
              marginTop: 8,
            }}>
            IFSC Code
          </Text>
          <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginBottom:20}}>
            <Text
              style={{
                fontFamily: 'Montserrat-SemiBold',
                color: colors.textColor,
              }}>
              {route.params.bankifsc}
            </Text>
            <Text onPress={() => copyToClipboard2()} style={{color:colors.bc}}>Copy</Text>

          </View>
          {route.params.onlinepaymenturl ? (
            <CustomButton
              onPress={() => Linking.openURL(route.params.onlinepaymenturl)}
              title="COMPLETE PAYMENT"
            />
          ) : (
            <View />
          )}
          <View style={{marginTop: 10}} />
          <CustomButton
            title="UPLOAD PAYMENT DETAILS"
            onPress={() =>
              navigation.navigate('PaymentDetail', {
                amount: route.params.amount,
                my_fixed_deposit_id: route.params.my_fixed_deposit_id,
              })
            }
          />
        </View>
        {/* <View style={{paddingHorizontal: 15, paddingVertical: 10}}>
          <Text
            style={{
              fontSize: 13,
              fontFamily: 'Montserrat-Regular',
              color: colors.textColor,
            }}>
            {' '}
            Lorem ipsum, or lipsum as it is sometimes known, is dummy text used
            in laying out print, graphic or web designs. The passage is
            attributed to an unknown typesetter book.
          </Text>
        </View> */}
        <View>
          {/* <FlatList
            data={selector}
            renderItem={({item}) => renderItem(item)}
            style={{width: '100%', marginBottom: 10, marginTop: 5}}
          /> */}
          {/* <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 20,
            }}>
            <TouchableOpacity
              onPress={() => {
                set_bank_name('');
                set_ifsc_code('');
                set_account_number('');
                set_account_type('');
                setShowModal1(true);
              }}
              style={styles.Touch}>
              <Text style={{fontSize: 14, color: colors.white}}>
                + ADD BANK
              </Text>
            </TouchableOpacity>
            <View style={{marginBottom: 200}} />
          </View> */}
        </View>
      </View>
      <View
        style={{
          bottom: 0,
          left: 0,
          right: 0,
          position: 'absolute',
          backgroundColor: '#fff',
          paddingHorizontal: 20,
          paddingVertical: 10,
        }}></View>
      <Dialog
        dialogStyle={{
          width: '98%',
          paddingHorizontal: 0,
          height: '70%',
          paddingTop: 0,
        }}
        visible={showModal1}
        containerStyle={{marginTop: 20}}
        onHardwareBackPress={() => setShowModal1(false)}>
        <View style={{alignSelf: 'flex-end'}}>
          <TouchableOpacity
            delayPressIn={0}
            onPress={() => {
              setShowModal1(false);
            }}
            style={styles.cross}>
            <Text style={styles.x}>x</Text>
          </TouchableOpacity>
        </View>
        <DialogContent>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.better}>Financial Institution</Text>
              <Text style={{marginTop: 10, color: colors.red}}>*</Text>
            </View>

            <View style={styles.drop}>
              <RNPickerSelect
                onValueChange={val => set_bank_name(val)}
                items={selector1}
                style={{
                  inputAndroid: {
                    color: colors.textColor,
                    width: '100%',
                    fontSize: 14,
                    marginBottom: -1,
                  },
                  placeholder: {color: colors.heading},
                }}
                value={bank_name}
                useNativeAndroidPickerStyle={false}
                placeholder={{label: 'Select Financial Institution', value: ''}}
              />
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.better}>Account Number</Text>
              <Text style={{marginTop: 10, color: colors.red}}>*</Text>
            </View>

            <View style={styles.drop}>
              <TextInput
                style={styles.input}
                placeholder="21000001234567"
                placeholderTextColor={colors.heading1}
                value={account_number}
                onChangeText={val => set_account_number(val)}
                keyboardType="number-pad"
                maxLength={16}
                returnKeyType="done"
              />
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.better}>Account Type</Text>
              <Text style={{marginTop: 10, color: colors.red}}>*</Text>
            </View>

            <View style={styles.drop}>
              <RNPickerSelect
                onValueChange={val => set_account_type(val)}
                items={data1}
                style={{
                  inputAndroid: {
                    color: colors.textColor,
                    width: '100%',
                    fontSize: 14,
                    marginBottom: -1,
                  },
                  placeholder: {color: colors.heading},
                }}
                value={account_type}
                useNativeAndroidPickerStyle={false}
                placeholder={{label: 'Select Account Type', value: ''}}
              />
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.better}>IFSC Code</Text>
              <Text style={{marginTop: 10, color: colors.red}}>*</Text>
            </View>

            <View style={styles.drop}>
              <TextInput
                style={styles.input}
                placeholder="SBIN00084"
                placeholderTextColor={colors.heading1}
                value={ifsc_code}
                onChangeText={val => set_ifsc_code(val)}
                autoCapitalize={'characters'}
                maxLength={11}
                returnKeyType="done"
              />
            </View>
            <View style={{marginTop: 20}}>
              <CustomButton title="ADD" onPress={() => addBank()} />
            </View>
          </ScrollView>
        </DialogContent>
      </Dialog>
    </View>
  );
};
export default MyFDDetail;
const data1 = [
  {label: 'Saving Account', value: 'Saving Account'},
  {label: 'Current Account', value: 'Current Account'},
  {label: 'Others', value: 'Others'},
];
