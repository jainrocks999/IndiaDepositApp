import React from "react";
import {View,Text,FlatList,Image,ScrollView} from 'react-native';
import Header from '../../../component/compareHeader';
import colors from '../../../component/colors';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
const data=[
    {title:'Savings Account',value:'-------------',title1:'Bank Name',value1:'State Bank of India'},
    {title:'Rate of Interest',value:'10%',title1:'Account Type',value1:'-------------'},
    {title:'Security',value:'-----------',title1:'Minimum Age',value1:'--------'},
    {title:'Minimum Balance',value:'----------',title1:'Nomination',value1:'------------'},
    {title:'Eligibilty',value:'-----------',title1:'Net Banking Operation',value1:'-------'},
    {title:'Joining kit',value:'-----------',title1:'Debit card AMC charges',value1:'------'},
    {title:'Free ATM Transaction',value:'-------',title1:'PAN Required',value1:'yes'},
    {title:'ECS/IMPS/NEFT/RTGS',value:'-------',title1:'Non-Maitenance Penalty',value1:'-------'},
    {title:'Debit Card',value:'-------',title1:'ATM Point',value1:'-----'},
    {title:'Phone Banking',value:'-------',title1:'Free Cheque',value1:'------'},
    {title:'Locker Facility',value:'-------',title1:'TDS on Interest',value1:'yes'},
    {title:'Auto Sweep',value:'-------',title1:'Interest Cal ,Frequency',value1:'-------'},
    {title:'Cash Withdrawal Limit',value:'-------',title1:'Cash Traction Limit',value1:'------------'},
    {title:'Salient feature',value:'-------',title1:'Insurance',value1:'------'},
    {title:'Offers',value:'-------',title1:'',value1:''}
    
  
]
const FDList=()=>{
const navigation=useNavigation()
const renderItem=(item)=>{
      return(
          <View style={styles.cont}>
           <View style={styles.row}>
            <View style={{width:'55%'}}>
              <Text style={styles.title1}>{item.title}</Text>
              <Text style={styles.value1}>{item.value}</Text>
            </View>
            <View style={{width:'45%'}}>
            <Text style={styles.title1}>{item.title1}</Text>
              <Text style={styles.value1}>{item.value1}</Text>
            </View>
            </View>
            <View style={styles.border}></View>
          </View>
      )
}
    return(
        <View style={{flex:1}}>
          <Header
            title={'ACCOUNT DETAILS'}
            source={require('../../../assets/Images/arrow.png')}
            titleTwo='Compare'
            onPress={()=>navigation.goBack()}
            onPress1={()=>navigation.navigate('CompareSBAccount')}
            /> 
            <View style={styles.list}>
                <FlatList
                 data={data}
                 renderItem={({item})=>renderItem(item)}
                 keyExtractor={(item, index) => item.source}
                 style={{width:'100%'}}
                />
            </View>
        </View>
    )
}
export default FDList;