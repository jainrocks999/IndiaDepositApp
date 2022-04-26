import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Loader from '../../../component/loader';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import fontSize from '../../fontSize';
import AsyncStorage from '@react-native-community/async-storage';
import Storage from '../../AsyncStorage';
import axios from 'axios';
import * as Root from '../../../navigator/rootNavigation';
import colors from '../../colors';
import Modal from 'react-native-modal';
import OptionsMenu from 'react-native-option-menu';
import Constants from '../../../component/Constants';

const BankDetails = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const selector = useSelector(state => state.BankList);
  const isFetching = useSelector(state => state.isFetching);
  const [visible, setVisible] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  useEffect(async () => {
    const user_id = await AsyncStorage.getItem(Storage.user_id);

    dispatch({
      type: 'Bank_List_Request',
      url: 'userbanklist',
      user_id,
    });

    dispatch({
      type: 'Bank_Detail_Request',
      url: 'bankdetaillist',
      user_id,
    });
  }, []);

  const editPost = item => {
    Root.replace('EditUserBank', {
      item,
    });
  };
  const deletePost = async item => {
    const user_id = await AsyncStorage.getItem(Storage.user_id);
    try {
      const data = new FormData();
      data.append('user_bank_id', item.user_bank_id);

      const response = await axios({
        method: 'POST',
        data,
        headers: {
          'content-type': 'multipart/form-data',
          Accept: 'multipart/form-data',
        },
        url: 'https://indiadeposit.in/admin/public/apis/deleteuserbank',
      });
  
      if (response.data.status == 200) {
        dispatch({
          type: 'Bank_List_Request',
          url: 'userbanklist',
          user_id,
        });
      }
    } catch (error) {
      throw error;
    }
  };
  const renderModal = item => {
    Alert.alert('CONFIRM', 'Are you sure you want to delete Bank detail?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'YES', onPress: () => deletePost(item)},
    ]);
  };

  const renderItem = item => {
    return (
      <View style={styles.cont}>
        <View style={styles.card}>
          <View style={styles.cardView}>
            <Image
              resizeMode="contain"
              style={{height: 20, width: 70}}
              source={{
                uri: `${Constants.imageUrl}${item.bank_logo}`,
              }}
            />
            <View style={{width: '20%', alignItems: 'flex-end'}}></View>
            <OptionsMenu
              button={require('../../../assets/Image/menu3.png')}
              buttonStyle={{width: 16, height: 18}}
              destructiveIndex={1}
              options={['Edit', 'Delete', 'Cancel']}
              actions={[() => editPost(item), () => renderModal(item)]}
            />
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
              style={styles.same}>{`Account Type : ${item.account_type}`}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      {isFetching ? <Loader /> : null}
      <ScrollView style={{flex: 1}}>
        <View style={styles.list}>
          <FlatList
            data={selector}
            renderItem={({item}) => renderItem(item)}
            style={{width: '100%', marginBottom: 10, marginTop: 5}}
          />
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flex: 1,
              marginBottom: 40,
              marginTop: 20,
            }}>
            <TouchableOpacity
              delayPressIn={0}
              onPress={() => Root.replace('AddBank')}
              style={{
                backgroundColor: colors.bc,
                paddingHorizontal: 15,
                paddingVertical: 6,
                borderRadius: 10,
              }}>
              <Text style={{fontSize: fontSize.fourteen, color: colors.white}}>
                ADD BANK
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
export default BankDetails;
