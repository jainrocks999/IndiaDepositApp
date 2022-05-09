import React, {useRef, useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  Platform,
  BackHandler,
  PermissionsAndroid,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import styles from './styles';
import StatusBar from '../../../component/StatusBar';
import {useDispatch, useSelector} from 'react-redux';
import colors from '../../../component/colors';
import Dialog, {DialogContent} from 'react-native-popup-dialog';
import fontSize from '../../../component/fontSize';
import RNPickerSelect from 'react-native-picker-select';
import Button from '../../../component/button1';
import Toast from 'react-native-simple-toast';
import Loader from '../../../component/loader';
import Storage from '../../../component/AsyncStorage';
import AsyncStorage from '@react-native-community/async-storage';
import MultiSelect from 'react-native-multiple-select';
import Constants from '../../../component/Constants';
import BottomTab from '../../../component/StoreButtomTab';


const FDList = ({route}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const selector = useSelector(state => state.FDList);
  const isFetching = useSelector(state => state.isFetching);
  const [selectedData, setSelectedData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [loader, setLoader] = useState(false);
  const [day, setDay] = useState(route.params.days);
  const [month, setMonth] = useState(JSON.stringify(route.params.month));
  const [year, setYear] = useState(route.params.year);
  const [amount, setAmount] = useState(route.params.amount);
  const [pincode, setPincode] = useState(
    !isNaN(route.params.location) ? route.params.location : '',
  );
  const [selected, setSelected] = useState(route.params.type1);
  const [address, setAddress] = useState(
    isNaN(route.params.location) ? route.params.location : '',
  );
  const [sort, setSort] = useState(route.params.order_on);
  const [asc, setAsc] = useState(route.params.order_to);
  const [lat, setLang] = useState(route.params.b_lat);
  const [long, setLong] = useState(route.params.b_long);
  const period = (
    (parseFloat(year) * 365 + parseFloat(month) * 30 + parseFloat(day)) /
    365
  ).toFixed(2);
  const re = /^[0-9\b]+$/;
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

  const manageList = async item => {
    const value =
      (parseInt(year) * 365 + parseInt(month) * 30 + parseInt(day)) / 365;
    const user_id = await AsyncStorage.getItem(Storage.user_id);
    dispatch({
      type: 'FD_Detail_Request',
      url: 'fddetail',
      user_id,
      fixed_deposit_id: item.fixed_deposit_id,
      principal_amount: amount,
      rate: item.rate,
      year: year,
      month: month,
      days: day,
      pincode: pincode,
      navigation: navigation,
    });
  };
  const manageSearch = async () => {
    if (year == 0 && month == 0 && day == 0) {
      Toast.show('Tenure should be more than 7 days');
    } else if (year == 0 && month == 0 && day < 7) {
      Toast.show('Tenure should be more than 7 days');
    } else if (amount == '') {
      Toast.show('Please enter amount');
    } else if (amount > 20000000) {
      Toast.show('Amount should not be more than 20000000');
    } else if (pincode == '' && address == '') {
      Toast.show('Please confirm location');
    } else if (pincode != '' && address != '') {
      Toast.show('Please confirm pincode or current location');
    }
    else {
      dispatch({
        type: 'FD_Search_Request',
        url: 'fdlist1',
        year: year,
        month: parseInt(month),
        days: day,
        amount: amount,
        location: pincode == '' ? address : pincode,
        type1: selected,
        bank_id: route.params.bank_id,
        interest_rate: route.params.interest_rate,
        nationalized: route.params.nationalized,
        sb_account_required: route.params.sb_account_required,
        offer: route.params.offer,
        interest_payout: route.params.interest_payout,
        premature_penalty: route.params.premature_penalty,
        loan: route.params.loan,
        credit_rating:route.params.credit_rating,
        bank_type:route.params.bank_type,
        order_on: sort,
        order_to:sort=='interest_rate'||sort=='mab'?'DESC':'ASC',
        navigation: navigation,
        data: 'FdList',
        b_lat: lat,
        b_long: long,
        b_type: 1,
      });

      setVisible(false);
      //  setSelected([])
    }
  };

  const handleSorting = val => {
    setSort(val);
    manageSearch();
  };

  const compareFD = async () => {
    const user_id = await AsyncStorage.getItem(Storage.user_id);
    if (selectedData.length == 0) {
      Toast.show('Please select FD for Compare');
    } else if (selectedData.length == 1) {
      Toast.show('Please select one more FD');
    } else if (selectedData.length > 2) Toast.show('Please select only two FD');
    else {
      dispatch({
        type: 'FD_Compare_Request',
        url: 'fdcompare',
        user_id,
        value_id1: selectedData[0],
        value_id2: selectedData[1],
        period: period,
        amount: amount,
        year: year,
        month: month,
        days: day,
        pincode:pincode,
        navigation,
      });
      // setSelectedData([])
    }
  };

  const handleonPress = item => {
    if (selectedData.length) {
      handleSelectionMultiple(item.fixed_deposit_id);
    } else {
      manageList(item);
    }
  };

  const handleSelectionMultiple = id => {
    var selectedIds = [...selectedData]; // clone state

    if (selectedIds.includes(id))
      selectedIds = selectedIds.filter(_id => _id !== id);
    else selectedIds.push(id);
    setSelectedData(selectedIds);
  };

  const openDialog = () => {
    setVisible(true);
    // setSelected([])
  };

  const renderItem = item => {
    return (
      <View style={styles.cont}>
        <TouchableOpacity
          delayPressIn={0}
          onLongPress={val => handleSelectionMultiple(item.fixed_deposit_id)}
          onPress={() => handleonPress(item)}
          style={[
            styles.card,
            {
              backgroundColor: selectedData.includes(item.fixed_deposit_id)
                ? '#c9c9f0'
                : '#fff',
              padding: 13,
            },
          ]}>
          <View style={styles.cardView}>
            <Image
              resizeMode="contain"
              style={{height: 20, width: 70}}
              source={{
                uri: `${Constants.imageUrl}${item.bank_logo}`,
              }}
            />
            <Text style={styles.title}>{item.type}</Text>
            <View style={{width: '20%'}}></View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 7,
            }}>
            <View style={{alignItems: 'center'}}>
              <Text style={styles.same1}>{`${item.rate}%`}</Text>
              <Image
                style={styles.image}
                resizeMode="contain"
                source={require('../../../assets/Image/interest.png')}
              />
              <Text style={styles.same}>{'Interest\n Rate'}</Text>
            </View>

            <View style={{alignItems: 'center'}}>
              <Text style={styles.same1}>
                {(amount * Math.pow(1 + item.rate / 100, period)).toFixed(0)}
              </Text>
              <Image
                style={styles.image}
                resizeMode="contain"
                source={require('../../../assets/Image/maturity.png')}
              />
              <Text style={styles.same}>{'Maturity\nAmount'}</Text>
            </View>

            <View style={{alignItems: 'center'}}>
              <Text style={styles.same1}>{item.rating}</Text>
              <Image
                style={styles.image}
                resizeMode="contain"
                source={require('../../../assets/Image/loan.png')}
              />
              <Text style={styles.same}>{'Credit Rating'}</Text>
            </View>
            <View style={{alignItems: 'center'}}>
              <Text style={styles.same1}>
                {item.premature_withdrawals == 0 ? 'No' : 'Yes'}
              </Text>
              <Image
                style={styles.image}
                resizeMode="contain"
                source={require('../../../assets/Image/premature.png')}
              />
              <Text style={[styles.same]}>{'Premature\nWithdrawal'}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.card,
        //paddingTop:Platform.OS=='android'?0:40
      }}>
      <View>
        <View style={styles.mains}>
          <TouchableOpacity
            delayPressIn={0}
            onPress={() => navigation.goBack()}>
            <Image
              style={{height: 35, width: 35, tintColor: colors.white}}
              source={require('../../../assets/Image/arrow2.png')}
            />
          </TouchableOpacity>
          <View style={styles.views}>
            <Text style={styles.texts}>{'List of FDs'} </Text>
          </View>
          <View></View>
        </View>
      </View>
      {isFetching ? <Loader /> : null}
      {loader ? <Loader /> : null}
      <Dialog
        dialogStyle={{width: '94%'}}
        visible={visible}
        //onTouchOutside={()=>setVisible(false)}
        onHardwareBackPress={() => setVisible(false)}>
        <DialogContent>
          <View>
            <View style={styles.view5}>
              <Text style={{marginTop: 10, color: colors.bc}}>
                Modify your search
              </Text>
              <View style={{marginTop: 10}}>
                <Text style={[styles.text5, {fontWeight: '700'}]}>Tenure</Text>
              </View>
              <View style={styles.view5}>
                <View style={styles.view52}>
                  <View style={styles.view53}>
                    <View style={styles.input5}>
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
                        placeholder={{label: 'YY', value: 0}}
                        Icon={() => (
                          <Image
                            style={styles.image4}
                            source={require('../../../assets/Image/down.png')}
                          />
                        )}
                      />
                      <View
                        style={{
                          borderBottomWidth: 1.5,
                          borderColor: '#3D4785',
                          marginTop: Platform.OS == 'android' ? -8 : 6,
                        }}
                      />
                    </View>
                  </View>
                  <View style={styles.view53}>
                    <View style={styles.input5}>
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
                        placeholder={{label: 'MM', value: 0}}
                        Icon={() => (
                          <Image
                            style={styles.image4}
                            source={require('../../../assets/Image/down.png')}
                          />
                        )}
                      />
                      <View
                        style={{
                          borderBottomWidth: 1.5,
                          borderColor: '#3D4785',
                          marginTop: Platform.OS == 'android' ? -8 : 8,
                        }}
                      />
                    </View>
                  </View>
                  <View style={styles.view53}>
                    <View style={styles.input5}>
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
                            style={styles.image4}
                            source={require('../../../assets/Image/down.png')}
                          />
                        )}
                      />
                      <View
                        style={{
                          borderBottomWidth: 1.5,
                          borderColor: '#3D4785',
                          marginTop: Platform.OS == 'android' ? -8 : 8,
                        }}
                      />
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <View style={{marginTop: 23}}>
              <View style={styles.view4}>
                <Text style={[styles.text5, {fontWeight: '700'}]}>Amount</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: Platform.OS == 'android' ? -10 : 6,
                }}>
                <Image
                  style={{width: 12, height: 18}}
                  source={require('../../../assets/Image/rupay.png')}
                />
                <TextInput
                  style={{
                    width: '90%',
                    fontFamily: 'Montserrat-Regular',
                    color: colors.textColor,
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
            <View style={{marginTop: 24}}>
              <View style={styles.view4}>
                <Text style={[styles.text5, {fontWeight: '700'}]}>
                  Location
                </Text>
              </View>
            </View>
            
            <View style={[styles.view7,{marginTop:0}]}>
              <TextInput
                style={{
                  borderBottomWidth: 1.5,
                  borderColor: '#3D4785',
                  paddingBottom: Platform.OS == 'android' ? 0 : 5,
                }}
                placeholder="Enter Pincode"
                placeholderTextColor={colors.heading1}
                value={pincode}
                onChangeText={val => {
                  if (re.test(val) || val == '') {
                    setPincode(val);
                  }
                }}
                keyboardType="number-pad"
                maxLength={6}
                returnKeyType="done"
              />
            </View>
            <View style={{marginTop: 16}}>
              <Text style={{fontSize: 14, fontFamily: 'Montserrat-Regular'}}>
                Type of FD
              </Text>
              <MultiSelect
                items={item}
                uniqueKey="name"
                onSelectedItemsChange={val => setSelected(val)}
                selectedItems={selected}
                searchIcon={false}
                tagBorderColor={colors.bc}
                tagRemoveIconColor={'#fff'}
                tagTextColor={'#fff'}
                selectText={selected.length > 0 ? '' : 'Select FD'}
                // selectedItems
                // styleSelectorContainer={{marginTop:100}}
                // searchInputPlaceholderText="Select FD"
                selectedItemTextColor={colors.bc}
                selectedItemIconColor={colors.bc}
                itemTextColor={colors.textColor}
                displayKey="name"
                submitButtonColor={colors.bc}
                submitButtonText="Submit"
                textInputProps={{editable: false, autoFocus: false}}
                searchInputPlaceholderText=""
                styleDropdownMenu={{
                  width: '100%',
                  borderBottomWidth: 1.5,
                  borderColor: colors.bc,
                  height: 55,
                  alignSelf: 'center',
                  // paddingBottom:-10,
                  flexDirection: 'row',
                  // marginTop:-10
                }}
                tagContainerStyle={{backgroundColor: colors.bc}}
              />
            </View>
            <View style={styles.view8}>
              <Button onPress={() => manageSearch()} title="MODIFY" />
            </View>
          </View>
        </DialogContent>
      </Dialog>
      <View style={styles.list}>
        <TouchableOpacity
          delayPressIn={0}
          onPress={() => openDialog()}
          style={{width: '100%', paddingHorizontal: 10, paddingVertical: 6}}>
          <View
            style={[
              styles.card,
              {
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 10,
                paddingVertical: 8,
                backgroundColor: 'white',
              },
            ]}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={{
                  fontFamily: 'Montserrat-Regular',
                  color: colors.bc,
                  fontSize: 13,
                }}>
                {`Amount : `}
              </Text>
              <Image
                style={{height: 18, width: 12}}
                source={require('../../../assets/Image/rupay.png')}
              />
              <Text
                style={{
                  fontFamily: 'Montserrat-Regular',
                  color: colors.bc,
                  fontSize: 13,
                }}>
                {`${route.params.amount}`}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontFamily: 'Montserrat-Regular',
                  color: colors.bc,
                  fontSize: 13,
                  marginRight: 15,
                }}>
                {`Tenure : ${route.params.year}y-${route.params.month}m-${route.params.days}d`}
              </Text>
              <Image
                resizeMode="contain"
                source={require('../../../assets/Images/down.png')}
              />
            </View>
          </View>
        </TouchableOpacity>
        <View
          style={{
            width: '100%',
            // bottom:10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 10,
            alignItems: 'center',
            paddingTop: 5,
            paddingBottom: 5,
          }}>
          <TouchableOpacity
            delayPressIn={0}
            onPress={() => compareFD()}
            style={{
              paddingHorizontal: 20,
              paddingVertical: 10,
              backgroundColor: '#fff',
              borderRadius: 6,
            }}>
            <Text
              style={{
                fontSize: 13,
                fontFamily: 'Montserrat-Regular',
                color: colors.bc,
              }}>
              Compare
            </Text>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Image source={require('../../../assets/Image/filter.png')} />
            <Text
              style={{
                fontFamily: 'Montserrat-Regular',
                fontSize: 13,
                marginLeft: 3,
              }}>
              Sort By
            </Text>
          </View>
          <TouchableOpacity
            delayPressIn={0}
            style={{
              paddingHorizontal: 6,
              paddingVertical: Platform.OS == 'android' ? 0 : 8,
              backgroundColor: '#fff',
              borderRadius: 6,
              // flexDirection: 'row',
              // alignItems: 'center',
              height: 38,
              width:'36%'
            }}>
            <RNPickerSelect
              onValueChange={val => handleSorting(val)}
              items={Sorting}
              style={{
                inputAndroid: {
                  color: colors.bc,
                  width: '100%',
                  fontSize: 14,
                  marginBottom: -1,
                },
                inputIOS: {color: colors.bc},
                placeholder: {
                  color: colors.bc,
                  fontSize: fontSize.twelve,
                  marginTop: 2,
                  fontFamily: 'Montserrat-Regular',
                },
              }}
              value={sort}
              useNativeAndroidPickerStyle={false}
              placeholder={{}}
              Icon={() => (
                <Image
                  style={styles.image4}
                  source={require('../../../assets/Image/down.png')}
                />
              )}
            />
            {/* <Image
              style={{width: 20, height: 16, marginLeft: 5}}
              resizeMethod="resize"
              source={require('../../../assets/Image/down.png')}
            /> */}
          </TouchableOpacity>
          <TouchableOpacity
            delayPressIn={0}
            onPress={() =>
              navigation.navigate('FDFilter', {
                data: route.params,
              })
            }
            style={{
              backgroundColor: colors.bc,
              height: 26,
              width: 26,
              borderRadius: 13,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image source={require('../../../assets/Image/sort.png')} />
          </TouchableOpacity>
        </View>
        {selector.length > 0 ? (
          <FlatList
            data={selector}
            renderItem={({item}) => renderItem(item)}
            keyExtractor={(item, index) => item.source}
            style={{width: '100%'}}
          />
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: 20,
            }}>
            <Text
              style={{
                fontSize: 15,
                fontFamily: 'Montserrat-Regular',
              }}>
                No Banks found. Kindly change pincode
              {/* We don't have any bank listed on this pincode try another nearest
              pincode */}
            </Text>
          </View>
        )}
      </View>

      <StatusBar />
      <View>
        <BottomTab/>
      </View>
    </View>
  );
};
export default FDList;
const SBType = [
  {label: 'Regular', value: 'Regular'},
  {label: 'Female', value: 'Female'},
  {label: 'Defense', value: 'Defense'},
  {label: 'Zero Balance', value: 'Zero Balance'},
  {label: 'Senior Citizen', value: 'Senior Citizen'},
];
const Sorting = [
  {label: 'Name', value: 'alphabet'},
  {label: 'Rate of Return', value: 'interest_rate'},
  {label: 'Credit Rating', value: 'credit_rating'},
  
];
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
];

const Years = [
  {label: '00', value: '0'},
  {label: '01', value: '1'},
  {label: '02', value: '2'},
  {label: '03', value: '3'},
  {label: '04', value: '4'},
  {label: '05', value: '5'},
];
const item = [
  {
    name: 'Regular',
    id: 10,
  },
  {
    name: 'Senior Citizen',
    id: 15,
  },
  {
    name: 'Tax Saving',
    id: 17,
  },
  {
    name: 'NRI',
    id: 13,
  },
];
