import React,{useEffect, useState}from 'react';
import { View,Text,BackHandler, Image,SafeAreaView} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import colors from '../../../component/colors';
import StatusBar from '../../../component/StatusBar';
import Header from '../../../component/header';
import { FlatList } from 'react-native';
import Loader from '../../../component/loader';
import { useDispatch,useSelector } from "react-redux";
import RNPickerSelect from "react-native-picker-select";
import fontSize from '../../../component/fontSize';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Storage from "../../../component/AsyncStorage";
import AsyncStorage from '@react-native-community/async-storage';
import axios from "axios";
import Constants from '../../../component/Constants';

const Notification=()=>{
    const navigation=useNavigation()
    const dispatch=useDispatch()
    const isFetching=useSelector(state=>state.isFetching)
    const fdData=useSelector(state=>state.MYFDList)
    const selector=useSelector((state)=>state.NBFCNameList)
    const [sort,setSort]=useState('')
    const [bank_name,set_bank_name]=useState('')
useEffect(async()=>{
    const user_id=await AsyncStorage.getItem(Storage.user_id)
    dispatch({
        type: 'MYFD_List_Request',
        url: 'dropfd',
        user_id,
        fd_status:''
    })
    dispatch({
        type: 'NBFC_Name_Request',
        url: 'bankdetaillist',
        user_id
      })
},[])

useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
    };
  }, []);
  const handleBackButtonClick=() =>{
    if(navigation.isFocused()){
      navigation.navigate('Main')
    return true;
    }
  }

const sorting=async(val)=>{
    const user_id=await AsyncStorage.getItem(Storage.user_id)
    setSort(val)
    dispatch({
        type: 'MYFD_List_Request',
        url: 'dropfd',
        user_id,
        fd_status:val,
    })
}

const sorting1=async(val)=>{
    const user_id=await AsyncStorage.getItem(Storage.user_id)
    set_bank_name(val)
    dispatch({
        type: 'MYFD_List_Request',
        url: 'dropfd',
        user_id,
        fd_status:'',
        bank_name:val

    })
}
const openDetailPage=(id)=>{
    dispatch({
        type: 'MYFD_Detail_Request',
        url: 'myfddetail',
        my_fixed_deposit_id:id,
        navigation:navigation
    })
}

