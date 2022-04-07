import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Pressable,
  BackHandler,
  ImageBackground,
  Alert,
} from 'react-native';
import Header from '../../../component/header';
import colors from '../../../component/colors';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import Storage from '../../../component/AsyncStorage';
import StatusBar from '../../../component/StatusBar';
import BottomTab from '../../../component/StoreButtomTab';
import {FlatList} from 'react-native-gesture-handler';
import Toast from 'react-native-simple-toast';
import {useDispatch, useSelector} from 'react-redux';
import * as RootNavigation from '../../../navigator/rootNavigation';
import Modal from 'react-native-modal';
import axios from 'axios';
import Loader from '../../../component/loader';
let backPress = 0;
let arrayOfOneFD = [];
const dashboard = () => {
  const navigation = useNavigation();
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedItems1, setSelectedItems1] = useState([]);
  const [selectedItems2, setSelectedItems2] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const isFetching = useSelector(state => state.isFetching);
  const [notification,setNotification]=useState('')
  const [title,setTitle]=useState('')
  const [title1,setTitle1]=useState('')
  const dispatch = useDispatch();
console.log('this is notification',notification);

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
      console.log('this is narendra', response.data);
      if (response.data.status == 200) {
        console.log('this is narendra', response.data);
        setNotification(response.data.view_status);
        // setMasterDataSource(response.data.data);
      }
    } catch (error) {
      throw error;
    }
  }, []);


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
        url: 'https://indiadeposit.in/admin/public/apis/getprofilepic',
      });
      if (response.data.status == 200) {
        AsyncStorage.setItem(Storage.image, response.data.profile_pic);
      }
    } catch (error) {
      throw error;
    }
    dispatch({
      type: 'Bank_Name_Request',
      url: 'bankdetaillist',
      user_id,
    });
    dispatch({
      type: 'Family_List_Request',
      url: 'getfamilylist',
      user_id,
    });
    dispatch({
      type: 'Country_List_Request',
      url: 'countrylist',
      user_id,
    });
    dispatch({
      type: 'City_List_Request',
      url: 'citylist',
      user_id
    })
    dispatch({
      type: 'Get_Faq_Request',
      url: 'getfaq',
      user_id,
    });
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackButtonClick,
    );
    return () => backHandler.remove();
  }, []);

  const handleBackButtonClick = () => {
    if (navigation.isFocused()) {
      if (backPress > 0) {
        BackHandler.exitApp();
        backPress = 0;
      } else {
        backPress++;
        Toast.show('Press again to exit app');
        setTimeout(() => {
          backPress = 0;
        }, 2000);
        BackHandler.removeEventListener('hardwareBackPress');
      }
      return true;
    }
  };
  const handleOnPress = contact => {
    if (selectedItems.length) {
      return selectItems(contact);
    }
    arrayOfOneFD = contact.name;
    RootNavigation.navigate('FDSearch', {
      type1: [contact.name],
    });
  };
  const manageSearch = () => {
    RootNavigation.navigate('FDSearch', {
      type1: selectedItems,
    });
    setSelectedItems([]);
  };

  const handleOnPress1 = contact => {
    if (selectedItems1.length) {
      return selectItems1(contact);
    }
    RootNavigation.navigate('SBSearch', {
      type1: [contact.name],
    });
  };

  const manageSearch1 = () => {
    RootNavigation.navigate('SBSearch', {
      type1: selectedItems1,
    });
    setSelectedItems1([]);
  };

  const handleOnPress2 = contact => {
    if (selectedItems2.length) {
      return selectItems2(contact);
    }
    RootNavigation.navigate('NBFCSearch', {
      type1: [contact.name],
    });
  };

  const manageSearch2 = () => {
    RootNavigation.navigate('NBFCSearch', {
      type1: selectedItems2,
    });
    setSelectedItems2([]);
  };
  const manageInformation=(item)=>{
    setModalVisible(true)
    setTitle(item.data)
    setTitle1(item.data1)
  }
  const ListItem = ({item, selected, onPress, onLongPress}) => (
    <View
      style={{
        width: '33.3%',
        alignItems: 'center',
        justifyContent: 'center',
        height: 100,
      }}>
      <View style={[styles.touch1]}>
        <TouchableOpacity delayPressIn={0}
          onPress={() => manageInformation(item)}
          style={{width: '90%', alignItems: 'flex-end'}}>
          <Image
            style={{width: 14, height: 14}}
            source={require('../../../assets/Image/information.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity delayPressIn={0}
          style={{alignItems: 'center'}}
          onPress={onPress}
          onLongPress={onLongPress}>
          <Image
            style={{height: item.height, width: item.width}}
            source={item.image}
          />
          <Text style={[styles.text, {color: colors.textColor}]}>
            {item.name}
          </Text>
        </TouchableOpacity>
        {selected && (
          <View style={styles.enable}>
            <Pressable
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.touch1}>
              <View>
                <Image
                  style={{height: item.height, width: item.width}}
                  source={item.image1}
                />
              </View>
              <View style={styles.view2}>
                <Text style={[styles.text, {color: colors.white}]}>
                  {item.name}
                </Text>
              </View>
            </Pressable>
          </View>
        )}
      </View>
    </View>
  );

  const getSelected = contact => selectedItems.includes(contact.name);

  const deSelectItems = () => setSelectedItems([]);
  const selectItems = item => {
    setSelectedItems1([]);
    setSelectedItems2([])
    if (selectedItems.includes(item.name)) {
      const newListItems = selectedItems.filter(
        listItem => listItem !== item.name,
      );
      return setSelectedItems([...newListItems]);
    }
    setSelectedItems([...selectedItems, item.name]);
  };

  const getSelected1 = contact1 => selectedItems1.includes(contact1.name);

  const deSelectItems1 = () => setSelectedItems1([]);
  const selectItems1 = item => {
    setSelectedItems([]);
    setSelectedItems2([])
    if (selectedItems1.includes(item.name)) {
      const newListItems = selectedItems1.filter(
        listItem => listItem !== item.name,
      );
      return setSelectedItems1([...newListItems]);
    }
    setSelectedItems1([...selectedItems1, item.name]);
  };

  const getSelected2 = contact2 => selectedItems2.includes(contact2.name);

  const deSelectItems2 = () => setSelectedItems2([]);

  const selectItems2 = item => {
    setSelectedItems([]);
    setSelectedItems1([]);
    if (selectedItems2.includes(item.name)) {
      const newListItems = selectedItems2.filter(
        listItem => listItem !== item.name,
      );
      return setSelectedItems2([...newListItems]);
    }
    setSelectedItems2([...selectedItems2, item.name]);
  };

const manageNotification=async()=>{
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
    if(response.data.status==200){
      navigation.push('Notification')
    }   
  } catch (error) {
    throw error;
  }
}
  return (
    <View style={{flex: 1, backgroundColor: colors.card}}>
      <View>
      <View style={{width: '100%',
                  backgroundColor: colors.bc,
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingHorizontal: 16,
                  flexDirection: 'row',
                  paddingVertical: 10,}}>
        <TouchableOpacity delayPressIn={0} onPress={() => navigation.toggleDrawer()}>
          <Image
            style={{height: 32, width: 32, tintColor: colors.white}}
            source={require('../../../assets/Images/drawer.png')}
          />
        </TouchableOpacity>
        <Text style={{
          color: colors.white,
          fontSize: 17,
          fontFamily: 'Montserrat-Bold',
          marginLeft: 10,}}>{'IndiaDeposit'} </Text>
          <TouchableOpacity
          style={{alignItems:'center',justifyContent:'center'}}
          delayPressIn={0} onPress={() => manageNotification()}>
        <View style={{alignItems:'center',justifyContent:'center',flex:1}}>
          <Image style={{width: 25, height: 30,marginTop:notification==1?-14:0}} source={require('../../../assets/Image/notification.png')} />
          {notification==1? <View style={{width:8,height:8,backgroundColor:'#FA5E8E',marginLeft:12,borderRadius:4,marginTop:-26}}></View>:null}  
         </View>
         </TouchableOpacity>
      </View>
    </View>
      {/* <Header
        title={'IndiaDeposit'}
        source={require('../../../assets/Images/drawer.png')}
        onPress={() => navigation.toggleDrawer()}
        source1={require('../../../assets/Image/notification.png')}
        onPress1={() => navigation.navigate('Notification')}
      /> */}
      {isFetching ? <Loader /> : null}

      {/* <View style={styles.main}>
        <Image
          resizeMethod="resize"
          source={require('../../../assets/Image/fixed-deposit.png')}
        />
      </View> */}

      <ScrollView>
        {/* NBFC FLOW */}

        <View style={[styles.view,{marginTop:10}]}>
          <View style={styles.item}>
            <View style={styles.view1}>
              <Text style={styles.text2}>{'NBFC Fixed Deposit'}</Text>
              {selectedItems2.length > 0 ? (
                <TouchableOpacity delayPressIn={0}
                  onPress={() => manageSearch2()}
                  style={styles.button}>
                  <Text style={styles.search}>SEARCH</Text>
                </TouchableOpacity>
              ) : null}
            </View>
            <Pressable onPress={deSelectItems2} style={[styles.container]}>
              <FlatList
                style={{width: '100%'}}
                data={data2}
                numColumns={3}
                keyExtractor={(item, index) => item.id}
                renderItem={({item}) => (
                  <ListItem
                    onPress={() => handleOnPress2(item)}
                    onLongPress={() => selectItems2(item)}
                    selected={getSelected2(item)}
                    item={item}
                  />
                )}
              />
            </Pressable>
            {selectedItems2.length == 0 ? (
              <View style={styles.buttomview}>
                <Text style={styles.Text1}>
                  {'*Tap & Hold to make multiple selection'}
                </Text>
              </View>
            ) : null}
          </View>
        </View>

        {/* Fixed deposit */}
        <View style={[styles.view, {marginTop: -10}]}>
          <View style={styles.item}>
            <View style={styles.view1}>
              <Text style={styles.text2}>{'Bank Fixed Deposit'}</Text>
              {selectedItems.length > 0 ? (
                <TouchableOpacity delayPressIn={0}
                  onPress={() => manageSearch()}
                  style={styles.button}>
                  <Text style={styles.search}>SEARCH</Text>
                </TouchableOpacity>
              ) : null}
            </View>
            <Pressable onPress={deSelectItems} style={[styles.container]}>
              <FlatList
                style={{width: '100%'}}
                data={data}
                numColumns={3}
                keyExtractor={(item, index) => item.id}
                renderItem={({item}) => (
                  <ListItem
                    onPress={() => handleOnPress(item)}
                    onLongPress={() => selectItems(item)}
                    selected={getSelected(item)}
                    item={item}
                  />
                )}
              />
            </Pressable>
            {selectedItems.length == 0 ? (
              <View style={styles.buttomview}>
                <Text style={styles.Text1}>
                  {'*Tap & Hold to make multiple selection'}
                </Text>
              </View>
            ) : null}
          </View>
        </View>

        <View style={styles.buttomview1}>
          <View style={styles.item}>
            <View style={styles.view1}>
              <Text style={styles.text2}>{'Savings Bank Account'}</Text>
              {selectedItems1.length > 0 ? (
                <TouchableOpacity delayPressIn={0}
                  onPress={() => manageSearch1()}
                  style={styles.button}>
                  <Text style={styles.search}>SEARCH</Text>
                </TouchableOpacity>
              ) : null}
            </View>
            <Pressable onPress={deSelectItems1} style={[styles.container]}>
              <FlatList
                style={{width: '100%'}}
                data={data1}
                numColumns={3}
                keyExtractor={(item, index) => item.id}
                renderItem={({item}) => (
                  <ListItem
                    onPress={() => handleOnPress1(item)}
                    onLongPress={() => selectItems1(item)}
                    selected={getSelected1(item)}
                    item={item}
                  />
                )}
              />
            </Pressable>
            {selectedItems1.length == 0 ? (
              <View style={styles.buttomview}>
                <Text style={styles.Text1}>
                  {'*Tap & Hold to make multiple selection'}
                </Text>
              </View>
            ) : null}
          </View>
        </View>
      </ScrollView>
      <View style={{paddingHorizontal: 15}}>
        <Modal isVisible={isModalVisible}>
          <View style={styles.modal}>
            <TouchableOpacity delayPressIn={0} style={styles.ModelmsgView}>
              <Text style={[styles.modaltext,{alignSelf:'flex-start'}]}>
                {title}
              </Text>
              <Text style={styles.modaltext}>
                {title1}
              </Text>
            </TouchableOpacity>
            <View style={styles.modal2}>
              <TouchableOpacity delayPressIn={0}
                style={{
                  backgroundColor:colors.bc,
                  marginTop:20,
                  paddingHorizontal:15,
                  paddingVertical:5,
                  borderRadius:10
                }}
                onPress={() => setModalVisible(false)}>
                <Text style={styles.ModelBtntext}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
      <StatusBar />
      <BottomTab/>
    </View>
  );
};
export default dashboard;
const data = [
  {
    name: 'Regular',
    image: require('../../../assets/Image/regular-fd-b.png'),
    image1: require('../../../assets/Image/regular-fd-w.png'),
    id: 1,
    height: 35,
    width: 35,
    data:`Regular fixed deposit for Indian citizens. Apply if you are`,
    data1:`
• Between the age of 18 to 65 years 
• Are an Indian citizen
• Hold a regular savings account with any financial institution`,
  },

  {
    name: 'Senior Citizen',
    image: require('../../../assets/Image/old-age-copy.png'),
    image1: require('../../../assets/Image/old-age-copy-w.png'),
    id: 4,
    height: 35,
    width: 35,
    data:`Earn higher interests...`,
    data1:`
• Above the age of 60 years
• Are an Indian citizen 
• Want to protect your life savings from inflation`,  },
  {
    name: 'Tax Saving',
    image: require('../../../assets/Image/tax-fd-b.png'),
    image1: require('../../../assets/Image/tax-fd-w.png'),
    id: 2,
    height: 35,
    width: 35,
    data:`The favourite tax saving instrument for thousands, apply if you want to `,
    data1:`
• Protect your savings from income tax
• Earnings deductible under section 80C of Income Tax Act 
• Arrives with a fixed lock-in period`,  },

  {
    name: 'NRI',
    image: require('../../../assets/Image/globe.png'),
    image1: require('../../../assets/Image/globe-white.png'),
    id: 3,
    height: 37,
    width: 45,
    data:`A one-stop favourite among non-residential Indians, apply if you are`,
    data1:`
• Currently residing outside India, but you are an Indian citizen 
• Between the age bracket of 18 to 60 years 
• Hold a savings account with any Indian financial institution`,  },
];

