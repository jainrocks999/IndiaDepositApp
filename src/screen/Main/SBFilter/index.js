import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Switch,
  ScrollView,
  BackHandler,
  TextInput
} from 'react-native';
import colors from '../../../component/colors';
import Slider from 'react-native-slider';
import styles from './styles';
import MultiSelect from 'react-native-multiple-select';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import Loader from '../../../component/loader';
import AsyncStorage from '@react-native-community/async-storage';
import Storage from '../../../component/AsyncStorage';
import fontSize from '../../../component/fontSize';
import RNPickerSelect from 'react-native-picker-select';


const FDFilter = ({route}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [isEnabled1, setIsEnabled1] = useState(false);
  const [isEnabled2, setIsEnabled2] = useState(false);
  const [isEnabled3, setIsEnabled3] = useState(false);
  const [isEnabled4, setIsEnabled4] = useState(false);
  const [isEnabled5, setIsEnabled5] = useState(false);
  const [isEnabled6, setIsEnabled6] = useState(false);
  const [selected, setSelected] = useState([]);
  const [bankType,setBankType]=useState([])
  const [creditRating,setCreditRating]=useState([])
  const [atmPoints,setAtmPoints]=useState('')
  const [value, setValue] = useState('0');
  const selector = useSelector(state => state.BankNameList);
  const isFetching = useSelector(state => state.isFetching);
  const [value1, setValue1] = useState('0');
  const [value2, setValue2] = useState('0');
  const data = route.params.data;
  const [len,setLen]=useState(5)
  const [clear,setClear]=useState(false)
  const [insurance,setInsurance]=useState('')

  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);
  const manageFilter = () => {
    setClear(true)
    setIsEnabled1(false);
    setIsEnabled2(false);
    setIsEnabled3(false);
    setIsEnabled4(false);
    setIsEnabled5(false);
    setIsEnabled6(false);
    setSelected([]);
    setCreditRating([])
    setBankType([])
    setAtmPoints('')
    setValue('');
    setValue1('');
    setValue2('');
    setInsurance('')
  };
  const applyFilter = async () => {
    const user_id = await AsyncStorage.getItem(Storage.user_id);
    dispatch({
      type: 'SB_Search_Request',
      url: 'sblist1',
      user_id: user_id,
      min_bal: data.balance,
      location: data.location,
      type1: data.type1,
      bank_id: selected,
      interest_rate: parseFloat(value2).toFixed(1),
      nationalized: isEnabled1 == true ? 1 : '',
      offer: isEnabled3 == true ? 1 : '',
      insurance: insurance,
      account_type: isEnabled5 == true ? 1 : '',
      account_sub_type: isEnabled6 == true ? 1 : '',
      non_maintenance_penalty: value,
      debit_card_amc: value1,
      private: isEnabled2 == true ? 1 : '',
      order_on: data.order_on,
      order_to: data.order_to,
      credit_rating:creditRating,
      bank_type:bankType,
      atm_points:atmPoints,
      b_lat: '',
      b_long: '',
      navigation: navigation,
    });
  };
  const rateOnchange=(value)=>{
    if(value>10){
      setValue1(parseFloat(10).toString())
    }
    else{
      if(isNaN(value)){
      }
      else{
        setValue2(value)
      if(value<10){
        setLen(4)
      }
      else{
        setLen(5)
      }
      }  
    }
  }
  return (
    <View style={{flex: 1}}>
      {isFetching ? <Loader /> : null}
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: 20,
          paddingVertical: 15,
          justifyContent: 'space-between',
          borderBottomWidth: 1,
        }}>
        <Text>Filters </Text>
        <Text onPress={() => manageFilter()}>CLEAR ALL</Text>
      </View>
      {/* <View> */}
      <ScrollView style={{marginBottom: 0}}>
        <View style={{paddingHorizontal: 20, marginTop: 20}}>
          <Text style={styles.heading}>Bank Name</Text>
          <View style={{width: '100%', marginTop: 5}}>
            <MultiSelect
              items={selector}
              single={false}
              uniqueKey="value"
              onSelectedItemsChange={val => setSelected(val)}
              selectedItems={selected}
              searchIcon={false}
              tagBorderColor={colors.bc}
              tagRemoveIconColor={'#fff'}
              tagTextColor={'#fff'}
              selectText={selected.length > 0 ? '' : 'Select Bank'}
              searchInputPlaceholderText="Select Bank"
              selectedItemTextColor={colors.bc}
              selectedItemIconColor={colors.bc}
              itemTextColor={colors.textColor}
              displayKey="label"
              submitButtonColor={colors.bc}
              submitButtonText="Submit"
              textInputProps={{editable: false, autoFocus: false}}
              searchInputPlaceholderText=""
              searchIcon={false}
              styleDropdownMenu={{
                width: '100%',
                borderBottomWidth: 1.5,
                borderColor: colors.bc,
                height: 55,
                alignSelf: 'center',
                flexDirection: 'row',
                backgroundColor: '#fff',
                paddingHorizontal: 12,
              }}
              tagContainerStyle={{backgroundColor: colors.bc}}
            />
          </View>
          <Text style={[styles.heading,{marginTop:5}]}>Credit Rating</Text>
          <View style={{width: '100%', marginTop: 5}}>
            <MultiSelect
              items={Credit}
              single={false}
              uniqueKey="value"
              onSelectedItemsChange={val => setCreditRating(val)}
              selectedItems={creditRating}
              searchIcon={false}
              tagBorderColor={colors.bc}
              tagRemoveIconColor={'#fff'}
              tagTextColor={'#fff'}
              selectText={creditRating.length > 0 ? '' : 'Select Credit Rating'}
              searchInputPlaceholderText="Select Credit Rating"
              selectedItemTextColor={colors.bc}
              selectedItemIconColor={colors.bc}
              itemTextColor={colors.textColor}
              displayKey="label"
              submitButtonColor={colors.bc}
              submitButtonText="Submit"
              textInputProps={{editable: false, autoFocus: false}}
              searchInputPlaceholderText=""
              searchIcon={false}
              styleDropdownMenu={{
                width: '100%',
                borderBottomWidth: 1.5,
                borderColor: colors.bc,
                height: 55,
                alignSelf: 'center',
                flexDirection: 'row',
                backgroundColor: '#fff',
                paddingHorizontal: 12,
              }}
              tagContainerStyle={{backgroundColor: colors.bc}}
            />
          </View><Text style={[styles.heading,{marginTop:5}]}>Bank Type</Text>
          <View style={{width: '100%', marginTop: 5}}>
            <MultiSelect
              items={BankType}
              single={false}
              uniqueKey="value"
              onSelectedItemsChange={val => setBankType(val)}
              selectedItems={bankType}
              searchIcon={false}
              tagBorderColor={colors.bc}
              tagRemoveIconColor={'#fff'}
              tagTextColor={'#fff'}
              selectText={bankType.length > 0 ? '' : 'Select Bank Type'}
              searchInputPlaceholderText="Select Bank Type"
              selectedItemTextColor={colors.bc}
              selectedItemIconColor={colors.bc}
              itemTextColor={colors.textColor}
              displayKey="label"
              submitButtonColor={colors.bc}
              submitButtonText="Submit"
              textInputProps={{editable: false, autoFocus: false}}
              searchInputPlaceholderText=""
              searchIcon={false}
              styleDropdownMenu={{
                width: '100%',
                borderBottomWidth: 1.5,
                borderColor: colors.bc,
                height: 55,
                alignSelf: 'center',
                flexDirection: 'row',
                backgroundColor: '#fff',
                paddingHorizontal: 12,
              }}
              tagContainerStyle={{backgroundColor: colors.bc}}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 5,
              alignItems:'center'
            }}>
            <Text style={styles.heading}>Interest Rate Slider</Text>
            {/* <Text>{`${parseFloat(value2).toFixed(1)}%`}</Text> */}
            <View style={{flexDirection:'row',alignItems:'center'}}>
                  <TextInput
                  value={value2}
                  onChangeText={(val)=>rateOnchange(val)}
                  maxLength={len}
                  style={{color:colors.textColor}}
                  underlineColorAndroid={colors.textColor}
                  keyboardType='number-pad'
                  />
                  <Text>{`%`}</Text>
                  </View>
          </View>
          <Slider
            minimumValue={0}
            maximumValue={10}
            step={0.1}
            value={parseInt(value2 == '' ? 0 : value2)}
            thumbTintColor={colors.bc}
            minimumTrackTintColor={colors.bc}
            // onValueChange={value => setValue2(JSON.stringify(value))}
            onValueChange={(val)=>setValue2(parseFloat(JSON.stringify(val)).toFixed(2))}

          />


              <View style={{marginTop:9}}>
                    <Text style={styles.heading}>Insurance</Text>
                <View style={{borderWidth:1,borderColor:colors.textColor,borderRadius:8,height:40,paddingHorizontal:10,marginTop:5}}>
                 <RNPickerSelect
                          onValueChange={(val)=>setInsurance(val)}
                          items={Insurance}
                          style={{ 
                            inputAndroid: { color: colors.bc,width:'100%',fontSize:14,marginBottom:-1 },
                            inputIOS:{color:colors.bc},
                          placeholder:{color:colors.textColor,fontSize:fontSize.fourteen,marginTop:2,fontFamily:'Montserrat-Regular'},
                          }}
                          value={insurance}
                          useNativeAndroidPickerStyle={false}
                          placeholder={{label:'Please select insurance type',value:''}}
                          Icon={()=><Image 
                                          style={[{marginTop:Platform.OS=='android'? 14:6,
                                          marginRight:-2,
                                          height:10,
                                          width:20,},{marginLeft:10}]} 
                                          source={require('../../../assets/Image/down.png')}/>}
                      />
                    </View>
                </View>
         
       
          <View style={{marginTop:10}}>
            <Text style={styles.heading}>ATM Points</Text>
            <View style={{
                borderWidth:1,
                borderColor:colors.textColor,
                height:40,borderRadius:8,marginTop:5,
                justifyContent:'center',
                paddingHorizontal:10
                }}>
                <TextInput
                placeholder='Please enter atm points'
                style={{color:colors.textColor}}
                value={atmPoints}
                onChangeText={(val)=>setAtmPoints(val)}
                keyboardType='number-pad'
                />
            </View>
          </View>
          
          <View style={{marginTop: 40}}></View>
        </View>
      </ScrollView>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTopWidth: 1,
          height: 50,
          borderColor: colors.bc,
        }}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: '49%',
          }}>
          <TouchableOpacity
            delayPressIn={0}
            onPress={() => navigation.goBack()}>
            <Text style={{color: colors.bc, fontFamily: 'Montserrat-Bold'}}>
              CLOSE
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{borderWidth: 0.5, height: 30, borderColor: colors.bc}}></View>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: '49%',
          }}>
          <TouchableOpacity delayPressIn={0}>
            <Text
              onPress={() => applyFilter()}
              style={{color: colors.bc, fontFamily: 'Montserrat-Bold'}}>
              APPLY
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default FDFilter;
const Credit=[
  { label: 'AAA', value: 'AAA' },
  { label: 'AA', value: 'AA' },
  { label: 'A', value: 'A'},
  { label: 'BBB', value: 'BBB'},
  { label: 'BB', value: 'BB'},
  { label: 'B', value: 'B'},
  { label: 'C', value: 'C'},
  { label: 'D', value: 'D'},
]

const BankType=[
  { label: 'Private', value: '1' },
  { label: 'Public', value: '2' },
]
const Insurance=[
  {label: 'Yes', value:'1'},
  {label: 'No', value:'0'}
  ]
  