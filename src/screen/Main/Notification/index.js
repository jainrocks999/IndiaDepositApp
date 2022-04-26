import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  BackHandler,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  Keyboard,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import styles from './styles';
import StatusBar from '../../../component/StatusBar';
import Header from '../../../component/header';
import {FlatList} from 'react-native';
import Loader from '../../../component/loader';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import Storage from '../../../component/AsyncStorage';
import * as RootNavigation from '../../../navigator/rootNavigation';
import colors from '../../../component/colors';
import axios from 'axios';
import OptionsMenu from 'react-native-option-menu';
import BottomTab from '../../../component/StoreButtomTab';

const Notification = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const selector = useSelector(state => state.Notification);
  const isFetching = useSelector(state => state.isFetching);
  const [loader, setLoader] = useState(false);

  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState(selector);
  const [masterDataSource, setMasterDataSource] = useState(selector);

  const searchFilterFunction = text => {
    if (text) {
      const newData = masterDataSource.filter(function (item) {
        const itemData =
          `${item.created_date} ${item.title} ${item.notification}`
            ? `${item.created_date} ${item.title} ${item.notification}`.toUpperCase()
            : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  const handleSearch = () => {
    Keyboard.dismiss();
    setSearch('');
    setFilteredDataSource(masterDataSource);
  };

 useEffect(async()=>{
  const user_id = await AsyncStorage.getItem(Storage.user_id);
  try {
    const data = new FormData();
    data.append('user_id', user_id);
    data.append('view_status',1)
    const response = await axios({
      method: 'POST',
      data,
      headers: {
        'content-type': 'multipart/form-data',
        Accept: 'multipart/form-data',
      },
      url: 'https://indiadeposit.in/admin/public/apis/updatenotification',
    });

   
  } catch (error) {
    throw error;
  }
 },[])

  useEffect(async () => {
    const user_id = await AsyncStorage.getItem(Storage.user_id);
    try {
      const data = new FormData();
      data.append('user_id', user_id);
      const response = await axios({
        method: 'POST',
        data,
        headers: {
          'content-type': 'multipart/form-data',
          Accept: 'multipart/form-data',
        },
        url: 'https://indiadeposit.in/admin/public/apis/getnotification',
      });
     
      if (response.data.status == 200) {
       
        setFilteredDataSource(response.data.data);
        setMasterDataSource(response.data.data);
      }
    } catch (error) {
      throw error;
    }
   
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
      navigation.push('Main');
      return true;
    }
  };
  const deletePost = async item => {
    const user_id = await AsyncStorage.getItem(Storage.user_id);
    try {
      setLoader(true);
      const data = new FormData();
      data.append('notification_id', item);
      const response = await axios({
        method: 'POST',
        data,
        headers: {
          'content-type': 'multipart/form-data',
          Accept: 'multipart/form-data',
        },
        url: 'https://indiadeposit.in/admin/public/apis/deletenotification',
      });
      if (response.data.status == 200) {
        try {
          const data = new FormData();
          data.append('user_id', user_id);
          const response = await axios({
            method: 'POST',
            data,
            headers: {
              'content-type': 'multipart/form-data',
              Accept: 'multipart/form-data',
            },
            url: 'https://indiadeposit.in/admin/public/apis/getnotification',
          });
          if (response.data.status) {
            setLoader(false);
            setFilteredDataSource(response.data.data);
            setMasterDataSource(response.data.data);
          }
        } catch (error) {
          setLoader(false);
        }
      }
    } catch (error) {
      setLoader(false);
    }
  };

  const renderModal = item => {
    Alert.alert('CONFIRM', 'Are you sure you want to delete this notification?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'YES', onPress: () => deletePost(item.notification_id)},
    ]);
  };


const manageNotification=async(item)=>{
  const user_id=await AsyncStorage.getItem(Storage.user_id)
  if(item.my_fd_id){
    try {
      const data = new FormData();
      data.append('user_id', user_id);
      data.append('view_status',2)
      data.append('notification_id',item.notification_id)

      const response = await axios({
        method: 'POST',
        data,
        headers: {
          'content-type': 'multipart/form-data',
          Accept: 'multipart/form-data',
        },
        url: 'https://indiadeposit.in/admin/public/apis/updatenotification',
      });
      if(response.data){
        dispatch({
          type: 'MYFD_Detail_Request',
          url: 'myfddetail',
          my_fixed_deposit_id:item.my_fd_id,
          navigation:navigation
      })
      }     
    } catch (error) {
      throw error;
    }   
 }
}
  const showContent = () => {
    if (filteredDataSource) {
      return (
        <View>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={filteredDataSource}
            style={{marginBottom: 0}}
            renderItem={({item}) => (
              <TouchableOpacity onPress={()=>manageNotification(item)}>
              <View style={[styles.card,{backgroundColor:item.my_fd_id?item.view_status==1?'#c9c9f0':'#fff':'#fff'}]}>
                <View style={{}}>
                    <View style={styles.view2}>
                      <Text style={styles.text1}>{item.title}</Text>
                      <Text
                        style={{
                          fontFamily: 'Montserrat-Regular',
                          fontSize: 11,
                          color: colors.textColor,
                        }}>
                        {item.created_date}
                      </Text>
                      <OptionsMenu
                        button={require('../../../assets/Image/menu3.png')}
                        buttonStyle={{width: 16, height: 18}}
                        destructiveIndex={1}
                        options={['Delete', 'Cancel']}
                        // actions={[() => deletePost(item.notification_id)]}
                        actions={[() => renderModal(item)]}
                      />
                    </View>
                    <Text style={[styles.text3, {marginTop: 5}]}>
                      {item.notification}
                    </Text>
                  </View>
              </View>
              </TouchableOpacity>
             
            )}
          />
        </View>
      );
    } else {
    }
  };
  return (
    <View style={styles.container}>
      <Header
        source={require('../../../assets/Image/arrow2.png')}
        title={'NOTIFICATIONS'}
        onPress={() => navigation.push('Main')}
      />
            {isFetching?<Loader/>:null}

      <View style={{width: '100%', paddingHorizontal: 15, marginTop: 10}}>
        <View style={styles.container1}>
          <View style={styles.blog}>
            <Image
              style={{width: 25, height: 24}}
              source={require('../../../assets/Image/search1.png')}
            />
            <TextInput
              placeholder="Search here"
              value={search}
              placeholderTextColor={colors.heading1}
              onChangeText={val => searchFilterFunction(val)}
              style={{color: colors.textColor, width: '70%',marginLeft: 10}}
              returnKeyType="done"
            />
          </View>
          {search ? (
            <TouchableOpacity
              delayPressIn={0}
              onPress={() => handleSearch()}
              style={styles.button}>
              <Text style={styles.x}>x</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>

      {filteredDataSource[0] ? (
        <View style={{paddingHorizontal: 15, paddingVertical: 10,height:'74%'}}>
          <View style={{ shadowColor:colors.black,
        shadowOpacity:0.25,
        shadowRadius:8,
        shadowOffset:{height:2,width:0},
        elevation:5,
        borderRadius:10,
        backgroundColor:colors.white,
        // paddingHorizontal:5,
        // paddingVertical:5
        }}>
            {loader ? <Loader /> : null}
            {showContent()}
          </View>
        </View>
      ) : null}
      <StatusBar />
      <View style={{position:'absolute',bottom:0,left:0,right:0}}>
      <BottomTab/>
      </View>
    </View>
  );
};
export default Notification;
