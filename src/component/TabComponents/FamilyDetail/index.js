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
import Toast from 'react-native-simple-toast';
const FamilyDetails=()=>{
    const navigation=useNavigation()
    const dispatch=useDispatch()
    const selector=useSelector(state=>state.FamilyList)
    console.log('family list',selector);
    const isFetching=useSelector(state=>state.isFetching)
    useEffect(async()=>{
        const user_id=await AsyncStorage.getItem(Storage.user_id)
        dispatch({
            type: 'Family_List_Request',
            url: 'getfamilylist',
            user_id
          })
    },[])

    const editPost=(item)=>{
        Root.replace('EditFamily',{item})
   }
    const deletePost=async(item)=>{
        const user_id=await AsyncStorage.getItem(Storage.user_id)
          try {
            const data = new FormData();
            data.append('family_id',item.user_id)
            const response = await axios({
              method: 'POST',
              data,
              headers: {
                'content-type': 'multipart/form-data',
                Accept: 'multipart/form-data',
              },
              url: 'https://demo.webshowcase-india.com/indiadeposit/public/apis/deletefamily',
            });
            console.log('this is response value',response);
            if (response.data.status==200|| response.data.status==400) {
                // Toast.show(response.data.messages)
                dispatch({
                    type: 'Family_List_Request',
                    url: 'getfamilylist',
                    user_id:user_id
                  })        
            } 
          } catch (error) {
           throw error;
          }
    }
    const renderModal=(item)=>{
      Alert.alert(
        "CONFIRM",
        "Are you sure you want to delete Family Member?",
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
                    
                    
                    
                     <View style={styles.row}>
                         <Text style={styles.same}>{`Name : ${item.name}`}</Text>
                     </View>
                     <View style={styles.row}>
                         <Text style={styles.same}>{`Email : ${item.email}`}</Text>
                     </View>
                     <View style={styles.row}>
                         <Text style={styles.same}>{`Mobile : ${item.mobile}`}</Text>
                     </View>
                     <View style={styles.row}>
                         <Text style={styles.same}>{`Gender : ${item.gender}`}</Text>
                     </View>
                     <View style={styles.row}>
                         <Text style={styles.same}>{`Date of Birth : ${item.dob}`}</Text>
                     </View>
                     <View style={styles.row}>
                         <Text style={styles.same}>{`Address Line1 : ${item.address1}`}</Text>
                     </View>
                     <View style={styles.row}>
                         <Text style={styles.same}>{`Address Line2: ${item.address2}`}</Text>
                     </View>
                     <View style={styles.row}>
                         <Text style={styles.same}>{`Relation : ${item.relation}`}</Text>
                     </View>
                     <View style={styles.row}>
                         <Text style={styles.same}>{`Father Spouse Name : ${item.father_spouse_name}`}</Text>
                     </View>
                     <View style={styles.row}>
                         <Text style={styles.same}>{`Mother Maiden Name : ${item.mother_maiden_name}`}</Text>
                     </View>
                     <View style={styles.row}>
                         <Text style={styles.same}>{`City : ${item.city_name}`}</Text>
                     </View>
                     <View style={styles.row}>
                         <Text style={styles.same}>{`State : ${item.state_name}`}</Text>
                     </View>
                     <View style={styles.row}>
                         <Text style={styles.same}>{`Country : ${item.country_name}`}</Text>
                     </View>
                     <View style={styles.row}>
                         <Text style={styles.same}>{`Pincode : ${item.pincode}`}</Text>
                     </View>
                     <View style={styles.row}>
                         <Text style={styles.same}>{`Residential Status : ${item.residential_status}`}</Text>
                     </View>
                     <View style={styles.row}>
                         <Text style={styles.same}>{`Income Group : ${item.income_group}`}</Text>
                     </View>
                     <View style={styles.row}>
                         <Text style={styles.same}>{`Education : ${item.education}`}</Text>
                     </View>
                     <View style={styles.row}>
                         <Text style={styles.same}>{`Occupation : ${item.occupation}`}</Text>
                     </View>
                     <View style={styles.row}>
                         <Text style={styles.same}>{`Marital Status : ${item.marital_status}`}</Text>
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
                showsHorizontalScrollIndicator={false}
                   data={selector}
                   renderItem={({item})=>renderItem(item)}
                   style={{width:'100%',marginBottom:10,marginTop:5}}
                 />
              <View style={{justifyContent:'center',alignItems:'center',flex:1,marginBottom:40,marginTop:20}}>
                  <TouchableOpacity
                  onPress={()=>Root.replace('AddFamily')}
                  style={{backgroundColor:colors.bc,paddingHorizontal:15,paddingVertical:6,borderRadius:10}}>
              <Text  
              style={{fontSize:fontSize.fourteen,color:colors.white}}>ADD FAMILY MEMBER</Text>
              </TouchableOpacity>
              </View>
              </View>
              
              </ScrollView>
        </View>
    )
}
export default FamilyDetails