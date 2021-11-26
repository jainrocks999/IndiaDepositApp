import React,{useEffect} from "react";
import {View,Text,BackHandler,Image,ScrollView} from 'react-native';
import Header from '../../../component/compareHeader';
import styles from './styles';
import {useNavigation} from '@react-navigation/native'
import { TouchableOpacity } from "react-native";
import { useDispatch,useSelector } from 'react-redux';
import HTMLView from 'react-native-htmlview';
import axios from "axios";

const FDDetail=({route})=>{
const navigation=useNavigation()
const dispatch=useDispatch()
const selector=useSelector(state=>state.FDDetail)
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

const manageForm=async()=>{
     try {
          const data = new FormData();
          data.append('form_type','specific')
          data.append('form_for_id',details.fixed_deposit_id)
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
                         <Text style={styles.text}>{details.bankname}</Text>
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
                                  <Text style={styles.item}>{parseInt(details.maturity_amount).toFixed(0)}</Text>
                                  </View>
                                    <Text style={styles.item1}>{`Maturity Amount`}</Text>
                             </View>
                        </View>
                        <View style={styles.line}></View>
                        <View style={styles.container}>
                                <View style={styles.view2}>
                                     <Text style={styles.item}>{details.date_of_maturity}</Text>
                                     <Text style={styles.item1}>{`Date of Maturity`}</Text>
                                </View>
                                <View style={styles.view2}>
                                     <Text style={styles.item}>{details.interest_payout}</Text>
                                     <Text style={styles.item1}>{`Interest Payout`}</Text>
                                </View>
                                <View style={styles.view2}>
                                     <Text style={styles.item}>{details.type}</Text>
                                     <Text style={[styles.item1,{textAlign:'center'}]}>{`FD Type`}</Text>
                                </View>
                        </View>
                 </View>
                  {/* first row */}
                   <View style={styles.view4}>
                          <View style={styles.container}>
                                  <View style={styles.view2}>
                                       <Text style={styles.item}>{details.premature_penality}</Text>
                                       <Text style={[styles.item1,{textAlign:'center'}]}>{`Premature Penalty`}</Text>
                                 </View>
                                 <View style={styles.view2}>
                                     <Text style={styles.item}>{details.pan_required==0?'No':'Yes'}</Text>
                                     <Text style={styles.item1}>{`Pan Requirement`}</Text>
                                 </View>
                                 <View style={styles.view2}>
                                      <Text style={styles.item}>{details.sb_ac_require}</Text>
                                     <Text style={[styles.item1,{textAlign:'center'}]}>{`Savings A/c Required`}</Text>
                                 </View>
                          </View>
                          <View style={styles.line}></View>
                          <View style={styles.container}>
                                 <View style={styles.view2}>
                                      <Text style={styles.item}>{details.loan}</Text>
                                     <Text style={styles.item1}>{`Loan on  FD Rate`}</Text>
                                  </View>
                                  <View style={[styles.view2,{marginRight:165}]}>
                                       <Text style={styles.item}>{details.tds_limit}</Text>
                                       <Text style={styles.item1}>{`TDS`}</Text>
                                  </View>
                                 
                          </View>
                         
                     </View>
           
                       {/*  ButtonView */}
                      {/* <View style={styles.bank}>
                           <TouchableOpacity>

                               <Text style={styles.bankDetails}
                              //   onPress ={()=>navigation.navigate('BankCalu',{
                              //        type:details.bankname,
                              //        image:selector[0].bank_logo,
                              //       principal:details.principal_amount
                              //      }
                              //   )}
                                >BANK DETAILS</Text>
                          </TouchableOpacity>
                          <TouchableOpacity>
                               <Text style={styles.bankDetails}>DOWNLOAD FORM</Text>
                          </TouchableOpacity>
                      </View> */}
                      {/* Second row */}
                    { details.tds_info==null?<View/>:
                    <View style={styles.top}> 
                     <Text style={styles.tds}>TDS applicable with info of 15 G option :</Text>
                      <HTMLView
                              value={details.tds_info.trim().replace(/\s+/g,' ')}
                              addLineBreaks={false}
                         />
                         </View>}
                    
                          { details.salient_feature==null?<View/>:
                          <View style={styles.top}>  
                         <Text style={styles.tds}>{'Feature :'}</Text>
                          <HTMLView
                              value={details.salient_feature.trim().replace(/\s+/g,' ')}
                              addLineBreaks={false}
                         /></View>
                         }

                     { details.insuarance_terms==null?<View/>:
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
                         <View style={{marginBottom:80}}></View>
                        
                  
         </ScrollView>
         <View style={styles.button}>
            {details.fd_from=='setu'? 
                        <TouchableOpacity 
                         onPress={()=>navigation.navigate('FDView',{
                              amount:details.principal_amount,
                              tenure:route.params.tenure
                         })}
                         style={styles.btCont}>
                           <Text style={styles.text3}>CREATE FD</Text>
                         </TouchableOpacity>
                         :details.fd_from=='nbfc'?
                         <TouchableOpacity 
                         onPress={()=>navigation.navigate('SelectPlan',{
                              image:selector[0].bank_logo,
                              name:details.bankname,
                              amount:route.params.amount
                         })}
                         style={styles.btCont}>
                           <Text style={styles.text3}>CREATE FD</Text>
                         </TouchableOpacity>
                         :null}
                         <TouchableOpacity
                         onPress={()=>manageForm()}
                         style={styles.btCont}>
                           <Text style={styles.text3}>DOWNLOAD FORM</Text>
                         </TouchableOpacity>
                     </View>
        
     </View>
       
    )
}
export default FDDetail;