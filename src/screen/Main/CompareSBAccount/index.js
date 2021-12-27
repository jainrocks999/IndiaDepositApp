import React, {useEffect} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import Header from '../../../component/header';
import {useNavigation} from '@react-navigation/native';
import styles from './styles';
import StatusBar from '../../../component/StatusBar';
import {useSelector} from 'react-redux';
import axios from 'axios';

const FDList = ({route}) => {
  const navigation = useNavigation();
  const selector = useSelector(state => state.SBCompareDetail);
  const data1 = selector.datavalue1[0];
  const data2 = selector.datavalue2[0];

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

  const renderMab1 = () => {
    if (route.params.branch_type1 == 'Metropolitan') {
      return (
        <View>
          <Text style={styles.value}>{data1.min_balance_metropolitan}</Text>
        </View>
      );
    } else if (route.params.branch_type1 == 'Rural') {
      return (
        <View>
          <Text style={styles.value}>{data1.min_balance_rural}</Text>
        </View>
      );
    } else if (route.params.branch_type1 == 'Semiurban') {
      return (
        <View>
          <Text style={styles.value}>{data1.min_balance_semiurban}</Text>
        </View>
      );
    } else if (route.params.branch_type1 == 'Urban') {
      return (
        <View>
          <Text style={styles.value}>{data1.min_balance_urban}</Text>
        </View>
      );
    }
  };

  const renderMab2 = () => {
    if (route.params.branch_type2 == 'Metropolitan') {
      return (
        <View>
          <Text style={styles.value}>{data2.min_balance_metropolitan}</Text>
        </View>
      );
    } else if (route.params.branch_type2 == 'Rural') {
      return (
        <View>
          <Text style={styles.value}>{data2.min_balance_rural}</Text>
        </View>
      );
    } else if (route.params.branch_type2 == 'Semiurban') {
      return (
        <View>
          <Text style={styles.value}>{data2.min_balance_semiurban}</Text>
        </View>
      );
    } else if (route.params.branch_type2 == 'Urban') {
      return (
        <View>
          <Text style={styles.value}>{data2.min_balance_urban}</Text>
        </View>
      );
    }
  };
  const download1 = async item => {
    try {
      const data = new FormData();
      data.append(
        'form_type',
        item.type == 'Regular'
          ? 'fdRegular'
          : item.type == 'Senior Citizen'
          ? 'FDSenior Citizen'
          : item.type == 'Female'
          ? 'SBFemale'
          : item.type == 'Zero Balance'
          ? 'SBZeroBalance'
          : '',
      );
      data.append('bank_id', item.bank_id);
      data.append('from_for', 'savingaccount');
      const response = await axios({
        method: 'POST',
        data,
        headers: {
          'content-type': 'multipart/form-data',
          Accept: 'multipart/form-data',
        },
        url: 'https://demo.webshowcase-india.com/indiadeposit/public/apis/getform',
      });
      if (response.data.status == 200) {
        navigation.navigate('FD_FORM', {
          id: item.saving_account_id,
          from: 'saving_account_id',
          response: response.data.data,
          type: 'common',
          bank_id: item.bank_id,
          pincode: route.params.location,
        });
      }
    } catch (error) {
      throw error;
    }
  };

  const download = async item => {
    console.log('this idfjslifjdklfjdsklfjd', item);
    try {
      const data = new FormData();
      data.append(
        'form_type',
        item.type == 'Regular'
          ? 'fdRegular'
          : item.type == 'Senior Citizen'
          ? 'FDSenior Citizen'
          : item.type == 'Female'
          ? 'SBFemale'
          : item.type == 'Zero Balance'
          ? 'SBZeroBalance'
          : '',
      );
      data.append('bank_id', item.bank_id);
      data.append('from_for', 'savingaccount');
      const response = await axios({
        method: 'POST',
        data,
        headers: {
          'content-type': 'multipart/form-data',
          Accept: 'multipart/form-data',
        },
        url: 'https://demo.webshowcase-india.com/indiadeposit/public/apis/getform',
      });
      if (response.data.status == 200) {
        navigation.navigate('FD_FORM', {
          id: item.saving_account_id,
          from: 'saving_account_id',
          response: response.data.data,
          type: 'common',
          bank_id: item.bank_id,
          pincode: route.params.location,
        });
      }
    } catch (error) {
      throw error;
    }
  };

  return (
    <View style={{flex: 1}}>
      <Header
        title={'COMPARE SB ACCOUNT'}
        source={require('../../../assets/Image/arrow2.png')}
        onPress={() => navigation.goBack()}
      />
      <View style={styles.View}>
        <View style={styles.card}>
          <Image
            resizeMode="contain"
            style={{height: 20, width: 70}}
            source={{
              uri: `https://demo.webshowcase-india.com/indiadeposit/writable/uploads/bank/${data1.bank_logo}`,
            }}
          />
          {/* <Text style={styles.title1}>{data1.name}</Text>  */}
          <View style={{marginTop: 30}}>
            <TouchableOpacity
              onPress={() => download(data1)}
              style={styles.button}>
              <Text style={styles.invest}>{'OPEN ACCOUNT'}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.card}>
          {/* <View style={styles.xview}>
                                <View style={styles.row1}>
                                      <Text style={styles.xtext}>x</Text>
                                </View>
                         </View> */}
          <Image
            resizeMode="contain"
            style={{height: 20, width: 70}}
            source={{
              uri: `https://demo.webshowcase-india.com/indiadeposit/writable/uploads/bank/${data2.bank_logo}`,
            }}
          />
          {/* <Text style={styles.title1}>{data2.name}</Text>  */}
          <View style={{marginTop: 30}}>
            <TouchableOpacity
              onPress={() => download1(data2)}
              style={styles.button}>
              <Text style={styles.invest}>{'OPEN ACCOUNT'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <ScrollView>
        <View>
          <View style={styles.container}>
            <Text style={styles.title}>{'Type'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.value}>{data1.type}</Text>
            <Text style={styles.value}>{data2.type}</Text>
          </View>
        </View>
        <View>
          <View style={styles.container}>
            <Text style={styles.title}>{'Rate of interest'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.value}>{data1.rate}</Text>
            <Text style={styles.value}>{data2.rate}</Text>
          </View>
        </View>
        <View>
          <View style={styles.container}>
            <Text style={styles.title}>{'MAB'}</Text>
          </View>
          <View style={styles.row}>
            {renderMab1()}
            {renderMab2()}
          </View>
        </View>
        <View>
          <View style={styles.container}>
            <Text style={styles.title}>{'ATM Points'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.value}>{data1.atm_points}</Text>
            <Text style={styles.value}>{data2.atm_points}</Text>
          </View>
        </View>
        <View>
          <View style={styles.container}>
            <Text style={styles.title}>{'Interest Frequency'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.value}>
              {data1.interest_calculation_frequency}
            </Text>
            <Text style={styles.value}>
              {data2.interest_calculation_frequency}
            </Text>
          </View>
        </View>
        <View>
          <View style={styles.container}>
            <Text style={styles.title}>{'Nomination'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.value}>
              {data1.nomination == 0 ? 'No' : 'Yes'}
            </Text>
            <Text style={styles.value}>
              {data2.nomination == 0 ? 'No' : 'Yes'}
            </Text>
          </View>
        </View>
        <View>
          <View style={styles.container}>
            <Text style={styles.title}>{'Net Banking operation'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.value}>
              {data1.net_banking_operation == 0 ? 'No' : 'Yes'}
            </Text>
            <Text style={styles.value}>
              {data2.net_banking_operation == 0 ? 'No' : 'Yes'}
            </Text>
          </View>
        </View>
        <View>
          <View style={styles.container}>
            <Text style={styles.title}>{'Joining kit'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.value}>
              {data1.joining_kit == 0 ? 'No' : 'Yes'}
            </Text>
            <Text style={styles.value}>
              {data2.joining_kit == 0 ? 'No' : 'Yes'}
            </Text>
          </View>
        </View>
        <View>
          <View style={styles.container}>
            <Text style={styles.title}>{'Free ATM Transaction Home'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.value}>
              {data1.free_atm_transaction_homebank}
            </Text>
            <Text style={styles.value}>
              {data2.free_atm_transaction_homebank}
            </Text>
          </View>
        </View>
        <View>
          <View style={styles.container}>
            <Text style={styles.title}>{'ECS/IMPS/NEFT/RTGS'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.value}>
              {data1.ecs_imps_neft_rtgs == 0 ? 'No' : 'Yes'}
            </Text>
            <Text style={styles.value}>
              {data2.ecs_imps_neft_rtgs == 0 ? 'No' : 'Yes'}
            </Text>
          </View>
        </View>

        <View>
          <View style={styles.container}>
            <Text style={styles.title}>{'Debit Card'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.value}>{data1.debit_card}</Text>
            <Text style={styles.value}>{data2.debit_card}</Text>
          </View>
        </View>
        <View>
          <View style={styles.container}>
            <Text style={styles.title}>{'Phone Banking'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.value}>
              {data1.phone_banking == 0 ? 'No' : 'Yes'}
            </Text>
            <Text style={styles.value}>
              {data2.phone_banking == 0 ? 'No' : 'Yes'}
            </Text>
          </View>
        </View>
        <View>
          <View style={styles.container}>
            <Text style={styles.title}>{'Free Cheques'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.value}>{data1.free_cheques}</Text>
            <Text style={styles.value}>{data2.free_cheques}</Text>
          </View>
        </View>
        <View>
          <View style={styles.container}>
            <Text style={styles.title}>{'Locker Facility'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.value}>
              {data1.locker_facility == 0 ? 'No' : 'Yes'}
            </Text>
            <Text style={styles.value}>
              {data2.locker_facility == 0 ? 'No' : 'Yes'}
            </Text>
          </View>
        </View>
        <View>
          <View style={styles.container}>
            <Text style={styles.title}>{'TDS Free Interest'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.value}>{data1.offers}</Text>
            <Text style={styles.value}>{data2.offers}</Text>
          </View>
        </View>
        <View>
          <View style={styles.container}>
            <Text style={styles.title}>{'Cash Withdrawal Limit Branch'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.value}>{data1.cash_withdrawal_limit}</Text>
            <Text style={styles.value}>{data2.cash_withdrawal_limit}</Text>
          </View>
        </View>
        <View>
          <View style={styles.container}>
            <Text style={styles.title}>{'Cash Transaction Limit ATM'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.value}>{data1.cash_transaction_limit_atm}</Text>
            <Text style={styles.value}>{data2.cash_transaction_limit_atm}</Text>
          </View>
        </View>
        <View>
          <View style={styles.container}>
            <Text style={styles.title}>{'Free Atm Transaction Homebank'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.value}>
              {data1.free_atm_transaction_homebank}
            </Text>
            <Text style={styles.value}>
              {data2.free_atm_transaction_homebank}
            </Text>
          </View>
        </View>
        <View>
          <View style={styles.container}>
            <Text style={styles.title}>{'Free Atm Transaction Otherbank'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.value}>
              {data1.free_atm_transaction_otherbank}
            </Text>
            <Text style={styles.value}>
              {data2.free_atm_transaction_otherbank}
            </Text>
          </View>
        </View>
        <View>
          <View style={styles.container}>
            <Text style={styles.title}>{'Pan Card Required	'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.value}>
              {data1.pan_required == 0 ? 'No' : 'Yes'}
            </Text>
            <Text style={styles.value}>
              {data2.pan_required == 0 ? 'No' : 'Yes'}
            </Text>
          </View>
        </View>
        <View
          style={{
            height: 40,
            width: '100%',
            backgroundColor: '#DDDDDD',
          }}></View>
        <View></View>
      </ScrollView>
      <StatusBar />
    </View>
  );
};
export default FDList;
