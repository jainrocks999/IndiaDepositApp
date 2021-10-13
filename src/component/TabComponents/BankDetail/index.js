import React,{useEffect,useState} from 'react';
import { View,Text,TouchableOpacity,FlatList, ScrollView,Image,Alert } from 'react-native';
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
import Modal from "react-native-modal";
const BankDetails=()=>{
    const navigation=useNavigation()
    const dispatch=useDispatch()
    const selector=useSelector(state=>state.BankList)
    const isFetching=useSelector(state=>state.isFetching)
    const [visible, setVisible] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);
    useEffect(async()=>{
        const user_id=await AsyncStorage.getItem(Storage.user_id)
       
        dispatch({
            type: 'Bank_List_Request',
            url: 'userbanklist',
            user_id
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
            } 
          } catch (error) {
           throw error;
          }
    }
    const renderModal=(item)=>{
      Alert.alert(
        "CONFIRM",
        "Are you sure you want to delete Bank Details?",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "YES", onPress: () => deletePost(item) }
        ]
      )
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
                         <Text style={styles.same}>{`Account No : XXXXXXXXXX${item.account_number.substr(-4)}`}</Text>
                     </View>
                     <View style={styles.row}>
                         <Text style={styles.same}>{` IFSC Code : ${item.ifsc_code}`}</Text>
                     </View>
                     <View style={styles.row}>
                         <Text style={styles.same}>{`Account Type : ${item.account_type}`}</Text>
                     </View>
                     <View style={[styles.row,{marginTop:10,justifyContent:'flex-start'}]}>
                     <TouchableOpacity
                     onPress={()=>renderModal(item)
                         }
                     style={styles.button}>
                          <Text style={styles.text}>
                              DELETE
                          </Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                          onPress={()=>editPost(item)}
                           style={[styles.button,{marginLeft:10}]}>
                          <Text style={styles.text}>
                              EDIT
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
                  <TouchableOpacity
                  onPress={()=>Root.replace('AddBank')}
                  style={{backgroundColor:colors.bc,paddingHorizontal:15,paddingVertical:6,borderRadius:10}}>
              <Text  
              style={{fontSize:fontSize.fourteen,color:colors.white}}>ADD BANK</Text>
              </TouchableOpacity>
              </View>
              </View>
              
              </ScrollView>
        </View>
    )
}
export default BankDetails