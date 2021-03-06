import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  BackHandler,
  PermissionsAndroid,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import styles from './styles';
import StatusBar from '../../../component/StatusBar';
import {TextInput} from 'react-native';
import colors from '../../../component/colors';
import Header from '../../../component/header';
import Button from '../../../component/button1';
import BottomTab from '../../../component/StoreButtomTab';
import Toast from 'react-native-simple-toast';
import {useDispatch, useSelector} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Loader from '../../../component/loader';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import Storage from '../../../component/AsyncStorage';

const SBAccount = ({route}) => {
  const navigation = useNavigation();
  const [balance, setBalance] = useState(route.params.type1.length==1&&route.params.type1[0]=='Zero Balance'?'0':'');
  const [location, setLocation] = useState('');
  const [address, setAddress] = useState('');
  const [lat, setLang] = useState('');
  const [long, setLong] = useState('');
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const isFetching = useSelector(state => state.isFetching);
  const re = /^[0-9\b]+$/;

  const manageSearch = async () => {
    const user_id = await AsyncStorage.getItem(Storage.user_id);

    if (balance == '') {
      Toast.show('Please enter minimum balance');
    } else if (location == '' && address == '') {
      Toast.show('Please confirm location');
    } 
    else if(location.length<6){
     Toast.show('Please enter correct pincode')
    }
    else if (location != '' && address != '') {
      Toast.show('Please confirm pincode or current location');
    } else {
      dispatch({
        type: 'SB_Search_Request',
        url: 'sblist1',
        user_id,
        min_bal: balance,
        location: location == '' ? address : location,
        type1: route.params.type1,
        bank_id: '',
        interest_rate: '',
        nationalized: '',
        offer: '',
        insurance: '',
        account_type: '',
        account_sub_type: '',
        non_maintenance_penalty: '',
        debit_card_amc: '',
        private: '',
        bank_type:'',
        credit_rating:'',
        atm_points:'',
        order_on: 'interest_rate',
        order_to: 'DESC',
        b_lat: lat,
        b_long: long,
        navigation: navigation,
      });
    }
  };

  useEffect(() => {
    const backAction = () => {
      navigation.navigate('Main');
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);
  
  return (
    <View style={styles.container}>
      <Header
        title={'SB A/C SEARCH'}
        source={require('../../../assets/Image/arrow2.png')}
        onPress={() => navigation.goBack()}
      />
      <ScrollView style={styles.scroll}>
        {isFetching ? <Loader /> : null}
        {loader ? <Loader /> : null}
        <KeyboardAwareScrollView
          extraScrollHeight={10}
          enableOnAndroid={true}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{flex: 1}}>
          <View style={styles.main}>
            <View style={styles.view}>
              <Text style={styles.text1}>
              Choose a savings instrument that meets your exact life goals. Customize everything right from minimum balance requirement to the interest rate you want to earn. 
              </Text>
              <View style={styles.view}>
                <Text style={[styles.text2, {fontWeight: '700'}]}>
                  Minimum Balance
                </Text>
                <View
                  style={{flexDirection: 'row', width: '100%', marginTop: 7}}>
                  <Image
                    style={{width: 12, height: 18}}
                    source={require('../../../assets/Image/rupay.png')}
                  />
                  <TextInput
                    style={styles.textinput}
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
                  style={{borderBottomWidth: 1, width: '100%', marginTop: -5}}
                />
              </View>
            </View>
            <View style={{marginTop:24}}>
              <View style={styles.view1}>
                <Text style={[styles.text2, {fontWeight: '700'}]}>
                  Pincode
                </Text>
              </View>
            </View>
           
            <View style={{marginTop: 0}}>
              <TextInput
                style={styles.textinput1}
                placeholder="Enter pincode"
                placeholderTextColor={colors.heading1}
                keyboardType="number-pad"
                value={location}
                onChangeText={val => {
                  if (re.test(val) || val == '') {
                    setLocation(val);
                  }
                }}
                maxLength={6}
                returnKeyType="search"
                onSubmitEditing={()=>manageSearch()}
              />
            </View>
            <View style={styles.view2}>
              <Button onPress={() => manageSearch()} title="SEARCH" />
            </View>
          </View>
        </KeyboardAwareScrollView>
      </ScrollView>
      <BottomTab/>
      <StatusBar />
    </View>
  );
};
export default SBAccount;
