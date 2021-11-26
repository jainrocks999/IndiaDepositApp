import React,{useEffect,useState} from 'react';
import { View,Text,TouchableOpacity,FlatList, ScrollView,Image,Alert } from 'react-native';
import { useSelector,useDispatch } from "react-redux";
import Loader from '../../../component/loader';
import styles from "./styles";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-community/async-storage";
import Storage from '../../AsyncStorage';
import axios from "axios";
import * as Root from '../../../navigator/rootNavigation';
import colors from '../../colors';
import OptionsMenu from "react-native-option-menu";

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
            } 
          } catch (error) {
           throw error;
            
          }
    }

    const renderModal=(item)=>{
        Alert.alert(
          "CONFIRM",
          "Are you sure you want to delete Nominee Details?",
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel"
            },
            { text: "YES", onPress: () => deletePost(item) }
          ]
        );
    }
    
    const renderItem=(item)=>{
      console.log('this is nominee id',item.user_nominee_id);
        return(
            <View style={styles.cont}>
                  <View 
                      style={styles.card}>
                     <View style={styles.row}>
                         <Text style={styles.same}>{`Name : ${item.name}`}</Text>
                         <OptionsMenu
                          button={require('../../../assets/Image/menu3.png')}
                          buttonStyle={{ width: 16, height: 18 }}
                          destructiveIndex={1}
                          options={["Edit","Delete", "Cancel"]}
                          actions={[()=>editPost(item),()=>renderModal(item)]}
                          />
                     </View>
                     <View style={[styles.row,{marginTop:1}]}>
                         <Text style={styles.same}>{`Date of Birth : ${item.dob}`}</Text>
                     </View>
                     <View style={[styles.row,{marginTop:5}]}>
                         <Text style={styles.same}>{`Relationship : ${item.relationship}`}</Text>
                     </View>
                     {/* <View style={[styles.row,{marginTop:10,justifyContent:'flex-start'}]}>
                     <TouchableOpacity
                     onPress={()=>renderModal(item)}
                     style={styles.button}>
                          <Text style={styles.text}>
                              DELETE
                          </Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                          onPress={()=>editPost(item)}
                           style={[styles.button,{marginLeft:15}]}>
                          <Text style={styles.text}>
                              EDIT
                          </Text>
                          </TouchableOpacity>
                     </View> */}
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
                  onPress={()=>Root.replace('AddNominee')} 
                   style={{backgroundColor:colors.bc,paddingHorizontal:15,paddingVertical:6,borderRadius:10}}>
              <Text 
              style={{fontSize:14,color:colors.white}}>ADD NOMINEE</Text>
              </TouchableOpacity>
              </View>
              </View>
              
              </ScrollView>
        </View>
    )
}
export default Nominee