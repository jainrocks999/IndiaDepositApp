import React,{useEffect, useState} from 'react';
import { View,Text ,BackHandler} from 'react-native';
import { WebView } from 'react-native-webview';
import Header from '../../../component/header';
import AsyncStorage from '@react-native-community/async-storage';
import Storage from '../../../component/AsyncStorage';
import { useNavigation } from '@react-navigation/native';
const Web=({route})=>{
const navigation=useNavigation()
const [user_id,setuser_id]=useState()
console.log('narendra here---------------------------------------------------------------------',user_id,route.params);
useEffect(async()=>{

const user_id=await AsyncStorage.getItem(Storage.user_id)
setuser_id(user_id)
const backAction = () => {
    navigation.goBack()
    return true;
  };

  const backHandler = BackHandler.addEventListener(
    "hardwareBackPress",
    backAction
  );

  return () => backHandler.remove();
})
    return(
        <View style={{flex:1}}>
             <Header
                title={'CREATE FD'}
                source={require('../../../assets/Image/arrow2.png')}
                onPress={()=>navigation.goBack()}
            /> 
{/* https://demo.webshowcase-india.com/indiadeposit/public/apis/fdsdk?user_id=10&amount=10000&tenure=365 */}
          <WebView source={{ 
              uri: `https://demo.webshowcase-india.com/indiadeposit/public/apis/fdsdk?user_id=${user_id}&amount=${route.params.amount}&tenure=${route.params.tenure*365}`
              }} />
        </View>
    )

}
export default Web;