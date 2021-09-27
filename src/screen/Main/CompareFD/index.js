import React from "react";
import {View,Text,FlatList,Image,ScrollView, TouchableOpacity, } from 'react-native';
import Header from '../../../component/header';
import colors from '../../../component/colors';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import Button from '../../../component/button1';
import StatusBar from "../../../component/StatusBar";
import { useSelector } from "react-redux"

const FDList=()=>{
const navigation=useNavigation()
const selector=useSelector((state)=>state.FDCompareDetail)
console.log('this is compare derrails',selector)
const data1=selector.datavalue1[0]
const data2=selector.datavalue2[0]
    return(
        <View style={{flex:1}}>
              <Header
                  title={'COMPARE FD'}
                  source={require('../../../assets/Images/arrow.png')}
                  onPress={()=>navigation.goBack()}
               /> 
               <ScrollView>
                 <View style={styles.View}>
                 <View style={styles.card}>
                          <View style={styles.xview}>
                                <View style={styles.row1}>
                                      <Text style={styles.xtext}>x</Text>
                                </View>
                         </View>
                          <Image
                       resizeMode='contain'
                       style={{height:20,width:70}}
                      source={{uri:`https://demo.webshowcase-india.com/indiadeposit/writable/uploads/bank/${data1.bank_logo}`}}/> 
                          <Text style={styles.title1}>{data1.name}</Text> 
                         <View style={{position:'absolute',bottom:15}}>
                                <TouchableOpacity 
                                  style={styles.button}>
                                 <Text style={styles.invest}>{'INVEST NOW'}</Text>
                               </TouchableOpacity>
                         </View>
                     </View> 
                      <View style={styles.card}>
                          <View style={styles.xview}>
                                <View style={styles.row1}>
                                      <Text style={styles.xtext}>x</Text>
                                </View>
                         </View>
                          <Image
                       resizeMode='contain'
                       style={{height:20,width:70}}
                      source={{uri:`https://demo.webshowcase-india.com/indiadeposit/writable/uploads/bank/${data2.bank_logo}`}}/> 
                          <Text style={styles.title1}>{data2.name}</Text> 
                         <View style={{position:'absolute',bottom:15}}>
                                <TouchableOpacity 
                                  style={styles.button}>
                                 <Text style={styles.invest}>{'INVEST NOW'}</Text>
                               </TouchableOpacity>
                         </View>
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
                         <Text style={styles.title}>{'Calulator'}</Text>
                     </View>
                     <View style={styles.row}>
                         <Text style={styles.value}>{4}</Text>
                         <Text style={styles.value}>{4}</Text>
                     </View>
                  </View>
                  <View>
                     <View style={styles.container}>
                         <Text style={styles.title}>{'Amount'}</Text>
                     </View>
                     <View style={styles.row}>
                         <Text style={styles.value}>{4}</Text>
                         <Text style={styles.value}>{4}</Text>
                     </View>
                  </View>
                  <View>
                     <View style={styles.container}>
                         <Text style={styles.title}>{'Growth %'}</Text>
                     </View>
                     <View style={styles.row}>
                         <Text style={styles.value}>{4}</Text>
                         <Text style={styles.value}>{4}</Text>
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
                         <Text style={styles.title}>{'Duration'}</Text>
                     </View>
                     <View style={styles.row}>
                         <Text style={styles.value}>{data1.duration}</Text>
                         <Text style={styles.value}>{data2.duration}</Text>
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
                         <Text style={styles.title}>{'Minimum amount'}</Text>
                     </View>
                     <View style={styles.row}>
                         <Text style={styles.value}>{data1.min_amount}</Text>
                         <Text style={styles.value}>{data2.min_amount}</Text>
                     </View>
                  </View>
                  <View>
                     <View style={styles.container}>
                         <Text style={styles.title}>{'Maximum amount'}</Text>
                     </View>
                     <View style={styles.row}>
                         <Text style={styles.value}>{data1.max_amount}</Text>
                         <Text style={styles.value}>{data2.max_amount}</Text>
                     </View>
                  </View>
                  <View>
                     <View style={styles.container}>
                         <Text style={styles.title}>{'Minumum Tenure'}</Text>
                     </View>
                     <View style={styles.row}>
                         <Text style={styles.value}>{data1.min_tenure}</Text>
                         <Text style={styles.value}>{data2.min_tenure}</Text>
                     </View>
                  </View>
                  <View>
                     <View style={styles.container}>
                         <Text style={styles.title}>{'Maximum Tenure'}</Text>
                     </View>
                     <View style={styles.row}>
                         <Text style={styles.value}>{data1.max_tenure}</Text>
                         <Text style={styles.value}>{data2.max_tenure}</Text>
                     </View>
                  </View>
                  <View>
                     <View style={styles.container}>
                         <Text style={styles.title}>{'Loan'}</Text>
                     </View>
                     <View style={styles.row}>
                         <Text style={styles.value}>{data1.loan}</Text>
                         <Text style={styles.value}>{data2.loan}</Text>
                     </View>
                  </View>
                  <View>
                     <View style={styles.container}>
                         <Text style={styles.title}>{'Premature Withdrawals'}</Text>
                     </View>
                     <View style={styles.row}>
                         <Text style={styles.value}>{data1.premature_withdrawals}</Text>
                         <Text style={styles.value}>{data2.premature_withdrawals}</Text>
                     </View>
                  </View>
                  <View>
                     <View style={styles.container}>
                         <Text style={styles.title}>{'Nomination'}</Text>
                     </View>
                     <View style={styles.row}>
                         <Text style={styles.value}>{data1.nomination}</Text>
                         <Text style={styles.value}>{data2.nomination}</Text>
                     </View>
                  </View>
                  <View>
                     <View style={styles.container}>
                         <Text style={styles.title}>{'SB account Required'}</Text>
                     </View>
                     <View style={styles.row}>
                         <Text style={styles.value}>{data1.sb_ac_require}</Text>
                         <Text style={styles.value}>{data2.sb_ac_require}</Text>
                     </View>
                  </View>
                  <View>
                     <View style={styles.container}>
                         <Text style={styles.title}>{'Eligibility'}</Text>
                     </View>
                     <View style={styles.row}>
                         <Text style={styles.value}>{data1.eligibility}</Text>
                         <Text style={styles.value}>{data2.eligibility}</Text>
                     </View>
                  </View>
                  <View>
                     <View style={styles.container}>
                         <Text style={styles.title}>{'Online link'}</Text>
                     </View>
                     <View style={styles.row}>
                         <Text style={styles.value}>{data1.online_link}</Text>
                         <Text style={styles.value}>{data2.online_link}</Text>
                     </View>
                  </View>
                  <View>
                     <View style={styles.container}>
                         <Text style={styles.title}>{'Auto renewal'}</Text>
                     </View>
                     <View style={styles.row}>
                         <Text style={styles.value}>{data1.auto_renewal}</Text>
                         <Text style={styles.value}>{data2.auto_renewal}</Text>
                     </View>
                  </View>
                  <View>
                     <View style={styles.container}>
                         <Text style={styles.title}>{'Interest Payout'}</Text>
                     </View>
                     <View style={styles.row}>
                         <Text style={styles.value}>{data1.interest_payout}</Text>
                         <Text style={styles.value}>{data2.interest_payout}</Text>
                     </View>
                  </View>
                  <View>
                     <View style={styles.container}>
                         <Text style={styles.title}>{'Premature penality'}</Text>
                     </View>
                     <View style={styles.row}>
                         <Text style={styles.value}>{data1.premature_penality}</Text>
                         <Text style={styles.value}>{data2.premature_penality}</Text>
                     </View>
                  </View>
                  <View>
                     <View style={styles.container}>
                         <Text style={styles.title}>{'Flexi/auto sweep'}</Text>
                     </View>
                     <View style={styles.row}>
                         <Text style={styles.value}>{data1.flexi_auto_sweep}</Text>
                         <Text style={styles.value}>{data2.flexi_auto_sweep}</Text>
                     </View>
                  </View>
                  <View>
                     <View style={styles.container}>
                         <Text style={styles.title}>{'Net Banking operation'}</Text>
                     </View>
                     <View style={styles.row}>
                         <Text style={styles.value}>{data1.net_banking_operation}</Text>
                         <Text style={styles.value}>{data2.net_banking_operation}</Text>
                     </View>
                  </View>
                  <View>
                     <View style={styles.container}>
                         <Text style={styles.title}>{'PAN required'}</Text>
                     </View>
                     <View style={styles.row}>
                         <Text style={styles.value}>{data1.pan_required}</Text>
                         <Text style={styles.value}>{data2.pan_required}</Text>
                     </View>
                  </View>
                  <View>
                     <View style={styles.container}>
                         <Text style={styles.title}>{'Salient feature'}</Text>
                     </View>
                     <View style={styles.row}>
                         <Text style={styles.value}>{data1.salient_feature}</Text>
                         <Text style={styles.value}>{data2.salient_feature}</Text>
                     </View>
                  </View>
                  <View>
                     <View style={styles.container}>
                         <Text style={styles.title}>{'Insuarance'}</Text>
                     </View>
                     <View style={styles.row}>
                         <Text style={styles.value}>{data1.insuarance}</Text>
                         <Text style={styles.value}>{data2.insuarance}</Text>
                     </View>
                  </View>
                  <View>
                     <View style={styles.container}>
                         <Text style={styles.title}>{'Offers'}</Text>
                     </View>
                     <View style={styles.row}>
                         <Text style={styles.value}>{data1.offers}</Text>
                         <Text style={styles.value}>{data2.offers}</Text>
                     </View>
                  </View>
                  <View style={{height:100,width:'100%', backgroundColor:'#DDDDDD',}}></View>
            <View>
            </View>
            </ScrollView>
            <StatusBar/>
        </View>
    )
}
export default FDList;

      