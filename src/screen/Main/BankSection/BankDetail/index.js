import React,{useRef,useEffect} from "react";
import {View,Text,FlatList,Image,TouchableOpacity} from 'react-native';
import Header from '../../../../component/compareHeader';
import colors from '../../../../component/colors';
import {useNavigation} from '@react-navigation/native';
import styles from './styles';
import BottomTab from '../../../../component/StoreButtomTab';
import StatusBar from "../../../../component/StatusBar";
import { useSelector,useDispatch } from 'react-redux';
import Storage from '../../../../component/AsyncStorage';
import AsyncStorage from '@react-native-community/async-storage';
import Loader from '../../../../component/loader';

const BankDetail=()=>{
        const navigation=useNavigation()
        const dispatch=useDispatch()
        const selector=useSelector(state=>state.BankList)
        const isFetching=useSelector(state=>state.isFetching)

useEffect(async()=>{
    const user_id=await AsyncStorage.getItem(Storage.user_id)
    dispatch({
        type: 'Bank_List_Request',
        url: 'userbanklist',
        user_id
      })

    dispatch({
        type: 'Bank_Name_Request',
        url: 'bankdetaillist',
      })
},[])
const renderItem=(item)=>{
      return(
          <View style={styles.cont}>
                <TouchableOpacity 
                    style={styles.card}>
                   <View style={styles.cardView}>
                      <Image source={require('../../../../assets/Images/sbi.png')}/>
                      <Text style={styles.title}>{item.name}</Text>
                     <View style={{width:'20%'}}>
                         
                     </View>
                   </View>
                  
                   <View style={styles.row}>
                       <Text style={styles.same}>{`Account No : ${item.account_number}`}</Text>
                   </View>
                   <View style={styles.row}>
                       <Text style={styles.same}>{` IFSC Code : ${item.ifsc_code}`}</Text>
                   </View>
                   <View style={styles.row}>
                       <Text style={styles.same}>{`Account Type : ${item.account_type}`}</Text>
                   </View>
                 </TouchableOpacity>
          </View>
      )
}
    return(
        <View style={{flex:1}}>
              <Header
                    title={'Bank Detail'}
                    source={require('../../../../assets/Images/arrow.png')}
                    titleTwo='Add Bank'
                    onPress={()=>navigation.goBack()}
                    onPress1={()=>navigation.navigate('AddBank')}
               /> 
              <View style={styles.list}>
                <FlatList
                   data={selector}
                   renderItem={({item})=>renderItem(item)}
                   style={{width:'100%'}}
                 />
              </View>
          <StatusBar/>
          <BottomTab/>
       </View>
    )
}
export default BankDetail;