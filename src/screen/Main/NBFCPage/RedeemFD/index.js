import React, {useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity, TextInput} from 'react-native';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import colors from '../../../../component/colors';
import Header from '../../../../component/header';
import CustomButton from '../../../../component/button1';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import styles from './styles';
import AsyncStorage from '@react-native-community/async-storage';
import Storage from '../../../../component/AsyncStorage';
import {CheckBox} from 'react-native-elements';
import Loader from '../../../../component/loader';
import Dialog, {DialogContent} from 'react-native-popup-dialog';
import RNPickerSelect from 'react-native-picker-select';
import Toast from 'react-native-simple-toast';
import axios from 'axios';
import Constants from '../../../../component/Constants';
import BottomTab from '../../../../component/StoreButtomTab';

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

  useEffect(async () => {
    const user_id = await AsyncStorage.getItem(Storage.user_id);
    dispatch({
      type: 'Bank_List_Request',
      url: 'userbanklist',
      user_id,
    });
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

  const addBank = async () => {
    const user_id = await AsyncStorage.getItem(Storage.user_id);

    if (bank_name == '' || bank_name == null || bank_name == 0) {
      Toast.show('Please select financial institution');
    } else if (account_number == '' || account_number == null) {
      Toast.show('Please enter account number');
    } else if (
      account_type == '' ||
      account_type == null ||
      account_type == 0
    ) {
      Toast.show('Please select account type');
    } else if (ifsc_code == '') {
      Toast.show('Please enter valid ifsc code');
    } else {
      try {
        const data = new FormData();
        data.append('user_id', user_id);
        data.append('bank_id', bank_name);
        data.append('account_number', account_number);
        data.append('account_type', account_type);
        data.append('ifsc_code', ifsc_code);
        data.append('other1', 'test');
        data.append('other2', 'test');
        const response = await axios({
          method: 'POST',
          data,
          headers: {
            'content-type': 'multipart/form-data',
            Accept: 'multipart/form-data',
          },
          url: 'https://indiadeposit.in/admin/public/apis/adduserbank',
        });

        if (response.data.status == 200) {
          setShowModal1(false);
          dispatch({
            type: 'Bank_List_Request',
            url: 'userbanklist',
            user_id,
          });
          Toast.show('Bank add successful');
        } else {
          Toast.show(response.data.messages);
        }
      } catch (error) {
        throw error;
      }
    }
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

  return (
    <View style={styles.container}>
      <Header
        title={'Financial Institute'}
        source={require('../../../../assets/Image/arrow2.png')}
        onPress={() => navigation.goBack()}
      />
      {isFetching ? <Loader /> : null}
      <View>
        <View style={styles.view4}>
        
        </View>
        <View style={[styles.view4, {marginTop: 5}]}>
         
        </View>
        <View>
          <ScrollView>
            <FlatList
              data={selector}
              renderItem={({item}) => renderItem(item)}
              style={{width: '100%', marginBottom: 10, marginTop: 5}}
            />
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 20,
              }}>
              <TouchableOpacity
                delayPressIn={0}
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
            </View>
            <View style={{marginBottom: 200}}></View>
          </ScrollView>
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
        }}>
        <View style={{marginTop: 20}}>
          <TouchableOpacity
            delayPressIn={0}
            disabled={data ? false : true}
            onPress={() =>
              navigation.navigate('BankDetailScrn', {
                data: data,
                name: route.params.name,
                my_fixed_deposit_id: route.params.my_fixed_deposit_id,
              })
            }
            style={{
              width: '100%',
              backgroundColor: data ? colors.bc : 'grey',
              height: 50,
              borderRadius: 30,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{color: colors.white}}>{'CONTINUE'}</Text>
          </TouchableOpacity>
        </View>
      </View>
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
                placeholder={{label: 'Select financial institution', value: ''}}
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
                placeholder={{label: 'Select account type', value: ''}}
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
      <View>
        <BottomTab/>
      </View>
    </View>
  );
};
export default MyFDDetail;
const data1 = [
  {label: 'Saving Account', value: 'Saving Account'},
  {label: 'Current Account', value: 'Current Account'},
  {label: 'Others', value: 'Others'},
];
