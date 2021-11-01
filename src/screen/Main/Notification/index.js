import React,{useEffect}from 'react';
import { View,Text,ScrollView,BackHandler, Alert} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import StatusBar from '../../../component/StatusBar';
import Header from '../../../component/header';
import { FlatList } from 'react-native';
import Loader from '../../../component/loader';
import { useDispatch,useSelector } from "react-redux";
import AsyncStorage from "@react-native-community/async-storage";
import Storage from '../../../component/AsyncStorage';
import * as RootNavigation from '../../../navigator/rootNavigation';

const Notification=()=>{
    const navigation=useNavigation()
    const dispatch=useDispatch()
    const selector=useSelector(state=>state.Notification)
    const isFetching=useSelector(state=>state.isFetching)
    
useEffect(async()=>{
    const user_id=await AsyncStorage.getItem(Storage.user_id)
    // Alert.alert('working')
    dispatch({
        type: 'Notification_Request',
        url: 'getnotification',
        user_id:user_id,
    })
    const backAction = () => {
        RootNavigation.replace('Main')
        return true;
      };
    
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );
    
      return () => backHandler.remove();
},[])

const showContent=()=>{
    if (selector) {
        console.log('this is log valie',selector);
        return(
            <View>
                 <FlatList
              showsVerticalScrollIndicator={false}
              data={selector}
              style={{marginBottom:10}}
              renderItem={({item})=>
              <View>
              {selector[0].notification_id==item.notification_id?<View/>:<View style={styles.line}></View>}
               <View style={styles.view1}>
                   <View>
                       <View style={styles.view2}>
                       <Text style={styles.text1}>{item.title}</Text>
                       </View>
                       <Text style={styles.text3}>{item.notification}</Text>
                   </View>
               </View>
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
            source={require('../../../assets/Image/arrow2.png')}
           title={'NOTIFICATIONS'}
           onPress={()=>RootNavigation.replace('Main')}
           />
          
            {selector[0]? <View style={{flex:1,paddingHorizontal:15,paddingVertical:20}}>
       
             <View style={styles.card}>  
             {isFetching?<Loader/>:null} 
                {showContent()}
             </View>
             </View>:null}
           <StatusBar/>
           {/* <BottomTab/> */}
       </View>
    )
}
export default Notification;

