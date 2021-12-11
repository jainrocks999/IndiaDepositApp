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

const FDList=({route})=>{
const navigation=useNavigation()
const selector=useSelector((state)=>state.SBDetail)
const details=selector[0]

console.log('thsjfhsfjklghfjkladshdsjkhajkfhgjskd',details.debit_card_type);


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

const renderMab=()=>{
      if(route.params.branch_type=='Metropolitan'){
      return(
        <View>
          <Text style={styles.item}>{details.min_balance_metropolitan}</Text>
        </View>
      )
      }
      else if(route.params.branch_type=='Rural'){
        return(
          <View>
            <Text style={styles.item}>{details.min_balance_rural}</Text>
          </View>
        )
      }
      else if(route.params.branch_type=='Semiurban'){
        return(
          <View>
            <Text style={styles.item}>{details.min_balance_semiurban}</Text>
          </View>
        )
      }
      else if(route.params.branch_type=='Urban'){
        return(
          <View>
            <Text style={styles.item}>{details.min_balance_urban}</Text>
          </View>
        )
      }
    }

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
                               {/* <Image style={styles.rupay} source={require('../../../assets/Image/rupay.png')}/> */}
                                {renderMab()}
                          </View>
                          <Text style={styles.item1}>{`MAB`}</Text>
                       </View>
                       <View style={styles.undercard}>
                            <Text style={styles.item}>{details.locker_facility}</Text>
                            <Text style={styles.item1}>{`ATM Points`}</Text>
                        </View>
                  </View>
                  <View style={styles.line}></View>
                   <View style={styles.container}>
                         <View style={styles.undercard}>
                              <Text style={styles.item}>{''}</Text>
                              <Text style={styles.item1}>{`Interest Frequency`}</Text>
                         </View>
                         <View style={styles.undercard}>
                               <Text style={styles.item}>{details.nomination==0?'No':'Yes'}</Text>
                               <Text style={styles.item1}>{`Nomination`}</Text>
                         </View>
                         <View style={styles.undercard}>
                                  <Text style={styles.item}>{`${details.free_cheques} per annum`}</Text>
                                  <Text style={styles.item1}>{`Free Cheques`}</Text>
                            </View>
                        
                     </View>
            </View>
            {/* first row */}
         <View style={styles.second}>
                 <View style={styles.container}>
                          <View style={styles.undercard}>
                                <View style={styles.rup}> 
                                  {/* <Image style={styles.rupay} source={require('../../../assets/Image/rupay.png')}/> */}
                                   <Text style={styles.item}>{details.net_banking_operation==0?'No':'Yes'}</Text>
                              </View> 
                             <Text style={[styles.item1,{textAlign:'center'}]}>{`Net Banking Operation`}</Text>
                           </View>
                           <View style={styles.undercard}>
                                  <View style={styles.rup}>
                                      {/* <Image style={styles.rupay} source={require('../../../assets/Image/rupay.png')}/> */}
                                      <Text style={styles.item}>{details.joining_kit==0?'No':'Yes'}</Text>
                                  </View>
                                  <Text style={styles.item1}>{`Joining Kit`}</Text>
                            </View>
                            <View style={styles.undercard}>
                                  <Text style={styles.item}>{details.free_atm_transaction_homebank}</Text>
                                  <Text style={[styles.item1,{textAlign:'center'}]}>{`Free ATM Transaction Home`}</Text>
                            </View>
                  </View>
                  <View style={styles.line}></View>
                    <View style={styles.container}>
                            <View style={styles.undercard}>
                                  <Text style={styles.item}>{details.pan_required==0?'No':'Yes'}</Text>
                                  <Text style={styles.item1}>{`ECS/IMPS/NEFT/RTGS`}</Text>
                            </View>
                            <View style={styles.undercard}>
                                 <Text style={styles.item}>{details.debit_card_type}</Text>
                                 <Text style={styles.item1}>{`Debit Card`}</Text>
                           </View>
                            <View style={styles.undercard}>
                                   <View style={styles.rup}>
                                        {/* <Image style={styles.rupay} source={require('../../../assets/Image/rupay.png')}/> */}
                                        <Text style={styles.item}>{details.phone_banking==0?'No':'Yes'}</Text>
                                    </View>
                                   <Text style={[styles.item1,{textAlign:'center'}]}>{`Phone Banking`}</Text>
                             </View>
                    </View>
                    <View style={styles.line}></View>
                    <View style={styles.container}>
                          
                            <View style={styles.undercard}>
                                 <Text style={styles.item}>{details.locker_facility==0?'No':'Yes'}</Text>
                                 <Text style={styles.item1}>{`Locker Facility`}</Text>
                                 <Text style={[styles.item,{textAlign:'center'}]}>{'subject to availiblity at branch'}</Text>
                           </View>
                            <View style={styles.undercard}>
                                   <View style={styles.rup}>
                                        {/* <Image style={styles.rupay} source={require('../../../assets/Image/rupay.png')}/> */}
                                        <Text style={styles.item}>{details.cash_transaction_limit_atm}</Text>
                                    </View>
                                   <Text style={[styles.item1,{textAlign:'center'}]}>{`Cash Transaction Limit ATM`}</Text>
                                   <Text style ={[styles.item,{textAlign:'center'}]}>{'subject to ATM at branch'}</Text>
                             </View>
                             <View style={styles.undercard}>
                                 <Text style={styles.item}>{details.pan_required==0?'No':'Yes'}</Text>
                                 <Text style={styles.item1}>{`Pan Card Required`}</Text>
                                 <Text style={[styles.item,{textAlign:'center'}]}>
                        {'If you don’t have PAN card then you will need to fill Form 16'}</Text>
                           </View>
                    </View>
                    <View style={styles.line}></View>
                    <View style={styles.container}>
                            {/* <View style={styles.undercard}>
                                  <Text style={styles.item}>{details.salient_feature}</Text>
                                  <Text style={styles.item1}>{`Salient Feature`}</Text>
                            </View> */}
                            {/* <View style={styles.undercard}>
                                 <Text style={styles.item}>{details.insuarance_accidental_feature==null?0:details.insuarance_accidental_feature}</Text>
                                 <Text style={[styles.item1,{textAlign:'center'}]}>{`Insuarance Accidental\nFeature`}</Text>
                           </View> */}
                            <View style={styles.undercard}>
                                   <View style={styles.rup}>
                                        {/* <Image style={styles.rupay} source={require('../../../assets/Image/rupay.png')}/> */}
                                        <Text style={styles.item}>{details.free_atm_transaction_homebank}</Text>
                                    </View>
                                   <Text style={[styles.item1,{textAlign:'center'}]}>{`Free Atm Transaction Homebank`}</Text>
                             </View>
                             <View style={styles.undercard}>
                                  <Text style={styles.item}>{details.free_atm_transaction_otherbank}</Text>
                                  <Text style={[styles.item1,{textAlign:'center'}]}>{`Free Atm Transaction Otherbank`}</Text>
                            </View>
                            <View style={styles.undercard}>
                                  <Text style={styles.item}>{details.cash_withdrawal_limit}</Text>
                                  <Text style={[styles.item1,{textAlign:'center'}]}>{`Cash Withdrawal Limit Branch`}</Text>
                            </View>
                            <View style={styles.undercard}>
                            <Text style={[styles.item,{marginRight:10}]}></Text>
                                  <Text style={[styles.item1,{textAlign:'center'}]}></Text>
                            </View>
                           
                    </View>
                    <View style={styles.line}></View>
                    <View style={styles.container}>
                           
                           
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
                  { details.tds_info==null||details.tds_info==''?<View/>:
                    <View style={styles.top}>
                          <View>  
                         <Text style={styles.tds}>{'TDS applicable with info of 15 G option :'}</Text>
                          <HTMLView
                              value={details.tds_info.trim().replace(/\s+/g,' ')}
                              addLineBreaks={false}
                         /></View>
                     </View>}
                    { details.salient_feature==null||details.salient_feature==''?<View/>:
                       <View style={styles.top}>
                          <View>  
                         <Text style={styles.tds}>{'Salient feature :'}</Text>
                          <HTMLView
                              value={details.salient_feature.trim().replace(/\s+/g,' ')}
                              addLineBreaks={false}
                          />
                         </View>
                        </View>
                         }
                     { details.eligibility==null||details.eligibility==''?<View/>:
                        <View style={[styles.top]}>
                          <View>  
                         <Text style={styles.Text3}>{'Eligibility :'}</Text>
                          <HTMLView
                              value={details.eligibility.trim().replace(/\s+/g,' ')}
                              addLineBreaks={false}
                         /></View>
                         </View>}

                         { details.insuarance_accidental_feature==null||details.insuarance_accidental_feature==''?<View/>:
                        <View style={[styles.top]}>
                          <View>  
                         <Text style={styles.Text3}>{'Insuarance Accidental Feature	 :'}</Text>
                          <HTMLView
                              value={details.insuarance_accidental_feature.trim().replace(/\s+/g,' ')}
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