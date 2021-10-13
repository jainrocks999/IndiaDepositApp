import React,{useState,useEffect}from 'react';
import { View,Text,Image,ScrollView} from 'react-native';
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
import Geocoder from 'react-native-geocoding';
import { useDispatch, useSelector, } from 'react-redux';
import Toast from 'react-native-simple-toast';
import Loader from '../../../component/loader';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

Geocoder.init("AIzaSyAzFr0YEmrn58EC4u9Z5y6GAgHKvdhFjco");
const Contact=({route})=>{
    const navigation=useNavigation()
    const [day, setDay] = useState(0)
    const [month, setMonth] = useState(0)
    const [year,setYear] = useState(0)
    const [amount,setAmount] = useState('')
    const [pincode,setPincode]=useState('')
    const dispatch=useDispatch()
    const isFetching=useSelector((state)=>state.isFetching)
   console.log('this is narendra here',route.params);

   const manageSearch=async()=>{
      if(year==0 && month==0 && day==0){
         Toast.show('Tenure should be more than 7 days')
      }
      else if(year==0 && month==0 && day<7){
         Toast.show('Tenure should be more than 7 days')
      }
      else if(amount==''){
         Toast.show('Please enter amount')
      }
      else if(pincode==''){
         Toast.show('Please enter location')
      }
      else{
      dispatch({
         type: 'FD_Search_Request',
         url: 'fdlist1',
         year:year,
         month:month,
         days:day,
         amount:amount,
         location:pincode,
         type1:route.params.type1,
         bank_id:'',
         interest_rate:'',
         nationalized:'',
         sb_account_required:'',
         offer:'',
         gender:'',
         interest_payout:'',
         premature_penalty:'',
         loan:'',
         navigation:navigation

         // type2:route.params.type2,
         // type3:route.params.type3,
         // type4:route.params.type4,
         // type5:'',
         // check:route.params.check,
         // data:route.params.data,
       })
    }
   }
   //  Geocoder.from("Colosseum")
   //  .then(json => {
   //     var location = json.results[0].geometry.location;
   //     console.log('narendra hereh dklfjdskfldsjk',location);
   //  })
   //  .catch(error => console.warn(error));


    return(
        <View style={styles.container}>
              <Header
                  title={'FD SEARCH'}
                  source={require('../../../assets/Images/arrow.png')}
                  onPress={()=>navigation.goBack()}
              />
             <ScrollView style={styles.scroll}>
             {isFetching?<Loader/>:null}
             <KeyboardAwareScrollView
               extraScrollHeight={10}
               enableOnAndroid={true} 
               keyboardShouldPersistTaps='handled'
               contentContainerStyle={{flex:1}}>
              
                <View style={styles.main}>
                  < View style={styles.view}>
                      <Text style={[styles.text1,{fontSize:fontSize.thirteen}]}>
                        Lorem ipsum, or lipsum as it is sometimes known,
                        is dummy text used in laying out print, graphic or
                        web designs. The passage is attributed to an
                        unknown typesetter book.
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
                                      inputAndroid: { color: color.textColor,width:'100%',height:40 },
                                      placeholder:{color:'#333333',fontSize:fontSize.twelve}
                                      }}
                                      value={year}
                                      useNativeAndroidPickerStyle={false}
                                      placeholder={{ label: "Year", value: 0 }}
                                      Icon={()=><Image 
                                      style={styles.image} 
                                      source={require('../../../assets/Image/down.png')}/>}
                                    />
                                    <View style={{ borderBottomWidth:1.5,borderColor:'#3D4785',marginTop:-5}}/>
                                  </View>
                               </View>
                               <View style={styles.view3}>
                                    <View style={styles.input}>
                                       <RNPickerSelect
                                          onValueChange={(val)=>setMonth(val)}
                                          items={Month}
                                          style={{ 
                                          inputAndroid: { color: color.textColor,width:'100%',height:40 },
                                          placeholder:{color:'#333333',fontSize:fontSize.twelve}
                                          }}
                                          value={month}
                                          useNativeAndroidPickerStyle={false}
                                          placeholder={{ label: "Month", value:0 }}
                                          Icon={()=><Image 
                                          style={styles.image} 
                                          source={require('../../../assets/Image/down.png')}/>}
                                        />
                                           <View style={{ borderBottomWidth:1.5,borderColor:'#3D4785',marginTop:-5}}/>
                                     </View>
                               </View>
                               <View style={styles.view3}>
                                    <View style={styles.input}>
                                       <RNPickerSelect
                                           onValueChange={(val)=>setDay(val)}
                                           items={days}
                                           style={{ 
                                           inputAndroid: { color: color.textColor,width:'100%',height:40 },
                                           placeholder:{color:'#333333',fontSize:fontSize.twelve}
                                           }}
                                           value={day}
                                           useNativeAndroidPickerStyle={false}
                                           placeholder={{ label: "Days", value:0 }}
                                           Icon={()=><Image 
                                           style={styles.image} 
                                           source={require('../../../assets/Image/down.png')}/>}
                                       />
                                          <View style={{ borderBottomWidth:1.5,borderColor:'#3D4785',marginTop:-5}}/>
                                     </View>
                                 </View>
                             </View>
                        </View>
                      </View>
                      <View style={{marginTop:23}}>
                           <View style={styles.view4}>
                               <Text style={[styles.text1,{fontWeight:'700'}]}>Amount</Text>
                           </View>
                           <View style={{flexDirection:'row',alignItems:'center',marginTop:-10}}>
                              <Image style={{width:12,height:18}} 
                              source={require('../../../assets/Image/rupay.png')}/>
                              <TextInput
                                 style={{width:'90%'}}
                                 placeholderTextColor={colors.heading1}
                                 keyboardType='number-pad'
                                 value={amount}
                                 onChangeText={(val)=>setAmount(val)}
                              />
                           </View>
                           <View style={{borderBottomWidth:1.5,borderColor:colors.bc,marginTop:-10}}/>
                      </View>
                      <View style={{marginTop:24}}>
                          <View style={styles.view4}>
                              <Text style={[styles.text1,{fontWeight:'700'}]}>Location</Text>
                          </View>
                          <View style={styles.view5}>
                                <Image style={{width:24,height:24}} source={require('../../../assets/Image/search.png')}/>
                                <Text style={[styles.text1,{marginLeft:10}]}>Current Location</Text>
                          </View>
                       </View>
                       <View style={styles.view6}>
                             <Text style={{fontWeight:'700',fontFamily:'Montserrat-Regular'}}>OR</Text>
                       </View>
                      <View style={styles.view7}>
                           <TextInput
                              style={{width:'90%'}}
                              placeholder='Enter Pincode'
                              placeholderTextColor={colors.heading1}
                              value={pincode}
                              onChangeText={(val)=>setPincode(val)}
                              keyboardType='number-pad'
                              maxLength={6}
                           />
                              <View style={{ borderBottomWidth:1.5,borderColor:'#3D4785',marginTop:-8}}/>
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
                  {/* <BottomTab/> */}
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