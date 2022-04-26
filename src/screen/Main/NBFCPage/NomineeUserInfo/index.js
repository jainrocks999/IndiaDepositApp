import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import styles from './styles';
import StatusBar from '../../../../component/StatusBar';
import colors from '../../../../component/colors';
import Header from '../../../../component/compareHeader';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import CustomButton from '../../../../component/button1';
import AsyncStorage from '@react-native-community/async-storage';
import Storage from '../../../../component/AsyncStorage';
import {useDispatch, useSelector} from 'react-redux';
import Loader from '../../../../component/loader';
import Toast from 'react-native-simple-toast';
import RNPickerSelect from 'react-native-picker-select';
import DatePicker from 'react-native-date-picker';
import axios from 'axios';
import BottomTab from '../../../../component/StoreButtomTab';

const RegisterPage = ({route}) => {
  const navigation = useNavigation('');
  const data = route.params.data;
  const data1=route.params.data
  const CountryList = useSelector(state => state.CountryList);
  const selector1 = useSelector(state => state.StateList);
  const selector2 = useSelector(state => state.CityList);
  const dispatch = useDispatch();
  const isFetching = useSelector(state => state.isFetching);
  const [address1, setAddress1] = useState(data.address1);
  const [address2, setAddress2] = useState(data.address2);
  const [relation, setRelation] = useState(data.relationship);
  const [Grelation, setGRelation] = useState(data.guardian_relationship);
  const [guardian, setGuardian] = useState(data.guardian);
  const [pincode, setPincode] = useState(data.pincode);
  const [country, setCountry] = useState(data.country_id);
  const [state, setState] = useState(data.state_id);
  const [city, setCity] = useState(data.city_id);
  const [name,setName]=useState(data.name)

  const [open, setOpen] = useState(false);
  const [dd1, mm1, yyyy1] = data.dob.split('-');
  const [date, setDate] = useState(
    data.dob == 0 ? new Date() : new Date(`${yyyy1}-${mm1}-${dd1}`),
  );
  const value1 = date.toISOString().split('T')[0];
  const [yyyy, mm, dd] = value1.split('-');
  const value = `${dd}-${mm}-${yyyy}`;

  const [date1, setDate1] = useState(new Date());
  const value2 = date1.toISOString().split('T')[0];
  const [yyyy2, mm2, dd2] = value2.split('-');
  const eligibleDate = yyyy2 - yyyy;

  useEffect(async () => {
    dispatch({
      type: 'State_List_Request',
      url: 'statebyid',
      country_id: country,
    });

    // dispatch({
    //   type: 'City_List_Request',
      // url: 'citybyid',
      // state_id: state,
    // });
  }, []);

  const validateUser = async () => {
    const user_id = await AsyncStorage.getItem(Storage.user_id);
    if(name==''||name==0){
      Toast.show('Please enter name')
    }
    else if (address1 == '' || address1 == 0) {
      Toast.show('Please enter address line 1');
    } else if (address2 == 0 || address2 == '') {
      Toast.show('Please enter address line 2');
    } else if (value == '' || value == 0) {
      Toast.show('Please enter date of birth');
    } else if (relation == '' || relation == 0) {
      Toast.show('Please select relationship');
    } else {
      dispatch({
        type: 'Create_FD_Request',
        url: 'addmyfd',
        formtype: 'nomineedetail',
        deposit_option: '',
        amount: '',
        tenure: '',
        name: '',
        mobile_number: '',
        email: '',
        address_communication: '',
        address_permanent: '',
        qualifications: '',
        mother_name: '',
        father_name: '',
        marital_status: '',
        my_fixed_deposit_id: route.params.my_fixed_deposit_id,
        spouse_name: '',
        occupation: '',
        annual_income: '',
        fd_user_id: user_id,
        user_id: user_id,
        cheque_copy: '',
        address_proof: '',
        pan_card: '',
        user_photo: '',
        nominee_name: name,
        relationship: relation,
        dob: value,
        nominee_address: `${address1},${address2}`,
        navigation: navigation,
      });
      try {
        const data= new FormData()
        data.append('user_id', user_id);
        data.append('user_nominee_id',data1.user_nominee_id);
        data.append('name',name);
        data.append('address1',address1);
        data.append('address2',address2);
        data.append('country', country);
        data.append('state', state);
        data.append('city', city);
        data.append('dob', value);
        data.append('guardian', guardian);
        data.append('relationship', relation);
        data.append('guardian_relationship', Grelation);
        data.append('pincode',pincode);

        const response = await axios({
          method: 'POST',
          data,
          headers: {
            'content-type': 'multipart/form-data',
            Accept: 'multipart/form-data',
          },
          url: 'https://indiadeposit.in/admin/public/apis/updatenominee',
        });
        if(response.data.status==200){
          dispatch({
            type: 'Nominee_List_Request',
            url: 'nomineelist',
            user_id:user_id,
          });
        }
      } catch (error) {
        throw error;
      }
    }
  };

  const manageCityState = async val => {
    if (val.length == 6) {
      setPincode(val);
      try {
        const data = new FormData();
        data.append('location', val);
        const response = await axios({
          method: 'POST',
          data,
          headers: {
            'content-type': 'multipart/form-data',
            Accept: 'multipart/form-data',
          },
          url: 'https://indiadeposit.in/admin/public/apis/getpincodefilter',
        });

        if (response.data.status == 200) {
          dispatch({
            type: 'State_List_Request',
            url: 'statebyid',
            country_id: response.data.country.value,
          });

          // dispatch({
          //   type: 'City_List_Request',
          //   url: 'citybyid',
          //   state_id: response.data.state.value,
          // });
          setCity(response.data.city.value);
          setState(response.data.state.value);
          setCountry(JSON.stringify(response.data.country.value));
        }
      } catch (error) {
        throw error;
      }
    } else {
      setPincode(val);
    }
  };

  const manageState = async val => {
    const user_id = await AsyncStorage.getItem(Storage.user_id);
    setState(val);
    dispatch({
      type: 'City_List_Request',
      url: 'citylist',
      user_id
    })
  };
  const manageCountry = async val => {
    const user_id = await AsyncStorage.getItem(Storage.user_id);
    setCountry(val);
    dispatch({
      type: 'State_List_Request',
      url: 'statebyid',
      country_id: val,
      user_id,
    });
  };

  return (
    <View style={styles.container}>
      <Header
        source={require('../../../../assets/Image/arrow2.png')}
        title="NOMINEE INFO"
        onPress={() => navigation.goBack()}
      />
      {isFetching ? <Loader /> : null}
      <ScrollView style={styles.scroll}>
        <KeyboardAwareScrollView
          extraScrollHeight={10}
          enableOnAndroid={true}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{flex: 1}}>
          <View style={styles.main}>
            <View style={styles.row}>
              <Text style={styles.better}>Name</Text>
              <Text style={{marginTop:10,color:colors.red}}>*</Text>
            </View>
            <View style={styles.drop}>
              <TextInput
                style={styles.input}
                value={name}
                placeholder='Please enter name'
                onChangeText={(val)=>setName(val)}
                editable={true}
              />
            </View>

            <View style={styles.row}>
              <Text style={styles.better}>Address Line 1</Text>
              <Text style={{marginTop:10,color:colors.red}}>*</Text>

            </View>
            <View style={styles.drop}>
              <TextInput
                style={styles.input}
                value={address1}
                onChangeText={val => setAddress1(val)}
                placeholder="Please enter your address"
                editable={true}
              />
            </View>
            <View style={styles.row}>
              <Text style={styles.better}>Address Line 2</Text>
              <Text style={{marginTop:10,color:colors.red}}>*</Text>

            </View>
            <View style={styles.drop}>
              <TextInput
                style={styles.input}
                value={address2}
                editable={true}
                onChangeText={val => setAddress2(val)}
                placeholder=""
              />
            </View>
            <View style={styles.row}>
              <Text style={styles.better}>Date of Birth</Text>
              <Text style={{marginTop:10,color:colors.red}}>*</Text>

            </View>
            <TouchableOpacity
              delayPressIn={0}
              onPress={() => setOpen(true)}
              style={styles.dropCal}>
              <View style={{width: '80%', marginLeft: 0}}>
                <Text style={{color: colors.textColor}}>{value}</Text>
                <DatePicker
                  date={date}
                  modal
                  mode={'date'}
                  open={open}
                  style={{alignItems: 'center'}}
                  onConfirm={date => {
                    setOpen(false);
                    setDate(date);
                  }}
                  onCancel={() => {
                    setOpen(false);
                  }}
                  textColor={colors.textColor}
                  maximumDate={new Date()}
                />
              </View>
              <Image
                style={{marginLeft: 0, width: 25, height: 9, marginTop: 0}}
                source={require('../../../../assets/Image/down.png')}
              />
            </TouchableOpacity>
            <View style={styles.row}>
              <Text style={styles.better}>Relationship</Text>
              <Text style={{marginTop:10,color:colors.red}}>*</Text>

            </View>
            <View style={styles.drop}>
              <RNPickerSelect
                onValueChange={val => setRelation(val)}
                items={Relation}
                style={{
                  inputAndroid: {
                    color: colors.textColor,
                    width: '100%',
                    fontSize: 14,
                    marginBottom: -1,
                  },
                  placeholder: {
                    color: colors.heading1,
                    width: '100%',
                    height: 35,
                    alignSelf: 'center',
                  },
                }}
                value={relation == 0 || null ? '' : relation}
                useNativeAndroidPickerStyle={false}
                placeholder={{label: 'Select relationship', value: 0}}
              />
            </View>
            <View style={styles.row}>
              <Text style={styles.better}>Pincode</Text>
            </View>
            <View style={styles.drop}>
              <TextInput
                style={styles.input}
                value={pincode}
                onChangeText={val => manageCityState(val)}
                placeholder="Please enter pincode"
                editable={true}
                keyboardType="number-pad"
              />
            </View>
            <View style={styles.row}>
              <Text style={styles.better}>Country</Text>
            </View>
            <View style={styles.drop}>
              <RNPickerSelect
                onValueChange={val => manageCountry(val)}
                items={CountryList}
                //style={{ inputAndroid: { color: 'black' } }}
                style={{
                  inputAndroid: {
                    color: colors.textColor,
                    width: '100%',
                    fontSize: 14,
                    marginBottom: -1,
                  },
                  placeholder: {color: colors.heading},
                }}
                value={country}
                useNativeAndroidPickerStyle={false}
                placeholder={{label: 'Please select country', value: ''}}
              />
            </View>
            <View style={styles.row}>
              <Text style={styles.better}>State</Text>
            </View>
            <View style={styles.drop}>
              <RNPickerSelect
                onValueChange={val => manageState(val)}
                items={selector1}
                style={{
                  inputAndroid: {
                    color: colors.textColor,
                    width: '100%',
                    fontSize: 14,
                    marginBottom: -1,
                  },
                  placeholder: {color: colors.heading},
                }}
                value={state}
                useNativeAndroidPickerStyle={false}
                placeholder={{label: 'Please select state', value: ''}}
              />
            </View>
            <View style={styles.row}>
              <Text style={styles.better}>City</Text>
            </View>
            <View style={styles.drop}>
              <RNPickerSelect
                onValueChange={val => setCity(val)}
                items={selector2}
                style={{
                  inputAndroid: {
                    color: colors.textColor,
                    width: '100%',
                    fontSize: 14,
                    marginBottom: -1,
                  },
                  placeholder: {color: colors.heading},
                }}
                value={city}
                useNativeAndroidPickerStyle={false}
                placeholder={{label: 'Please select city', value: ''}}
              />
            </View>
            {eligibleDate <= 18 ? (
              <View>
                <View style={styles.row}>
                  <Text style={styles.better}>Guardian</Text>
                </View>
                <View style={styles.drop}>
                  <TextInput
                    style={styles.input}
                    value={guardian}
                    placeholder="Please enter your guardian name"
                    onChangeText={val => setGuardian(val)}
                    editable={true}
                  />
                </View>
              </View>
            ) : (
              <View />
            )}

            {eligibleDate <= 18 ? (
              <View>
                <View style={styles.row}>
                  <Text style={styles.better}>Guardian Relationship</Text>
                </View>
                <View style={styles.drop}>
                  <RNPickerSelect
                    onValueChange={val => setGRelation(val)}
                    items={Relation}
                    style={{
                      inputAndroid: {
                        color: colors.textColor,
                        width: '100%',
                        fontSize: 14,
                        marginBottom: -1,
                      },
                      placeholder: {
                        color: colors.heading1,
                        width: '100%',
                        height: 35,
                        alignSelf: 'center',
                      },
                    }}
                    value={Grelation == 0 || Grelation == null ? '' : Grelation}
                    useNativeAndroidPickerStyle={false}
                    placeholder={{
                      label: 'Select Guardian Relationship',
                      value: 0,
                    }}
                  />
                </View>
              </View>
            ) : (
              <View />
            )}

            <View style={{paddingVertical: 30, marginBottom: 10}}>
              <CustomButton title="SUBMIT" onPress={() => validateUser('')} />
            </View>
          </View>
        </KeyboardAwareScrollView>
      </ScrollView>
      <StatusBar />
      <View>
        <BottomTab/>
      </View>
    </View>
  );
};
export default RegisterPage;
const Relation = [
  {label: 'Father', value: 'Father'},
  {label: 'Mother', value: 'Mother'},
  {label: 'Sister', value: 'Sister'},
  {label: 'Brother', value: 'Brother'},

  {label: 'Spouse', value: 'Spouse'},
  {label: 'Daughter', value: 'Daughter'},
  {label: 'Other', value: 'Other'},
];
