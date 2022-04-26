import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import styles from './styles';
import StatusBar from '../../../../component/StatusBar';
import colors from '../../../../component/colors';
import Header from '../../../../component/compareHeader';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import CustomButton from '../../../../component/button1';
import AsyncStorage from '@react-native-community/async-storage';
import Storage from '../../../../component/AsyncStorage';
import {useSelector, useDispatch} from 'react-redux';
import Loader from '../../../../component/loader';
import axios from 'axios';
import Toast from 'react-native-simple-toast';
import Constants from '../../../../component/Constants';
import BottomTab from '../../../../component/StoreButtomTab';

const RegisterPage = ({route}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isFetching = useSelector(state => state.isFetching);
  const data = route.params.data;
  const [loader, setLoader] = useState(false);
  const my_fixed_deposit_id = route.params.my_fixed_deposit_id;

  const validateUser = async () => {
    const user_id = await AsyncStorage.getItem(Storage.user_id);
    try {
      setLoader(true);
      const data = new FormData();
      data.append('user_id', user_id);
      data.append('account_name', route.params.name);
      data.append('my_fixed_deposit_id', route.params.my_fixed_deposit_id);
      data.append('account_number', route.params.data.account_number);
      data.append('bank_name', route.params.data.bankname);
      data.append('ifsc_code', route.params.data.ifsc_code);
      data.append('additional_info', '');

      const response = await axios({
        method: 'POST',
        data,
        headers: {
          'content-type': 'multipart/form-data',
          Accept: 'multipart/form-data',
        },
        url: 'https://indiadeposit.in/admin/public/apis/fdrequestforredeem',
      });
   
      if (response.data.status == 200) {
        setLoader(false);
        Toast.show(response.data.messages);
        navigation.replace('SubmitRedeemRequest');
      } else {
        setLoader(false);
      }
    } catch (error) {
      setLoader(false);
    }
  };
  return (
    <View style={styles.container}>
      <Header
        source={require('../../../../assets/Image/arrow2.png')}
        title="BANK DETAILS"
        onPress={() => navigation.goBack()}
      />
      {loader ? <Loader /> : null}
      <View style={styles.cardView}>
     
        <View style={{paddingHorizontal:15}}>
        <View style={{alignItems:'flex-start'}}>
        <Text style={{fontFamily:'Montserrat-SemiBold',color:colors.textColor}}>{`• FDs getting organically matured will be credited to the account as per instruction provided during booking of FD.`}</Text>
        </View>
        <View style={{alignItems:'flex-start',marginTop:8}}>
        <Text style={{fontFamily:'Montserrat-SemiBold',color:colors.textColor}}>{`• FD can be pre-matured after serving locking period and agreed penalty.`}</Text>
        </View>
        <View style={{alignItems:'flex-start',marginTop:8}}>
        <Text style={{fontFamily:'Montserrat-SemiBold',color:colors.textColor}}>{`• You can redeem FD by visiting nearest branch carrying following documents of all holders :`}</Text>
        </View>
        <View style={{alignItems:'flex-start',marginTop:8}}>
        <Text style={{fontFamily:'Montserrat-SemiBold',color:colors.textColor}}>{`(i) FD original Bond `}</Text>
        </View>
        <View style={{alignItems:'flex-start',marginTop:8}}>
        <Text style={{fontFamily:'Montserrat-SemiBold',color:colors.textColor}}>{`(ii) Identity proof `}</Text>
        </View>
        <View style={{alignItems:'flex-start',marginTop:8}}>
        <Text style={{fontFamily:'Montserrat-SemiBold',color:colors.textColor}}>{`(iii) Address proof`}</Text>
        </View>
        </View>

        <View style={{width: '20%', alignItems: 'flex-end'}}></View>
      </View>
      {isFetching ? <Loader /> : null}
      <ScrollView style={styles.scroll}>
      
        <View style={{marginTop:15}}>
        <CustomButton title="CONTINUE"
        onPress={()=> validateUser()
          // navigation.replace('SubmitRedeemRequest')
        }
        
        />
        </View>
      </ScrollView>
      <StatusBar />
      
    </View>
  );
};
export default RegisterPage;
