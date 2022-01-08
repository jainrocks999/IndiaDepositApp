import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  Platform,
  BackHandler,
  PermissionsAndroid,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import styles from './styles';
import StatusBar from '../../../component/StatusBar';
import color from '../../../component/colors';
import {TextInput} from 'react-native';
import colors from '../../../component/colors';
import Header from '../../../component/header';
import Button from '../../../component/button1';
import RNPickerSelect from 'react-native-picker-select';
import fontSize from '../../../component/fontSize';
import Geocoder from 'react-native-geocoding';
import {useDispatch, useSelector} from 'react-redux';
import Toast from 'react-native-simple-toast';
import Loader from '../../../component/loader';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Geolocation from 'react-native-geolocation-service';
import AsyncStorage from '@react-native-community/async-storage';
import Storage from '../../../component/AsyncStorage';
Geocoder.init('AIzaSyDtVqHcJj94jft8rWb2Ap-aQesEicslmxM');

const Contact = ({route}) => {
  const navigation = useNavigation();
  const [day, setDay] = useState(0);
  const [month, setMonth] = useState(0);
  const [year, setYear] = useState(0);
  const [amount, setAmount] = useState('');
  const [pincode, setPincode] = useState('');
  const [address, setAddress] = useState('');
  const [lat, setLang] = useState('');
  const [long, setLong] = useState('');
  const dispatch = useDispatch();
  const isFetching = useSelector(state => state.isFetching);
  const re = /^[0-9\b]+$/;
console.log('thisi is user route from add min',route.params);
  useEffect(() => {
    const backAction = () => {
      navigation.navigate('Main');
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, []);

  const manageSearch = async () => {
    const user_id = await AsyncStorage.getItem(Storage.user_id);
    if (year == 0 && month == 0 && day == 0) {
      Toast.show('Tenure should be more than 7 days');
    } else if (year == 0 && month == 0 && day < 7) {
      Toast.show('Tenure should be more than 7 days');
    } else if (amount == '' || amount == 0) {
      Toast.show('Please enter amount');
    } else if (amount > 20000000) {
      Toast.show('Amount should not be more than 20000000');
    }
    else {
      dispatch({
        type: 'NBFC_Search_Request',
        url: 'fdlist1',
        user_id,
        year: year,
        month: parseInt(month),
        days: day,
        amount: amount,
        type1:route.params.type1,
        location: '',
        bank_id: '',
        interest_rate: '',
        nationalized: '',
        sb_account_required: '',
        offer: '',
        gender: '',
        interest_payout: '',
        premature_penalty: '',
        loan: '',
        order_on: '',
        order_to: '',
        btype:2,
        
        navigation: navigation,
      });
    }
  };
  const getCurrentLocation = () => {
    Geolocation.requestAuthorization();
    Geolocation.getCurrentPosition(
      position => {
        Geocoder.from(position.coords.latitude, position.coords.longitude)
          .then(json => {
            //  var addressComponent = json.results[2].address_components;
            var addressComponent = json.results[0].formatted_address;

            // let address=`${addressComponent[0].long_name},${addressComponent[1].long_name},${addressComponent[2].long_name},${addressComponent[3].long_name}`
            setAddress(addressComponent);
          })
          .catch(error => console.warn(error));
        setLang(position.coords.latitude);
        setLong(position.coords.longitude);
      },
      error => {
        console.log(error.code, error.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 100000,
        forceLocationManager: false,
      },
    );
  };
  const getAddress = async () => {
    if (Platform.OS === 'ios') {
      getCurrentLocation();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Device current location permission',
            message: 'Allow app to get your current location',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          Geolocation.getCurrentPosition(
            position => {
              Geocoder.from(position.coords.latitude, position.coords.longitude)
                .then(json => {
                  console.log(json.results);
                  var addressComponent = json.results[0].formatted_address;
                  // let address=`${addressComponent[0].long_name},${addressComponent[1].long_name},${addressComponent[2].long_name},${addressComponent[3].long_name}`
                  setAddress(addressComponent);
                  setLang(position.coords.latitude);
                  setLong(position.coords.longitude);
                })
                .catch(error => console.warn(error));
            },
            error => {
              console.log(error.code, error.message);
            },
            {
              enableHighAccuracy: true,
              timeout: 10000,
              maximumAge: 100000,
              forceLocationManager: false,
            },
          );
        } else {
          console.log('Location permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };
  return (
    <View style={styles.container}>
      <Header
        title={'NBFC FD SEARCH'}
        source={require('../../../assets/Image/arrow2.png')}
        onPress={() => navigation.goBack()}
      />
      <ScrollView style={styles.scroll}>
        {isFetching ? <Loader /> : null}
        <KeyboardAwareScrollView
          extraScrollHeight={10}
          enableOnAndroid={true}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{flex: 1}}>
          <View style={styles.main}>
            <View style={styles.view}>
              <Text style={[styles.text1, {fontSize: fontSize.thirteen}]}>
                We are trying to show you exact information available in public
                domain but may differ from actual
              </Text>
              <View style={{marginTop: 29}}>
                <Text style={[styles.text1, {fontWeight: '700'}]}>Tenure</Text>
              </View>
              <View style={styles.view1}>
                <View style={styles.view2}>
                  <View style={styles.view3}>
                    <View style={styles.input}>
                      <RNPickerSelect
                        onValueChange={val => setYear(val)}
                        items={Years}
                        style={{
                          inputAndroid: {
                            color: colors.textColor,
                            width: '100%',
                            fontSize: 14,
                            marginBottom: -1,
                          },
                          placeholder: {
                            color: '#333333',
                            fontSize: fontSize.twelve,
                          },
                        }}
                        value={year}
                        useNativeAndroidPickerStyle={false}
                        placeholder={{label: 'Year', value: 0}}
                        Icon={() => (
                          <Image
                            style={styles.image}
                            source={require('../../../assets/Image/down.png')}
                          />
                        )}
                      />
                      <View
                        style={{
                          borderBottomWidth: 1.5,
                          borderColor: '#3D4785',
                          marginTop: Platform.OS == 'android' ? -5 : 7,
                        }}
                      />
                    </View>
                  </View>
                  <View style={styles.view3}>
                    <View style={styles.input}>
                      <RNPickerSelect
                        onValueChange={val => setMonth(val)}
                        items={Month}
                        style={{
                          inputAndroid: {
                            color: colors.textColor,
                            width: '100%',
                            fontSize: 14,
                            marginBottom: -1,
                          },
                          placeholder: {
                            color: '#333333',
                            fontSize: fontSize.twelve,
                          },
                        }}
                        value={month}
                        useNativeAndroidPickerStyle={false}
                        placeholder={{label: 'Month', value: 0}}
                        Icon={() => (
                          <Image
                            style={styles.image}
                            source={require('../../../assets/Image/down.png')}
                          />
                        )}
                      />
                      <View
                        style={{
                          borderBottomWidth: 1.5,
                          borderColor: '#3D4785',
                          marginTop: Platform.OS == 'android' ? -5 : 7,
                        }}
                      />
                    </View>
                  </View>
                  <View style={styles.view3}>
                    <View style={styles.input}>
                      <RNPickerSelect
                        onValueChange={val => setDay(val)}
                        items={days}
                        style={{
                          inputAndroid: {
                            color: colors.textColor,
                            width: '100%',
                            fontSize: 14,
                            marginBottom: -1,
                          },
                          placeholder: {
                            color: '#333333',
                            fontSize: fontSize.twelve,
                          },
                        }}
                        value={day}
                        useNativeAndroidPickerStyle={false}
                        placeholder={{label: 'Days', value: 0}}
                        Icon={() => (
                          <Image
                            style={styles.image}
                            source={require('../../../assets/Image/down.png')}
                          />
                        )}
                      />
                      <View
                        style={{
                          borderBottomWidth: 1.5,
                          borderColor: '#3D4785',
                          marginTop: Platform.OS == 'android' ? -5 : 7,
                        }}
                      />
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <View style={{marginTop: 23}}>
              <View style={styles.view4}>
                <Text style={[styles.text1, {fontWeight: '700'}]}>Amount</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: Platform.OS == 'android' ? -10 : 7,
                }}>
                <Image
                  style={{width: 12, height: 18}}
                  source={require('../../../assets/Image/rupay.png')}
                />
                <TextInput
                  style={{
                    width: '90%',
                    marginLeft: Platform.OS == 'android' ? 0 : 5,
                  }}
                  placeholderTextColor={colors.heading1}
                  keyboardType="number-pad"
                  value={amount}
                  onChangeText={val => {
                    if (re.test(val) || val == '') {
                      setAmount(val);
                    }
                  }}
                  returnKeyType="done"
                />
              </View>
              <View
                style={{
                  borderBottomWidth: 1.5,
                  borderColor: colors.bc,
                  marginTop: Platform.OS == 'android' ? -10 : 5,
                }}
              />
            </View>
            {/* <View style={{marginTop:24}}>
                          <View style={styles.view4}>
                              <Text style={[styles.text1,{fontWeight:'700'}]}>Location</Text>
                          </View>
                          <View style={styles.view5}>
                             <View style={{flexDirection:'row',alignItems:'center'}}>
                             <TouchableOpacity onPress={()=>getAddress()}>
                                <Image style={{width:24,height:24}} source={require('../../../assets/Image/search.png')}/>
                              </TouchableOpacity>
                              {address? <Text style={[styles.text1,{marginLeft:10,fontSize:12,width:'70%'}]}>{address}</Text>:
                                <Text onPress={()=>getAddress()} style={[styles.text1,{marginLeft:10}]}>Current Location</Text>}
                                </View>
                                {address?
                              <TouchableOpacity
                              onPress={()=>setAddress('')}
                              style={{backgroundColor:colors.bc,borderRadius:12,justifyContent:'center',height:24,width:24,alignItems:'center'}}>
                              <Text style={{marginRight:0,color:'#fff',marginLeft:0,marginBottom:3}}>x</Text>
                              </TouchableOpacity>:null}
                          </View>
                       </View>
                       <View style={styles.view6}>
                             <Text style={{fontWeight:'700',fontFamily:'Montserrat-Regular'}}>OR</Text>
                       </View> */}
            {/* <View style={styles.view7}>
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
                              returnKeyType='done'
                           />
                              <View style={{ borderBottomWidth:1.5,borderColor:'#3D4785',marginTop:Platform.OS=='android'?-8:6}}/>
                       </View> */}
            <View style={[styles.view8, {marginTop: 60}]}>
              <Button onPress={() => manageSearch()} title="SEARCH" />
            </View>
          </View>
        </KeyboardAwareScrollView>
      </ScrollView>
      {/* <BottomTab/> */}
      <StatusBar />
    </View>
  );
};
export default Contact;

const days = [
  {label: '00', value: '0'},
  {label: '01', value: '1'},
  {label: '02', value: '2'},
  {label: '03', value: '3'},
  {label: '04', value: '4'},
  {label: '05', value: '5'},
  {label: '06', value: '6'},
  {label: '07', value: '7'},
  {label: '08', value: '8'},
  {label: '09', value: '9'},
  {label: '10', value: '10'},
  {label: '11', value: '11'},
  {label: '12', value: '12'},
  {label: '13', value: '13'},
  {label: '14', value: '14'},
  {label: '15', value: '15'},
  {label: '16', value: '16'},
  {label: '17', value: '17'},
  {label: '18', value: '18'},
  {label: '19', value: '19'},
  {label: '20', value: '20'},
  {label: '21', value: '21'},
  {label: '22', value: '22'},
  {label: '23', value: '23'},
  {label: '24', value: '24'},
  {label: '25', value: '25'},
  {label: '26', value: '26'},
  {label: '27', value: '27'},
  {label: '28', value: '28'},
  {label: '29', value: '29'},
  {label: '30', value: '30'},
];
const Month = [
  {label: '00', value: '0'},
  {label: '01', value: '1'},
  {label: '02', value: '2 '},
  {label: '03', value: '3'},
  {label: '04', value: '4'},
  {label: '05', value: '5'},
  {label: '06', value: '6'},
  {label: '07', value: '7'},
  {label: '08', value: '8'},
  {label: '09', value: '9'},
  {label: '10', value: '10'},
  {label: '11', value: '11'},
  {label: '12', value: '12'},
];

const Years = [
  {label: '00', value: '0'},
  {label: '01', value: '1'},
  {label: '02', value: '2'},
  {label: '03', value: '3'},
  {label: '04', value: '4'},
  {label: '05', value: '5'},
];
