import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, LogBox, Button } from 'react-native';
import PushNotification from 'react-native-push-notification';
import crashlytics from '@react-native-firebase/crashlytics';
import { Provider } from 'react-redux';
import Store from './src/Redux/Store';
import RootApp from './src/navigator';
import AsyncStorage from '@react-native-community/async-storage';
import Storage from './src/component/AsyncStorage';


LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();
PushNotification.createChannel(
  {
    channelId: "default-channel-id",
    channelName: "My channel",
    vibrate: true,
  },
  (created) => console.log(`createChannel returned '${created}'`)
);

const App = () => {
  useEffect(() => {
    crashlytics().log('Analytics page just mounted')
    getCrashlyticsDetail()
    return () => {
      crashlytics().log('Analytics page just unmounted')
    }
  }, [])
  PushNotification.requestPermissions() 
  PushNotification.configure({
    
    onRegister: function (token) {
      console.log('TOKENs:', token.token);
      AsyncStorage.setItem(Storage.token,token.token);
      
    },
  
    onNotification: function (notification) {
      console.log('NOTIFICATION1:', notification);
      PushNotification.localNotification({
        title: notification.message,
        message: notification.title,
      });
    },
    onAction: function (notification) {
      console.log('ACTION:', notification.action);
      console.log('NOTIFICATION:', notification);
    },
    onRegistrationError: function (err) {
      console.error(err.message, err);
    },
    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },
    popInitialNotification: true,
    requestPermissions: false,
  });

  const getCrashlyticsDetail = () => {
    try {
      crashlytics().setUserId('1')
      crashlytics().setAttribute('username', 'userId value')
      crashlytics().setAttributes({
        role: 'admin',
        followers: '13',
        email: 'narendrap.forebearpro@gmail.com',
        username: 'narendra pal'
      })
    } catch (err) {
      crashlytics().recordError(err)
    }
  }
  return (
    <View style={{ flex: 1 }}>
      <Provider store={Store}>
        <RootApp />
      </Provider>
    </View>
  )
}
export default App;

