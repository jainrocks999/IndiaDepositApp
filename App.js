import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, LogBox, Button ,Platform,SafeAreaView, Alert,Image} from 'react-native';
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
import FlashMessage from 'react-native-flash-message';
import { NetworkProvider,useIsConnected } from 'react-native-offline';
import Toast from 'react-native-simple-toast';

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
  // const isConnected = useIsConnected();
  // isConnected?Toast.show('Please check Network connection'):''
  useEffect(async() => {
    crashlytics().log('Analytics page just mounted')
    getCrashlyticsDetail()
    return () => {
      crashlytics().log('Analytics page just unmounted')
    }
  }, [])

  

  const manageLogin=async()=>{
    const user_id=await AsyncStorage.getItem(Storage.user_id)
    const KeepmeLogin = await AsyncStorage.getItem('KeepmeLogin');
    if(user_id==null){
      RootNavigation.push('Login')
    }else if(user_id&&KeepmeLogin==1){
      RootNavigation.push('Notification')
    }
    else if(user_id&&KeepmeLogin==0){
      RootNavigation.push('Login')
    }
  }
  PushNotification.configure({
    onRegister: function (token) {
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
          manageLogin()
        }
      }
      notification.finish(PushNotificationIOS.FetchResult.NoData);
    },
    onAction: function (notification) {
     
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

  const getCrashlyticsDetail = async() => {
    const user_id=await AsyncStorage.getItem(Storage.user_id)
    const name=await AsyncStorage.getItem(Storage.name)

    try {
      crashlytics().setUserId(user_id)
      crashlytics().setAttribute('username', name)
    } catch (err) {
      crashlytics().recordError(err)
    }
  }
  return (
    <SafeAreaView style={{flex: 1,  backgroundColor:Platform.OS=='ios'? colors.bc:'white'}}>
     
       <FlashMessage  
       icon={<Image resizeMode='contain' style={{height:20,width:20,tintColor:'#000'}} source={require('./src/assets/Image/info.png')}/>}
       duration={3000} 
       style={{
         borderRadius:10,
         marginHorizontal:30,
         marginVertical:20,
        //  paddingVertical:10,
         height:50,
         alignItems:'center',
         justifyContent:'center',
         
         }}
        position={'bottom'}
        titleStyle={{fontSize:16,marginTop:8}}
          />
        <NetworkProvider
        pingTimeout={1000}
        pingServerUrl='https://www.google.com/'
        shouldPing={true}
        pingOnlyIfOffline={false}
        pingInBackground={true}
        >
         <Provider store={Store}>
           <RootApp />
         </Provider>
      </NetworkProvider>
    </SafeAreaView>
  )
}
export default App;

