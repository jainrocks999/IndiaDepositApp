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

const RegisterPage = ({route}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isFetching = useSelector(state => state.isFetching);
  const data = route.params.data;
  const [loader, setLoader] = useState(false);
  const my_fixed_deposit_id = route.params.my_fixed_deposit_id;

console.log('this is narendra herer',route.params);
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
        url: 'https://demo.webshowcase-india.com/indiadeposit/public/apis/fdrequestforredeem',
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
        <Image
          resizeMode="contain"
          style={{height: 20, width: 70}}
          source={{
            uri: `https://demo.webshowcase-india.com/indiadeposit/writable/uploads/bank/${route.params.data.bank_logo}`,
          }}
        />
        <View style={{width: '20%', alignItems: 'flex-end'}}></View>
      </View>
      {isFetching ? <Loader /> : null}
      <ScrollView style={styles.scroll}>
        <KeyboardAwareScrollView
          extraScrollHeight={10}
          enableOnAndroid={true}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{flex: 1}}>
          <View style={styles.main}>
          
                    <View>
              
                <View style={{ marginTop: 10}}>
                <View style={{width: '100%'}}>
                    <Text style={styles.font}>Name</Text>
                    <Text
                      style={
                        styles.font16
                      }>{`${route.params.name}`}</Text>
                  </View>
                  <View style={{width: '100%',marginTop:10}}>
                    <Text style={styles.font}>Account Number</Text>
                    <Text style={styles.font16}>
                      {data.account_number}
                    </Text>
                  </View>
                  <View style={{width: '100%', marginTop:10}}>
                    <Text style={styles.font}>IFSC Code</Text>
                    <Text
                      style={
                        styles.font16
                      }>{`${data.ifsc_code}`}</Text>
                  </View>
                  <View style={{width: '100%', marginTop:10}}>
                    <Text style={styles.font}>Account Type</Text>
                    <Text
                      style={
                        styles.font16
                      }>{`${data.account_type}`}</Text>
                  </View>
                </View>
                <View style={{marginTop: 10}}>
                  <View style={{width: '100%'}}>
                    <Text style={styles.font}>Financial Institution</Text>
                    <Text
                      style={
                        styles.font16
                      }>{`${data.bankname}`}</Text>
                  </View>
                 
                </View>
               
              </View>
           
            <View style={styles.buttons}>
              <CustomButton title="SUMBIT" onPress={() => validateUser()} />
            </View>
           
          </View>
          <View style={{alignItems:'center',paddingHorizontal:20,marginTop:20}}>
          <TouchableOpacity onPress={()=>navigation.navigate('Redeem',{
           my_fixed_deposit_id:my_fixed_deposit_id,
           name:route.params.name
          })} style={{paddingHorizontal:10,borderRadius:10,paddingVertical:4,backgroundColor:colors.bc}}>
            <Text  style={{color:colors.white,fontFamily:'Montserrat-SemiBold'}}>Use another account</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </ScrollView>
      <StatusBar />
    </View>
  );
};
export default RegisterPage;
