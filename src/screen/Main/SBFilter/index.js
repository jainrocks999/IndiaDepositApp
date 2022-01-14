import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Switch,
  ScrollView,
  BackHandler,
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
  const [value, setValue] = useState('0');
  const selector = useSelector(state => state.BankNameList);
  const isFetching = useSelector(state => state.isFetching);
  const [value1, setValue1] = useState('0');
  const [value2, setValue2] = useState('0');
  const data = route.params.data;
  console.log('this is data from render', route.params);

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
    setIsEnabled1(false);
    setIsEnabled2(false);
    setIsEnabled3(false);
    setIsEnabled4(false);
    setIsEnabled5(false);
    setIsEnabled6(false);
    setSelected([]);
    setValue('');
    setValue1('');
    setValue2('');
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
      insurance: isEnabled4 == true ? 1 : '',
      account_type: isEnabled5 == true ? 1 : '',
      account_sub_type: isEnabled6 == true ? 1 : '',
      non_maintenance_penalty: value,
      debit_card_amc: value1,
      private: isEnabled2 == true ? 1 : '',
      order_on: data.order_on,
      order_to: data.order_to,
      b_lat: '',
      b_long: '',
      navigation: navigation,
    });
  };
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
          <Text style={styles.heading}>Bank</Text>
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
              onChangeInput={text => console.log(text)}
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
              marginTop: 15,
            }}>
            <Text style={styles.heading}>Interest Rate Slider</Text>
            <Text>{`${parseFloat(value2).toFixed(1)}%`}</Text>
          </View>
          <Slider
            minimumValue={0}
            maximumValue={10}
            step={0.1}
            value={parseInt(value2 == '' ? 0 : value2)}
            thumbTintColor={colors.bc}
            minimumTrackTintColor={colors.bc}
            onValueChange={value => setValue2(JSON.stringify(value))}
          />
          <View style={styles.container}>
            <Text style={styles.heading}>Nationalized</Text>
            <Switch
              trackColor={{false: 'grey', true: colors.bc}}
              thumbColor={'#fff'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() =>
                setIsEnabled1(previousState => !previousState)
              }
              value={isEnabled1}
            />
          </View>
          <View style={styles.container}>
            <Text style={styles.heading}>Private/public</Text>
            <Switch
              trackColor={{false: 'grey', true: colors.bc}}
              thumbColor={'#fff'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() =>
                setIsEnabled2(previousState => !previousState)
              }
              value={isEnabled2}
            />
          </View>
          <View style={styles.container}>
            <Text style={styles.heading}>Offer</Text>
            <Switch
              trackColor={{false: 'grey', true: colors.bc}}
              thumbColor={'#fff'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() =>
                setIsEnabled3(previousState => !previousState)
              }
              value={isEnabled3}
            />
          </View>
          <View style={styles.container}>
            <Text style={styles.heading}>Insurance</Text>
            <Switch
              trackColor={{false: 'grey', true: colors.bc}}
              thumbColor={'#fff'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() =>
                setIsEnabled4(previousState => !previousState)
              }
              value={isEnabled4}
            />
          </View>
          <View style={styles.container}>
            <Text style={styles.heading}>Account Type</Text>
            <Switch
              trackColor={{false: 'grey', true: colors.bc}}
              thumbColor={'#fff'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() =>
                setIsEnabled5(previousState => !previousState)
              }
              value={isEnabled5}
            />
          </View>

          <View style={styles.container}>
            <Text style={styles.heading}>Account Sub Type</Text>
            <Switch
              trackColor={{false: 'grey', true: colors.bc}}
              thumbColor={'#fff'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() =>
                setIsEnabled6(previousState => !previousState)
              }
              value={isEnabled6}
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 30,
            }}>
            <Text style={styles.heading}>Non Maintenance Penalty</Text>
            {/* <Text>{value}</Text> */}
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                style={{width: 12, height: 18}}
                source={require('../../../assets/Image/rupay.png')}
              />
              <Text>{value}</Text>
            </View>
          </View>
          <Slider
            minimumValue={0}
            maximumValue={1000}
            step={10}
            value={parseInt(value == '' ? 0 : value)}
            thumbTintColor={colors.bc}
            minimumTrackTintColor={colors.bc}
            onValueChange={value => setValue(JSON.stringify(value))}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 30,
              alignItems: 'center',
            }}>
            <Text style={styles.heading}>Debit Card AMC</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                style={{width: 12, height: 18}}
                source={require('../../../assets/Image/rupay.png')}
              />
              <Text>{value1}</Text>
            </View>
          </View>
          <Slider
            minimumValue={0}
            maximumValue={1000}
            step={10}
            value={parseInt(value1 == '' ? 0 : value1)}
            thumbTintColor={colors.bc}
            minimumTrackTintColor={colors.bc}
            onValueChange={value => setValue1(JSON.stringify(value))}
          />
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
const penalty = [
  {label: '10%', value: '10%'},
  {label: '15%', value: '15%'},
  {label: '20%', value: '20%'},
];
const loan = [
  {label: '10%', value: '10%'},
  {label: '15%', value: '15%'},
  {label: '20%', value: '20%'},
];

const item = [
  {
    name: 'SBI',
    id: 10,
  },
  {
    name: 'Union Bank',
    id: 17,
  },
  {
    name: 'HDFC',
    id: 13,
  },
];
