import React, { useEffect, useState } from "react";
import {View,Text,FlatList,Image,ScrollView,BackHandler} from 'react-native';
import Header from '../../../component/compareHeader';
import colors from '../../../component/colors';
import styles from './styles';
import {useNavigation} from '@react-navigation/native'
import { TouchableOpacity } from "react-native";
import StatusBar from '../../../component/StatusBar';
import BottomTab from '../../../component/StoreButtomTab';
import { useSelector } from 'react-redux';
import HTMLView from 'react-native-htmlview';

const FDList=()=>{
const navigation=useNavigation()
const selector=useSelector((state)=>state.SBDetail)
const details=selector[0]

useEffect(()=>{
      const backAction = () => {
            navigation.goBack()
            return true;
          };
        
          const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
          );
        
          return () => backHandler.remove();
},[])

 return(
       <View style={styles.container1}>
         <Header
          title={'SB A/C DETAILS'}
          source={require('../../../assets/Image/arrow2.png')}
          onPress={()=>navigation.goBack()}
         /> 
         <View style={{marginTop:12}}>
                 <View style={styles.list}>
                 <Image  resizeMode='contain'
                       style={{height:20,width:80}}
            source={{uri:`https://demo.webshowcase-india.com/indiadeposit/writable/uploads/bank/${selector[0].bank_logo}`}}/>
                     <Text  onPress={()=>navigation.navigate('CompareFD')} style={styles.Text1}>{details.type}</Text>
                     {/* <Text style={styles.Text2}>{details.type}</Text> */}
                 </View>
              </View>
           <ScrollView style={{flex:1,paddingVertical:0,}}>
             
             <View style={styles.card}>
                 <View style={styles.container}>
                      <View style={styles.undercard}>
                          <Text style={styles.item}>{`${details.rate}%`}</Text>
                          <Text style={styles.item1}>{`Interest Rate`}</Text>
                      </View>
                     <View style={styles.undercard}>
                           <View style={styles.rup}>
                               <Image style={styles.rupay} source={require('../../../assets/Image/rupay.png')}/>
                                <Text style={styles.item}>{details.non_maitenance_penalty_charges}</Text>
                          </View>
                          <Text style={styles.item1}>{`Non-Maintenance Penalty`}</Text>
                       </View>
                       <View style={styles.undercard}>
                            <Text style={styles.item}>{details.locker_facility}</Text>
                            <Text style={styles.item1}>{`Locker Facility`}</Text>
                        </View>
                  </View>
                  <View style={styles.line}></View>
                   <View style={styles.container}>
                         <View style={styles.undercard}>
                              <Text style={styles.item}>{details.joining_kit}</Text>
                              <Text style={styles.item1}>{`Joining Kit`}</Text>
                         </View>
                         <View style={styles.undercard}>
                               <Text style={styles.item}>{details.net_banking_operation}</Text>
                               <Text style={styles.item1}>{`Net banking`}</Text>
                         </View>
                         <View style={styles.undercard}>
                                <Text style={styles.item}>{details.phone_banking}</Text>
                                <Text style={[styles.item1,{textAlign:'center'}]}>{`Phone Banking`}</Text>
                         </View>
                     </View>
            </View>
            {/* first row */}
         <View style={styles.second}>
                 <View style={styles.container}>
                          <View style={styles.undercard}>
                                <View style={styles.rup}> 
                                  <Image style={styles.rupay} source={require('../../../assets/Image/rupay.png')}/>
                                   <Text style={styles.item}>{details.cash_withdrawal_limit}</Text>
                              </View> 
                             <Text style={[styles.item1,{textAlign:'center'}]}>{`Cash Withdrawal\nLimit`}</Text>
                           </View>
                           <View style={styles.undercard}>
                                  <View style={styles.rup}>
                                      <Image style={styles.rupay} source={require('../../../assets/Image/rupay.png')}/>
                                      <Text style={styles.item}>{`1 Lakh`}</Text>
                                  </View>
                                  <Text style={styles.item1}>{`Cash Deposit limit`}</Text>
                            </View>
                            <View style={styles.undercard}>
                                  <Text style={styles.item}>{details.free_atm_transaction_homebank}</Text>
                                  <Text style={[styles.item1,{textAlign:'center'}]}>{`Atm Free no of\nTransaction`}</Text>
                            </View>
                  </View>
                  <View style={styles.line}></View>
                    <View style={styles.container}>
                            <View style={styles.undercard}>
                                  <Text style={styles.item}>{details.pan_required}</Text>
                                  <Text style={styles.item1}>{`Pan requirement`}</Text>
                            </View>
                            <View style={styles.undercard}>
                                 <Text style={styles.item}>{details.atm_points}</Text>
                                 <Text style={styles.item1}>{`Bank Atm points`}</Text>
                           </View>
                            <View style={styles.undercard}>
                                   <View style={styles.rup}>
                                        <Image style={styles.rupay} source={require('../../../assets/Image/rupay.png')}/>
                                        <Text style={styles.item}>{details.free_atm_transaction_homebank_charges}</Text>
                                    </View>
                                   <Text style={[styles.item1,{textAlign:'center'}]}>{`ATM transaction\ncharges`}</Text>
                             </View>
                    </View>
                    <View style={styles.line}></View>
                    <View style={styles.container}>
                           <View style={styles.undercard}>
                                 <View style={styles.rup}>
                                      <Image style={styles.rupay} source={require('../../../assets/Image/rupay.png')}/> 
                                       <Text style={styles.item}>{details.free_atm_transaction_otherbank}</Text>
                                 </View>
                               <Text style={[styles.item1,{textAlign:'center'}]}>{`ATM Free transaction\nfrom other bank`}</Text>
                         </View>
                     </View>
            </View>
               {/*  ButtonView */}
            {/* <View style={styles.bank}>
                 <TouchableOpacity>
                      <Text style={styles.bankDetails}>BANK DETAILS</Text>
                  </TouchableOpacity>
                  <TouchableOpacity>
                          <Text style={styles.bankDetails}>DOWNLOAD FORM</Text>
                   </TouchableOpacity>
            </View> */}
            {/* Second row */}
            { details.tds_info==null?<View/>:
                    <View style={styles.top}>
                          <View>  
                         <Text style={styles.tds}>{'TDS applicable with info of 15 G option :'}</Text>
                          <HTMLView
                              value={details.tds_info.trim().replace(/\s+/g,' ')}
                              addLineBreaks={false}
                         /></View>
                     </View>}
         { details.insuarance_terms==null?<View/>:
                       <View style={styles.top}>
                          <View>  
                         <Text style={styles.tds}>{'Insurance :'}</Text>
                          <HTMLView
                              value={details.insuarance_terms.trim().replace(/\s+/g,' ')}
                              addLineBreaks={false}
                          />
                         </View>
                        </View>
                         }
                     { details.eligibility==null?<View/>:
                        <View style={[styles.top]}>
                          <View>  
                         <Text style={styles.Text3}>{'Eligibility :'}</Text>
                          <HTMLView
                              value={details.eligibility.trim().replace(/\s+/g,' ')}
                              addLineBreaks={false}
                         /></View>
                         </View>}
           <View style={{height:30}}></View>
         </ScrollView>
       
         <StatusBar/>
     </View>
       
    )
}
export default FDList;