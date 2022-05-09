import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image,TouchableOpacity} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import colors from '../../../../component/colors';
import Header from '../../../../component/header';
import {useNavigation} from '@react-navigation/native';
import styles from './styles';
import CustomButton from '../../../../component/button1';
import CheckBox from '@react-native-community/checkbox';
import axios from 'axios';
import Loader from '../../../../component/loader';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-community/async-storage';
import Storage from '../../../../component/AsyncStorage';
import Constants from '../../../../component/Constants';
import BottomTab from '../../../../component/StoreButtomTab';
import Dialog, {DialogContent} from 'react-native-popup-dialog';
import {useDispatch, useSelector} from 'react-redux';
import HTMLView from 'react-native-htmlview';

const MyFDDetail = ({route}) => {
  const navigation = useNavigation();
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [data, setData] = useState('');
  const [data4,setData4]=useState('')
  const [loader, setLoader] = useState(false);
  const selector1 = useSelector(state => state.TermCondition);
  const [visible, setVisible] = useState(true);
  const [visible1, setVisible1] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showModal1, setShowModal1] = useState(false);
  const [isVisible1, setIsVisible1] = useState(false);
  const [isVisible2, setIsVisible2] = useState(false);


  console.log('this is route .apra',route.params);
  useEffect(async () => {
    try {
      setLoader(true);
      const data = new FormData();
      data.append('my_fixed_deposit_id', route.params.my_fixed_deposit_id);
      const response = await axios({
        method: 'POST',
        data,
        headers: {
          'content-type': 'multipart/form-data',
          Accept: 'multipart/form-data',
        },
        url: 'https://indiadeposit.in/admin/public/apis/myjointuserdetail',
      });
      if (response.data.status == 200) {
        setLoader(false);
        setData(response.data);
        setData4(response.data)
      }
    } catch (error) {
      setLoader(false);
    }
  }, []);

  const handleClick = () => {
    setIsVisible1(true);
    setTimeout(() => {
      setIsVisible1(false);
      setShowModal(true);
    }, 2000);
  };
  const handleClick1 = () => {
    setIsVisible2(true);
    setTimeout(() => {
      setIsVisible2(false);
      setShowModal1(true);
    }, 2000);
  };

  const manageUser =async() => {
    const user_id=await AsyncStorage.getItem(Storage.user_id)
    if (toggleCheckBox == true) {
      try {
        setLoader(true);
        const data = new FormData();
        data.append('my_fixed_deposit_id',route.params.my_fixed_deposit_id);
        data.append('account_number',route.params.redemDetails.account_number);
        data.append('account_type',route.params.redemDetails.account_type);
        data.append('bank_name',route.params.redemDetails.bankname);
        data.append('ifsc_code',route.params.redemDetails.ifsc_code);
        data.append('redeem_bank_logo',route.params.redemDetails.bank_logo);
        data.append('user_id',user_id);
        data.append('paymentbankid',route.params.data.bank_id);
        data.append('additional_info','');
        data.append('account_name','');
        data.append('onlinepaymenturl',route.params.data.onlinepaymenturl);
        data.append('user_bank_id',route.params.data.user_bank_id);
        
        const response = await axios({
          method: 'POST',
          data,
          headers: {
            'content-type': 'multipart/form-data',
            Accept: 'multipart/form-data',
          },
          url: 'https://indiadeposit.in/admin/public/apis/onlinepaymenturl',
        });
        if (response.data.status == 200) {
          setLoader(false);
          navigation.navigate('PaymentMode', {
            my_fixed_deposit_id: route.params.my_fixed_deposit_id,
            amount: data4.primaryuser[0].amount,
            onlinepaymenturl:response.data.onlinepaymenturl,
            accountnumber:response.data.accountnumber,
            bankifsc:response.data.bankifsc,
            bank_name:route.params.data.bankname,
            beneficiaryname:response.data.beneficiaryname
          });
        }
        else {
          setLoader(false)
        }
      } catch (error) {
       
        setLoader(false);
      }
    } else {
      Toast.show('Please verify above user');
    }
  };
  if (data) {
    return (
      <View style={styles.container}>
        <Header
          title={'FD INVESTMENT DETAIL'}
          source={require('../../../../assets/Image/arrow2.png')}
          onPress={() => navigation.goBack()}
        />
        {loader ? <Loader /> : null}
        <View
          style={[
            styles.list,
            {alignItems: 'center', justifyContent: 'center'},
          ]}>
          <Image
            resizeMode="contain"
            style={{height: 30, width: 80}}
            source={{
              uri: `${Constants.imageUrl}${data.primaryuser[0].bank_logo}`,
            }}
          />
          <Text
            style={{
              fontFamily: 'Montserrat-Bold',
              fontSize: 18,
              color: colors.bc,
              fontWeight: '700',
              textAlign: 'center',
              width:'90%'
            }}>
            {data.primaryuser[0].bank_name}
          </Text>
        </View>
        <ScrollView>
          <View style={[styles.list]}>
            <View style={{paddingHorizontal: 20}}>
              <Text style={styles.font}>DEPOSITOR DETAILS</Text>
              <View style={{marginTop: 10}}>
                <Text style={styles.font}>FD Holder Name</Text>
                <Text style={styles.font16}>
                  {data.primaryuser[0].username}
                </Text>
              </View>
              {data.secondaryuser.length > 0 ? (
                <View style={{marginTop: 10}}>
                  <Text style={styles.font}>Joint Applicant Name</Text>
                  <Text style={styles.font16}>
                    {data.secondaryuser[0].name}
                  </Text>
                  {data.secondaryuser.length > 1 ? (
                    <Text style={styles.font16}>
                      {data.secondaryuser[1].name}
                    </Text>
                  ) : (
                    <View />
                  )}
                </View>
              ) : (
                <View />
              )}
             {/* Bank details */}
             <View style={{borderWidth:.5,borderColor:colors.bc,marginTop:15}}/>
             <View style={{marginTop: 15}}>
                <Text style={styles.font}>BANK DETAIL FOR REDEMPTION</Text>
                <View style={{flexDirection: 'row', marginTop: 10}}>
                <View style={{width: '45%'}}>
                    <Text style={styles.font}>Bank Name</Text>
                    <Text
                      style={
                        styles.font16
                      }>{`${route.params.redemDetails.bankname}`}</Text>
                  </View>
                 
                  <View style={{width: '45%', marginLeft: 35}}>
                    <Text style={styles.font}>IFSC Code</Text>
                    <Text
                      style={
                        styles.font16
                      }>{`${route.params.redemDetails.ifsc_code}`}</Text>
                  </View>
                </View>
                <View style={{flexDirection: 'row', marginTop: 10}}>
                <View style={{width: '45%'}}>
                    <Text style={styles.font}>Account Number</Text>
                    <Text style={styles.font16}>
                      {route.params.redemDetails.account_number}
                    </Text>
                  </View>
                  <View style={{width: '45%',marginLeft: 35}}>
                    <Text style={styles.font}>Account Type</Text>
                    <Text
                      style={
                        styles.font16
                      }>{`${route.params.redemDetails.account_type}`}</Text>
                  </View>
                 
                </View>
              </View>
  {/* Investments details */}
            <View style={{borderWidth:.5,borderColor:colors.bc,marginTop:15}}/>
              <View style={{marginTop: 15}}>
                <Text style={styles.font}>INVESTMENT DETAILS</Text>
                <View style={{flexDirection: 'row', marginTop: 10}}>
                  <View style={{width: '45%'}}>
                    <Text style={styles.font}>Investment Amount</Text>
                    <Text style={styles.font16}>
                      {data.primaryuser[0].amount}
                    </Text>
                  </View>
                  <View style={{width: '45%', marginLeft: 35}}>
                    <Text style={styles.font}>Tenure</Text>
                    <Text
                      style={
                        styles.font16
                      }>{`${data.primaryuser[0].tenure} Years`}</Text>
                  </View>
                </View>
                <View style={{flexDirection: 'row', marginTop: 10}}>
                  <View style={{width: '45%'}}>
                    <Text style={styles.font}>Interest Rate</Text>
                    <Text
                      style={
                        styles.font16
                      }>{`${data.primaryuser[0].interest_rate}% p.a`}</Text>
                  </View>
                  <View style={{width: '45%', marginLeft: 35}}>
                    <Text style={styles.font}>Maturity Amount</Text>
                    <Text
                      style={{
                        fontFamily: 'Montserrat-Bold',
                        fontSize: 16,
                        color: colors.textColor,
                      }}>
                      {
                        data.primaryuser[0].maturity_amount
                      }
                    </Text>
                  </View>
                </View>
                <View style={{flexDirection: 'row', marginTop: 10}}>
                  <View style={{width: '45%'}}>
                    <Text style={styles.font}>Lockin Period</Text>
                    <Text
                      style={
                        styles.font16
                      }>{`${data.primaryuser[0].lockin_period==null?'NA':data.primaryuser[0].lockin_period} days`}</Text>
                  </View>
                  <View style={{width: '45%', marginLeft: 35}}>
                    <Text style={styles.font}>Payout Frequency</Text>
                    <Text
                      style={{
                        fontFamily: 'Montserrat-Bold',
                        fontSize: 16,
                        color: colors.textColor,
                      }}>
                      {
                       data.primaryuser[0].interest_calculation_frequency
                      }
                    </Text>
                  </View>
                </View>
              </View>
              {/* Payments details */}
              <View style={{borderWidth:.5,borderColor:colors.bc,marginTop:15}}/>
             <View style={{marginTop: 15}}>
                {/* <Text style={[styles.font]}>PAYMENTS BY</Text> */}
                <Text style={[styles.font]}>BANK DETAIL FOR PAYMENT</Text>
                <View style={{flexDirection: 'row', marginTop: 10}}>
                <View style={{width: '45%'}}>
                    <Text style={styles.font}>Bank Name</Text>
                    <Text
                      style={styles.font16}>{`${route.params.data.bankname}`}</Text>
                  </View>
                  <View style={{width: '45%', marginLeft: 35}}>
                    <Text style={styles.font}>IFSC Code</Text>
                    <Text
                      style={
                        styles.font16
                      }>{`${route.params.data.ifsc_code}`}</Text>
                  </View>
                </View>
                <View style={{flexDirection: 'row', marginTop: 10}}>
                <View style={{width: '45%'}}>
                    <Text style={styles.font}>Account Number</Text>
                    <Text style={styles.font16}>
                      {route.params.data.account_number}
                    </Text>
                  </View>
               
                 
                  <View style={{width: '45%',marginLeft: 35}}>
                    <Text style={styles.font}>Account Type</Text>
                    <Text
                      style={
                        styles.font16
                      }>{`${route.params.data.account_type}`}</Text>
                  </View>
                 
                </View>
              </View>
              {/* Nominee details */}
            
              <View style={{borderWidth:.5,borderColor:colors.bc,marginTop:15}}/>
             {data.nomineedetail.length>0?<View style={{marginTop: 15}}>
                <Text style={[styles.font]}>NOMINEE DETAILS</Text>
                <View style={{flexDirection: 'row', marginTop: 10}}>
                  <View style={{width: '45%'}}>
                    <Text style={styles.font}>Nominee Name</Text>
                    <Text style={styles.font16}>
                    {data.nomineedetail[0].nominee_name}
                    </Text>
                  </View>
                  <View style={{width: '45%', marginLeft: 35}}>
                    <Text style={styles.font}>Relationship</Text>
                    <Text
                      style={
                        styles.font16
                      }>{`${data.nomineedetail[0].relationship}`}</Text>
                  </View>
                </View>
                <View style={{flexDirection: 'row', marginTop: 10}}>
                  <View style={{width: '45%'}}>
                    <Text style={styles.font}>Date of Birth</Text>
                    <Text
                      style={
                        styles.font16
                      }>{`${data.nomineedetail[0].dob}`}</Text>
                  </View>
                </View>
                <View style={{borderWidth:.5,borderColor:colors.bc,marginTop:15}}/>
              </View>:<View/>}
              <View style={{width:'100%'}}>
                <Text 
                style={{
                  fontFamily: 'Montserrat-Regular',
                    fontSize: 14,
                    color: colors.textColor,
                    marginLeft: 0,
                    width: '100%',
                    marginTop: 10,
                }}
                >Redemption Process : For Redemption, investor needs to follow the company specific procedure with the company directly.IndiaDeposit shall provide support services for redemption.</Text>
              </View>
              <View
                style={{marginTop: 10, flexDirection: 'row', marginBottom: 20}}>
                <CheckBox
                  disabled={false}
                  value={toggleCheckBox}
                  onValueChange={newValue => setToggleCheckBox(newValue)}
                  tintColors={{true: '#5A4392', false: '#5A4392'}}
                  onTintColor='#5A4392'
                  onCheckColor='#5A4392'
                />
                <Text
                  style={{
                    fontFamily: 'Montserrat-Regular',
                    fontSize: 14,
                    color: colors.textColor,
                    marginLeft: 10,
                    width: '90%',
                    marginTop: 5,
                  }}>
                  {/* I verify that the above information is correct. */}
                  I confirm that above information is correct and  by clicking SUBMIT below I agree to
                  <Text onPress={()=>setShowModal1(true)} style={{color:colors.bc,textDecorationLine:'underline',}}> Terms and Conditions</Text>
                </Text>
              </View>
              
            </View>
          </View>
          <View style={{height: 100}}></View>
        </ScrollView>
          <Dialog
            dialogStyle={{
              width: '95%',
              paddingHorizontal: 0,
              height: '90%',
              paddingTop: 10,
            }}
            visible={showModal1}
            onHardwareBackPress={() => setShowModal1(false)}>
            <DialogContent>
              <View style={{alignSelf: 'flex-end'}}>
                <TouchableOpacity
                  delayPressIn={0}
                  onPress={() => setShowModal1(false)}
                  style={styles.cross}>
                  <Text style={styles.x}>x</Text>
                </TouchableOpacity>
              </View>
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{marginBottom: 30}}>
                  <HTMLView
                    value={selector1[0].value
                      .trim()
                      .replace(new RegExp('<p>', 'g'), '<span>')}
                    addLineBreaks={false}
                  />
                </View>
              </ScrollView>
            </DialogContent>
          </Dialog>
        <View
          style={{
            bottom: 0,
            left: 0,
            right: 0,
            position: 'absolute',
            backgroundColor: '#fff',
            paddingHorizontal: 15,
            paddingVertical: 15,
          }}>
          <CustomButton
            title="Submit"
            onPress={() => manageUser()}
          />
        </View>
        
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Header
          title={'FD PURCHASE DETAIL'}
          source={require('../../../../assets/Image/arrow2.png')}
          onPress={() => navigation.goBack()}
        />
        {loader ? <Loader /> : null}
      </View>
    );
  }
};
export default MyFDDetail;
