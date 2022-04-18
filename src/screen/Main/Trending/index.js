import React,{useState,useEffect}from 'react';
import { View,Text,Image,ScrollView,BackHandler} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import StatusBar from '../../../component/StatusBar';
import Header from '../../../component/header';
import BottomTab from '../../../component/StoreButtomTab';
import Loader from '../../../component/loader';
import { useDispatch,useSelector } from "react-redux";
import HTMLView from 'react-native-htmlview';
import AsyncStorage from '@react-native-community/async-storage';
import Storage from '../../../component/AsyncStorage';
// import BottomTab from "../../../component/StoreButtomTab";

const Trending=()=>{
     const navigation=useNavigation()
     const dispatch=useDispatch()
     const selector=useSelector(state=>state.Trending)
     const isFetching=useSelector(state=>state.isFetching)
useEffect(async()=>{
       const user_id=await AsyncStorage.getItem(Storage.user_id)
        dispatch({
          type: 'Trending_Request',
          url: 'getpagecontent',
          key:'trending',
          user_id
    })
},[])

useEffect(() => {
  BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
  return () => {
    BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
  };
}, []);
const handleBackButtonClick=() =>{
  if(navigation.isFocused()){
    navigation.navigate('Main')
  return true;
  }
}
const showContent=()=>{
    if (selector.length>0) {
      return (
        <View>
       <HTMLView
        value={selector[0].value}/>
      </View>
      )
    } else {
      return<View></View>
    }
}
    return(
        <View style={styles.container}>
            <Header
            title={'TRENDING'}
            source ={require('../../../assets/Image/arrow2.png')}
            onPress={()=>navigation.goBack()}
            // source1={require('../../../assets/Image/notification.png')}
            // onPress1={()=>navigation.navigate('Notification')}
            /> 
              {isFetching?<Loader/>:null}
             {/* <ScrollView
              contentContainerStyle={{flex:1}}
              style={{backgroundColor:'#E5E5E5'}}>
                 {isFetching?<Loader/>:null}
             <View style={styles.card}> */}
              <ScrollView style={{flex:1,paddingHorizontal:15,paddingVertical:20}}>
            <View style={styles.card}>
                {showContent()}
             </View>
             </ScrollView>
             <StatusBar/>
             <View style={styles.buttomview}>
               <BottomTab/>
             </View>
        </View>
   )
}
export default Trending;

