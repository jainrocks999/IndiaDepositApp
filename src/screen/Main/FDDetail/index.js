import React from "react";
import {View,Text,FlatList,Image,ScrollView} from 'react-native';
import Header from '../../../component/compareHeader';
import colors from '../../../component/colors';
import styles from './styles';
import {useNavigation} from '@react-navigation/native'
const data=[
    {title:'FD Name',value:'Regular Fixed Deposit',title1:'Bank Name',value1:'State Bank of India'},
    {title:'Rate',value:'10%',title1:'FD Type',value1:'Tax-Saving Fixed Deposits'},
    {title:'Duration',value:'10 years',title1:'Security',value1:'Fixed Deposits'},
    {title:'Minimum Amount',value:'10 Lakh',title1:'Maximum Amount',value1:'20 Lakh'},
    {title:'Minimum Tenure',value:'8 years',title1:'Maximum Tenure',value1:'10 years'},
    {title:'Loan',value:'Personal Loan',title1:'Premature Withdrawals',value1:'1%'},
    {title:'Nomination',value:'-------',title1:'SB account Required',value1:'yes'},
    {title:'Eligibility',value:'-------',title1:'Online link',value1:'yes'},
    {title:'Auto renewal',value:'-------',title1:'Interest Payout',value1:'yes'},
    {title:'Premature penality',value:'-------',title1:'Flexi/auto sweep',value1:'yes'},
    {title:'Net Banking operation',value:'-------',title1:'PAN required',value1:'yes'},
    {title:'Salient feature',value:'-------',title1:'Insuarance',value1:'------------'},
    {title:'Offers',value:'-------',title1:'',value1:''},
   

]
const FDList=()=>{
const navigation=useNavigation()
const renderItem=(item)=>{
      return(
          <View style={styles.cont}>
           <View style={styles.align}>
            <View style={{width:'50%'}}>
              <Text style={styles.title1}>{item.title}</Text>
              <Text style={styles.value1}>{item.value}</Text>
            </View>
            <View style={{width:'50%'}}>
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
            title={'FD DETAILS'}
            source={require('../../../assets/Images/arrow.png')}
            titleTwo='Compare'
            onPress={()=>navigation.goBack()}
            onPress1={()=>navigation.navigate('CompareFD')}
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