const data1 = [
  {
    name: 'Regular',
    image: require('../../../assets/Image/saving-ac-b.png'),
    image1: require('../../../assets/Image/saving-ac-w.png'),
    id: 5,
    height: 35,
    width: 35,
    data:`Your best friend for saving your hard-earned money, apply if you are`,
    data1:`
• Between the age of 18 to 60 years
• Are an Indian citizen
• Have full KYC documentation`,
  },
  {
    name: 'Senior Citizen',
    image: require('../../../assets/Image/old-age.png'),
    image1: require('../../../assets/Image/old-age-white.png'),
    id: 9,
    height: 35,
    width: 35,
    data:`Orchestrated for the young at heart, apply if you are `,
    data1:`
• Above the age of 60 years
• Are an Indian citizen with full KYC documentation 
• Want to enjoy higher returns than a standard savings account `,
  },

  {
    name: 'Female',
    image: require('../../../assets/Image/sb-female-b.png'),
    image1: require('../../../assets/Image/sb-female-w.png'),
    id: 6,
    height: 35,
    width: 35,
    data:`Specially designed for women professionals, apply if you are`,
    data1:`
• Between the age of 18 to 60 years 
• Are an Indian citizen with full KYC documentation 
• Want to enjoy higher returns as compared to a regular savings account`,
  },
  {
    name: 'Zero Balance',
    image: require('../../../assets/Image/sb-zb-b.png'),
    image1: require('../../../assets/Image/sb-zb-w.png'),
    id: 8,
    height: 35,
    width: 35,
    data:`A savings account with no MAB charges, apply if you are`,
    data1:`
• Between the age of 18 to 60 years 
• Are an Indian citizen with full KYC documentation 
• Want to enjoy steady returns with no additional cost `,
  },

  // {name:'Defence',
  // image:require('../../../assets/Image/guard-copy.png'),
  // image1:require('../../../assets/Image/gaurd.png'),
  // id:7,height:35,width:35},
];
const data2 = [
  {
    name: "Regular",
    image: require('../../../assets/Image/regular-fd-b.png'),
    image1: require('../../../assets/Image/regular-fd-w.png'),
    id: 1,
    height: 35,
    width: 35,
    data:`Regular fixed deposit for Indian citizens. Apply if you are`,
    data1:`
• Between the age of 18 to 65 years 
• Are an Indian citizen
• Hold a regular savings account with any financial institution`,
  },

  {
    name: 'Senior Citizen',
    image: require('../../../assets/Image/old-age-copy.png'),
    image1: require('../../../assets/Image/old-age-copy-w.png'),
    id: 4,
    height: 35,
    width: 35,
    data:`Earn higher interests...`,
    data1:`
• Above the age of 60 years
• Are an Indian citizen 
• Want to protect your life savings from inflation`,
  },
  ];
