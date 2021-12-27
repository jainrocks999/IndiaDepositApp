import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  ScrollView,
  Image,
  BackHandler,
} from 'react-native';
import Header from '../../../component/header';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import {TextInput} from 'react-native-gesture-handler';
import colors from '../../../component/colors';
import {TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';
import Toast from 'react-native-simple-toast';
import {LayoutAnimation} from 'react-native';
import Loader from '../../../component/loader';

const Holiday = () => {
  const navigation = useNavigation();
  const selector = useSelector(state => state.BankNameList);
  const [bank_name, set_bank_name] = useState('');
  const [pincode, setPincode] = useState('');
  const [listDataSource, setListDataSource] = useState([]);
  const [listDataSource1, setListDataSource1] = useState([]);
  const [multiSelect, setMultiSelect] = useState(false);
  const [expand, setExpand] = useState(false);
  const [boolean, setBoolean] = useState(false);
  const [loader, setLoader] = useState(false);
  const re = /^[0-9\b]+$/;

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
      navigation.navigate('Main');
      return true;
    }
  };

  useEffect(async () => {
    try {
      const response = await axios({
        method: 'POST',
        headers: {
          'content-type': 'multipart/form-data',
          Accept: 'multipart/form-data',
        },
        url: 'https://demo.webshowcase-india.com/indiadeposit/public/apis/bankholiday',
      });
      if (response) {
        setListDataSource1(response.data.data);
      }
    } catch (error) {}
  }, []);

  const renderSearch = async () => {
    if (bank_name == '' || bank_name == null || bank_name == 0) {
      Toast.show('Please select bank name');
    } else if (pincode == '') {
      Toast.show('Please enter pincode');
    } else {
      try {
        const data = new FormData();
        data.append('location', pincode);
        data.append('bank_id', bank_name);
        console.log('this isworign');
        setLoader(true);
        const response = await axios({
          method: 'POST',
          data,
          headers: {
            'content-type': 'multipart/form-data',
            Accept: 'multipart/form-data',
          },
          url: 'https://demo.webshowcase-india.com/indiadeposit/public/apis/getbranchbypincode',
        });
        if (response) {
          setLoader(false);
          setBoolean(true);
          setListDataSource(response.data.data);
          console.log('thislkf;asdl;fk;kfl;dsafkdl;fkds;', response.data.data);
        }
      } catch (error) {
        setLoader(false);
      }
    }
  };
  const updateLayout = index => {
    const array = [...listDataSource];
    array.map((value, placeindex) =>
      placeindex === index
        ? (array[placeindex]['isExpanded'] = !array[placeindex]['isExpanded'])
        : (array[placeindex]['isExpanded'] = false),
    );
    setListDataSource(array);
  };

  const dropDown = index => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const array = [...listDataSource1];
    if (multiSelect) {
      array[index]['isExpanded'] = !array[index]['isExpanded'];
    } else {
      array.map((value, placeindex) =>
        placeindex === index
          ? (array[placeindex]['isExpand'] = !array[placeindex]['isExpand'])
          : (array[placeindex]['isExpand'] = false),
      );
    }
    setListDataSource1(array);
  };

  const ExpandableComponent = ({item, onClickFunction}) => {
    const [layoutHeight, setLayoutHeight] = useState(0);
    useEffect(() => {
      if (item.isExpanded) {
        setLayoutHeight(null);
      } else {
        setLayoutHeight(0);
      }
    }, [item.isExpanded]);
    return (
      <View>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={onClickFunction}
          style={{
            width: '100%',
            height: 40,
            backgroundColor: colors.bc,
            marginTop: 5,
            justifyContent: 'space-between',
            paddingHorizontal: 15,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text style={styles.headerText}>{item.branch_name}</Text>
          {item.isExpanded ? (
            <Image
              style={{width: 26, height: 18}}
              source={require('../../../assets/Image/wDown.png')}
            />
          ) : (
            <Image
              style={{width: 26, height: 18}}
              source={require('../../../assets/Image/wFarword.png')}
            />
          )}
        </TouchableOpacity>

        <View
          style={{
            height: layoutHeight,
            overflow: 'hidden',
            paddingHorizontal: 10,
          }}>
          <View style={styles.border1}></View>
          <View style={styles.container}>
            <Text
              style={
                styles.item2
              }>{`Bank Name : ${item.branchdetail.bankname}`}</Text>
          </View>
          <View style={styles.border1}></View>
          <View style={styles.container}>
            <Text
              style={
                styles.item2
              }>{`Pincode : ${item.branchdetail.pin_code}`}</Text>
          </View>
          <View style={styles.border1}></View>
          <View style={styles.container}>
            <Text
              style={
                styles.item2
              }>{`Address : ${item.branchdetail.address}`}</Text>
          </View>
        </View>
      </View>
    );
  };

  const HolidayComponent = ({item, onClickFunction}) => {
    const [layoutHeight, setLayoutHeight] = useState(0);
    useEffect(() => {
      if (item.isExpand) {
        setLayoutHeight(null);
      } else {
        setLayoutHeight(0);
      }
    }, [item.isExpand]);
    return (
      <View>
        {item.details.length > 0 ? (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={onClickFunction}
            style={{
              width: '100%',
              height: 40,
              backgroundColor: colors.bc,
              marginTop: 5,
              justifyContent: 'space-between',
              paddingHorizontal: 15,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text style={styles.headerText}>{item.month}</Text>
            {item.isExpand ? (
              <Image
                style={{width: 26, height: 18}}
                source={require('../../../assets/Image/wDown.png')}
              />
            ) : (
              <Image
                style={{width: 26, height: 18}}
                source={require('../../../assets/Image/wFarword.png')}
              />
            )}
          </TouchableOpacity>
        ) : null}

        <View
          style={{
            height: layoutHeight,
            overflow: 'hidden',
            paddingHorizontal: 10,
          }}>
          {item.details.length > 0 ? (
            <FlatList
              data={item.details}
              renderItem={({item}) => (
                <View>
                  <View style={styles.border1}></View>
                  <View style={styles.container}>
                    <Text style={styles.fdata}>{item.date}</Text>
                    <Text style={styles.fdata}>{item.title}</Text>
                    <Text style={styles.fdata}>{item.description}</Text>
                  </View>
                </View>
              )}
            />
          ) : (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                paddingHorizontal: 20,
                paddingVertical: 4,
              }}>
              <Text style={{fontFamily: 'Montserrat-Regular', fontSize: 14}}>
                {'There is no holidays in this month'}
              </Text>
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container1}>
      <Header
        title={'BANK HOLIDAYS'}
        source={require('../../../assets/Image/arrow2.png')}
        onPress={() => navigation.goBack()}
      />
      {loader ? <Loader /> : null}
      <ScrollView style={{paddingHorizontal: 15, paddingVertical: 20}}>
        <View
          style={[
            styles.Textview,
            {
              paddingBottom: listDataSource.length > 0 ? 0 : 20,
            },
          ]}>
          <View style={styles.Textview1}>
            <View style={{marginTop: 0}}>
              <Text style={{fontFamily: 'Montserrat-SemiBold'}}>Bank Name</Text>
              <View style={[styles.input, {marginTop: 2}]}>
                <RNPickerSelect
                  onValueChange={val => set_bank_name(val)}
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
                  value={bank_name}
                  useNativeAndroidPickerStyle={false}
                  placeholder={{label: 'Please Select Bank', value: ''}}
                />
              </View>
            </View>
            <View style={{marginTop: 20}}>
              <Text style={{fontFamily: 'Montserrat-SemiBold'}}>Pincode</Text>
              <View style={[styles.input, {marginTop: 2}]}>
                <TextInput
                  placeholder="Please Enter Pincode"
                  value={pincode}
                  keyboardType={'number-pad'}
                  maxLength={6}
                  onChangeText={val => {
                    if (re.test(val) || val == '') {
                      setPincode(val);
                    }
                  }}
                />
              </View>
            </View>
          </View>
          <View style={[styles.Textview1, {alignItems: 'center'}]}>
            <TouchableOpacity
              onPress={() => renderSearch()}
              style={styles.button}>
              <Text style={styles.search}>SEARCH</Text>
            </TouchableOpacity>
            {listDataSource.length > 0 ? (
              <View>
                <Text style={[styles.result, {marginBottom: 20}]}>
                  Result of your search
                </Text>
                <Text style={styles.heading}>{`BRANCH DETAILS`}</Text>
              </View>
            ) : null}
          </View>

          {listDataSource.length > 0 ? (
            listDataSource.map((item, key) => (
              <ExpandableComponent
                onClickFunction={() => {
                  updateLayout(key);
                }}
                item={item}
              />
            ))
          ) : boolean == true ? (
            <View
              style={{
                paddingHorizontal: 20,
                marginTop: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: 'Montserrat-Regular',
                  color: colors.textColor,
                  textAlign: 'center',
                }}>{`We don't have any bank listed on this pincode try another nearest pincode`}</Text>
            </View>
          ) : null}
        </View>

        <View style={styles.Textview}>
          <View style={{alignItems: 'center', marginTop: 10}}>
            <Text style={styles.heading}>BANK HOLIDAYS</Text>
          </View>
          {listDataSource1.length > 0 ? (
            listDataSource1.map((item, key) => (
              <HolidayComponent
                onClickFunction={() => {
                  dropDown(key);
                }}
                item={item}
              />
            ))
          ) : (
            <View
              style={{
                paddingHorizontal: 20,
                marginTop: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}></View>
          )}
        </View>
        <View></View>
      </ScrollView>
      {/* <BottomTab/> */}
    </View>
  );
};
export default Holiday;
