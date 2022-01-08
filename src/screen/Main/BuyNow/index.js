import React from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import Header from '../../../component/header';
import colors from '../../../component/colors';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import StatusBar from '../../../component/StatusBar';
import Button from '../../../component/button1';
const data = [
  {
    title: 'FD Name',
    value: 'Regular Fixed Deposit',
    title1: 'Bank Name',
    value1: 'State Bank of India',
  },
  {
    title: 'Rate',
    value: '10%',
    title1: 'FD Type',
    value1: 'Tax-Saving Fixed Deposits',
  },
  {
    title: 'Duration',
    value: '10 years',
    title1: 'Security',
    value1: 'Fixed Deposits',
  },
  {
    title: 'Minimum Amount',
    value: '10 Lakh',
    title1: 'Maximum Amount',
    value1: '20 Lakh',
  },
  {
    title: 'Minimum Tenure',
    value: '8 years',
    title1: 'Maximum Tenure',
    value1: '10 years',
  },
  {
    title: 'Loan',
    value: 'Personal Loan',
    title1: 'Premature Withdrawals',
    value1: '1%',
  },
  {
    title: 'Nomination',
    value: '-------',
    title1: 'SB account Required',
    value1: 'yes',
  },
  {
    title: 'Nomination',
    value: '-------',
    title1: 'SB account Required',
    value1: 'yes',
  },
  {
    title: 'Nomination',
    value: '-------',
    title1: 'SB account Required',
    value1: 'yes',
  },
  {
    title: 'Nomination',
    value: '-------',
    title1: 'SB account Required',
    value1: 'yes',
  },
  {
    title: 'Nomination',
    value: '-------',
    title1: 'SB account Required',
    value1: 'yes',
  },
  {
    title: 'Nomination',
    value: '-------',
    title1: 'SB account Required',
    value1: 'yes',
  },
  {
    title: 'Nomination',
    value: '-------',
    title1: 'SB account Required',
    value1: 'yes',
  },
];
const FDList = () => {
  const navigation = useNavigation();
  const renderItem = item => {
    return (
      <View style={styles.Textview}>
        <View style={styles.Textview1}>
          <View style={{width: '50%'}}>
            <Text style={styles.title1}>{item.title}</Text>
            <Text style={styles.value1}>{item.value}</Text>
          </View>
          <View style={{width: '50%'}}>
            <Text style={styles.title1}>{item.title1}</Text>
            <Text style={styles.value1}>{item.value1}</Text>
          </View>
        </View>
        <View style={styles.line}></View>
      </View>
    );
  };
  return (
    <View style={{flex: 1}}>
      <Header
        title={'BUY NOW'}
        source={require('../../../assets/Image/arrow2.png')}
        onPress={() => navigation.goBack()}
      />
      <View style={styles.flat}>
        <FlatList
          data={data}
          renderItem={({item}) => renderItem(item)}
          keyExtractor={(item, index) => item.source}
          style={{width: '100%'}}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity delayPressIn={0} style={styles.button}>
          <Text style={styles.text}>BUY NOW</Text>
        </TouchableOpacity>
        <TouchableOpacity delayPressIn={0} style={styles.button}>
          <Text style={styles.text}>CANCEL</Text>
        </TouchableOpacity>
      </View>
      <StatusBar />
    </View>
  );
};
export default FDList;
