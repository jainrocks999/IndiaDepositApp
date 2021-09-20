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
const Nominee=()=>{
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
          })
    
        dispatch({
            type: 'State_List_Request',
            url: 'statelist',
          })
    },[])
    
    const editPost=(item)=>{
         Root.replace('EditNominee',{
          item 
         }
         )
    }
    const deletePost=async(item)=>{
        const user_id=await AsyncStorage.getItem(Storage.user_id)
          try {
            const data = new FormData();
            data.append('user_nominee_id',item.user_nominee_id)
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
                        {/* <Image source={require('../../../assets/Images/sbi.png')}/> */}
                        <Text style={[styles.title,{marginLeft:5}]}>{`Name  : ${item.name}`}</Text>
                       <View style={{width:'20%',alignItems:'flex-end'}}>
                       </View>
                     </View>
                    
                     <View style={styles.row}>
                         <Text style={styles.same}>{`Address  : ${item.address1}`}</Text>
                     </View>
                     <View style={styles.row}>
                         <Text style={styles.same}>{`Address 2 : ${item.address2}`}</Text>
                     </View>
                     <View style={styles.row}>
                         <Text style={styles.same}>{`Gourdian : ${item.guardian}`}</Text>
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
              <Text onPress={()=>Root.replace('AddNominee')} 
              style={{fontSize:14,color:colors.white}}>Add Nominee</Text>
              </TouchableOpacity>
              </View>
              </View>
              
              </ScrollView>
        </View>
    )
}
export default Nominee