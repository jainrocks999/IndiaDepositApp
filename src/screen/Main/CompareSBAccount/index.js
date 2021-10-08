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
const selector=useSelector((state)=>state.SBCompareDetail)
console.log('this is compare derrails',selector)
const data1=selector.datavalue1[0]
const data2=selector.datavalue2[0]
    return(
        <View style={{flex:1}}>
              <Header
                  title={'COMPARE SB ACCOUNT'}
                  source={require('../../../assets/Images/arrow.png')}
                  onPress={()=>navigation.goBack()}
               /> 
               <View style={styles.View}>
                 <View style={styles.card}>
                          {/* <View style={styles.xview}>
                                <View style={styles.row1}>
                                      <Text style={styles.xtext}>x</Text>
                                </View>
                         </View> */}
                          <Image
                       resizeMode='contain'
                       style={{height:20,width:70}}
                      source={{uri:`https://demo.webshowcase-india.com/indiadeposit/writable/uploads/bank/${data1.bank_logo}`}}/> 
                          <Text style={styles.title1}>{data1.name}</Text> 
                         <View style={{position:'absolute',bottom:15}}>
                                <TouchableOpacity 
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
                       resizeMode='contain'
                       style={{height:20,width:70}}
                      source={{uri:`https://demo.webshowcase-india.com/indiadeposit/writable/uploads/bank/${data2.bank_logo}`}}/> 
                          <Text style={styles.title1}>{data2.name}</Text> 
                         <View style={{position:'absolute',bottom:15}}>
                                <TouchableOpacity 
                                  style={styles.button}>
                                 <Text style={styles.invest}>{'OPEN ACCOUNT'}</Text>
                               </TouchableOpacity>
                         </View>
                     </View> 
                     
                </View> 
               <ScrollView>
                 
                 <View>
                     <View style={styles.container}>
                         <Text style={styles.title}>{'Account type'}</Text>
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
                         <Text style={styles.title}>{'Minimum Balance'}</Text>
                     </View>
                     <View style={styles.row}>
                         <Text style={styles.value}>{data1.amount_upto}</Text>
                         <Text style={styles.value}>{data2.amount_upto}</Text>
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
                         <Text style={styles.title}>{'Minimum Age'}</Text>
                     </View>
                     <View style={styles.row}>
                         <Text style={styles.value}>{data1.min_age}</Text>
                         <Text style={styles.value}>{data2.min_age}</Text>
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
                         <Text style={styles.title}>{'Eligibility'}</Text>
                     </View>
                     <View style={styles.row}>
                         <Text style={styles.value}>{data1.eligibility}</Text>
                         <Text style={styles.value}>{data2.eligibility}</Text>
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
                         <Text style={styles.title}>{'Joining kit'}</Text>
                     </View>
                     <View style={styles.row}>
                         <Text style={styles.value}>{data1.joining_kit}</Text>
                         <Text style={styles.value}>{data2.joining_kit}</Text>
                     </View>
                  </View>
                  <View>
                     <View style={styles.container}>
                         <Text style={styles.title}>{'Debit card AMC charges'}</Text>
                     </View>
                     <View style={styles.row}>
                         <Text style={styles.value}>{data1.debit_card_amc_charges1}</Text>
                         <Text style={styles.value}>{data2.debit_card_amc_charges1}</Text>
                     </View>
                  </View>
                  <View>
                     <View style={styles.container}>
                         <Text style={styles.title}>{'Free ATM transaction'}</Text>
                     </View>
                     <View style={styles.row}>
                         <Text style={styles.value}>{data1.free_atm_transaction_homebank}</Text>
                         <Text style={styles.value}>{data2.free_atm_transaction_homebank}</Text>
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
                         <Text style={styles.title}>{'Non-Maitenance Penalty'}</Text>
                     </View>
                     <View style={styles.row}>
                         <Text style={styles.value}>{data1.non_maitenance_penalty_charges}</Text>
                         <Text style={styles.value}>{data2.non_maitenance_penalty_charges}</Text>
                     </View>
                  </View>
                  <View>
                     <View style={styles.container}>
                         <Text style={styles.title}>{'ECS/IMPS/NEFT/RTGS'}</Text>
                     </View>
                     <View style={styles.row}>
                         <Text style={styles.value}>{data1.ecs_imps_neft_rtgs}</Text>
                         <Text style={styles.value}>{data2.ecs_imps_neft_rtgs}</Text>
                     </View>
                  </View>
                  <View>
                     <View style={styles.container}>
                         <Text style={styles.title}>{'Debit card'}</Text>
                     </View>
                     <View style={styles.row}>
                         <Text style={styles.value}>{data1.debit_card}</Text>
                         <Text style={styles.value}>{data2.debit_card}</Text>
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
                         <Text style={styles.title}>{'Phone banking'}</Text>
                     </View>
                     <View style={styles.row}>
                         <Text style={styles.value}>{data1.phone_banking}</Text>
                         <Text style={styles.value}>{data2.phone_banking}</Text>
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
                         <Text style={styles.value}>{data1.locker_facility}</Text>
                         <Text style={styles.value}>{data2.locker_facility}</Text>
                     </View>
                  </View>
                  <View>
                     <View style={styles.container}>
                         <Text style={styles.title}>{'TDS on Interest'}</Text>
                     </View>
                     <View style={styles.row}>
                         <Text style={styles.value}>{data1.tds_on_interest}</Text>
                         <Text style={styles.value}>{data2.tds_on_interest}</Text>
                     </View>
                  </View>
                  <View>
                     <View style={styles.container}>
                         <Text style={styles.title}>{'Auto Sweep'}</Text>
                     </View>
                     <View style={styles.row}>
                         <Text style={styles.value}>{data1.auto_sweep}</Text>
                         <Text style={styles.value}>{data2.auto_sweep}</Text>
                     </View>
                  </View>
                  <View>
                     <View style={styles.container}>
                         <Text style={styles.title}>{'Interest Calculation Frequency'}</Text>
                     </View>
                     <View style={styles.row}>
                         <Text style={styles.value}>{data1.interest_calculation_frequency}</Text>
                         <Text style={styles.value}>{data2.interest_calculation_frequency}</Text>
                     </View>
                  </View>
                  <View>
                     <View style={styles.container}>
                         <Text style={styles.title}>{'Cash Withdrawal Limit'}</Text>
                     </View>
                     <View style={styles.row}>
                         <Text style={styles.value}>{data1.cash_withdrawal_limit}</Text>
                         <Text style={styles.value}>{data2.cash_withdrawal_limit}</Text>
                     </View>
                  </View>
                  <View>
                     <View style={styles.container}>
                         <Text style={styles.title}>{'Cash Transaction Limit'}</Text>
                     </View>
                     <View style={styles.row}>
                         <Text style={styles.value}>{data1.cash_transaction_limit}</Text>
                         <Text style={styles.value}>{data2.cash_transaction_limit}</Text>
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
                         <Text style={styles.value}>{data1.Insuarance_health_feature}</Text>
                         <Text style={styles.value}>{data2.Insuarance_health_feature}</Text>
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
                  <View style={{height:40,width:'100%', backgroundColor:'#DDDDDD',}}></View>
             {/* <View style={styles.df}>
                 <Button
                    title='DOWNLOAD FORM'
                 />
             </View> */}
            <View>
            </View>
            </ScrollView>
            <StatusBar/>
        </View>
    )
}
export default FDList;

      