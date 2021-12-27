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
import Dialog, { DialogContent } from 'react-native-popup-dialog';


const Upload=({route})=>{
const [pan,setPan]=useState('')
const [addressProof,setAddressProof]=useState('')
const [bankDetails,setBankDetails]=useState('')
const [photo,setPhoto]=useState('')
const [signature,setSignature]=useState('')
const [visible,setVisible]=useState(false)

const [panType,setPanType]=useState('')
const [addressProofType,setAddressProofType]=useState('')
const [bankDetailsType,setBankDetailsType]=useState('')
const [photoType,setPhotoType]=useState('')
const [signatureType,setSignatureType]=useState('')

const [panName,setPanName]=useState('')
const [addressName,setAddressProofName]=useState('')
const [bankDetailsName,setBankDetailsName]=useState('')
const [photoName,setPhotoName]=useState('')
const [signatureName,setSignatureName]=useState('')

const navigation =useNavigation()
const dispatch=useDispatch()
const [isFetching,setIsFetching]=useState(false)
console.log('this is user data',route.params);
const uploadPan=async()=>{
    try {
        const res = await DocumentPicker.pickMultiple({
          type: [DocumentPicker.types.pdf,DocumentPicker.types.images],
        })
        setPan(res[0].uri)
        setPanType(res[0].type)
        setPanName(res[0].name)
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
        type: [DocumentPicker.types.pdf,DocumentPicker.types.images],
      })
      setBankDetails(res[0].uri)
      setBankDetailsType(res[0].type)
      setBankDetailsName(res[0].name)
      console.log('this is user image',res[0]);
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
        type: [DocumentPicker.types.pdf,DocumentPicker.types.images],
      })
       setAddressProof(res[0].uri)
       setAddressProofType(res[0].type)
       setAddressProofName(res[0].name)
       console.log('this is user image',res[0]);
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
        type: [DocumentPicker.types.pdf,DocumentPicker.types.images],
      })
      setPhoto(res[0].uri)
      setPhotoType(res[0].type)
      setPhotoName(res[0].name)
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
        type: [DocumentPicker.types.pdf,DocumentPicker.types.images],
      })
      setSignature(res[0].uri)
      setSignatureType(res[0].type)
      setSignatureName(res[0].name)
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
        throw err
      }
    }
}

