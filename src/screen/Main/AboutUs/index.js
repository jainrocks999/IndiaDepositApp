import React, {useEffect, useState} from 'react';
import {View, BackHandler, ScrollView, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import styles from './styles';
import StatusBar from '../../../component/StatusBar';
import Header from '../../../component/header';
import Loader from '../../../component/loader';
import {useDispatch, useSelector} from 'react-redux';
import HTMLView from 'react-native-htmlview';
import Storage from '../../../component/AsyncStorage';
import AsyncStorage from '@react-native-community/async-storage';
const Contact = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const selector = useSelector(state => state.AboutUs);
  const isFetching = useSelector(state => state.isFetching);

  useEffect(async () => {
    const user_id = await AsyncStorage.getItem(Storage.user_id);
    dispatch({
      type: 'About_Us_Request',
      url: 'getpagecontent',
      key: 'about_us',
      user_id,
    });
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
  const showContent = () => {
    if (selector.length > 0) {
      return (
        <HTMLView
          value={selector[0].value.trim().replace(/\s+/g, ' ')}
          addLineBreaks={false}
        />
      );
    } else {
      return <View></View>;
    }
  };
  return (
    <View style={styles.container}>
      <Header
        source={require('../../../assets/Image/arrow2.png')}
        title={'ABOUT US'}
        onPress={() => navigation.goBack()}
      />
      <ScrollView style={{flex: 1, paddingHorizontal: 15, paddingVertical: 20}}>
        <View style={styles.card}>
          {isFetching ? <Loader /> : null}
          {showContent()}
        </View>
      </ScrollView>
      <StatusBar />
    </View>
  );
};
export default Contact;
