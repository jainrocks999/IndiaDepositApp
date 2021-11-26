import React, { useState } from 'react';
import { View,Text,StyleSheet,Image } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import colors from '../../../../component/colors';
import Header from '../../../../component/header';
import DocumentPicker from 'react-native-document-picker';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import Storage from '../../../../component/AsyncStorage';
import styles from './styles';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import CustomButton from '../../../../component/button1';
import Loader from '../../../../component/loader';

const Upload=()=>{
const [pan,setPan]=useState('')
const [addressProof,setAddressProof]=useState('')
const [bankDetails,setBankDetails]=useState('')
const [photo,setPhoto]=useState('')
const [signature,setSignature]=useState('')
const navigation =useNavigation()
const dispatch=useDispatch()
const [isFetching,setIsFetching]=useState(false)
const uploadPan=async()=>{
    try {
        const res = await DocumentPicker.pickMultiple({
          type: [DocumentPicker.types.images],
        })
        setPan(res[0].uri)
        console.log(
         'hidksjfadkajsfkljdsafklajdlkajfdkljf', res
        )
      } catch (err) {
        if (DocumentPicker.isCancel(err)) {
        } else {
          throw err
        }
      }
}
const uploadBankDetails=async()=>{
  try {
      const res = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.images],
      })
      setBankDetails(res[0].uri)
      console.log(
        res[0].uri
      )
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
        throw err
      }
    }
}
const uploadAddressProof=async()=>{
  try {
      const res = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.images],
      })
      setAddressProof(res[0].uri)
      console.log(
        res[0].uri
      )
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
        throw err
      }
    }
}
const uploadPhoto=async()=>{
  try {
      const res = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.images],
      })
      setPhoto(res[0].uri)
      console.log(
        res[0].uri
      )
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
        throw err
      }
    }
}
const uploadSignature=async()=>{
  try {
      const res = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.images],
      })
      setSignature(res[0].uri)
      console.log(
        res[0].uri
      )
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
        throw err
      }
    }
}

const validateUser=async()=>{
  const user_id=await AsyncStorage.getItem(Storage.user_id)
  try{
    setIsFetching(true)
    const data = new FormData();
    data.append('formtype','')
    data.append('deposit_option','')
    data.append('amount','')
    data.append('tenure','')
    data.append('name','')
    data.append('mobile_number','')
    data.append('email','')
    data.append('address_communication','')
    data.append('address_permanent','')
    data.append('qualifications','')
    data.append('mother_name','')
    data.append('father_name','')
    data.append('marital_status','')
    data.append('my_fixed_deposit_id','')
    data.append('spouse_name','')
    data.append('occupation','')
    data.append('annual_income','')
    data.append('fd_user_id',user_id)
    data.append('cheque_copy',{
      uri:bankDetails,
      name:'bank detail',
      type:'image/png'
    })
    data.append('address_proof',{
      uri:addressProof,
      name:'address proof',
      type:'image/png'
    })
    data.append('pan_card',{
      uri:pan,
      name:'pan card',
      type:'image/png'
    })
    data.append('user_photo',{
      uri:photo,
      name:photo,
      type:'image/png'
    })
    data.append('nominee_name','')
    data.append('relationship','')
    data.append('dob','')
    data.append('nominee_address','')
  const response =await axios({
    method: 'POST',
    data,
    headers: {
      'content-type': 'multipart/form-data',
      Accept: 'multipart/form-data',
    },
    url: 'https://demo.webshowcase-india.com/indiadeposit/public/apis/addmyfd',
  });
  if (response.status==200) {
    setIsFetching(false)
    navigation.navigate('Nominee')
  }else{
    isFetching(false)
  }
} catch (error) {
  setIsFetching(false)
}
}
    return(
        <View style={{flex:1,backgroundColor:colors.card}}>
        <Header
          source={require('../../../../assets/Image/arrow2.png')}
          title={'UPLOAD DOCUMENT'}
          onPress={()=>navigation.goBack()}
       />
       {isFetching?<Loader/>:null}
       <ScrollView>
       <View style={styles.main}>
           <View style={styles.container}>
               {addressProof?<Image style={styles.image} source={{uri:addressProof}}/>:
               <View style={styles.row}>
                 <Text style={styles.place}>Aadhar Card</Text>
                 <Text style={styles.place}>Passport</Text>
                 <Text style={styles.place}>{'Voter’s ID'}</Text>
                 <Text style={styles.place}>{'Driving’s License'}</Text>
               </View>
               }
           </View>
          <TouchableOpacity onPress={()=>uploadAddressProof()}
          style={styles.button}>
              <Text style={styles.title}>UPLOAD ADDRESS PROOF</Text>
          </TouchableOpacity>
          <View style={styles.container}>
         {pan?<Image style={styles.image} source={{uri:pan}}/>:
         <View>
         <Text style={styles.place}>{'Pan Card'}</Text>
         </View>
         }
          </View>
          <TouchableOpacity onPress={()=>uploadPan()}
           style={styles.button}>
              <Text style={styles.title}>UPLOAD PAN</Text>
          </TouchableOpacity>
          <View style={styles.container}>
          {bankDetails?<Image style={styles.image} source={{uri:bankDetails}}/>:
           <View style={styles.row}>
           <Text style={styles.place}>{'Cancelled cheque'}</Text>
           <Text style={styles.place}>{'Bank Pass Book'}</Text>
           <Text style={styles.place}>{'Bank statement copy'}</Text>
           </View>
          }
          </View>
          <TouchableOpacity onPress={()=>uploadBankDetails()}
           style={styles.button}>
              <Text style={styles.title}>UPLOAD BANK DETAILS</Text>
          </TouchableOpacity>

          <View style={styles.container}>
          {photo?<Image style={styles.image} source={{uri:photo}}/>:
           <View style={styles.row}>
           <Text style={styles.place}>{'Photo'}</Text>
           </View>
          }
          </View>
          <TouchableOpacity onPress={()=>uploadPhoto()}
           style={styles.button}>
              <Text style={styles.title}>UPLOAD PHOTO</Text>
          </TouchableOpacity>

          <View style={styles.container}>
          {signature?<Image style={styles.image} source={{uri:signature}}/>:
           <View style={styles.row}>
           <Text style={styles.place}>{'Signature Copy'}</Text>
           </View>}
          </View>
          <TouchableOpacity onPress={()=>uploadSignature()}
           style={styles.button}>
              <Text style={styles.title}>UPLOAD SIGNATURE COPY</Text>
          </TouchableOpacity>
       </View>
       <View style={{marginBottom:80}}></View>
       </ScrollView>
       <View style={styles.bottom}>
                     <TouchableOpacity
                    disabled={pan&&addressProof&&photo&&bankDetails&&signature?false:true}
                    onPress={()=>validateUser()}
                    style={[styles.button1,{
                      backgroundColor:pan&&addressProof&&photo&&bankDetails&&signature?colors.bc:'grey',}]}>
                      <Text style={{color:colors.white}}>{'VERIFY & CONTINUE'}</Text>
                    </TouchableOpacity>
                   </View>  
        </View>
    )
}
export default Upload;