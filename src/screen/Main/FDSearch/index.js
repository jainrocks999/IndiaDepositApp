import React,{useState,useEffect}from 'react';
import { View,Text,Image,ScrollView, Platform,BackHandler,PermissionsAndroid, TouchableOpacity, Alert} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import StatusBar from '../../../component/StatusBar';
import color from '../../../component/colors';
import { TextInput } from 'react-native';
import colors from '../../../component/colors';
import Header from '../../../component/header';
import Button from '../../../component/button1'
import RNPickerSelect from "react-native-picker-select";
import fontSize from '../../../component/fontSize';
import { useDispatch, useSelector, } from 'react-redux';
import Toast from 'react-native-simple-toast';
import Loader from '../../../component/loader';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-community/async-storage';
import Storage from "../../../component/AsyncStorage";
import BottomTab from '../../../component/StoreButtomTab';


// AIzaSyDtVqHcJj94jft8rWb2Ap-aQesEicslmxM
const Contact=({route})=>{
    const navigation=useNavigation()
    const [day, setDay] = useState(0)
    const [month, setMonth] = useState(0)
    const [year,setYear] = useState(0)
    const [amount,setAmount] = useState('')
    const [pincode,setPincode]=useState('')
    const [address,setAddress]=useState('')
    const [lat,setLang]=useState('')
    const [long,setLong]=useState('')
    const [loader,setLoader]=useState(false)
    const dispatch=useDispatch()
    const isFetching=useSelector((state)=>state.isFetching)
    const re = /^[0-9\b]+$/;
    const [error,setError]=useState(false)
   
useEffect(()=>{
   const backAction = () => {
      navigation.navigate('Main')
      return true;
    };
  
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
  
    return () => backHandler.remove();
},[])

   const manageSearch=async()=>{
      const user_id=await AsyncStorage.getItem(Storage.user_id)
      if(year==0 && month==0 && day==0){
         Toast.show('Tenure should be more than 7 days')
      }
      else if(year==0 && month==0 && day<7){
         Toast.show('Tenure should be more than 7 days')
      }
      else if(amount==''||amount==0){
         Toast.show('Please enter amount')
      }
      else if(amount>20000000){
         Toast.show('Amount should not be more than 20000000')
      }
      else if(pincode=='' && address==''){
         Toast.show('Please confirm location')
      }
      else if(pincode.length<6){
         Toast.show('Please enter correct pincode')
      }
      else if(pincode!=''&&address!=''){
         Toast.show('Please confirm pincode or current location')
      }
      else{
      dispatch({
         type: 'FD_Search_Request',
         url: 'fdlist1',
         user_id,
         year:year,
         month:parseInt(month),
         days:day,
         amount:amount,
         location:pincode?pincode:address,
         type1:route.params.type1,
         bank_id:'',
         interest_rate:'',
         nationalized:'',
         sb_account_required:'',
         offer:'',
         interest_payout:'',
         premature_penalty:'',
         loan:'',
         order_on: 'interest_rate',
         order_to: 'DESC',
         bank_type:'',
         credit_rating:'',
         b_lat:lat,
         b_long:long,
         b_type:1,
         navigation:navigation
       })
    }
   }
   
    return(
        <View style={styles.container}>
              <Header
                  title={'FD SEARCH'}
                  source={require('../../../assets/Image/arrow2.png')}
                  onPress={()=>navigation.goBack()}
              />
             <ScrollView style={styles.scroll}>
             {isFetching?<Loader/>:null}
             {loader?<Loader/>:null}
             <KeyboardAwareScrollView
               extraScrollHeight={10}
               enableOnAndroid={true} 
               keyboardShouldPersistTaps='handled'
               contentContainerStyle={{flex:1}}>
              
                <View style={styles.main}>
                  < View style={styles.view}>
                      <Text style={[styles.text1,{fontSize:fontSize.thirteen}]}>
                      Choose an FD which suits your requirements the best. Customize everything you need right from tenure and amount to the features you expect. 
                     </Text>
                     <View  style={{marginTop:29}}>
                        <Text style={[styles.text1,{fontWeight:'700'}]}>Tenure</Text>
                     </View>
                     <View style={styles.view1}>
                        <View style={styles.view2}>
                              <View style={styles.view3}>
                                 <View style={styles.input}>
                                    <RNPickerSelect
                                      onValueChange={(val)=>setYear(val)}
                                      items={Years}
                                      style={{ 
                                       inputAndroid: { color: colors.textColor,width:'100%',fontSize:14,marginBottom:-1 },
                                      placeholder:{color:'#333333',fontSize:fontSize.twelve}
                                      }}
                                      value={year}
                                      useNativeAndroidPickerStyle={false}
                                      placeholder={{ label: "Year", value: 0 }}
                                      Icon={()=><Image 
                                      style={styles.image} 
                                      source={require('../../../assets/Image/down.png')}/>}
                                    />
                                    <View style={{ borderBottomWidth:1.5,borderColor:'#3D4785',marginTop:Platform.OS=='android'? -5:7}}/>
                                  </View>
                               </View>
                               <View style={styles.view3}>
                                    <View style={styles.input}>
                                       <RNPickerSelect
                                          onValueChange={(val)=>setMonth(val)}
                                          items={Month}
                                          style={{ 
                                             inputAndroid: { color: colors.textColor,width:'100%',fontSize:14,marginBottom:-1 },
                                          placeholder:{color:'#333333',fontSize:fontSize.twelve}
                                          }}
                                          value={month}
                                          useNativeAndroidPickerStyle={false}
                                          placeholder={{ label: "Month", value:0 }}
                                          Icon={()=><Image 
                                          style={styles.image} 
                                          source={require('../../../assets/Image/down.png')}/>}
                                        />
                                           <View style={{ borderBottomWidth:1.5,borderColor:'#3D4785',marginTop:Platform.OS=='android'? -5:7}}/>
                                     </View>
                               </View>
                               <View style={styles.view3}>
                                    <View style={styles.input}>
                                       <RNPickerSelect
                                           onValueChange={(val)=>setDay(val)}
                                           items={days}
                                           style={{ 
                                             inputAndroid: { color: colors.textColor,width:'100%',fontSize:14,marginBottom:-1 },
                                           placeholder:{color:'#333333',fontSize:fontSize.twelve}
                                           }}
                                           value={day}
                                           useNativeAndroidPickerStyle={false}
                                           placeholder={{ label: "Days", value:0 }}
                                           Icon={()=><Image 
                                           style={styles.image} 
                                           source={require('../../../assets/Image/down.png')}/>}
                                       />
                                          <View style={{ borderBottomWidth:1.5,borderColor:'#3D4785',marginTop:Platform.OS=='android'? -5:7}}/>
                                     </View>
                                 </View>
                             </View>
                          </View>
                      </View>
                      <View style={{marginTop:23}}>
                           <View style={styles.view4}>
                               <Text style={[styles.text1,{fontWeight:'700'}]}>Amount</Text>
                           </View>
                           <View style={{flexDirection:'row',alignItems:'center',marginTop:Platform.OS=='android' ?-10:7}}>
                              <Image style={{width:12,height:18}} 
                              source={require('../../../assets/Image/rupay.png')}/>
                              <TextInput
                                 style={{width:'90%',marginLeft:Platform.OS=='android'?0:5}}
                                 placeholderTextColor={colors.heading1}
                                 keyboardType='number-pad'
                                 value={amount}
                                 onChangeText={(val)=>{
                                    if(re.test(val)||val==''){
                                       setAmount(val)
                                    }
                                 }
                              }
                                 returnKeyType='done'
                              />
                           </View>
                           <View style={{borderBottomWidth:1.5,borderColor:colors.bc,marginTop:Platform.OS=='android' ?-10:5}}/>
                           <Text style={{color:colors.bc,fontSize:12}}>Minimum : ???1000</Text>
                      </View>
                      <View style={{marginTop:24}}>
                          <View style={styles.view4}>
                              <Text style={[styles.text1,{fontWeight:'700'}]}>Pincode</Text>
                          </View>
                          
                       </View>
                     
                      <View style={[styles.view7]}>
                           <TextInput
                              style={{width:'90%'}}
                              placeholder='Enter Pincode'
                              placeholderTextColor={colors.heading1}
                              value={pincode}
                              onChangeText={(val)=>{
                              if (re.test(val)||val=='') {
                                 setPincode(val)}}
                              }   
                              keyboardType='number-pad'
                              maxLength={6}
                              returnKeyType='search'
                              onSubmitEditing={()=>manageSearch()}
                           />
                              <View style={{ borderBottomWidth:1.5,borderColor:'#3D4785',marginTop:Platform.OS=='android'?-8:6}}/>
                       </View>
                       <View style={styles.view8}>
                            <Button
                                onPress={()=>manageSearch()}
                                title='SEARCH'
                            />
                       </View>
                     </View>
                     </KeyboardAwareScrollView>
            </ScrollView>
                  <BottomTab/>
                 <StatusBar/>
     </View>
    )
}
export default Contact;

