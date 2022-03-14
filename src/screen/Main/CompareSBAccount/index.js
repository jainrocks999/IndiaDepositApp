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
import {useSelector,useDispatch} from 'react-redux';
import axios from 'axios';
import Constants from '../../../component/Constants';
import Storage from '../../../component/AsyncStorage';
import AsyncStorage from '@react-native-community/async-storage';
import Loader from '../../../component/loader';


const FDList = ({route}) => {
  const navigation = useNavigation();
  const dispatch=useDispatch()
  const selector = useSelector(state => state.SBCompareDetail);
  const data1 = selector.datavalue1[0];
  const data2 = selector.datavalue2[0];
  const isFetching=useSelector(state=>state.isFetching)

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
const openAccount=async()=>{
  const user_id=await AsyncStorage.getItem(Storage.user_id)
  dispatch({
    type: 'SB_Detail_Request',
    url: 'sbdetail',
    saving_account_id: route.params.value_id1,
    navigation: navigation,
    branch_type: route.params.branch_type1,
    pincode: route.params.location,
    user_id,
  });
}

const openAccount1=async()=>{
  const user_id=await AsyncStorage.getItem(Storage.user_id)
  dispatch({
    type: 'SB_Detail_Request',
    url: 'sbdetail',
    saving_account_id: route.params.value_id2,
    navigation: navigation,
    branch_type: route.params.branch_type2,
    pincode: route.params.location,
    user_id,
  });
}

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
  }

  return (
    <View style={{flex: 1}}>
      <Header
        title={'COMPARE SB ACCOUNT'}
        source={require('../../../assets/Image/arrow2.png')}
        onPress={() => navigation.goBack()}
      />
      {isFetching?<Loader/>:null}
      <View style={styles.View}>
        <View style={styles.card}>
          <Image
            resizeMode="contain"
            style={{height: 20, width: 70}}
            source={{
              uri: `${Constants.imageUrl}${data1.bank_logo}`,
            }}
          />
          {/* <Text style={styles.title1}>{data1.name}</Text>  */}
          <View style={{marginTop: 30}}>
            <TouchableOpacity
              delayPressIn={0}
              onPress={() => openAccount()}
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
              uri: `${Constants.imageUrl}${data2.bank_logo}`,
            }}
          />
          {/* <Text style={styles.title1}>{data2.name}</Text>  */}
          <View style={{marginTop: 30}}>
            <TouchableOpacity
              delayPressIn={0}
              onPress={() => openAccount1()}
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
