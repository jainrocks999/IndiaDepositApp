import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity
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
import {useSelector, useDispatch} from 'react-redux';
import Loader from '../../../../component/loader';
import RNPickerSelect from 'react-native-picker-select';
import Toast from 'react-native-simple-toast';
import axios from 'axios';
import DatePicker from 'react-native-date-picker';


const RegisterPage = ({route}) => {
  const navigation = useNavigation('');
  const dispatch = useDispatch();
  const isFetching = useSelector(state => state.isFetching);
  const CountryList = useSelector(state => state.CountryList);
  const selector1 = useSelector(state => state.StateList);
  const selector2 = useSelector(state => state.CityList);
  const data1 = route.params.data;
  const my_fixed_deposit_id = route.params.my_fixed_deposit_id;
  const [address1, setAddress1] = useState(data1.address1);
  const [address2, setAddress2] = useState(data1.address2);
  const [occupation, setOccupation] = useState(data1.occupation);
  const [income_group, set_income_group] = useState(data1.income_group);
  const [education, setEducation] = useState(data1.education);
  const [marital_status, set_marital_status] = useState(data1.marital_status);
  const [father_name, set_father_name] = useState(data1.father_spouse_name);
  const [mother_name, set_mother_name] = useState(data1.mother_maiden_name);
  const [pan, setPan] = useState(data1.pan);
  const [pincode, setPincode] = useState(data1.pincode);
  const [country, setCountry] = useState(data1.country);
  const [state, setState] = useState(data1.state);
  const [city, setCity] = useState(data1.city);
  const [open,setOpen]=useState(false)
  const [residential_status, set_residential_status] = useState(
    data1.residential_status,
  );
  const [gender, setGender] = useState(data1.gender);
  const [name,setName]=useState(data1.name)
  const [dd1, mm1, yyyy1] = data1.dob.split('-');
  const [dob,setDob]=useState(
    data1.dob == 0 ? new Date() : new Date(`${yyyy1}-${mm1}-${dd1}`),
  );
  const value1 = dob.toISOString().split('T')[0];
  const [yyyy, mm, dd] = value1.split('-');
  const value = `${dd}-${mm}-${yyyy}`;

  useEffect(async () => {
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

  const manageState = async val => {
    const user_id = await AsyncStorage.getItem(Storage.user_id);
    setState(val);
    dispatch({
      type: 'City_List_Request',
      url: 'citylist',
      user_id,
    });
  };
  const manageCountry = async val => {
    setCountry(val);
    dispatch({
      type: 'State_List_Request',
      url: 'statebyid',
      country_id: val,
    });
  };

  const validateUser = async () => {
    const user_id = await AsyncStorage.getItem(Storage.user_id);
    if(name==''||name==0||name==null){
      Toast.show('Please enter name')
    }else if (father_name == '' || father_name == 0) {
      Toast.show('Please enter father/spouse name');
    } else if (mother_name == '' || mother_name == 0) {
      Toast.show('Please enter mother maiden name');
    } else if (address1 == 0 || address1 == '') {
      Toast.show('Please enter address line 1');
    } else if (address2 == 0 || address2 == '') {
      Toast.show('Please enter address line 2');
    } else if (occupation == 0 || occupation == '') {
      Toast.show('Please select occupation');
    } else if (income_group == '' || income_group == 0) {
      Toast.show('Please select monthly income');
    } else if (education == '' || education == 0) {
      Toast.show('Please select highest qualification');
    } else if (marital_status == '' || marital_status == 0) {
      Toast.show('Please select marital status');
    } else {
      dispatch({
        type: 'Create_FD_Request',
        url: 'addmyfd',
        formtype: 'userinfo',
        deposit_option: '',
        amount: '',
        tenure: '',
        name: name == 0 || name == 'undefined' ? 0 : name,
        mobile_number:
          data1.mobile == 0 || data1.mobile == 'undefined' ? 0 : data1.mobile,
        email: data1.email == 0 || data1.email == 'undefined' ? 0 : data1.email,
        address_communication: address1,
        address_permanent: address2,
        qualifications: education,
        mother_name: mother_name,
        father_name: father_name,
        marital_status: marital_status,
        my_fixed_deposit_id: my_fixed_deposit_id,
        spouse_name: '',
        occupation: occupation,
        annual_income: income_group,
        fd_user_id: user_id,
        user_id: user_id,
        user_dob: value,
        pan: pan,
        user_relation: data1.relation,
        cheque_copy: '',
        address_proof: '',
        pan_card: '',
        user_photo: '',
        nominee_name: '',
        relationship: '',
        dob: '',
        nominee_address: '',
        secondaryUserData: route.params.secondaryData,
        navigation: navigation,
      });

      try {
        const data = new FormData();
        data.append('user_id', user_id);
        data.append('name', name);
        data.append('email', data1.email);
        data.append('dob',value);
        data.append('gender', gender);
        data.append('father_spouse_name', father_name);
        data.append('mother_maiden_name', father_name);
        data.append('pan', pan);
        data.append('mobile', data1.mobile);
        data.append('address1', address1);
        data.append('address2', address2);
        data.append('occupation', occupation);
        data.append('pincode', pincode);
        data.append('country', country);
        data.append('state', state);
        data.append('city', city);
        data.append('income_group', income_group);
        data.append('education', education);
        data.append('marital_status', marital_status);
        data.append('residential_status', residential_status);

        const response = await axios({
          method: 'POST',
          data,
          headers: {
            'content-type': 'multipart/form-data',
            Accept: 'multipart/form-data',
          },
          url: 'https://indiadeposit.in/admin/public/apis/editprofile',
        });
        if(response.data.data){
          AsyncStorage.setItem(Storage.name,response.data.data[0].name);
          console.log('this is response',response.data.messages);

        }
      } catch (error) {
        throw error;
      }
    }
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
    <View style={styles.container}>
      <Header
        source={require('../../../../assets/Image/arrow2.png')}
        title="PRIMARY USER INFO"
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
                value={name == 0 ? '' : name}
                placeholder='Please enter name'
                editable={true}
                onChangeText={(val)=>setName(val)}
              />
            </View>

            <View style={styles.row}>
              <Text style={styles.better}>Gender</Text>
            </View>
            <View style={styles.drop}>
              <RNPickerSelect
                onValueChange={val => setGender(val)}
                items={Gender}
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
                value={gender == null || gender == 0 ? '' : gender}
                useNativeAndroidPickerStyle={false}
                placeholder={{label: 'Please select gender', value: 0}}
              />
            </View>
            <View style={styles.row}>
              <Text style={styles.better}>Date of Birth</Text>
            </View>
            <TouchableOpacity
            delayPressIn={0}
            onPress={() => setOpen(true)}
            style={styles.dropCal}>
            <View style={{width: '80%', marginLeft: 0}}>
              <Text style={{color: colors.textColor}}>{value}</Text>
              <DatePicker
                date={dob}
                modal
                mode={'date'}
                open={open}
                style={{alignItems: 'center'}}
                onConfirm={date => {
                  setOpen(false)
                   setDob(date)   
                }}
                onCancel={() => {
                  setOpen(false)
                }}
                textColor={colors.textColor}
                maximumDate={new Date()}
              />
            </View>
            {/* <Image
              style={{marginLeft: 0, width: 25, height: 9, marginTop: 0}}
              source={require('../../../../assets/Image/down.png')}
            /> */}
          </TouchableOpacity>
            {/* <View style={styles.drop}>
              <TextInput
                style={styles.input}
                value={data1.dob}
                editable={false}
              />
            </View> */}
            <View style={styles.row}>
              <Text style={styles.better}>Email</Text>
              <Text style={{marginTop:10,color:colors.red}}>*</Text>

            </View>
            <View style={styles.drop}>
              <TextInput
                style={styles.input}
                value={data1.email}
                editable={false}
              />
            </View>
            <View style={styles.row}>
              <Text style={styles.better}>Mobile</Text>
              <Text style={{marginTop:10,color:colors.red}}>*</Text>

            </View>
            <View style={styles.drop}>
              <TextInput
                style={styles.input}
                value={data1.mobile}
                editable={false}
              />
            </View>
            <View style={styles.row}>
              <Text style={styles.better}>Father/Spouse Name</Text>
              <Text style={{marginTop:10,color:colors.red}}>*</Text>

            </View>
            <View style={styles.drop}>
              <TextInput
                style={styles.input}
                value={
                  father_name == 0 || father_name == null ? '' : father_name
                }
                editable={true}
                onChangeText={val => set_father_name(val)}
                placeholder="Please enter father/spouse name"
              />
            </View>
            <View style={styles.row}>
              <Text style={styles.better}>Mother Maiden Name</Text>
              <Text style={{marginTop:10,color:colors.red}}>*</Text>

            </View>
            <View style={styles.drop}>
              <TextInput
                style={styles.input}
                value={
                  mother_name == 0 || mother_name == null ? '' : mother_name
                }
                onChangeText={val => set_mother_name(val)}
                editable={true}
                placeholder="Please enter mother maiden name"
              />
            </View>
            <View style={styles.row}>
              <Text style={styles.better}>PAN</Text>
            </View>
            <View style={styles.drop}>
              <TextInput
                style={styles.input}
                value={pan == 0 || pan == 'undefined' ? '' : pan}
                onChangeText={val => setPan(val)}
                placeholder="Please enter pan number"
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
                value={address1 == 0 || address1 == null ? '' : address1}
                onChangeText={val => setAddress1(val)}
                editable={true}
                placeholder="Please enter your address"
              />
            </View>
            <View style={styles.row}>
              <Text style={styles.better}>Address Line 2</Text>
              <Text style={{marginTop:10,color:colors.red}}>*</Text>

            </View>
            <View style={styles.drop}>
              <TextInput
                style={styles.input}
                value={address2 == 0 || address2 == null ? '' : address2}
                onChangeText={val => setAddress2(val)}
                editable={true}
                placeholder=""
              />
            </View>
            <View style={styles.row}>
              <Text style={styles.better}>Pincode</Text>
            </View>
            <View style={styles.drop}>
              <TextInput
                style={styles.input}
                value={pincode == 0 || pincode == 'undefined' ? '' : pincode}
                onChangeText={val => manageCityState(val)}
                editable={true}
              />
            </View>
            <View style={styles.row}>

              <Text style={styles.better}>Occupation</Text>
              <Text style={{marginTop:10,color:colors.red}}>*</Text>

            </View>
            <View style={styles.drop}>
              <RNPickerSelect
                onValueChange={val => setOccupation(val)}
                items={Occupation}
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
                value={occupation == null || occupation == 0 ? '' : occupation}
                useNativeAndroidPickerStyle={false}
                placeholder={{label: 'Select occupation', value: 0}}
              />
            </View>
            <View style={styles.row}>
              <Text style={styles.better}>Country</Text>
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
                  placeholder: {
                    color: colors.heading1,
                    width: '100%',
                    height: 40,
                    alignSelf: 'center',
                  },
                }}
                value={country == null || country == 0 ? '' : country}
                useNativeAndroidPickerStyle={false}
                placeholder={{label: 'Select country', value: ''}}
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
                  placeholder: {
                    color: colors.heading1,
                    width: '100%',
                    height: 40,
                    alignSelf: 'center',
                  },
                }}
                value={state == null || state == 0 ? '' : state}
                useNativeAndroidPickerStyle={false}
                placeholder={{label: 'Select state', value: ''}}
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
                  placeholder: {
                    color: colors.heading1,
                    width: '100%',
                    height: 40,
                    alignSelf: 'center',
                  },
                }}
                value={city == null || city == 0 ? '' : city}
                useNativeAndroidPickerStyle={false}
                placeholder={{label: 'Select city', value: ''}}
              />
            </View>

            <View style={styles.row}>
              <Text style={styles.better}>Monthly Income</Text>
              <Text style={{marginTop:10,color:colors.red}}>*</Text>

            </View>
            <View style={styles.drop}>
              <RNPickerSelect
                onValueChange={val => set_income_group(val)}
                items={Incom_Group}
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
                  income_group == 0 || income_group == null ? '' : income_group
                }
                useNativeAndroidPickerStyle={false}
                placeholder={{label: 'Select monthly income', value: 0}}
              />
            </View>
            <View style={styles.row}>
              <Text style={styles.better}>Highest Qualification</Text>
              <Text style={{marginTop:10,color:colors.red}}>*</Text>

            </View>
            <View style={styles.drop}>
              <RNPickerSelect
                onValueChange={val => setEducation(val)}
                items={Education}
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
                value={education == 0 || education == null ? '' : education}
                useNativeAndroidPickerStyle={false}
                placeholder={{label: 'Select Highest Qualification', value: 0}}
              />
            </View>
            <View style={styles.row}>
              <Text style={styles.better}>Marital Status</Text>
              <Text style={{marginTop:10,color:colors.red}}>*</Text>

            </View>
            <View style={styles.drop}>
              <RNPickerSelect
                onValueChange={val => set_marital_status(val)}
                items={Marital_Status}
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
                  marital_status == null || marital_status == 0
                    ? ''
                    : marital_status
                }
                useNativeAndroidPickerStyle={false}
                placeholder={{label: 'Marital status', value: 0}}
              />
            </View>
            <View style={styles.row}>
              <Text style={styles.better}>Residential Status</Text>
            </View>
            <View style={styles.drop}>
              <RNPickerSelect
                onValueChange={val => set_residential_status(val)}
                items={Residential_Status}
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
                    height: 40,
                    alignSelf: 'center',
                  },
                }}
                value={
                  residential_status == 0 || residential_status == null
                    ? ''
                    : residential_status
                }
                useNativeAndroidPickerStyle={false}
                placeholder={{label: 'Select residential status', value: 0}}
              />
            </View>

            <View style={{paddingVertical: 30, marginBottom: 10}}>
              <CustomButton title="SUBMIT" onPress={() => validateUser()} />
            </View>
          </View>
        </KeyboardAwareScrollView>
      </ScrollView>
      <StatusBar />
    </View>
  );
};
export default RegisterPage;
const Gender = [
  {label: 'Male', value: '1'},
  {label: 'Female', value: '2'},
  {label: 'Others', value: '3'},
];
const Marital_Status = [
  {label: 'Married', value: '1'},
  {label: 'Unmarried', value: '2'},
];
const Residential_Status = [
  {label: 'Indian', value: 'Indian'},
  {label: 'Foreign Resident', value: 'Foreign Resident'},
];

