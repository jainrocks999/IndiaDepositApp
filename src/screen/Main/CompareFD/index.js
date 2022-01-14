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
import Constants from '../../../component/Constants';

const FDList = ({route}) => {
  const navigation = useNavigation();
  const selector = useSelector(state => state.FDCompareDetail);
  const data1 = selector.datavalue1[0];
  const data2 = selector.datavalue2[0];
  const [yyyy, mm, dd] = data1.date_of_maturity.split('-');
  const value = `${dd}-${mm}-${yyyy}`;

  const [yyyy1, mm1, dd1] = data2.date_of_maturity.split('-');
  const value1 = `${dd1}-${mm1}-${yyyy1}`;

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

  return (
    <View style={{flex: 1}}>
      <Header
        title={'COMPARE FD'}
        source={require('../../../assets/Image/arrow2.png')}
        onPress={() => navigation.goBack()}
      />
      <View style={styles.View}>
        <View style={styles.card}>
          <Image
            resizeMode="contain"
            style={{height: 20, width: 70}}
            source={{
              uri: `${Constants.imageUrl}${data1.bank_logo}`,
            }}
          />
          <View style={{marginTop: 30}}>
            <TouchableOpacity delayPressIn={0} style={styles.button}>
              <Text style={styles.invest}>{'INVEST NOW'}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.card}>
          <Image
            resizeMode="contain"
            style={{height: 20, width: 70}}
            source={{
              uri: `${Constants.imageUrl}${data2.bank_logo}`,
            }}
          />
          <View style={{marginTop: 30}}>
            <TouchableOpacity delayPressIn={0} style={styles.button}>
              <Text style={styles.invest}>{'INVEST NOW'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <ScrollView>
        <View>
          <View style={styles.container}>
            <Text style={styles.title}>{'Rate of interest'}</Text>
          </View>
          <View style={styles.row}>
            <View style={{width: '40%', alignItems: 'center'}}>
              <Text style={styles.value}>{data1.rate}</Text>
            </View>
            <View style={{width: '40%', alignItems: 'center'}}>
              <Text style={styles.value}>{data2.rate}</Text>
            </View>
          </View>
        </View>
        <View>
          <View style={styles.container}>
            <Text style={styles.title}>{'Interest Payout'}</Text>
          </View>
          <View style={styles.row}>
            <View style={{width: '40%', alignItems: 'center'}}>
              <Text style={styles.value}>
                {data1.interest_payout == 0 ? 'No' : 'Yes'}
              </Text>
            </View>
            <View style={{width: '40%', alignItems: 'center'}}>
              <Text style={styles.value}>
                {data2.interest_payout == 0 ? 'No' : 'Yes'}
              </Text>
            </View>
          </View>
        </View>
        <View>
          <View style={styles.container}>
            <Text style={styles.title}>{'FD Type'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.value}>{data1.type}</Text>
            <Text style={styles.value}>{data2.type}</Text>
          </View>
        </View>

        <View>
          <View style={styles.container}>
            <Text style={styles.title}>{'Security'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.value}>{data1.security}</Text>
            <Text style={styles.value}>{data2.security}</Text>
          </View>
        </View>

        <View>
          <View style={styles.container}>
            <Text style={styles.title}>{'Loan'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.value}>{data1.loan == 1 ? 'Yes' : 'No'}</Text>
            <Text style={styles.value}>{data2.loan == 1 ? 'Yes' : 'No'}</Text>
          </View>
        </View>
        <View>
          <View style={styles.container}>
            <Text style={styles.title}>{'Premature Withdrawals Rate'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.value}>
              {data1.premature_withdrawals == 0 ? 'No' : 'Yes'}
            </Text>
            <Text style={styles.value}>
              {data2.premature_withdrawals == 0 ? 'No' : 'Yes'}
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
            <Text style={styles.title}>{'Tenure'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.value}>{`${
              route.params.year > 0 ? `${route.params.year}y` : ''
            }${route.params.month > 0 ? ` ${route.params.month}m` : ''}${
              route.params.days > 0 ? ` ${route.params.days}d` : ''
            }`}</Text>
            <Text style={styles.value}>{`${
              route.params.year > 0 ? `${route.params.year}y` : ''
            }${route.params.month > 0 ? ` ${route.params.month}m` : ''}${
              route.params.days > 0 ? ` ${route.params.days}d` : ''
            }`}</Text>
          </View>
        </View>
        <View>
          <View style={styles.container}>
            <Text style={styles.title}>{'Maturity Amount'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.value}>
              {(
                route.params.amount *
                Math.pow(1 + data1.rate / (1 * 100), 1 * route.params.period)
              ).toFixed(2)}
            </Text>
            <Text style={styles.value}>
              {(
                route.params.amount *
                Math.pow(1 + data2.rate / (1 * 100), 1 * route.params.period)
              ).toFixed(2)}
            </Text>
          </View>
        </View>

        <View>
          <View style={styles.container}>
            <Text style={styles.title}>{'Flexi/auto sweep'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.value}>
              {data1.flexi_auto_sweep == 0 ? 'No' : 'Yes'}
            </Text>
            <Text style={styles.value}>
              {data2.flexi_auto_sweep == 0 ? 'No' : 'Yes'}
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
            <Text style={styles.title}>{'PAN required'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.value}>
              {data1.pan_required == 0 ? 'No' : 'Yes'}
            </Text>
            <Text style={styles.value}>
              {data2.pan_required == 0 ? 'N0' : 'Yes'}
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
