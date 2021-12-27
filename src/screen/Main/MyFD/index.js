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

const Notification=()=>{
    const navigation=useNavigation()
    const dispatch=useDispatch()
    const isFetching=useSelector(state=>state.isFetching)
    const fdData=useSelector(state=>state.MYFDList)
    const [sort,setSort]=useState('')
    console.log('narenrar pal here for help',fdData);
useEffect(async()=>{
    const user_id=await AsyncStorage.getItem(Storage.user_id)
    dispatch({
        type: 'MYFD_List_Request',
        url: 'dropfd',
        user_id,
        fd_status:''
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
        fd_status:val
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
                      url: 'https://demo.webshowcase-india.com/indiadeposit/public/apis/myjointuserid',
                    });
                    console.log('this user resposens',response);
                    if (response.data) {
                        AsyncStorage.setItem('fd_user_id',response.data.array[0])
                        AsyncStorage.setItem('fd_user_id1',response.data.array[1])
                        AsyncStorage.setItem('fd_user_id2',response.data.array[2])
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
                 navigation.navigate('PaymentInfo',{
                     my_fixed_deposit_id:item.my_fixed_deposit_id,
                     amount:item.amount
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
                   <TouchableOpacity 
                   onPress={()=>handleClick(item)}
                   style={styles.card}>
                       <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                     {item.bank_logo? 
                      <Image
                      resizeMode='contain'
                      style={{height:20,width:70}}
                     source={{uri:`https://demo.webshowcase-india.com/indiadeposit/writable/uploads/bank/${item.bank_logo}`}}/>
                     
                     :<Image 
                        style={{width:'40%',height:47}} 
                        resizeMode='contain'
                        source={require('../../../assets/Image/indiaIcon.png')}/>}
                        <TouchableOpacity style={{
                           paddingHorizontal:8,
                           borderRadius:6,
                           alignItems:'center',
                           justifyContent:'center',
                           }}>
                           <Text style={{fontFamily:'Montserrat-Regular',fontSize:12,color:colors.bc}}>
                             {item.fd_status==0?'Draft':item.fd_status==1?'Active':item.fd_status==4?'Redeem Req':item.fd_status==3?'In-Process':item.fd_status==2?'Redeemed':''}
                               </Text>  
                       </TouchableOpacity>
                       </View>
                         <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:7,}}>

                            <View style={{alignItems:'center'}}>
                            <Text style={styles.same1}>{`${item.my_fixed_deposit_id}`}</Text>
                            {/* <Image 
                            style={styles.image}
                            resizeMode='contain' source={require('../../../assets/Image/interest.png')}/> */}
                                <Text  style={styles.same}>{'Reference\nNo'}</Text>
                            </View>

                            <View style={{alignItems:'center'}}>
                            <Text style={styles.same1}>
                                {item.username}
                                </Text>
                            {/* <Image
                                style={styles.image}
                            resizeMode='contain' source={require('../../../assets/Image/maturity.png')}/> */}
                            <Text  style={styles.same}>{'Account\nHolder Name'}</Text>
                            </View>

                           {item.fd_status==2?
                           <View style={{alignItems:'center'}}>
                           <Text style={styles.same1}>{item.redeemed_amount?item.redeemed_amount:item.maturity_amount}</Text>
                           {/* <Image 
                           style={styles.image} 
                           resizeMode='contain' source={require('../../../assets/Image/loan.png')}/> */}
                           <Text  style={styles.same}>{'Redeemed\nAmount'}</Text>
                               </View>
                           : <View style={{alignItems:'center'}}>
                            <Text style={styles.same1}>{item.maturity_amount}</Text>
                            {/* <Image 
                            style={styles.image} 
                            resizeMode='contain' source={require('../../../assets/Image/loan.png')}/> */}
                            <Text  style={styles.same}>{'Maturity\nAmount'}</Text>
                                </View>  }

                           {item.fd_status==2? <View style={{alignItems:'center'}}>
                            <Text style={styles.same1}>{item.redemption_date?item.redemption_date:item.date_of_maturity}</Text>
                            {/* <Image 
                            style={styles.image}
                            resizeMode='contain' source={require('../../../assets/Image/premature.png')}/> */}
                            <Text  style={[styles.same]}>{'Redeemed\nDate'}</Text>
                            </View>:
                            <View style={{alignItems:'center'}}>
                            <Text style={styles.same1}>{item.date_of_maturity}</Text>
                            {/* <Image 
                            style={styles.image}
                            resizeMode='contain' source={require('../../../assets/Image/premature.png')}/> */}
                            <Text  style={[styles.same]}>{'Maturity\nDate'}</Text>
                            </View>
                        }
                            </View>
                       {/* <View style={styles.view2}>
                       <Text style={styles.text1}>{`Reference No : ${item.my_fixed_deposit_id}`}</Text>
                       <TouchableOpacity style={{
                           paddingHorizontal:8,
                           borderRadius:6,
                           alignItems:'center',
                           justifyContent:'center',
                           }}>
                           <Text style={{fontFamily:'Montserrat-Regular',fontSize:12,color:colors.bc}}>
                             {item.fd_status==0?'Draft':item.fd_status==1?'Active':item.fd_status==4?'Redeem Req':item.fd_status==3?'In-Process':item.fd_status==2?'Redeemed':''}
                               </Text>  
   
                       </TouchableOpacity>
                       </View>
                       <Text style={styles.text1}>{`Account Holder Name : ${item.username}`}</Text>
                       <Text style={styles.text1}>{`Maturity Amount : ${item.maturity_amount}`}</Text> 
                       <Text style={styles.text1}>{`Maturity Date : ${item.date_of_maturity}`}</Text> */}
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
           title={`My FD's`}
           onPress={()=>navigation.navigate('Main')}
           />
             {isFetching?<Loader/>:null} 
           <View style={{flex:1,paddingHorizontal:15,}}>
            <View style={{
                paddingHorizontal:20,
                paddingVertical:2, 
                marginVertical:10,
                borderRadius:6,
                borderColor:colors.textColor,
                backgroundColor:'white',
                justifyContent:'center'
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
                placeholder={{ label: 'Please Filter Here', value: '' }}
                Icon={()=>
                    <Image 
                    style={{
                        width:25,height:9,
                        alignSelf:'center',justifyContent:'center',
                        marginTop:Platform.OS=='android'?11:4
                    }} 
                 source={require('../../../assets/Image/down.png')}/>}   
             />             
            </View>
             <View>  
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