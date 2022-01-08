import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  PermissionsAndroid,
  ScrollView,
} from 'react-native';
import colors from '../../../component/colors';
import Header from '../../../component/header';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import styles from './styles';
import RNPickerSelect from 'react-native-picker-select';
import RNFetchBlob from 'rn-fetch-blob';
import Loader from '../../../component/loader';
import {LayoutAnimation} from 'react-native';

const fd_form = ({route}) => {
  const navigation = useNavigation();
  const [data, setData] = useState(route.params.response);
  const [loader, setLoader] = useState(false);
  const [ApiResponse, setApiResponse] = useState(undefined);
  const [multiSelect, setMultiSelect] = useState(false);
  const [listDataSource1, setListDataSource1] = useState([]);
  console.log('thisi is user ersponse',listDataSource1);
  useEffect(async () => {
    renderSearch();
  }, []);
  const renderSearch = async () => {
    try {
      const data = new FormData();
      data.append('location', route.params.pincode);
      data.append('bank_id', route.params.bank_id);
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
      console.log('FD Form response ::;', response.data.data[0]);
      setApiResponse(response.data.data[0]);
      if (response) {
        setLoader(false);
        setBoolean(true);
      }
    } catch (error) {
      setLoader(false);
    }

    try {
      const data = new FormData();
      data.append('location', route.params.pincode);
      const response = await axios({
        method: 'POST',
        data,
        headers: {
          'content-type': 'multipart/form-data',
          Accept: 'multipart/form-data',
        },
        url: 'https://demo.webshowcase-india.com/indiadeposit/public/apis/bankholiday',
      });
      if (response) {
        setListDataSource1(response.data.data);
        console.log('this is user response data',response.data);
      }
    } catch (error) {}
  };

  const actualDownload = url => {
    const {dirs} = RNFetchBlob.fs;
    console.log('this isi working');
    RNFetchBlob.config({
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        mediaScannable: true,
        title: `test.pdf`,
        path: `${dirs.DownloadDir}/test.pdf`,
      },
    })
      .fetch('GET', url, {})
      .then(res => {
        console.log('The file saved to ', res.path());
      })
      .catch(e => {
        console.log(e);
      });
  };
  console.log('THIS USER DETL', route.params.pincode);
  const downloadFile = async item => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        actualDownload(item);
      } else {
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const renderItem = item => {
    return (
      <View
        style={{
          height: 35,
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 10,
        }}>
        <Text
          onPress={() => downloadFile(item.form_attachment)}
          style={{
            fontSize: 14,
            textDecorationLine: 'underline',
            fontFamily: 'Montserrat-SemiBold',
            color: colors.textColor,
          }}>
          {item.form_name}
        </Text>
      </View>
    );
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
          <TouchableOpacity delayPressIn={0}
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
            <View>
              <FlatList
                data={item.details}
                renderItem={({item}) => (
                  <View>
                    <View style={styles.container1}>
                      <Text style={styles.fdata}>{item.date}</Text>
                      <Text style={styles.fdata}>{item.title}</Text>
                      <Text style={styles.fdata}>{item.description}</Text>
                    </View>
                    <View style={styles.border1}></View>
                  </View>
                )}
              />
            </View>
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
    <View style={styles.container}>
      <Header
        title={'FORM'}
        source={require('../../../assets/Image/arrow2.png')}
        onPress={() => navigation.goBack()}
      />

      <ScrollView style={{flex: 1, paddingHorizontal: 15, paddingVertical: 20}}>
        {data.length > 0 ? (
          <View style={styles.card}>
            {loader ? <Loader /> : null}
            <View style={{marginTop: 10}}>
              <Text style={styles.item3}>{'Click any form to download.'}</Text>
            </View>
            <FlatList
              data={data}
              showsVerticalScrollIndicator={false}
              renderItem={({item}) => renderItem(item)}
              style={{marginTop: 20}}
              keyExtractor={item => item.form_id}
              ListFooterComponent={() => (
                <View>
                  {ApiResponse != undefined ? (
                    <View style={{marginVertical: 20}}>
                      <Text style={styles.item3}>{`Bank Details`}</Text>
                      <View style={styles.container1}>
                        <Text
                          style={
                            styles.item2
                          }>{`Financial Institution : ${ApiResponse.branchdetail.bankname}`}</Text>
                      </View>
                      <View style={styles.border1}></View>
                      <View style={styles.container1}>
                        <Text
                          style={
                            styles.item2
                          }>{`Pincode : ${ApiResponse.branchdetail.pin_code}`}</Text>
                      </View>
                      <View style={styles.border1}></View>
                      <View style={styles.container1}>
                        <Text
                          style={
                            styles.item2
                          }>{`Address : ${ApiResponse.branchdetail.address}`}</Text>
                      </View>
                      <View style={styles.border1}></View>
                      <View style={styles.container1}>
                        <Text
                          style={
                            styles.item2
                          }>{`IFSC Code : ${ApiResponse.branchdetail.ifsc_code}`}</Text>
                      </View>
                    </View>
                  ) : null}
                </View>
              )}
            />
            <View></View>
          </View>
        ) : (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center',paddingBottom:20}}>
            <Text
              style={{
                fontFamily: 'Montserrat-Regular',
                fontSize: 15,
              }}>{`We don't have any forms available for download.`}</Text>
          </View>
        )}

        <View style={styles.Textview}>
          <Text
            style={[
              styles.item3,
              {paddingVertical: 10,marginTop: 10},
            ]}>{`Bank Holidays`}</Text>
          <View style={{alignItems: 'center', marginTop: 5}}></View>
          {/* {listDataSource1.length > 0 ? (
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
          )} */}
        </View>
      </ScrollView>
    </View>
  );
};
export default fd_form;
const Data = [
  {label: 'Specific', value: 'specific'},
  {label: 'Comman', value: 'common'},
];
const Data1 = [
  {label: 'Fixed Deposit', value: 'fixeddeposit'},
  {label: 'Saving Account', value: 'savingaccount'},
  {label: 'all', value: 'all'},
];
