import React,{useRef,useEffect, useState} from "react";
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
import axios from "axios";
import Toast from 'react-native-simple-toast';

const BankDetail=()=>{
        const navigation=useNavigation()
        const dispatch=useDispatch()
        const selector=useSelector(state=>state.NomineeList)
        const isFetching=useSelector(state=>state.isFetching)

useEffect(async()=>{
    const user_id=await AsyncStorage.getItem(Storage.user_id)   
    dispatch({
        type: 'Nominee_List_Request',
        url: 'nomineelist',
        user_id
      })

    dispatch({
        type: 'Country_List_Request',
        url: 'countrylist',
        user_id
      })

    dispatch({
        type: 'State_List_Request',
        url: 'statelist',
        user_id
      })
},[])

const editPost=(item)=>{
     navigation.navigate('EditNominee',{
      item 
     }
     )
}
const deletePost=async(item)=>{
    const user_id=await AsyncStorage.getItem(Storage.user_id)
      try {
        const data = new FormData();
        data.append('user_nominee_id',item.user_nominee_id)
        data.append('user_id',user_id)
        const response = await axios({
          method: 'POST',
          data,
          headers: {
            'content-type': 'multipart/form-data',
            Accept: 'multipart/form-data',
          },
          url: 'https://demo.webshowcase-india.com/indiadeposit/public/apis/delete',
        });
        console.log('this is response value',response);
        if (response.data.status==200) {
            dispatch({
                type: 'Nominee_List_Request',
                url: 'nomineelist',
                user_id
              })
        
            Toast.show('Delete Successful')
        } 
      } catch (error) {
       throw error;
        
      }
}

const renderItem=(item)=>{
      return(
          <View style={styles.cont}>
                <View 
                    style={styles.card}>
                   <View style={styles.cardView}>
                      {/* <Image source={require('../../../../assets/Images/sbi.png')}/> */}
                      <Image
                       resizeMode='contain'
                       style={{height:20,width:70}}
                      source={{uri:`https://demo.webshowcase-india.com/indiadeposit/writable/uploads/bank/${item.bank_logo}`}}/>
                      <Text style={styles.title}>{item.name}</Text>
                     <View style={{width:'20%',alignItems:'flex-end'}}>
                     </View>
                   </View>
                  
                   <View style={styles.row}>
                       <Text style={styles.same}>{`Account No : ${item.address1}`}</Text>
                   </View>
                   <View style={styles.row}>
                       <Text style={styles.same}>{` IFSC Code : ${item.address2}`}</Text>
                   </View>
                   <View style={styles.row}>
                       <Text style={styles.same}>{`Account Type : ${item.guardian}`}</Text>
                   </View>
                   <View style={[styles.row,{marginTop:10,width:'50%'}]}>
                   <TouchableOpacity
                   onPress={()=>deletePost(item)}
                   style={styles.button}>
                        <Text style={styles.text}>
                            Delete
                        </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                        onPress={()=>editPost(item)}
                         style={styles.button}>
                        <Text style={styles.text}>
                            Edit
                        </Text>
                        </TouchableOpacity>
                   </View>
                 </View>
          </View>
      )
}
    return(
        <View style={{flex:1}}>
              <Header
                    title={'Nominee List'}
                    source={require('../../../../assets/Image/arrow2.png')}
                    titleTwo='Add Nominee'
                    onPress={()=>navigation.navigate('FDDetail')}
                    onPress1={()=>navigation.navigate('AddNominee')}
               /> 
              {isFetching?<Loader/>:null}
              <View style={styles.list}>
                <FlatList
                   data={selector}
                   renderItem={({item})=>renderItem(item)}
                   style={{width:'100%'}}
                 />
              </View>
          <StatusBar/>
          {/* <BottomTab/> */}
       </View>
    )
}
export default BankDetail;