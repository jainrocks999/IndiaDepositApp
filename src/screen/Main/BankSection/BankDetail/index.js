import React,{useRef,useEffect, useState} from "react";
import {View,Text,FlatList,Image,TouchableOpacity,Platform} from 'react-native';
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
        const selector=useSelector(state=>state.BankList)
        const isFetching=useSelector(state=>state.isFetching)
        const [visible, setVisible] = useState(false);

        const hideMenu = () => setVisible(false);
      
        const showMenu = () => setVisible(true);
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
    dispatch({
        type: 'Bank_Detail_Request',
        url: 'bankdetaillist',
    })
},[])

const editPost=(item)=>{
     navigation.navigate('EditUserBank',{
       item
     }
     )
}
const deletePost=async(item)=>{
    const user_id=await AsyncStorage.getItem(Storage.user_id)
      try {
        const data = new FormData();
        data.append('user_bank_id',item.user_bank_id)
        const response = await axios({
          method: 'POST',
          data,
          headers: {
            'content-type': 'multipart/form-data',
            Accept: 'multipart/form-data',
          },
          url: 'https://demo.webshowcase-india.com/indiadeposit/public/apis/deleteuserbank',
        });
        console.log('this is response value',response);
        if (response.data.status==200) {
            dispatch({
                type: 'Bank_List_Request',
                url: 'userbanklist',
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
                   <Image
                       resizeMode='contain'
                       style={{height:20,width:70}}
                      source={{uri:`https://demo.webshowcase-india.com/indiadeposit/writable/uploads/bank/${item.bank_logo}`}}/>
                      <Text style={styles.title}>{item.name}</Text>
                     <View style={{width:'20%',alignItems:'flex-end'}}>
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
        <View style={{flex:1,}}>
              <Header
                    title={'Bank List'}
                    source={require('../../../../assets/Image/arrow2.png')}
                    titleTwo='Add Bank'
                    onPress={()=>navigation.navigate('FDDetail')}
                    onPress1={()=>navigation.navigate('AddBank')}
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