const days=[
   {label:'00',value:'0'},
   { label: '01', value: '1'},
   { label: '02', value: '2'},
   { label: '03', value: '3' },
   { label: '04', value: '4' },
   { label: '05', value: '5' },
   { label: '06', value: '6' },
   { label: '07', value: '7' },
   { label: '08', value: '8' },
   { label: '09', value: '9' },
   { label: '10', value: '10' },
   { label: '11', value: '11' },
   { label: '12', value: '12' },
   { label: '13', value: '13' },
   { label: '14', value: '14' },
   { label: '15', value: '15' },
   { label: '16', value: '16' },
   { label: '17', value: '17' },
   { label: '18', value: '18' },
   { label: '19', value: '19' },
   { label: '20', value: '20' },
   { label: '21', value: '21' },
   { label: '22', value: '22' },
   { label: '23', value: '23' },
   { label: '24', value: '24' },
   { label: '25', value: '25' },
   { label: '26', value: '26' },
   { label: '27', value: '27' },
   { label: '28', value: '28' },
   { label: '29', value: '29' },
   { label: '30', value: '30' },

]
const Month=[
   {label:'00',value:'0'},
   { label: '01', value: '1' },
   { label: '02', value: '2 ' },
   { label: '03', value: '3' },
   { label: '04', value: '4' },
   { label: '05', value: '5' },
   { label: '06', value: '6' },
   { label: '07', value: '7' },
   { label: '08', value: '8' },
   { label: '09', value: '9' },
   { label: '10', value: '10' },
   { label: '11', value: '11' },
   { label: '12', value: '12' },
  
]

const Years=[
   {label:'00',value:'0'},
   { label: '01', value: '1' },
   { label: '02', value: '2' },
   { label: '03', value: '3' },
   { label: '04', value: '4' },
   { label: '05', value: '5' },
   
]








// {"code": 4,
//  "message": "Error from the server while geocoding. The received datas are in the error's 'origin' field. Check it for more informations.", 
//  "origin": {"error_message": "You must enable Billing on the Google Cloud Project at https://console.cloud.google.com/project/_/billing/enable Learn more at https://developers.google.com/maps/gmp-get-started",
//   "results": [],
//    "status": "REQUEST_DENIED"}}