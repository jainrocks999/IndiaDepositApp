import React,{useEffect}from 'react';
import { View,Text} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import StatusBar from '../../../component/StatusBar';
import Header from '../../../component/header';
import { FlatList } from 'react-native';
import Loader from '../../../component/loader';
import { useDispatch,useSelector } from "react-redux";
import AsyncStorage from "@react-native-community/async-storage";
import Storage from '../../../component/AsyncStorage';
const Notification=()=>{
    const navigation=useNavigation()
    const dispatch=useDispatch()
    const selector=useSelector(state=>state.Notification)
    const isFetching=useSelector(state=>state.isFetching)
    
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
               <View style={styles.view1}>
                   <View>
                       <View style={styles.view2}>
                       <Text style={styles.text1}>{item.title}</Text>
                       {/* <Text style={{color:colors.bc,fontSize:12,fontFamily:'Montserrat-Regular'}}>{item.title}</Text> */}
                       </View>
                       <Text style={styles.text3}>{item.notification}</Text>
                   </View>
               </View>
               <View style={styles.line}></View>
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
           onPress={()=>navigation.navigate('Main')}
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
export default Notification;