const validateUser=async()=>{
  const user_id=await AsyncStorage.getItem(Storage.user_id)
  const fd_user_id=await AsyncStorage.getItem('fd_user_id')
  const fd_user_id1=await AsyncStorage.getItem('fd_user_id1')
  const fd_user_id2=await AsyncStorage.getItem('fd_user_id2')
  console.log('this is user id number',fd_user_id,fd_user_id1,fd_user_id2);
  try{
    setIsFetching(true)
    const data = new FormData();
    data.append('formtype','dcoument')
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
    data.append('my_fixed_deposit_id',route.params.my_fixed_deposit_id)
    data.append('spouse_name','')
    data.append('occupation','')
    data.append('annual_income','')
    data.append('fd_user_id',fd_user_id)
    data.append('fd_joint_applicants_id','')
    data.append('cheque_copy',{
      uri:bankDetails,
      name:bankDetailsName.substring(bankDetailsName.lastIndexOf('/') + 1),
      type:bankDetailsType
    })

    data.append('address_proof',{
      uri:addressProof,
      name:addressName.substring(addressName.lastIndexOf('/') + 1),
      type:addressProofType
      // type:'image/png'
    })
    data.append('pan_card',{
      uri:pan,
      name:panName.substring(panName.lastIndexOf('/') + 1),
      type:panType
    })
    data.append('user_photo',{
      uri:photo,
      name:photoName.substring(photoName.lastIndexOf('/') + 1),
      type:photoType
    })
    data.append('signature_copy',{
      uri:signature,
      name:signatureName.substring(signatureName.lastIndexOf('/') + 1),
      type:signatureType
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
    AsyncStorage.setItem('fd_user_id','')
    setIsFetching(false)
    if(fd_user_id1==''||fd_user_id1==null){
      navigation.navigate('Nominee',{
        my_fixed_deposit_id:route.params.my_fixed_deposit_id
      })
    }
    else{
      navigation.navigate('DocumentUploadForFirstUser',{
        my_fixed_deposit_id:route.params.my_fixed_deposit_id
      })
    }
   
  }else{
    isFetching(false)
  }
} catch (error) {
  setIsFetching(false)
  console.log('this use id',error);
}
}

console.log('this user detail usr data',signature,signatureName,signatureType);

    return(
        <View style={{flex:1,backgroundColor:colors.card}}>
        <Header
          source={require('../../../../assets/Image/arrow2.png')}
          title={'UPLOAD DOCUMENT'}
          onPress={()=>navigation.goBack()}
       />
       {isFetching?<Loader/>:null}
       <ScrollView>
                    <Dialog
                          dialogStyle={{width:300,height:170,paddingHorizontal:10}}
                          visible={visible}>
                         <DialogContent >
                         <View>
                        <View style={styles.modalView}>
                           <TouchableOpacity onPress={()=>openCamera()} style={styles.buton}>
                               <Image style={styles.img1} source={require('../../../../assets/Image/camera1.png')}/>
                               <Text style={styles.came}>Camera</Text>
                           </TouchableOpacity>
                           <TouchableOpacity onPress={()=>openGallery()} style={styles.buton}>
                           <Image style={styles.img1} source={require('../../../../assets/Image/gallery.png')}/>
                               <Text style={styles.came}>Gallery</Text>
                           </TouchableOpacity>
                        </View>
                        </View>
                        <View style={{marginTop:30,alignItems:'flex-end'}}>
                        <Text onPress={()=> setVisible(false)} style={{color:'red'}}>CANCEL</Text>
                        </View>
                      </DialogContent>
                      </Dialog>
                      <View style={{
                        alignItems:'center',
                        justifyContent:'center',
                        width:'100%',marginTop:10}}>
                        <Text style={{fontSize:15,fontFamily:'Montserrat-SemiBold'}}>Upload documents for Primary user</Text>
                      </View>
       <View style={styles.main}>
       
           <View style={styles.container}>
               {addressProof?addressProofType=="image/jpeg"?
               <Image style={styles.image} source={{uri:addressProof}}/>: <View style={{justifyContent:'center',alignItems:'center'}}>
               <Image style={{height:60,width:44}} source={require('../../../../assets/Image/pdf3.png')}/>
               <Text style={{marginTop:4,fontSize:12,color:colors.textColor}}>{addressName}</Text></View>
               :
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
         {pan?panType=='image/jpeg'?<Image style={styles.image} source={{uri:pan}}/>:
          <View style={{justifyContent:'center',alignItems:'center'}}>
          <Image style={{height:60,width:44}} source={require('../../../../assets/Image/pdf3.png')}/>
          <Text style={{marginTop:4,fontSize:12,color:colors.textColor}}>{panName}</Text></View>
          :
         
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
          {bankDetails?bankDetailsType=='image/jpeg'?<Image style={styles.image} source={{uri:bankDetails}}/>:
           <View style={{justifyContent:'center',alignItems:'center'}}>
           <Image style={{height:60,width:44}} source={require('../../../../assets/Image/pdf3.png')}/>
           <Text style={{marginTop:4,fontSize:12,color:colors.textColor}}>{bankDetailsName}</Text></View>
          :
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
          {photo?photoType=='image/jpeg'?<Image style={styles.image} source={{uri:photo}}/>:
           <View style={{justifyContent:'center',alignItems:'center'}}>
           <Image style={{height:60,width:44}} source={require('../../../../assets/Image/pdf3.png')}/>
           <Text style={{marginTop:4,fontSize:12,color:colors.textColor}}>{photoName}</Text></View>
          :
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
          {signature?signatureType=='image/jpeg'? <Image style={styles.image} source={{uri:signature}}/>:
          <View style={{justifyContent:'center',alignItems:'center'}}>
          <Image style={{height:60,width:44}} source={require('../../../../assets/Image/pdf3.png')}/>
          <Text style={{marginTop:4,fontSize:12,color:colors.textColor}}>{signatureName}</Text></View>
          :
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