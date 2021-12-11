import React,{useEffect} from "react";
import {View,Text,BackHandler,Image,ScrollView} from 'react-native';
import Header from '../../../component/compareHeader';
import styles from './styles';
import {useNavigation} from '@react-navigation/native'
import { TouchableOpacity } from "react-native";
import { useDispatch,useSelector } from 'react-redux';
import HTMLView from 'react-native-htmlview';
import axios from "axios";
import colors from '../../../component/colors';

const FDDetail=({route})=>{
const navigation=useNavigation()
const dispatch=useDispatch()
const selector=useSelector(state=>state.FDDetail)
const details=selector[0]

const [yyyy ,mm ,dd]=details.date_of_maturity.split('-')
const value=`${dd}-${mm}-${yyyy}`
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
console.log('this .dslkffgglgkgklflkflkdld',details.type,details.bank_id);
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
            url: 'https://demo.webshowcase-india.com/indiadeposit/public/apis/getform',
          });
          if (response.data.status==200) {
               navigation.navigate('FD_FORM',{
                id:details.fixed_deposit_id,
                from:'fixeddeposit',
                response:response.data.data,
                type:'common'
               })
          } 
        } catch (error) {
         throw error;
        }
}
    return(
        <View style={styles.container1}>
                       <Header
                         title={'FD DETAILS'}
                         source={require('../../../assets/Image/arrow2.png')}
                         onPress={()=>navigation.goBack()}
                       /> 
                       <View>
                     <View style={styles.list}>
                         <Image  resizeMode='contain'
                       style={{height:20,width:80}}
                         source={{uri:`https://demo.webshowcase-india.com/indiadeposit/writable/uploads/bank/${selector[0].bank_logo}`}}/>
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
                                        {/* ${route.params.year}y, 
                                     ${route.params.month}m, 
                                     ${route.params.days}d */}
                                     <Text style={styles.item1}>{`Tenure`}</Text>
                                </View>
                                <View style={styles.view2}>
                                     <Text style={styles.item}>{details.interest_payout==0?'No':'Yes'}</Text>
                                     <Text style={styles.item1}>{`Interest Payout`}</Text>
                                </View>
                                <View style={styles.view2}>
                                     <Text style={styles.item}>{details.type}</Text>
                                     <Text style={[styles.item1,{textAlign:'center'}]}>{`FD Type`}</Text>
                                </View>
                        </View>
                 </View>
                  {/* first row */}
                  <View style={styles.line}></View>
                   <View style={styles.view4}>
                          {/* <View style={styles.container}>
                                  <View style={[styles.view2]}>
                                       <Text style={styles.item}>{`${details.premature_withdrawals==0?'No':details.premature_withdrawals==1?
                                       `${details.premature_withdrawal_rate>details.rate?details.rate:details.premature_withdrawal_rate}%`:null}`}</Text>
                                       <View style={{width:'100%'}}>
                                       <Text style={[styles.item1,{textAlign:'center'}]}>{`Premature Withdrawal Rate`}</Text>
                                       <Text style={[styles.item,{textAlign:'center'}]}>{details.premature_withdrawals==1?`${details.premature_withdrawal_rate}% below intrest rate at the time of FD contract or Rate of intrest as per tenure which ever is lower`:''}</Text>

                                       </View>
                                 </View>
                                 <View style={styles.view2}> 
                                     <Text style={styles.item}>{details.pan_required==0?'No':details.pan_required==1?'Yes':''}</Text>
                                     <Text style={styles.item1}>{`Pan Requirement`}
                                     </Text>
                                     <Text style={[styles.item,{textAlign:'center'}]}>{details.pan_required==1?'Mandatory above Deposit of RS 500000/-':''}</Text>
                                 </View>
                                 <View style={styles.view2}>
                                      <Text style={styles.item}>{details.loan==0?'No':'Yes'}</Text>
                                     <Text style={styles.item1}>{`Loan Rate`}</Text>
                                     <Text style={[styles.item,{textAlign:'center'}]}>{details.loan==1?`${details.load_lending_rate}% above interest rate at the time of FD contract`:''}</Text>

                                  </View>
                                
                          </View>
                          <View style={styles.line}></View> */}
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
                                       <Text style={styles.item}>{parseInt(details.loanamount)>parseInt(details.tds_limit)?'Yes':'No'}</Text>
                                       <Text style={styles.item1}>{`TDS`}</Text>
                                       {/* <Text style={styles.item1}>{details.loanamount}</Text>
                                       <Text style={styles.item1}>{details.tds_limit}</Text> */}
                                  </View>
                                  }
                                 <View/>
                                
                          </View>
                     </View>
                     
           
                    { details.tds_info==null||details.tds_info==''?<View/>:
                    <View style={styles.top}> 
                     <Text style={styles.tds}>TDS applicable with info of 15 G option :</Text>
                      <HTMLView
                              value={details.tds_info.trim().replace(/\s+/g,' ')}
                              addLineBreaks={false}
                         />
                         </View>}
                    
                          { details.salient_feature==null||details.salient_feature==''?<View/>:
                          <View style={styles.top}>  
                         <Text style={styles.tds}>{'Feature :'}</Text>
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
                     <Text style={styles.tds}>Pan Requirement:</Text>
                     <Text>{`${details.pan_required==0?'No':details.pan_required==1?'Yes - Mandatory above Deposit of RS 500000/-':''}`}</Text>
                         </View>}

                         { details.premature_withdrawals==null||details.premature_withdrawals==''?<View/>:
                    <View style={styles.top}> 
                     <Text style={styles.tds}>Premature Withdrawal Rate :</Text>
                     <Text style={{fontSize:14,color:colors.textColor}}>{`${details.premature_withdrawals==0?'No':details.premature_withdrawals==1?
                                       `Yes - ${details.premature_withdrawal_rate}% below intrest rate at the time of FD contract or Rate of intrest as per tenure which ever is lower`:null}`}</Text>
                     {/* <Text>{details.premature_withdrawals==0?'No':details.premature_withdrawals?'Yes':''}</Text> */}
                         </View>}

                         { details.loan==null||details.loan==''?<View/>:
                    <View style={styles.top}> 
                     <Text style={styles.tds}>Loan Rate :</Text>
                     <Text style={{fontSize:14,color:colors.textColor}}>{details.loan==1?`Yes - ${details.load_lending_rate}% above interest rate at the time of FD contract`:details.loan==0?'No':''}</Text></View>}
                         <View style={{marginBottom:80}}></View>
                        
                  
         </ScrollView>
         <View style={styles.button}>
            {details.fd_from=='setu'? 
                        <TouchableOpacity 
                         onPress={()=>navigation.navigate('FDView',{
                              amount:details.principal_amount,
                              tenure:route.params.tenure
                         })}
                         style={[styles.btCont,{width:'48%'}]}>
                           <Text style={styles.text3}>CREATE FD</Text>
                         </TouchableOpacity>
                         :details.fd_from=='nbfc'?
                         <TouchableOpacity 
                         onPress={()=>navigation.navigate('SelectPlan',{
                              image:selector[0].bank_logo,
                              name:details.bankname,
                              amount:route.params.amount
                         })}
                         style={[styles.btCont,{width:'48%'}]}>
                           <Text style={styles.text3}>CREATE FD</Text>
                         </TouchableOpacity>
                         :null}
                         <TouchableOpacity
                         onPress={()=>manageForm()}
                         style={[styles.btCont,{width:details.fd_from=='nbfc'||details.fd_from=='setu'?'48%':'96%'}]}>
                           <Text style={styles.text3}>DOWNLOAD FORM</Text>
                         </TouchableOpacity>
                     </View>
        
     </View>
       
    )
}
export default FDDetail;