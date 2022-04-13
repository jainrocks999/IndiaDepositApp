import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  BackHandler,
  TouchableOpacity,
} from 'react-native';
import Header from '../../../../component/compareHeader';
import colors from '../../../../component/colors';
import {useNavigation} from '@react-navigation/native';
import styles from './styles';
import StatusBar from '../../../../component/StatusBar';
import {useDispatch, useSelector} from 'react-redux';
import RNPickerSelect from 'react-native-picker-select';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-community/async-storage';
import Storage from '../../../../component/AsyncStorage';
import CustomButton from '../../../../component/button1';
import {Formik} from 'formik';
import * as yup from 'yup';
import * as Root from '../../../../navigator/rootNavigation';
// import DatePicker from 'react-native-datepicker'
import DatePicker from 'react-native-date-picker';
import axios from 'axios';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Loader from '../../../../component/loader';
import BottomTab from '../../../../component/StoreButtomTab';

const loginValidationSchema = yup.object().shape({
  name: yup
    .string()
    .max(40)
    .required('Please enter your name')
    .matches(/^[^,*+.!0-9-\/:-@\[-`{-~]+$/, 'Please enter valid name'),
  address1: yup
    .string()
    //.required('Please enter your address1')
    .matches(/^[^,*+.!-\/:-@\[-`{-~]+$/, 'Please enter valid address1'),
  address2: yup
    .string()
    // .required('Please enter your address2').
    .matches(/^[^,*+.!-\/:-@\[-`{-~]+$/, 'Please enter valid address2'),

  guardian: yup
    .string()
    //.required('Please Enter your guardian name').
    .matches(/^[^,*+.!0-9-\/:-@\[-`{-~]+$/, 'Please enter valid guardian name'),
  //guardian_relationship:yup.string().required('Please enter your guardian relationship').matches( /^[^,*+.!0-9-\/:-@\[-`{-~]+$/,"Please enter valid guardian relationship"),
});

const BankDetail = ({route}) => {
  const navigation = useNavigation();
  const data = route.params;
  const dispatch = useDispatch();
  const [city, setCity] = useState(data.item.city_id);
  const [state, setState] = useState(data.item.state_id);
  const [country, setCountry] = useState(data.item.country_id);
  const [dob, setDob] = useState(data.item.dob);
  const [relation, setRelation] = useState(data.item.relationship);
  const [Grelation, setGRelation] = useState(data.item.guardian_relationship);
  const selector = useSelector(state => state.CityList);
  const selector1 = useSelector(state => state.StateList);
  const CountryList = useSelector(state => state.CountryList);
  const isFetching = useSelector(state => state.isFetching);
  const [manageStateValue, setManageStateValue] = useState([]);
  const [pincode, setPincode] = useState(data.item.pincode);
  const [open, setOpen] = useState(false);
  const [dd1, mm1, yyyy1] = data.item.dob.split('-');
  const [date, setDate] = useState(
    data.item.dob == 0 || data.item.dob == '' || data.item.dob == null
      ? new Date()
      : new Date(`${yyyy1}-${mm1}-${dd1}`),
  );

  const [date1, setDate1] = useState(new Date());
  const value2 = date1.toISOString().split('T')[0];
  const [yyyy2, mm2, dd2] = value2.split('-');

  const value1 = date.toISOString().split('T')[0];
  const [yyyy, mm, dd] = value1.split('-');
  const value = `${dd}-${mm}-${yyyy}`;

  const eligibleDate = yyyy2 - yyyy;
  console.log('this isiuser elegible date', eligibleDate);
  useEffect(() => {
    dispatch({
      type: 'State_List_Request',
      url: 'statebyid',
      country_id: country,
    });

    // dispatch({
    //   type: 'City_List_Request',
    //   url: 'citybyid',
    //   state_id: state,
    // });
  }, []);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, []);
  const handleBackButtonClick = () => {
    if (navigation.isFocused()) {
      navigation.navigate('Profile');
      return true;
    }
  };

  const addUser = async values => {
    const user_id = await AsyncStorage.getItem(Storage.user_id);
    if (
      relation == '' ||
      relation == null ||
      relation == 0 ||
      relation == 'undefined'
    ) {
      Toast.show('Please Select Relationship');
    }
    // else if(Grelation==''||Grelation==null){
    //     Toast.show('Please Select Gourdian Relationship')
    // }
    // else if(city==''){
    //     Toast.show('Please Select City Name')
    // }
    // else if(value==''){
    //     Toast.show('Please Select Date of Birth')
    // }
    else {
      dispatch({
        type: 'Edit_Nominee_Request',
        url: 'updatenominee',
        user_id,
        user_nominee_id: data.item.user_nominee_id,
        name: values.name,
        address1: values.address1,
        address2: values.address2,
        country: country,
        state: state,
        city: city,
        dob: value,
        relationship: relation,
        guardian: values.guardian,
        guardian_relationship: Grelation,
        pincode: pincode,
        navigation: navigation,
      });
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

  const manageCityState = async val => {
    if (val.length == 6) {
      console.log(val);
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

  return (
    <Formik
      enableReinitialize
      initialValues={{
        name: data.item.name,
        address1: data.item.address1,
        address2: data.item.address2,
        // pincode:data.item.pincode,
        // relationship:,
        guardian: data.item.guardian,
        // guardian_relationship:
      }}
      onSubmit={values => addUser(values)}
      validateOnMount={true}
      validationSchema={loginValidationSchema}>
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        touched,
        isValid,
        errors,
      }) => (
        <View style={styles.container}>
          <Header
            title={'EDIT NOMINEE  '}
            source={require('../../../../assets/Image/arrow2.png')}
            onPress={() => Root.push('Profile')}
          />
          <ScrollView style={styles.main}>
            {isFetching ? <Loader /> : null}
            <KeyboardAwareScrollView
              extraScrollHeight={10}
              enableOnAndroid={true}
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={{flex: 1}}>
              <View style={styles.card}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={styles.better}>Name</Text>
                  {/* <Text style={{marginTop:10,color:colors.red}}>*</Text> */}
                </View>
                <View style={styles.drop}>
                  <TextInput
                    style={styles.input}
                    placeholder="Please enter your name"
                    placeholderTextColor={colors.heading1}
                    defaultValue={values.name}
                    onChangeText={handleChange('name')}
                    onBlur={handleBlur('name')}
                    returnKeyType="done"
                  />
                </View>
                <View style={styles.error}>
                  {errors.name && touched.name && (
                    <Text style={styles.warn}>{errors.name}</Text>
                  )}
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={styles.better}>Address Line 1</Text>
                  {/* <Text style={{marginTop:10,color:colors.red}}>*</Text> */}
                </View>
                <View style={styles.drop}>
                  <TextInput
                    style={styles.input}
                    placeholder="Please enter your address"
                    placeholderTextColor={colors.heading1}
                    defaultValue={values.address1}
                    onChangeText={handleChange('address1')}
                    onBlur={handleBlur('address1')}
                    returnKeyType="done"
                  />
                </View>
                <View style={styles.error}>
                  {errors.address1 && touched.address1 && (
                    <Text style={styles.warn}>{errors.address1}</Text>
                  )}
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={styles.better}>Address Line 2</Text>
                  {/* <Text style={{marginTop:10,color:colors.red}}>*</Text> */}
                </View>
                <View style={styles.drop}>
                  <TextInput
                    style={styles.input}
                    placeholder=""
                    placeholderTextColor={colors.heading1}
                    defaultValue={values.address2}
                    onChangeText={handleChange('address2')}
                    onBlur={handleBlur('address2')}
                    returnKeyType="done"
                  />
                </View>
                <View style={styles.error}>
                  {errors.address2 && touched.address2 && (
                    <Text style={styles.warn}>{errors.address2}</Text>
                  )}
                </View>

                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={styles.better}>Pincode</Text>
                </View>
                <View style={styles.drop}>
                  <TextInput
                    style={styles.input}
                    placeholder="Pleae enter your pincode"
                    placeholderTextColor={colors.heading1}
                    value={pincode}
                    onChangeText={val => manageCityState(val)}
                    maxLength={6}
                    keyboardType="number-pad"
                    returnKeyType="done"
                  />
                </View>
                <View style={styles.error}></View>

                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={styles.better}>Country</Text>
                  {/* <Text style={{marginTop:10,color:colors.red}}>*</Text> */}
                </View>
                <View style={styles.drop}>
                  <RNPickerSelect
                    onValueChange={val => manageCountry(val)}
                    items={CountryList}
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
                <View style={styles.error}></View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={styles.better}>State</Text>
                  {/* <Text style={{marginTop:10,color:colors.red}}>*</Text> */}
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
                <View style={styles.error}></View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={styles.better}>City</Text>
                  {/* <Text style={{marginTop:10,color:colors.red}}>*</Text> */}
                </View>
                <View style={styles.drop}>
                  <RNPickerSelect
                    onValueChange={val => setCity(val)}
                    items={selector}
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
                <View style={styles.error}></View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={styles.better}>Date of Birth</Text>
                  {/* <Text style={{marginTop:10,color:colors.red}}>*</Text> */}
                </View>
                <TouchableOpacity
                  delayPressIn={0}
                  onPress={() => setOpen(true)}
                  style={styles.drop}>
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
                  {/* <DatePicker
                        style={{width: '99%'}}
                            date={dob=='0000-00-00'?'':dob}
                            mode="date"
                            placeholder="Date Of Birth"
                            format="DD-MM-YYYY"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            maxDate={new Date()}
                            customStyles={{
                                placeholderText:{marginLeft:0,color:colors.heading1},
                            dateIcon: {
                                width:0,
                                height:0,
                            },
                            dateInput: {
                                borderWidth:0,
                                width:'100%',
                                height:'100%',
                                alignItems:'flex-start',
                            }
                            }}
                            onDateChange={(date) => setDob(date)}
                        /> */}
                </TouchableOpacity>
                <View style={styles.error}></View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={styles.better}>Relationship</Text>
                  {/* <Text style={{marginTop:10,color:colors.red}}>*</Text> */}
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
                    value={relation == 0 || relation == null ? '' : relation}
                    useNativeAndroidPickerStyle={false}
                    placeholder={{
                      label: 'Please select relationship',
                      value: 0,
                    }}
                  />
                </View>
                <View style={styles.error}>
                  {errors.relationship && touched.relationship && (
                    <Text style={styles.warn}>{errors.relationship}</Text>
                  )}
                </View>

                {eligibleDate <= 18 ? (
                  <View>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Text style={styles.better}>Guardian</Text>
                    </View>
                    <View style={styles.drop}>
                      <TextInput
                        style={styles.input}
                        placeholder="Please enter your guardian name"
                        placeholderTextColor={colors.heading1}
                        defaultValue={values.guardian}
                        onChangeText={handleChange('guardian')}
                        onBlur={handleBlur('guardian')}
                        maxLength={11}
                        returnKeyType="done"
                      />
                    </View>
                    <View style={styles.error}>
                      {errors.guardian && touched.guardian && (
                        <Text style={styles.warn}>{errors.guardian}</Text>
                      )}
                    </View>
                  </View>
                ) : (
                  <View />
                )}
                {eligibleDate <= 18 ? (
                  <View>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Text style={styles.better}>Guardian relationship</Text>
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
                        value={
                          Grelation == 0 || Grelation == null ? '' : Grelation
                        }
                        useNativeAndroidPickerStyle={false}
                        placeholder={{
                          label: 'Please select guardian relationship',
                          value: 0,
                        }}
                      />
                    </View>
                  </View>
                ) : (
                  <View />
                )}
                <View style={styles.error}>
                  {errors.guardian_relationship &&
                    touched.guardian_relationship && (
                      <Text style={styles.warn}>
                        {errors.guardian_relationship}
                      </Text>
                    )}
                </View>

                <View style={{marginTop: 20}}>
                  <CustomButton title="UPDATE" onPress={() => handleSubmit()} />
                </View>
              </View>
            </KeyboardAwareScrollView>
          </ScrollView>
          <StatusBar />
          <View>
        <BottomTab/>
      </View>
        </View>
      )}
    </Formik>
  );
};
export default BankDetail;
const Relation = [
  {label: 'Father', value: 'Father'},
  {label: 'Mother', value: 'Mother'},
  {label: 'Sister', value: 'Sister'},
  {label: 'Brother', value: 'Brother'},

  {label: 'Spouse', value: 'Spouse'},
  {label: 'Daughter', value: 'Daughter'},
  {label: 'Other', value: 'Other'},
];
