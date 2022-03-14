import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  Share,
  BackHandler,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import styles from './styles';
import StatusBar from '../../../component/StatusBar';
import Header from '../../../component/header';
import {TouchableOpacity} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import Storage from '../../../component/AsyncStorage';
import colors from '../../../component/colors';
import Clipboard from '@react-native-clipboard/clipboard';
import Toast from 'react-native-simple-toast';

const Refferal = () => {
  const navigation = useNavigation();
  const [code, setCode] = useState('');
  const [copiedText, setCopiedText] = useState('');
  const [link, setLink] = useState('');
  useEffect(async () => {
    const user_id = await AsyncStorage.getItem(Storage.user_id);
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
        url: 'https://indiadeposit.in/admin/public/apis/getrefferalcode',
      });

      if (response.data.status == 200) {
        setLink(response.data.link);
        setCode(response.data.refferal_code);
      }
    } catch (error) {
      throw error;
    }
  }, []);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, []);
  const handleBackButtonClick = () => {
    if (navigation.isFocused()) {
      navigation.navigate('Main');
      return true;
    }
  };

  const share = async () => {
    await Share.share({
      message: `${code} ${link} `,
    });
  };

  const copyToClipboard = () => {
    Clipboard.setString(code);
    Toast.show('Code Copied');
  };
  return (
    <View style={styles.container}>
      <Header
        source={require('../../../assets/Image/arrow2.png')}
        title={'Refer IndiaDeposit'}
        onPress={() => navigation.goBack()}
      />
      <View style={styles.pfile}>
        <Image source={require('../../../assets/Image/Rs-final.png')} />
      </View>
      <ScrollView style={{paddingHorizontal: 15, paddingVertical: 5}}>
        <View style={styles.card}>
          <View style={styles.view1}>
            <Image source={require('../../../assets/Image/Vect.png')} />
            <View style={styles.view2}>
              <Text
                style={
                  styles.text1
                }>{`Share your referral link and invite your\nfriends via SMS / Email Whatsapp.`}</Text>
            </View>
          </View>
          <View style={styles.line}></View>
          <View style={styles.view3}>
            <View>
              <View style={styles.round}>
                <Text style={styles.text}>1</Text>
              </View>
            </View>
            <View style={styles.line1}></View>
            <View>
              <View style={styles.round}>
                <Text style={styles.text}>2</Text>
              </View>
            </View>
            <View style={styles.line1}></View>
            <View>
              <View style={styles.round}>
                <Text style={styles.text}>3</Text>
              </View>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 0,
              paddingHorizontal: 0,
            }}>
            <Text style={styles.row}>
              {'Invites your\nfriends to\nsign up'}
            </Text>
            <Text style={styles.row}>
              {'Your friends\nget a product\nfrom us'}
            </Text>
            <Text style={styles.row}>
              {'You and your\nfriends get\nrewarded'}
            </Text>
          </View>
          <View style={styles.view4}>
            <Text style={styles.text2}>REFERRAL CODE</Text>
            <View style={styles.view5}>
              <TextInput
                style={{color: '#000'}}
                value={code}
                placeholderTextColor={colors.heading1}
                editable={false}
              />
            </View>
            <Text style={styles.text4} onPress={() => copyToClipboard()}>
              TAP TO COPY
            </Text>
            <TouchableOpacity
              delayPressIn={0}
              style={styles.touch}
              onPress={() => share()}>
              <Image source={require('../../../assets/Image/share.png')} />
              <Text style={styles.text3}>REFER NOW</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <StatusBar />
    </View>
  );
};
export default Refferal;
