import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, LogBox, Button ,Platform,SafeAreaView, Alert} from 'react-native';
import PushNotification from 'react-native-push-notification';
import crashlytics from '@react-native-firebase/crashlytics';
import { Provider } from 'react-redux';
import Store from './src/Redux/Store';
import RootApp from './src/navigator';
import AsyncStorage from '@react-native-community/async-storage';
import Storage from './src/component/AsyncStorage';
import * as RootNavigation from './src/navigator/rootNavigation';
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import colors from "./src/component/colors";


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
      if(notification.userInteraction===true && notification.foreground==false) {
        RootNavigation.navigate('Splash')

        AsyncStorage.setItem('value','1')
      }
      else{
        if (notification.userInteraction==true && notification.foreground==true) {
          RootNavigation.push('Notification')
        }
      }
      notification.finish(PushNotificationIOS.FetchResult.NoData);
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
    <SafeAreaView style={{flex: 1,  backgroundColor:Platform.OS=='ios'? colors.bc:'white'}}>
      <Provider store={Store}>
        <RootApp />
      </Provider>
    {/* </View> */}
    </SafeAreaView>
  )
}
export default App;