const handleClick=async(item)=>{
    if (item.fd_status==0) {
        if(item.fdtype=='selectplan'){
           navigation.navigate('UserSelection',{
              my_fixed_deposit_id:item.my_fixed_deposit_id
            })
            }else if(item.fdtype=='userinfo'){
                try {
                    const data = new FormData();
                    data.append('my_fixed_deposit_id',item.my_fixed_deposit_id)
                    const response = await axios({
                      method: 'POST',
                      data,
                      headers: {
                        'content-type': 'multipart/form-data',
                        Accept: 'multipart/form-data',
                      },
                      url: 'https://indiadeposit.in/admin/public/apis/myjointuserid',
                    });
                    if (response.data) {
                        AsyncStorage.setItem('fd_user_id',response.data.array[0])
                        AsyncStorage.setItem('fd_user_id1',response.data.array[1])
                        AsyncStorage.setItem('fd_user_id2',response.data.array[2])
                        AsyncStorage.setItem('primary_user_name',response.data.array2[0])
                        AsyncStorage.setItem('secondary_user_name1',response.data.array2[1])
                        AsyncStorage.setItem('secondary_user_name2',response.data.array2[2])
                        navigation.navigate('UploadDocument',{my_fixed_deposit_id:item.my_fixed_deposit_id})
                    } 
                    else{
                    }
                  } catch (error) {
                   throw error;
                  }
                // 
            }else if(item.fdtype=='dcoument'){
                  navigation.navigate('Nominee',{my_fixed_deposit_id:item.my_fixed_deposit_id})
            }else if(item.fdtype=='nomineedetail'){
                 navigation.navigate('RedeemAccountDetail',{
                     my_fixed_deposit_id:item.my_fixed_deposit_id,
                     amount:item.amount
                    })
            }
            else if(item.fdtype=='bankdetail'){
                navigation.navigate('PaymentMode',{
                    my_fixed_deposit_id:item.my_fixed_deposit_id,
                    amount:item.amount,
                    onlinepaymenturl:item.onlinepaymenturl,
                    accountnumber:item.accountnumber,
                    bankifsc:item.bankifsc,
                    beneficiaryname:item.beneficiaryname
                   })
           }
    }
    else if(item.fd_status==1){
       openDetailPage(item.my_fixed_deposit_id)
    }
    else if(item.fd_status==2){
        openDetailPage(item.my_fixed_deposit_id)
    }
    else if(item.fd_status==3){
        openDetailPage(item.my_fixed_deposit_id)
    }
    else if(item.fd_status==4){
        openDetailPage(item.my_fixed_deposit_id)
    }
}
const fd_status=(item)=>{
    if(item.fd_status==0){
        if(item.document_status==0){
            return(
            <Text style={styles.status}>
                Documents not uploaded
            </Text>
            )
        }
        else if(item.payment_status==0){
            return(
                <Text style={styles.status}>
                    Payment not done
                </Text>
            )
        }
        else{
            return(
                <Text style={styles.status}>
                    Draft
                </Text>
            )
        }
    }
    else if(item.fd_status==2){
        if(item.doc_verification_status==2){
            return(
            <Text style={styles.status}>
                Document verified
            </Text>
            )
        }
        else if(item.payment_status==2 && item.doc_verification_status==1 && item.redeem_status==2){
            return(
                <Text style={styles.status}>
                    Redeemed
                </Text>
                )
        }
        else if(item.payment_status==2){
            return(
                <Text style={styles.status}>
                    Fund Transfer initiated
                </Text>
                )
        }
        else if(item.payment_status==2 && item.doc_verification_status==1 && item.redeem_status==2){
            return(
                <Text style={styles.status}>
                    Redeemed
                </Text>
                )
        }
        else if(item.redeem_status==2){
            return(
                <Text style={styles.status}>
                    Redeemed
                </Text>
                )
        }
        else{
            return(
                <Text style={styles.status}>
                    Redeemed
                </Text>
                )
          }
    }
    else if(item.fd_status==3){
        if(item.document_status==1){
            return(
            <Text style={styles.status}>
                Document verified
            </Text>
            )
        }
        else if(item.payment_status==2){
            return(
                <Text style={styles.status}>
                    Payment verified
                </Text>
                )
        }
        else if(item.payment_status==2 && item.document_status==1 ){
            return(
                <Text style={styles.status}>
                   Generation in process
                </Text>
                )
        }
        else{
            return(
                <Text style={styles.status}>
                  In-Process
                </Text>
                )
        }
    }
    else if(item.fd_status==1){
            return(
            <Text style={styles.status}>
                Active
            </Text>
            )
    }
    else if(item.fd_status==4){
        return(
        <Text style={styles.status}>
            Redeem Req
        </Text>
        )
}
}
const showContent=()=>{
    if (fdData.length>0) {
        return(
            <SafeAreaView style={{marginBottom:60}}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={fdData}
              renderItem={({item})=>
              <View>
               <View style={styles.view1}>
                   <TouchableOpacity delayPressIn={0} 
                   onPress={()=>handleClick(item)}
                   style={styles.card}>
                       <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                     {item.bank_logo? 
                      <Image
                      resizeMode='contain'
                      style={{height:20,width:70,marginLeft:15}}
                     source={{uri:`${Constants.imageUrl}${item.bank_logo}`}}/>
                     
                     :<Image 
                        style={{width:'40%',height:47,marginLeft:15}} 
                        resizeMode='contain'
                        source={require('../../../assets/Image/indiaIcon.png')}/>}
                        <TouchableOpacity delayPressIn={0} 
                        style={{
                           paddingHorizontal:8,
                           alignItems:'center',
                           justifyContent:'center',
                           backgroundColor:colors.bc,
                           paddingVertical:2,
                           borderBottomLeftRadius:10,
                           borderTopLeftRadius:10
                           }}>
                               {/* {fd_status(item)} */}
                           <Text style={{fontFamily:'Montserrat-Regular',fontSize:12,color:colors.white}}>
                             {item.fd_status==0?'Draft':item.fd_status==1?'Active':item.fd_status==4?'Redeem Req':item.fd_status==3?'In-Process':item.fd_status==2?'Redeemed':''}
                               </Text>  
                       </TouchableOpacity>
                       </View>
                         <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:7,paddingHorizontal:15}}>

                            <View style={{alignItems:'center'}}>
                            <Text style={styles.same1}>{`${item.my_fixed_deposit_id}`}</Text>
                           
                                <Text  style={styles.same}>{'Reference\nNo'}</Text>
                            </View>

                            <View style={{alignItems:'center'}}>
                            <Text style={styles.same1}>
                                {item.interest_rate}
                                </Text>
                           
                            <Text  style={styles.same}>{'Interest Rate'}</Text>
                            </View>

                           {item.fd_status==2?
                           <View style={{alignItems:'center'}}>
                           <Text style={styles.same1}>{item.redeemed_amount?item.redeemed_amount:item.maturity_amount}</Text>
                           
                           <Text  style={styles.same}>{'Redeemed\nAmount'}</Text>
                               </View>
                           : <View style={{alignItems:'center'}}>
                            <Text style={styles.same1}>{item.maturity_amount}</Text>
                          
                            <Text  style={styles.same}>{'Maturity\nAmount'}</Text>
                                </View>  }

                           {item.fd_status==2? <View style={{alignItems:'center'}}>
                            <Text style={styles.same1}>{item.redemption_date?item.redemption_date:item.date_of_maturity}</Text>
                           
                            <Text  style={[styles.same]}>{'Redeemed\nDate'}</Text>
                            </View>:
                            <View style={{alignItems:'center'}}>
                            <Text style={styles.same1}>{item.date_of_maturity}</Text>
                           
                            <Text  style={[styles.same]}>{'Maturity\nDate'}</Text>
                            </View>
                        }
                            </View>
                      
                   </TouchableOpacity>
               </View>
              </View>
              }
              /> 
            </SafeAreaView>
        )
        
    } else {
        
    }
}
    return(
        <View style={styles.container}>
           <Header
            source={require('../../../assets/Image/arrow2.png')}
           title={`My Investments`}
           onPress={()=>navigation.navigate('Main')}
           />
             {isFetching?<Loader/>:null} 
           <View style={{flex:1,paddingHorizontal:15,}}>
               <View style={{flexDirection:'row',justifyContent:'space-between',width:'100%'}}>
                   <View style={{width:'48%'}}>
                       <Text style={{fontFamily:'Montserrat-SemiBold',marginTop:10,color:colors.textColor,fontSize:13}}>Financial Institute</Text>
            <View style={{
                paddingHorizontal:10,
                marginVertical:5,
                borderRadius:6,
                borderColor:colors.bc,
                backgroundColor:'white',
                justifyContent:'center',
                borderWidth:1,
                height:40,
                width:'100%'
                }}>
                   
            <RNPickerSelect
                onValueChange={(val)=>sorting1(val)}
                items={selector}
                style={{ 
                    inputAndroid: { color: colors.textColor,width:'90%',fontSize:14,marginBottom:-1 },
                    inputIOS:{color:colors.bc},
                placeholder:{color:colors.bc,fontSize:fontSize.twelve,marginTop:2,fontFamily:'Montserrat-Regular'},
                }}
                value={bank_name}
                useNativeAndroidPickerStyle={false}
                placeholder={{ label: 'Choose a filter', value: '' }}
                Icon={()=>
                    <Image 
                    style={{
                        width:25,height:9,
                        marginTop:Platform.OS=='android'?14:4
                    }} 
                 source={require('../../../assets/Image/down.png')}/>}   
             />             
            </View>
            </View>

            <View style={{width:'48%'}}>
            <Text style={{fontFamily:'Montserrat-SemiBold',marginTop:10,color:colors.textColor,fontSize:13}}>FD Type</Text>
            <View style={{
                paddingHorizontal:10,
                marginVertical:5,
                borderRadius:6,
                borderColor:colors.bc,
                backgroundColor:'white',
                justifyContent:'center',
                borderWidth:1,
                height:40,
                width:'100%'
                }}>
                   
            <RNPickerSelect
                onValueChange={(val)=>sorting(val)}
                items={Sorting}
                style={{ 
                    inputAndroid: { color: colors.textColor,width:'100%',fontSize:14,marginBottom:-1 },
                inputIOS:{color:colors.bc},
                placeholder:{color:colors.bc,fontSize:fontSize.twelve,marginTop:2,fontFamily:'Montserrat-Regular'},
                }}
                value={sort}
                useNativeAndroidPickerStyle={false}
                placeholder={{ label: 'Choose a filter', value: '' }}
                Icon={()=>
                    <Image 
                    style={{
                        width:25,height:9,
                        alignSelf:'center',justifyContent:'center',
                        marginTop:Platform.OS=='android'?14:4
                    }} 
                 source={require('../../../assets/Image/down.png')}/>}   
             />             
            </View>
            </View>
           
            </View>
             <View style={{marginTop:5}}>  
                {fdData.length>0? showContent():null}
             </View>
             </View>
           <StatusBar/>
       </View>
    )
}
export default Notification;
const Sorting=[
    { label: 'In-Process', value: 3},
    { label: 'Active', value: 1 },
    { label: 'Draft', value: 0 },
    { label: 'Request for Redeem', value: 4},
    { label: 'Redeemed', value: 2 },
   
    
]