import React,{useState,useEffect}from 'react';
import { View,Text,Image,ScrollView,BackHandler,PermissionsAndroid} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import StatusBar from '../../../component/StatusBar';
import { TextInput } from 'react-native';
import colors from '../../../component/colors';
import Header from '../../../component/header';
import Button from '../../../component/button1'
import BottomTab from '../../../component/StoreButtomTab';
import Toast from 'react-native-simple-toast'
import { useDispatch,useSelector } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Loader from '../../../component/loader';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';

Geocoder.init("AIzaSyA35XEKU8dm09Ah43YbEXu0upMj7HprJ3A");

const SBAccount=({route})=>{
   
    const navigation=useNavigation()
    const [balance,setBalance]=useState('')
    const [location,setLocation]=useState('')
    const [address,setAddress]=useState('')
    const dispatch=useDispatch()
    const isFetching=useSelector((state)=>state.isFetching)
    const manageSearch=async()=>{ 
      if(balance==''){
         Toast.show('Please enter minimum balance')
      }
      else if(location==''&&address==''){
         Toast.show('Please confirm location')
      }
      else if(location!=''&&address!=''){
         Toast.show('Please confirm pincode or current location')
      }
      else{
      dispatch({
         type: 'SB_Search_Request',
         url: 'sblist1',
         min_bal:balance,
         location:location==''?address:location,
         type1:route.params.type1,
         bank_id:'',
         interest_rate:'',
         nationalized:'',
         offer:'',
         insurance:'',
         account_type:'',
         account_sub_type:'',
         non_maintenance_penalty:'',
         debit_card_amc:'',
         private:'',
         navigation:navigation
       })
    }
   }

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


   const getCurrentLocation=()=>{
      Geolocation.requestAuthorization();
      Geolocation.getCurrentPosition(
         (position) => {
             Geocoder.from(position.coords.latitude, position.coords.longitude)
                 .then(json => {
                  var addressComponent = json.results[2].address_components;
                  let address=`${addressComponent[0].long_name},${addressComponent[1].long_name},${addressComponent[2].long_name},${addressComponent[3].long_name}`
                  setAddress(address)
                 })
                 .catch(error => console.warn(error));
         },
         (error) => {
              console.log(error.code, error.message);
          },
         { enableHighAccuracy: true, timeout: 10000, maximumAge: 100000 ,forceLocationManager:false}
     );
    }
  const getAddress=async()=>{
   if(Platform.OS === 'ios'){
   getCurrentLocation();
    }else{
      try {
       const granted = await PermissionsAndroid.request(
         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
         {
           title: 'Device current location permission',
           message:
             'Allow app to get your current location',
           buttonNeutral: 'Ask Me Later',
           buttonNegative: 'Cancel',
           buttonPositive: 'OK',
         },
       );
       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
         Geolocation.getCurrentPosition(
            (position) => {
                Geocoder.from(position.coords.latitude, position.coords.longitude)
                    .then(json => {
                     var addressComponent = json.results[2].address_components;
                     let address=`${addressComponent[0].long_name},${addressComponent[1].long_name},${addressComponent[2].long_name},${addressComponent[3].long_name}`
                     setAddress(address)
                    })
                    .catch(error => console.warn(error));
            },
            (error) => {
                 console.log(error.code, error.message);
             },
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 100000 ,forceLocationManager:false}
        );
      
       } else {
         console.log('Location permission denied');
       }
     } catch (err) {
       console.warn(err);
     }
    }

  }
    return(
        <View style={styles.container}>
                 <Header
                    title={'SB A/C SEARCH'}
                    source={require('../../../assets/Image/arrow2.png')}
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
                           <View style={styles.view}>
                              <Text style={styles.text1}>
                              Lorem ipsum, or lipsum as it is sometimes known,
                              is dummy text used in laying out print, graphic or
                              web designs. The passage is attributed to an
                              unknown typesetter book.</Text>
                              <View style={styles.view}>
                                  <Text style={[styles.text2,{fontWeight:'700'}]}>Minimum Balance </Text>
                                  <View style={{flexDirection:'row',width:'100%',marginTop:7}}>
                                     <Image style={{width:12,height:18}} source={require('../../../assets/Image/rupay.png')}/>
                                  <TextInput
                                       style={styles.textinput}
                                       placeholderTextColor={colors.heading1}
                                       keyboardType='number-pad'
                                       value={balance}
                                       onChangeText={(val)=>setBalance(val)}
                                  />
                                 
                                  </View>
                                  <View style={{borderBottomWidth:1,width:'100%',marginTop:-5}}/>
                                </View>
                           </View>
                           <View style={styles.view}>
                                 <View style={styles.view1}>
                                     <Text style={[styles.text2,{fontWeight:'700'}]}>Location</Text>
                                  </View>
                                  <View style={{marginTop:10,flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                                     <View style={{flexDirection:'row',alignItems:'center'}}>
                                         <TouchableOpacity onPress={()=>getAddress()}>
                                          <Image style={{width:24,height:24}}  source={require('../../../assets/Image/search.png')}/>
                                          </TouchableOpacity>
                                          {address?<Text style={[styles.text3,{fontSize:12,width:'70%'}]}>{address}</Text>:
                                           <Text style={styles.text3}>Current Location</Text>}
                                           </View>
                                             {address?
                                             <TouchableOpacity
                                             onPress={()=>setAddress('')}
                                             style={{backgroundColor:colors.bc,borderRadius:12,justifyContent:'center',height:24,width:24,alignItems:'center'}}>
                                             <Text style={{marginRight:0,color:'#fff',marginLeft:0,marginBottom:3}}>x</Text>
                                             </TouchableOpacity>:null}
                                  </View>
                              </View>
                              <View style={[styles.view,{alignItems:'center'}]}>
                                      <Text style={{fontWeight:'700'}}>OR </Text>
                              </View>
                              <View style={{marginTop:5}}>
                                   <TextInput
                                       style={styles.textinput1}
                                       placeholder='Enter Pincode'
                                       placeholderTextColor={colors.heading1}
                                       keyboardType='number-pad'
                                       value={location}
                                       onChangeText={(val)=>setLocation(val)}
                                       maxLength={6}
                                    />
                               </View>
                               <View style={styles.view2}>
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
export default SBAccount;

