import React,{useState,useEffect}from 'react';
import { View,Text,Image,ScrollView} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import StatusBar from '../../../component/StatusBar';
import colors from '../../../component/colors';
import Header from '../../../component/header';
import { FlatList } from 'react-native';
import Loader from '../../../component/loader';
import { useDispatch,useSelector } from "react-redux";
import AsyncStorage from "@react-native-community/async-storage";
import Storage from '../../../component/AsyncStorage';
const Contact=()=>{
    const navigation=useNavigation()
    const dispatch=useDispatch()
    const selector=useSelector(state=>state.Notification)
    const isFetching=useSelector(state=>state.isFetching)
    console.log('this is log valie',selector);
useEffect(async()=>{
    const user_id=await AsyncStorage.getItem(Storage.user_id)
    dispatch({
        type: 'Notification_Request',
        url: 'getnotification',
        user_id:user_id,
    })
},[])

const showContent=()=>{
    if (selector) {
        console.log('this is log valie',selector);
        return(
            <View>
                 <FlatList
              showsVerticalScrollIndicator={false}
              data={selector}
              renderItem={({item})=>
              <View>
               <View style={{marginTop:15}}>
                   <View>
                       <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                       <Text style={{fontFamily:'Montserrat-Normal'}}>{item.title}</Text>
                       {/* <Text style={{color:colors.bc,fontSize:12,fontFamily:'Montserrat-Normal'}}>{item.title}</Text> */}
                       </View>
                       <Text style={{color:'grey',fontSize:12,fontFamily:'Montserrat-Normal'}}>{item.notification}</Text>
                   </View>
               </View>
               <View style={{borderWidth:1,marginTop:15,borderColor:'#DDDDDD'}}></View>
              </View>
              }
              /> 
            </View>
        )
        
    } else {
        
    }
}
    return(
        <View style={styles.container}>
           <Header
            source={require('../../../assets/Images/arrow.png')}
           title={'NOTIFICATIONS'}
           onPress={()=>navigation.goBack()}
           />
             {isFetching?<Loader/>:null}
             <View style={styles.card}>   
                {showContent()}
             </View>
         <StatusBar/>
         {/* <BottomTab/> */}
       </View>
    )
}
export default Contact;

