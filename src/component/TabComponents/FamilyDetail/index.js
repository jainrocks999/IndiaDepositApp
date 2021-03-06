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
import * as Root from '../../../navigator/rootNavigation'
import colors from '../../colors';
import Toast from 'react-native-simple-toast';
import OptionsMenu from 'react-native-option-menu';

const FamilyDetails = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const selector = useSelector(state => state.FamilyList);
  const isFetching = useSelector(state => state.isFetching);
  useEffect(async () => {
    const user_id = await AsyncStorage.getItem(Storage.user_id);
    dispatch({
      type: 'Family_List_Request',
      url: 'getfamilylist',
      user_id,
    });
  }, []);

  const editPost = item => {
    Root.replace('EditFamily', {item});
  };
  const deletePost = async item => {
    const user_id = await AsyncStorage.getItem(Storage.user_id);
    try {
      const data = new FormData();
      data.append('family_id', item.user_id);
      const response = await axios({
        method: 'POST',
        data,
        headers: {
          'content-type': 'multipart/form-data',
          Accept: 'multipart/form-data',
        },
        url: 'https://indiadeposit.in/admin/public/apis/deletefamily',
      });

      if (response.data.status == 200 || response.data.status == 400) {
        dispatch({
          type: 'Family_List_Request',
          url: 'getfamilylist',
          user_id: user_id,
        });
      }
    } catch (error) {
      throw error;
    }
  };
  const renderModal = item => {
    Alert.alert(
      'CONFIRM',
      'Are you sure you want to delete Family Member details?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {text: 'YES', onPress: () => deletePost(item)},
      ],
    );
  };
  const renderItem = item => {
    return (
      <View style={styles.cont}>
        {item.relation == null ||item.relation==''||item.relation==0||item.parent_id==0 ? (
          <View  />
        ) : (
          <View style={[styles.card]}>
            <View style={styles.row1}>
              <Text style={styles.same}>{`Name : ${item.name}`}</Text>
              <OptionsMenu
                button={require('../../../assets/Image/menu3.png')}
                buttonStyle={{width: 16, height: 18}}
                destructiveIndex={1}
                options={['Edit', 'Delete', 'Cancel']}
                actions={[() => editPost(item), () => renderModal(item)]}
              />
            </View>

            <View style={{marginTop: -6}}>
              <View style={styles.row}>
                <Text style={styles.same}>{`Relationship : ${
                  item.relation == null ||
                  item.relation == '' ||
                  item.relation == 0
                    ? ''
                    : item.relation
                }`}</Text>
              </View>
            </View>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      {isFetching ? <Loader /> : null}
      <ScrollView>
        <View style={styles.list}>
          <FlatList
            showsHorizontalScrollIndicator={false}
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
              onPress={() => Root.replace('AddFamily')}
              style={{
                backgroundColor: colors.bc,
                paddingHorizontal: 15,
                paddingVertical: 6,
                borderRadius: 10,
              }}>
              <Text style={{fontSize: fontSize.fourteen, color: colors.white}}>
                ADD FAMILY MEMBER
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
export default FamilyDetails;
