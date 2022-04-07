import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import colors from '../../../../component/colors';
import Header from '../../../../component/header';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import styles from './styles';
import CustomButton from '../../../../component/button1';
import AsyncStorage from '@react-native-community/async-storage';
import Storage from '../../../../component/AsyncStorage';
import {CheckBox} from 'react-native-elements';
import Dialog, {DialogContent} from 'react-native-popup-dialog';
import RNPickerSelect from 'react-native-picker-select';
import DatePicker from 'react-native-date-picker';
import axios from 'axios';
import Toast from 'react-native-simple-toast';
import Loader from '../../../../component/loader';

const MyFDDetail = ({route}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const selector = useSelector(state => state.NomineeList);
  const [ids, setIds] = useState([]);
  const [data, setData] = useState('');
  const [name, setName] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [guardian, setGuardian] = useState('');
  const [pincode, setPincode] = useState('');
  const [showModal1, setShowModal1] = useState(false);
  const selectors = useSelector(state => state.CityList);
  const selector1 = useSelector(state => state.StateList);
  const CountryList = useSelector(state => state.CountryList);
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [relation, setRelation] = useState();
  const [Grelation, setGRelation] = useState();
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const isFetching = useSelector(state => state.isFetching);

  const value1 = date.toISOString().split('T')[0];
  const [yyyy, mm, dd] = value1.split('-');
  const value = `${dd}-${mm}-${yyyy}`;

  useEffect(async () => {
    const user_id = await AsyncStorage.getItem(Storage.user_id);
    dispatch({
      type: 'Nominee_List_Request',
      url: 'nomineelist',
      user_id,
    });
  },[]);

  const isChecked = itemId => {
    const isThere = ids.includes(itemId);
    return isThere;
  };

  const toggleChecked = (itemId, item) => {
    if (ids.includes(itemId)) {
      setIds([]);
    }
    setIds(itemId);
    setData(item);
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
  const manageNominee = async () => {
    const user_id = await AsyncStorage.getItem(Storage.user_id);
    if (name == '') {
      Toast.show('Please enter name');
    } else if (address1 == '') {
      Toast.show('Please enter address line 1');
    } else if (address2 == '') {
      Toast.show('Please enter enter address line 2');
    } else if (country == 0 || country == '' || country == null) {
      Toast.show('Please select country name');
    } else if (state == '' || state == null || state == 0) {
      Toast.show('Please select state name');
    } else if (city == '' || city == null || city == 0) {
      Toast.show('Please select city name');
    } else if (value == '') {
      Toast.show('Please select date of birth');
    } else if (relation == 0 || relation == null || relation == '') {
      Toast.show('Please select relationship');
    } else if (guardian == '') {
      Toast.show('Please enter guardian name');
    } else if (Grelation == null || Grelation == '' || Grelation == 0) {
      Toast.show('Please select guardian relationship');
    } else if (pincode == '') {
      Toast.show('Please enter pincode');
    } else {
      try {
        const data = new FormData();
        data.append('user_id', user_id);
        data.append('name', name);
        data.append('address1', address1);
        data.append('address2', address2);
        data.append('country', country);
        data.append('state', state);
        data.append('city', city);
        data.append('dob', value);
        data.append('guardian', guardian);
        data.append('relationship', relation);
        data.append('guardian_relationship', Grelation);
        data.append('pincode', pincode);
        const response = await axios({
          method: 'POST',
          data,
          headers: {
            'content-type': 'multipart/form-data',
            Accept: 'multipart/form-data',
          },
          url: 'https://indiadeposit.in/admin/public/apis/addnominee',
        });
        if (response.data.status == 200) {
          setShowModal1(false);
          Toast.show(response.data.messages);
          dispatch({
            type: 'Nominee_List_Request',
            url: 'nomineelist',
            user_id,
          });
        } else {
          Toast.show(response.data.messages);
        }
      } catch (error) {
        throw error;
      }
    }
  };


  const manageCityState=async(val)=>{
    if(val.length==6){
      console.log(val);
      setPincode(val)
      try {
       const data = new FormData();
       data.append('location',val)
       const response = await axios({
         method: 'POST',
         data,
         headers: {
           'content-type': 'multipart/form-data',
           Accept: 'multipart/form-data',
         },
         url: 'https://indiadeposit.in/admin/public/apis/getpincodefilter',
       });
      
       if (response.data.status==200) {
         console.log('this is response value',response.data);
         dispatch({
           type: 'State_List_Request',
           url: 'statebyid',
           country_id:response.data.country.value,
         })
   
         dispatch({
           type: 'City_List_Request',
           url: 'citybyid',
           state_id:response.data.state.value,
         })
         setCity(response.data.city.value)
         setState(response.data.state.value)
         setCountry(JSON.stringify(response.data.country.value))
       } 
     } catch (error) {
      throw error;
     }
    }
    else{
     setPincode(val)
    }
  
  }



  const renderItem = item => {
    return (
      <View
        style={[
          {
            shadowColor: colors.black,
            shadowOpacity: 0.25,
            shadowRadius: 4,
            shadowOffset: {height: 2, width: 0},
            elevation: 5,
            borderRadius: 10,
            backgroundColor: colors.white,

            paddingHorizontal: 15,

            paddingVertical: 10,
          },
          {marginTop: 10},
        ]}>
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}>
          <View style={{}}>
            <Text style={[styles.text, {fontWeight: 'bold'}]}>{item.name}</Text>
            <Text style={styles.text}>{`Date of Birth : ${item.dob}`}</Text>
            <Text style={styles.text}>{`Relationship : ${
              item.relationship == null ? '' : item.relationship
            }`}</Text>
            <Text style={styles.text}>{`Pincode : ${item.pincode}`}</Text>
          </View>
          <View>
            <CheckBox
              center
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              checked={isChecked(item.user_nominee_id)}
              onPress={() => toggleChecked(item.user_nominee_id, item)}
              checkedColor={colors.bc}
            />
          </View>
        </View>
      </View>
    );
  };
  return (
    <View style={{flex: 1, backgroundColor: colors.card}}>
      <Header
        title={'NOMINEE LIST'}
        source={require('../../../../assets/Image/arrow2.png')}
        onPress={() => navigation.goBack()}
      />
      {isFetching ? <Loader /> : null}
      <ScrollView style={styles.Scroll}>
        <View style={styles.list}>
          <FlatList
            data={selector}
            renderItem={({item}) => renderItem(item)}
            style={{width: '100%', marginBottom: 10, marginTop: 0}}
          />
        </View>
        <View style={styles.Button}>
          <TouchableOpacity
          delayPressIn={0}
            onPress={() => {
              if (selector.length > 5) {
                Toast.show('You can add maximum 6 members in nominee list!');
              } else {
                setShowModal1(true);
              }
            }}
            //  onPress={()=>setShowModal1(true)}
            style={styles.Touch}>
            <Text style={styles.Btntext}>+ ADD NOMINEE</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View
        style={{
          position: 'absolute',
          bottom: 20,
          left: 0,
          right: 0,
          flex: 1,
          paddingHorizontal: 20,
        }}>
       {data? <TouchableOpacity delayPressIn={0}
          disabled={data ? false : true}
          onPress={() =>
            navigation.navigate('NomineeUserInfo', {
              data: data,
              my_fixed_deposit_id: route.params.my_fixed_deposit_id,
            })
          }
          style={{
            width: '100%',
            backgroundColor: data ? colors.bc : 'grey',
            height: 50,
            borderRadius: 30,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{color: colors.white}}>{'CONTINUE'}</Text>
        </TouchableOpacity>:<View/>}
        <TouchableOpacity delayPressIn={0}
          onPress={()=>navigation.navigate('RedeemAccountDetail',{
            my_fixed_deposit_id: route.params.my_fixed_deposit_id,
            amount:route.params.amount
          })}
          style={{
            width: '100%',
            backgroundColor: colors.bc,
            height: 50,
            borderRadius: 30,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop:10
          }}>
          <Text style={{color: colors.white}}>{'SKIP  & CONTINUE'}</Text>
        </TouchableOpacity>
      </View>
      <Dialog
        dialogStyle={{
          width: '98%',
          paddingHorizontal: 0,
          height: '100%',
          paddingTop: 0,
        }}
        visible={showModal1}
        containerStyle={{marginTop: 20}}
        onHardwareBackPress={() => setShowModal1(false)}>
        <View style={{alignSelf: 'flex-end'}}>
          <TouchableOpacity delayPressIn={0}
            onPress={() => setShowModal1(false)}
            style={styles.cross}>
            <Text style={styles.x}>x</Text>
          </TouchableOpacity>
        </View>
        <DialogContent>
          <ScrollView showsVerticalScrollIndicator={true}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.better}>Name</Text>
            </View>
            <View style={styles.drop}>
              <TextInput
                style={styles.input}
                placeholder="Please enter your name"
                value={name}
                onChangeText={val => setName(val)}
                returnKeyType="done"
              />
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.better}>Address Line 1</Text>
            </View>
            <View style={styles.drop}>
              <TextInput
                style={styles.input}
                placeholder="Please enter your address"
                value={address1}
                onChangeText={val => setAddress1(val)}
                returnKeyType="done"
              />
            </View>

            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.better}>Address Line 2</Text>
            </View>
            <View style={styles.drop}>
              <TextInput
                style={styles.input}
                placeholder=""
                placeholderTextColor={colors.heading1}
                value={address2}
                onChangeText={val => setAddress2(val)}
                returnKeyType="done"
              />
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.better}>Pincode</Text>
            </View>

            <View style={styles.drop}>
              <TextInput
                style={styles.input}
                placeholder="Please enter your pincode"
                placeholderTextColor={colors.heading1}
                value={pincode}
                onChangeText={val => manageCityState(val)}
                maxLength={6}
                keyboardType="number-pad"
                returnKeyType="done"
              />
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
                  placeholder: {color: colors.heading},
                }}
                value={country}
                useNativeAndroidPickerStyle={false}
                placeholder={{label: 'Please select country', value: 0}}
              />
            </View>

            <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
                placeholder={{label: 'Please select state', value: 0}}
              />
            </View>

            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.better}>City</Text>
            </View>
            <View style={styles.drop}>
              <RNPickerSelect
                onValueChange={val => setCity(val)}
                items={selectors}
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
                placeholder={{label: 'Please select city', value: 0}}
              />
            </View>

            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.better}>Date of Birth</Text>
            </View>
            <TouchableOpacity delayPressIn={0} onPress={() => setOpen(true)} style={styles.drop}>
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
            </TouchableOpacity>
            <View style={styles.error}></View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.better}>Relationship</Text>
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
                placeholder={{label: 'Please select relationship', value: 0}}
              />
            </View>
            <View style={styles.error}></View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.better}>Guardian</Text>
            </View>
            <View style={styles.drop}>
              <TextInput
                style={styles.input}
                placeholder="Please enter your guardian name"
                placeholderTextColor={colors.heading1}
                value={guardian}
                onChangeText={val => setGuardian(val)}
                maxLength={30}
                returnKeyType="done"
              />
            </View>

            <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
                  label: 'Please select guardian relationship',
                  value: 0,
                }}
              />
            </View>
            <View style={{marginTop: 20}}>
              <CustomButton title="ADD" onPress={() => manageNominee()} />
            </View>
            <View style={{marginTop: 30}} />
          </ScrollView>
        </DialogContent>
      </Dialog>
    </View>
  );
};
export default MyFDDetail;
const Relation = [
  {label: 'Father', value: 'Father'},
  {label: 'Mother', value: 'Mother'},
  {label: 'Sister', value: 'Sister'},
  {label: 'Brother', value: 'Brother'},

  {label: 'Spouse', value: 'Spouse'},
  {label: 'Daughter', value: 'Daughter'},
  {label: 'Other', value: 'Other'},
];