const Education = [
  {label: 'Senior Secondary (Class X)', value: 'Senior Secondary (Class X)'},
  {
    label: 'Upto Higher Secondary(Class XII)',
    value: 'Upto Higher Secondary(Class XII)',
  },
  {label: `Upto Graduate`, value: `Upto Graduate`},
  {label: 'Post Graduate', value: 'Post Graduate'},
  {label: 'Professional', value: 'Professional'},
  {label: 'Diploma Holder', value: 'Diploma Holder'},
];
const Incom_Group = [
  {label: '<50000', value: '<50000'},
  {label: '50000 - 100000', value: '50000 - 100000'},
  {label: '100000- 300000', value: '100000- 300000'},
  {label: '300000 - 500000', value: '300000 - 500000'},
  {label: '500000 - 100000', value: '500000 - 100000'},
  {label: '1000000 - 1500000', value: '1000000 - 1500000'},
  {label: '>1500000', value: '>1500000'},
];

const Occupation = [
  {label: 'Salaried', value: 'Salaried'},
  {label: 'Self-employed', value: 'Self-employed'},
  {label: 'Retired', value: 'Retired'},
  {label: 'Housewife', value: 'Housewife'},
  {label: 'Student', value: 'Student'},
  {label: 'Others', value: 'Others'},
];
