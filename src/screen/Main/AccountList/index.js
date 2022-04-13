import React, {useEffect, useState} from 'react';
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
import AsyncStorage from '@react-native-community/async-storage';
import Storage from '../../../component/AsyncStorage';
import MultiSelect from 'react-native-multiple-select';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';
import Constants from '../../../component/Constants';
import BottomTab from '../../../component/StoreButtomTab';


Geocoder.init('AIzaSyDtVqHcJj94jft8rWb2Ap-aQesEicslmxM');

const SBAccountList = ({route}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const selector = useSelector(state => state.SBList);
  const [selectedData, setSelectedData] = useState([]);
  const [branch_types, set_branch_type] = useState([]);
  const [visible, setVisible] = useState(false);
  const [balance, setBalance] = useState(
    route.params.type1.length==1&&route.params.type1[0]=='Zero Balance'?'0':route.params.balance
    // route.params.balance
    );
  const [location, setLocation] = useState(
    !isNaN(route.params.location) ? route.params.location : '',
  );
  const [address, setAddress] = useState(
    isNaN(route.params.location) ? route.params.location : '',
  );
  const isFetching = useSelector(state => state.isFetching);
  const [selected, setSelected] = useState(route.params.type1);
  const [lat, setLang] = useState('');
  const [long, setLong] = useState('');
  const [loader, setLoader] = useState(false);
  const [sort, setSort] = useState('Alphabetical');
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

  const manageList = async (item, branch_type) => {
    const user_id = await AsyncStorage.getItem(Storage.user_id);
    dispatch({
      type: 'SB_Detail_Request',
      url: 'sbdetail',
      saving_account_id: item,
      navigation: navigation,
      branch_type: branch_type,
      pincode: location,
      user_id,
    });
  };

  const manageSearch = async () => {
    const user_id = await AsyncStorage.getItem(Storage.user_id);
    if (balance == '') {
      Toast.show('Please enter minimum balance');
    } else if (location == '' && address == '') {
      Toast.show('Please confirm location');
    } else if (location != '' && address != '') {
      Toast.show('Please confirm current location or pincode');
    } else {
      dispatch({
        type: 'SB_Search_Request',
        url: 'sblist1',
        min_bal: balance,
        location: location == '' ? address : location,
        type1: selected,
        user_id,
        bank_id: route.params.bank_id,
        interest_rate: route.params.interest_rate,
        nationalized: route.params.nationalized,
        offer: route.params.offer,
        insurance: route.params.insurance,
        account_type: route.params.account_type,
        account_sub_type: route.params.account_sub_type,
        non_maintenance_penalty: route.params.non_maintenance_penalty,
        debit_card_amc: route.params.debit_card_amc,
        private: route.params.private,
        bank_type:route.params.bank_type,
        atm_points:route.params.atm_points,
        credit_rating:route.params.credit_rating,
        order_on: sort,

        b_lat: lat,
        b_long: long,
        // order_to:sort=='alphabet'||'credit_rating'?'ASC':'DESC',
        order_to:sort=='interest_rate'||sort=='mab'?'DESC':'ASC',
        navigation: navigation,
        data: 'AccountList',
      });
      setVisible(false);
    }
  };

  const manageFilter = val => {
    setSort(val);
    manageSearch();
  };
  const handleonPress = (id, branch_type) => {
    if (selectedData.length) {
      handleSelectionMultiple(id, branch_type);
    } else {
      manageList(id, branch_type);
    }
  };

  const handleSelectionMultiple = (id, branch_type) => {
    var selectedIds = [...selectedData]; // clone state
    var branch = [...branch_types];
    if (selectedIds.includes(id)) {
      selectedIds = selectedIds.filter(_id => _id !== id);
      branch = branch.filter(_branch => _branch !== branch);
    } else selectedIds.push(id);
    branch.push(branch_type);
    setSelectedData(selectedIds);
    set_branch_type(branch);
  };

  const compareFD = async () => {
    const user_id = await AsyncStorage.getItem(Storage.user_id);
    console.log('this is selected data', selectedData);
    if (selectedData.length == 0) {
      Toast.show('Please select SB for Compare');
    } else if (selectedData.length == 1) {
      Toast.show('Please select one more SB');
    } else if (selectedData.length > 2) Toast.show('Please select only two SB');
    else {
      dispatch({
        type: 'SB_Compare_Request',
        url: 'sbcompare',
        user_id,
        value_id1: selectedData[0],
        value_id2: selectedData[1],
        branch_type1: branch_types[0],
        branch_type2: branch_types[1],
        location: location,
        navigation,
      });
    }
  };
  const openDialog = () => {
    setVisible(true);
  };

  const getCurrentLocation = () => {
    setLoader(true);
    Geolocation.requestAuthorization();
    Geolocation.getCurrentPosition(
      position => {
        Geocoder.from(position.coords.latitude, position.coords.longitude)
          .then(json => {
            var addressComponent = json.results[0].formatted_address;
            setAddress(addressComponent);
            setLoader(false);
          })
          .catch(error => {
            setLoader(false);
            Toast.show(error.origin.error_message);
            console.warn(error);
          });
        setLang(position.coords.latitude);
        setLong(position.coords.longitude);
      },
      error => {
        console.log(error.code, error.message);
        setLoader(false);
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
          setLoader(true);
          Geolocation.getCurrentPosition(
            position => {
              Geocoder.from(position.coords.latitude, position.coords.longitude)
                .then(json => {
                  var addressComponent = json.results[0].formatted_address;
                  setAddress(addressComponent);
                  setLoader(false);
                })
                .catch(error => {
                  setLoader(false);
                  Toast.show(error.origin.error_message);
                  console.warn(error);
                });
              setLang(position.coords.latitude);
              setLong(position.coords.longitude);
            },
            error => {
              console.log(error.code, error.message);
              setLoader(false);
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
          setLoader(false);
        }
      } catch (err) {
        console.warn(err);
        setLoader(false);
      }
    }
  };

  const renderAmount = item => {
    if (item.branch_type == 'Metropolitan') {
      return (
        <View>
          <Text style={styles.same1}>{item.min_balance_metropolitan}</Text>
        </View>
      );
    } else if (item.branch_type == 'Rural') {
      return (
        <View>
          <Text style={styles.same1}>{item.min_balance_rural}</Text>
        </View>
      );
    } else if (item.branch_type == 'Semiurban') {
      return (
        <View>
          <Text style={styles.same1}>{item.min_balance_semiurban}</Text>
        </View>
      );
    } else if (item.branch_type == 'Urban') {
      return (
        <View>
          <Text style={styles.same1}>{item.min_balance_urban}</Text>
        </View>
      );
    }
  };

  const renderItem = item => {
    return (
      <View style={styles.cont}>
        <TouchableOpacity
          delayPressIn={0}
          onLongPress={val =>
            handleSelectionMultiple(item.saving_account_id, item.branch_type)
          }
          onPress={() =>
            handleonPress(item.saving_account_id, item.branch_type)
          }
          style={[
            styles.card,
            {
              backgroundColor: selectedData.includes(item.saving_account_id)
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
              <Text style={styles.same}>{'ROI'}</Text>
            </View>
            <View style={{alignItems: 'center'}}>
              {renderAmount(item)}
              {/* <Text style={styles.same}>{item.non_maitenance_penalty_rural}</Text> */}
              <Image
                style={styles.image}
                resizeMode="contain"
                source={require('../../../assets/Image/penalty.png')}
              />
              <Text style={styles.same}>{'MAB'}</Text>
            </View>
            <View style={{alignItems: 'center'}}>
              <Text style={styles.same1}>{item.atm_points}</Text>
              <Image
                style={styles.image}
                resizeMode="contain"
                source={require('../../../assets/Image/debit.png')}
              />
              <Text style={styles.same}>{'ATM Points'}</Text>
            </View>
            <View style={{alignItems: 'center'}}>
              <Text style={styles.same1}>
                {item.interest_calculation_frequency == null
                  ? 0
                  : item.interest_calculation_frequency}
              </Text>
              <Image
                style={styles.image}
                resizeMode="contain"
                source={require('../../../assets/Image/offer.png')}
              />
              <Text style={[styles.same]}>{'Frequency'}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={{flex: 1, backgroundColor: colors.card}}>
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
            <Text style={styles.texts}>{'List of SB A/C'} </Text>
          </View>
          <View></View>
        </View>
      </View>
      {isFetching ? <Loader /> : null}
      {loader ? <Loader /> : null}
      <Dialog
        dialogStyle={{width: '94%', paddingHorizontal: 10}}
        visible={visible}
        onHardwareBackPress={() => setVisible(false)}>
        <DialogContent>
          <View>
            <View style={styles.view5}>
              <View style={{marginTop: 2}}>
                <Text
                  style={{
                    fontFamily: 'Montserrat-Regular',
                    color: colors.bc,
                    fontSize: 16,
                  }}>
                  Modify your search
                </Text>
              </View>
              <View style={styles.view5}>
                <View style={styles.view52}></View>
              </View>
            </View>
            <View>
              <View style={styles.view4}>
                <Text style={[styles.text5, {fontSize: 14}]}>
                  Minimum Balance
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: Platform.OS == 'android' ? 0 : 6,
                }}>
                <Image
                  style={{height: 18, width: 12}}
                  source={require('../../../assets/Image/rupay.png')}
                />
                <TextInput
                  style={{
                    paddingBottom: -10,
                    width: '100%',
                    marginTop: Platform.OS == 'android' ? -10 : 0,
                  }}
                  placeholderTextColor={colors.heading1}
                  keyboardType="number-pad"
                  value={balance}
                  onChangeText={val => {
                    if (re.test(val) || val == '') {
                      setBalance(val);
                    }
                  }}
                  returnKeyType="done"
                  editable={route.params.type1.length==1&&route.params.type1[0]=='Zero Balance'?false:true}
                />
              </View>
              <View
                style={{
                  borderWidth: 1,
                  marginTop: Platform.OS == 'android' ? -1 : 6,
                  borderColor: '#3D4785',
                }}></View>
            </View>
            <View style={{marginTop: 25}}>
              <View style={styles.view4}>
                <Text style={[styles.text5, {fontWeight: '700'}]}>
                  Location
                </Text>
              </View>
              {/* <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 28,
                  justifyContent: 'space-between',
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <TouchableOpacity
                    delayPressIn={0}
                    onPress={() => getAddress()}>
                    <Image
                      style={{width: 24, height: 24}}
                      source={require('../../../assets/Image/search.png')}
                    />
                  </TouchableOpacity>
                  {address ? (
                    <Text
                      style={[
                        styles.text5,
                        {marginLeft: 10, fontSize: 12, width: '70%'},
                      ]}>
                      {address}
                    </Text>
                  ) : (
                    <Text
                      onPress={() => getAddress()}
                      style={[styles.text5, {marginLeft: 10}]}>
                      Current Location
                    </Text>
                  )}
                </View>
                {address ? (
                  <TouchableOpacity
                    delayPressIn={0}
                    onPress={() => setAddress('')}
                    style={{
                      backgroundColor: colors.bc,
                      borderRadius: 12,
                      justifyContent: 'center',
                      height: 24,
                      width: 24,
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        marginRight: 0,
                        color: '#fff',
                        marginLeft: 0,
                        marginBottom: 3,
                      }}>
                      x
                    </Text>
                  </TouchableOpacity>
                ) : null}
                    </View>*/}
            </View> 
            {/* <View style={styles.view6}>
              <Text
                style={{fontWeight: '700', fontFamily: 'Montserrat-Regular'}}>
                OR
              </Text>
            </View> */}
            <View style={[styles.view7,{marginTop:0}]}>
              <TextInput
                style={{
                  borderBottomWidth: 1.5,
                  borderColor: '#3D4785',
                  paddingBottom: Platform.OS == 'android' ? 0 : 6,
                }}
                placeholder="Enter pincode"
                placeholderTextColor={colors.heading1}
                value={location}
                onChangeText={val => {
                  if (re.test(val) || val == '') {
                    setLocation(val);
                  }
                }}
                keyboardType="number-pad"
                maxLength={6}
                returnKeyType="done"
              />
            </View>

            <View style={{marginTop: 26}}>
              <Text style={{fontSize: 14, fontFamily: 'Montserrat-Regular'}}>
                Type of SB A/C
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
                selectText={selected.length > 0 ? '' : 'Select SB A/C'}
                searchInputPlaceholderText="Select SB A/C"
                onChangeInput={text => console.log(text)}
                selectedItemTextColor={colors.bc}
                selectedItemIconColor={colors.bc}
                itemTextColor={colors.textColor}
                displayKey="name"
                submitButtonColor={colors.bc}
                submitButtonText="Submit"
                textInputProps={{editable: false, autoFocus: false}}
                styleDropdownMenu={{
                  width: '100%',
                  borderBottomWidth: 1.5,
                  borderColor: colors.bc,
                  height: 55,
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
                width: '100%',
              },
            ]}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: '45%',
              }}>
              <Text
                style={{
                  fontFamily: 'Montserrat-Regular',
                  color: colors.bc,
                  fontSize: 13,
                }}>
                {`MAB : `}
              </Text>
              <Image
                style={{width: 12, height: 18}}
                source={require('../../../assets/Image/rupay.png')}
              />
              <Text
                style={{
                  fontFamily: 'Montserrat-Regular',
                  color: colors.bc,
                  fontSize: 13,
                }}>
                {`${route.params.balance}`}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '48%',
              }}>
              <Text
                numberOfLines={1}
                style={{
                  fontFamily: 'Montserrat-Regular',
                  color: colors.bc,
                  fontSize: 13,
                  marginRight: 5,
                  width: '80%',
                }}>
                {`Location : ${route.params.location}`}
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
              paddingVertical: 9,
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
              onValueChange={val => manageFilter(val)}
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
              navigation.navigate('SBFilter', {
                data: route.params,
                data1: selected,
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
                No banks found. Kindly change pincode
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
export default SBAccountList;
const Sorting = [
  {label: 'Name', value: 'alphabet'},
  {label: 'Rate of Return', value: 'interest_rate'},
  {label: 'Credit Rating', value: 'credit_rating'},

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
    name: 'Female',
    id: 13,
  },
  {
    name: 'Zero Balance',
    id: 17,
  },
];
