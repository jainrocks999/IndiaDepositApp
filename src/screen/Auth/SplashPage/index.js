import React, {Fragment, useEffect, useState} from 'react';
import {View, Image, Text, TouchableOpacity, Alert, SafeAreaView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import Storage from '../../../component/AsyncStorage';
import styles from './style';
import axios from 'axios';
import Modal from 'react-native-modal';
import {useDispatch} from 'react-redux';
import StatusBar from '../../../component/StatusBar';
import Toast from 'react-native-simple-toast';
import colors from '../../../component/colors';
import NetInfo from "@react-native-community/netinfo";
import { showMessage, hideMessage } from "react-native-flash-message";
let value;
const Splash = () => {
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();

  
  useEffect(async () => {
    value = await AsyncStorage.getItem('value');
    const id = await AsyncStorage.getItem(Storage.user_id);
    appVersion();
    dispatch({
      type: 'Privacy_Request',
      url: 'getpagecontent',
      key: 'privacy',
      user_id: id,
    });
    dispatch({
      type: 'TermAndCondition_Request',
      url: 'getpagecontent',
      key: 'term_condition',
      user_id: id,
    });
  }, []);

  useEffect(() => {
    NetInfo.addEventListener(state => {
      console.log('this is testing message',state.isConnected);
      if(!state.isConnected){
        showMessage({
          message:'Please check your network',
          type:'danger',
        })
      }
    });
  },[])

  const appVersion = async ()=> {
    const id = await AsyncStorage.getItem(Storage.user_id);
    const user_id = id == null ? '' : id;
    const name = await AsyncStorage.getItem(Storage.name);
    const KeepmeLogin = await AsyncStorage.getItem('KeepmeLogin');
    try {
      const data = new FormData();
      data.append('user_id', user_id);
      const response = await axios({
        method: 'POST',
        data,
        headers: {
          'content-type': 'multipart/form-data',
          Accept: 'multipart/form-data',
        },
        url: 'https://indiadeposit.in/admin/public/apis/version',
      
      });
  
      if (Platform.OS == 'android') {
        if (response.data.android_version > 1) {
          setModalVisible(true);
        } else {
          if (response.data.useractive == 0) {
            AsyncStorage.setItem(Storage.user_id, '');
            AsyncStorage.setItem(Storage.name, '');
            initial(
              response.data.img_url,
              response.data.intro_speech,
              name,
              KeepmeLogin,
            );
          } else {
            initial(
              response.data.img_url,
              response.data.intro_speech,
              name,
              KeepmeLogin,
            );
          }
        }
      } else {
        if (response.data.ios_version > 1) {
          setModalVisible(true);
        } else {
          if (response.data.useractive == 0) {
            AsyncStorage.setItem(Storage.user_id, '');
            AsyncStorage.setItem(Storage.name, '');
            initial(response.data.img_url, response.data.intro_speech, name,KeepmeLogin);
          } else {
            initial(response.data.img_url, response.data.intro_speech, name,KeepmeLogin);
          }
        }
      }
    } catch (error) {
    
      if (error.message == 'Network Error') {
        // Toast.show('Please check your network');
      }
      throw error;
    }
  };
  const initial = async (image_url, intro_speech, name, KeepmeLogin) => {
    if (KeepmeLogin == 1) {
      if (value == 1 && name) {
        setTimeout(() => navigation.replace('Notification'), 0);
        AsyncStorage.setItem('value', '0');
      } else if (name) {
        setTimeout(() => navigation.replace('Main'), 2000);
      }
    } else if (value == 1 && KeepmeLogin == 0) {
      setTimeout(
        () =>
          navigation.replace('Introduction', {
            image_url: image_url,
            intro_speech: intro_speech,
          }),
        2000,
      );
      AsyncStorage.setItem('value', '0');
    } else {
      setTimeout(
        () =>
          navigation.replace('Introduction', {
            image_url: image_url,
            intro_speech: intro_speech,
          }),
        2000,
      );
    }
  };
  return (
    <Fragment>
      <SafeAreaView style={{flex:0,backgroundColor:colors.bc}}/>
    <SafeAreaView style={{flex:1,backgroundColor:colors.bc}}>
    <View style={styles.container}>
      <Modal isVisible={isModalVisible}>
        <View style={styles.modal}>
          <View style={styles.view1}>
            <Text style={styles.text1}>Update</Text>
          </View>
          <TouchableOpacity delayPressIn={0}  style={styles.ModelmsgView}>
            <Text style={styles.ModelMsgText}>
              {
                'A newer version of this app is available for download. Please update it from PlayStore!'
              }
            </Text>
          </TouchableOpacity>

          <View style={styles.view5}>
            <TouchableOpacity delayPressIn={0} style={styles.popup} onPress={() => openUrl()}>
              <Text style={styles.ModelBtntext}>Download Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View style={styles.main}>
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            padding: 20,
            justifyContent: 'center',
          }}>
          <Image
            style={styles.image}
            resizeMode="contain"
            source={require('../../../assets/Image/IndiaDeposit.png')}
          />
        </View>
        <View style={styles.view2}>
          <View style={styles.view3}>
            <Text style={styles.text2}>Your information is secured</Text>
          </View>
          {/* <Avatar height={200} width={100}/> */}
          <View style={styles.view4}>
            {/* <Image
              style={styles.img}
              source={require('../../../assets/Image/iso.png')}
            /> */}
            <Image
              style={styles.img1}
              source={require('../../../assets/Image/ssl.png')}
            />
          </View>
        </View>
      </View>
      <StatusBar />
    </View>
    </SafeAreaView>
    </Fragment>
  );
};
export default Splash;
