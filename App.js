import React,{useEffect,useState} from 'react';
import { View,Text,StyleSheet ,LogBox,Button} from 'react-native';
import PushNotification from 'react-native-push-notification';
import crashlytics from '@react-native-firebase/crashlytics';
import { Provider } from 'react-redux';
import Store from './src/Redux/Store';
import RootApp from './src/navigator';
LogBox.ignoreLogs(['Warning: ...']); 
LogBox.ignoreAllLogs();
const App=()=>{

  const {data,setData}=useState('')
const getCrashlyticsDetail=()=>{
try {
  crashlytics().setUserId('1')
  crashlytics().setAttribute('username','userId value')
  crashlytics().setAttributes({
    role: 'admin',
    followers: '13',
    email:'narendrap.forebearpro@gmail.com',
    username: 'narendra pal'
  })
} catch (err) {
  crashlytics().recordError(err)
}
}
const test = {};
 // console.log(test.should.crash);
 useEffect(()=>{
   // setData('narendra')
 //crashlytics().crash();
  crashlytics().log('Analytics page just mounted')
getCrashlyticsDetail()
return()=>{
  crashlytics().log('Analytics page just unmounted')
}
},[])

  PushNotification.configure({
    onRegister: function (token) {
       console.log('TOKENs:', token.token);
     
    },
    onNotification: function (notification) {
      console.log('NOTIFICATION1:', notification);
      PushNotification.localNotification({
        title:notification.message, 
        message:notification.title,
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
    requestPermissions: true,
  });
  return(
    <View style={{flex:1}}>
       <Provider store ={Store}>
           <RootApp/>
       </Provider>
    </View>
  )
}
export default App;

