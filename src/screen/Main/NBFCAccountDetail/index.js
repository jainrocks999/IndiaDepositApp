import React,{useEffect} from "react";
import {View,Text,BackHandler,Image,ScrollView} from 'react-native';
import Header from '../../../component/compareHeader';
import styles from './styles';
import {useNavigation} from '@react-navigation/native'
import { TouchableOpacity } from "react-native";
import { useSelector } from 'react-redux';
import HTMLView from 'react-native-htmlview';
import axios from "axios";
import colors from '../../../component/colors';
import AsyncStorage from "@react-native-community/async-storage";
import Storage from '../../../component/AsyncStorage';
import Constants from '../../../component/Constants';
import Toast from 'react-native-simple-toast';
import BottomTab from '../../../component/StoreButtomTab';

const FDDetail=({route})=>{
const navigation=useNavigation()
const selector=useSelector(state=>state.NBFCDetail)
const details=selector[0]
console.log('this is user detail for test',details);
const period=((parseFloat(route.params.year)*365+parseFloat(route.params.month)*30+parseFloat(route.params.days))/365).toFixed(2)
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
const manageForm=async()=>{
     try {
          const data = new FormData();
          data.append('form_type',
          details.type=='Regular'?'fdRegular':
          details.type=='Senior Citizen'?'FDSenior Citizen':
          details.type=='NRI'?'FDNRI':
          details.type=='Tax Saving'?'FDTax Saving':''
          )
          data.append('bank_id',details.bank_id)
          data.append('from_for','fixeddeposit')

          const response = await axios({
            method: 'POST',
            data,
            headers: {
              'content-type': 'multipart/form-data',
              Accept: 'multipart/form-data',
            },
            url: 'https://indiadeposit.in/admin/public/apis/getform',
          });
          if (response.data.status==200) {
               navigation.navigate('FD_FORM',{
                id:details.fixed_deposit_id,
                from:'fixeddeposit',
                response:response.data.data,
                type:'common',
                bank_id:details.bank_id,
                pincode:route.params.pincode
               })
             } 
        } catch (error) {
         throw error;
        }
}


const createFD=async()=>{
const user_id=await AsyncStorage.getItem(Storage.user_id)
     try {
          const data = new FormData();
          data.append('bank_id',details.bank_id)
          data.append('user_id',user_id)
          data.append('type1',details.type)
          data.append('fd_from',details.fd_from)
          const response = await axios({
            method: 'POST',
            data,
            headers: {
              'content-type': 'multipart/form-data',
              Accept: 'multipart/form-data',
            },
            url: 'https://indiadeposit.in/admin/public/apis/getnbfc',
          });
          if(response.data.messages=='No data found'){
             Toast.show('No data found')
          }
         else if (response.data.status==200) {
               navigation.navigate('SelectPlan',{
                    image:selector[0].bank_logo,
                    name:details.bankname,
                    amount:route.params.amount,
                    type:details.type,
                    data:response.data.data,
                    rate:details.rate,
                    fixed_deposit_id:details.fixed_deposit_id,
                    fd_from:details.fd_from,
                    period:route.params.month==0&&route.params.days==0?route.params.year:period,
                    month:route.params.month,
                    years:route.params.year,
                    days:route.params.days,
                    lockin_period:details.lockin_period,
                    rating:details.rating
               })
             } 
        } catch (error) {
         throw error;
        }
    
}

    return(
        <View style={styles.container1}>
                       <Header
                         title={'NBFC DETAILS'}
                         source={require('../../../assets/Image/arrow2.png')}
                         onPress={()=>navigation.goBack()}
                       /> 
                       <View>
                     <View style={styles.list}>
                         <Image  resizeMode='contain'
                       style={{height:20,width:80}}
                         source={{uri:`${Constants.imageUrl}${selector[0].bank_logo}`}}/>
                         <Text style={styles.text}>{details.type}</Text>
                         {/* <Text style={styles.text1}>Fixed Deposit</Text> */}

                     </View>
                 </View>
             <ScrollView>
                 
                 <View style={styles.view1}>
                        <View style={styles.container}>
                              <View style={styles.view2}>
                                 <View style={{flexDirection:'row'}}>
                                    <Image style={styles.rupay} source={require('../../../assets/Image/rupay.png')}/>
                                  <Text style={styles.item}>{ parseInt(details.principal_amount).toFixed(0)}</Text>
                                  </View>
                                  <Text style={styles.item1}>{`Principal Amount`}</Text>
                              </View>
                              <View style={styles.view2}>
                                   <Text style={styles.item}>{details.rate}%</Text>
                                   <Text style={styles.item1}>{`Interest Rate`}</Text>
                             </View>
                              <View style={styles.view2}>
                                   <View style={{flexDirection:'row'}}>
                                      <Image style={styles.rupay} source={require('../../../assets/Image/rupay.png')}/>
                                   <Text style={styles.item}>
                                       {(details.principal_amount* Math.pow((1 + (details.rate/ (100))), (period))).toFixed(0)}
                                       </Text>
                                  </View>
                                    <Text style={styles.item1}>{`Maturity Amount`}</Text>
                             </View>
                        </View>
                        <View style={styles.line}></View>
                        <View style={styles.container}>
                                <View style={styles.view2}>
                                     <Text style={styles.item}>{`${route.params.year>0?`${route.params.year}y`:''}${route.params.month>0?` ${route.params.month}m`:''}${route.params.days>0?` ${route.params.days}d`:''}`}</Text>
                                     <Text style={styles.item1}>{`Tenure`}</Text>
                                </View>
                                <View style={styles.view2}>
                                     <Text style={styles.item}>{`${details.lockin_period == null ? '' : details.lockin_period} days` }</Text>
                                     <Text style={styles.item1}>{`Lockin Period`}</Text>
                                </View>
                                <View style={styles.view2}>
                                     <Text style={styles.item}>{details.type}</Text>
                                     <Text style={[styles.item1,{textAlign:'center'}]}>{`FD Type`}</Text>
                                </View>
                        </View>
                 </View>
                
                  <View style={styles.line}></View>
                   <View style={styles.view4}>
                        
                          <View style={styles.container}>
                              
                                  <View style={styles.view2}>
                                      <Text style={styles.item}>{details.sb_ac_require==0?'No':'Yes'}</Text>
                                     <Text style={[styles.item1,{textAlign:'center'}]}>{`Savings A/c Required`}</Text>
                                 </View>
                                  <View style={[styles.view2]}>
                                       <Text style={styles.item}>{details.security}</Text>
                                       <Text style={styles.item1}>{`Security`}</Text>
                                  </View>
                                  <View style={[styles.view2]}>
                                       <Text style={styles.item}>{details.nomination==0?'No':'Yes'}</Text>
                                       <Text style={styles.item1}>{`Nomination`}</Text>
                                  </View>
                          </View>
                     </View>
                     <View style={styles.line}></View>
                     <View style={styles.view4}>
                          <View style={styles.container}>
                                  <View style={styles.view2}>
                                       <Text style={styles.item}>{details.net_banking_operation==0?'No':'Yes'}</Text>
                                       <Text style={[styles.item1,{textAlign:'center'}]}>{`Net Banking Operation`}</Text>
                                 </View>
                                 <View style={styles.view2}>
                                     <Text style={styles.item}>{details.flexi_auto_sweep==0?'No':'Yes'}</Text>
                                     <Text style={styles.item1}>{`Flexi/Auto sweep`}</Text>
                                 </View>
                                {details.tds_limit==null?
                                 <View style={[styles.view2,{marginRight:0}]}>
                                 <Text style={styles.item}>{'No'}</Text>
                                 <Text style={styles.item1}>{`TDS`}</Text>
                                </View>
                                :
                                 <View style={[styles.view2,{marginRight:0}]}>
                                       <Text style={styles.item}>{details.rating}</Text>
                                       <Text style={styles.item1}>{`FI Rating`}</Text>
                                  </View>
                                  }
                                 <View/>
                                
                          </View>
                     </View>
                    
                   
           
                    { details.tds_info==null||details.tds_info==''?<View/>:
                    <View style={styles.top}> 
                     <Text style={styles.tds}>Is TDS Applicable? </Text>
                      <HTMLView
                              value={details.tds_info.trim().replace(/\s+/g,' ')}
                              addLineBreaks={false}
                         />
                         </View>}
                    
                          { details.salient_feature==null||details.salient_feature==''?<View/>:
                          <View style={styles.top}>  
                         <Text style={styles.tds}>{'Features :'}</Text>
                          <HTMLView
                              value={details.salient_feature.trim().replace(/\s+/g,' ')}
                              addLineBreaks={false}
                         /></View>
                         }

                     { details.insuarance_terms==null||details.insuarance_terms==''?<View/>:
                          <View style={styles.top}>  
                         <Text style={styles.tds}>{'Insurance :'}</Text>
                          <HTMLView
                              value={details.insuarance_terms.trim().replace(/\s+/g,' ')}
                              addLineBreaks={false}
                         /></View>
                         }

                      { details.eligibility==''||null?<View/>:
                          <View style={styles.top}>   
                         <Text style={styles.tds}>{'Eligibility :'}</Text>
                          <HTMLView
                              value={details.eligibility.trim().replace(/\s+/g,' ')}
                              addLineBreaks={false}
                         /></View>
                         }

               { details.pan_required==null||details.pan_required==''?<View/>:
                    <View style={styles.top}> 
                     <Text style={styles.tds}>Pan Required?</Text>
                     <Text>{`${details.pan_required==0?'No':details.pan_required==1?'Yes - Mandatory above Deposit of Rs to ₹500000/-':''}`}</Text>
                         </View>}

                         { details.premature_withdrawals==null||details.premature_withdrawals==''?<View/>:
                    <View style={styles.top}> 
                     <Text style={styles.tds}>Premature Withdrawal Available?</Text>
                     <Text style={{fontSize:14,color:colors.textColor}}>{`${details.premature_withdrawals==0?'No':details.premature_withdrawals==1?
                                       `Yes - ${details.premature_withdrawal_rate==null?0:details.premature_withdrawal_rate}% below interest rate at the time of FD contract or Rate of interest as per tenure which ever is lower`:null}`}</Text>
                     {/* <Text>{details.premature_withdrawals==0?'No':details.premature_withdrawals?'Yes':''}</Text> */}
                         </View>}

                         { details.loan==null||details.loan==''?<View/>:
                    <View style={styles.top}> 
                     <Text style={styles.tds}>Loan Rate :</Text>
                     <Text style={{fontSize:14,color:colors.textColor}}>{details.loan==1?`Yes - ${details.load_lending_rate==null?0:details.load_lending_rate}% above interest rate at the time of FD contract`:details.loan==0?'No':''}</Text></View>}
                   
                     { details.tds_limit==null||details.loanamount==''?<View/>:
                     <View style={styles.top}> 
                     <Text style={styles.tds}>TDS :</Text>
                     <Text style={{fontSize:14,color:colors.textColor}}>{parseInt(details.loanamount)>parseInt(details.tds_limit)?'Yes':'No'}</Text></View>}
                       

                     
                         <View style={{marginBottom:80}}></View>
                        
                  
         </ScrollView>
         <View style={{backgroundColor:'#fff',width:'100%',height:75}}>
         <View style={styles.button}>
            {/* {details.fd_from=='setu'? 
                        <TouchableOpacity 
                         onPress={()=>navigation.navigate('FDView',{
                              amount:details.principal_amount,
                              tenure:route.params.tenure
                         })}
                         style={[styles.btCont,{width:'48%'}]}>
                           <Text style={styles.text3}>CREATE FD</Text>
                         </TouchableOpacity>
                         :details.fd_from=='nbfc'?
                        
                         :null} */}
                        {details.fd_from=='offline'?
                        <TouchableOpacity
                        onPress={()=>manageForm()}
                        style={[styles.btCont,
                        {width:details.fd_from=='nbfc'||details.fd_from=='setu'?'48%':'96%'}
                        ]}>
                          <Text style={styles.text3}>DOWNLOAD FORM</Text>
                        </TouchableOpacity>:
                        <TouchableOpacity 
                          delayPressIn={0}
                         onPress={()=>createFD()}
                         style={[styles.btCont,{width:'96%'}]}>
                           <Text style={styles.text3}>CREATE FD</Text>
                         </TouchableOpacity>
                         }
                     </View>
           </View>
           <BottomTab/>
           
     </View>
       
    )
}
export default FDDetail;


