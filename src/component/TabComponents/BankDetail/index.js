import React,{useEffect,useState} from 'react';
import { View,Text,TouchableOpacity,FlatList, ScrollView,Image } from 'react-native';
import { useSelector,useDispatch } from "react-redux";
import Loader from '../../../component/loader';
import styles from "./styles";
import { useNavigation } from '@react-navigation/native';
import fontSize from '../../fontSize';
import AsyncStorage from "@react-native-community/async-storage";
import Storage from '../../AsyncStorage';
import axios from "axios";
import * as Root from '../../../navigator/rootNavigation';
import colors from '../../colors';
const BankDetails=()=>{
    const navigation=useNavigation()
    const dispatch=useDispatch()
    const selector=useSelector(state=>state.BankList)
    const isFetching=useSelector(state=>state.isFetching)
    const [visible, setVisible] = useState(false);
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
        Root.replace('EditUserBank',{
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
      console.log('thisis i dffkkdfk',item.bank_logo);
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
                         <Text style={styles.same}>{`Account No : XXXXXXXXXX${item.account_number.substr(-4)}`}</Text>
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
        <View style={{flex:1}}>
        {isFetching?<Loader/>:null}
        <ScrollView style={{flex:1}}>
              <View style={styles.list}>
                <FlatList
                   data={selector}
                   renderItem={({item})=>renderItem(item)}
                   style={{width:'100%',marginBottom:10,marginTop:5}}
                 />
              <View style={{justifyContent:'center',alignItems:'center',flex:1,marginBottom:40,marginTop:20}}>
                  <TouchableOpacity style={{backgroundColor:colors.bc,paddingHorizontal:15,paddingVertical:6,borderRadius:10}}>
              <Text onPress={()=>Root.replace('AddBank')} 
              style={{fontSize:14,color:colors.white}}>Add Bank</Text>
              </TouchableOpacity>
              </View>
              </View>
              
              </ScrollView>
        </View>
    )
}
export default BankDetails