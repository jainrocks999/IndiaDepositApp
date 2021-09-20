import React,{useEffect} from "react";
import {View,Text,FlatList,Image,ScrollView} from 'react-native';
import Header from '../../../component/compareHeader';
import colors from '../../../component/colors';
import styles from './styles';
import {useNavigation} from '@react-navigation/native'
import { TouchableOpacity } from "react-native";
import { useDispatch } from 'react-redux';
import Storage from '../../../component/AsyncStorage';
import AsyncStorage from '@react-native-community/async-storage';
const FDList=()=>{
const navigation=useNavigation()
const dispatch=useDispatch()

useEffect(async()=>{
     const user_id=await AsyncStorage.getItem(Storage.user_id)
     dispatch({
          type: 'Bank_List_Request',
          url: 'userbanklist',
          user_id
        })     
})
    return(
        <View style={styles.container1}>
                       <Header
                         title={'FD DETAILS'}
                         source={require('../../../assets/Images/arrow.png')}
                         //titleTwo='Compare'
                         onPress={()=>navigation.goBack()}
                         //onPress1={()=>navigation.navigate('CompareFD')}
                       /> 
             <ScrollView>
                 <View>
                     <View style={styles.list}>
                         <Image style={styles.img} 
                         source={require('../../../assets/Image/sbi.png')}/>
                         <Text onPress={()=>navigation.navigate('CompareFD')}style={styles.text}>Regular Fixed Deposit</Text>
                         <Text style={styles.text1}>Fixed Deposit</Text>
                     </View>
                 </View>
                 <View style={styles.view1}>
                        <View style={styles.container}>
                              <View style={styles.view2}>
                                 <View style={{flexDirection:'row'}}>
                                    <Image style={styles.rupay} source={require('../../../assets/Image/rupay.png')}/>
                                  <Text style={styles.item}>{`1 Lakh`}</Text>
                                  </View>
                                  <Text style={styles.item1}>{`Principal Amount`}</Text>
                              </View>
                              <View style={styles.view2}>
                                   <Text style={styles.item}>{`6%`}</Text>
                                   <Text style={styles.item1}>{`Interest Rate`}</Text>
                             </View>
                              <View style={styles.view2}>
                                   <View style={{flexDirection:'row'}}>
                                    <Image style={styles.rupay} source={require('../../../assets/Image/rupay.png')}/>
                                  <Text style={styles.item}>{`106 Lakh`}</Text>
                                  </View>
                                    <Text style={styles.item1}>{`Maturity Amount`}</Text>
                             </View>
                        </View>
                        <View style={styles.line}></View>
                        <View style={styles.container}>
                                <View style={styles.view2}>
                                     <Text style={styles.item}>{`14-july-22`}</Text>
                                     <Text style={styles.item1}>{`Date of Maturity`}</Text>
                                </View>
                                <View style={styles.view2}>
                                     <Text style={styles.item}>{`Monthly`}</Text>
                                     <Text style={styles.item1}>{`Interest Payout`}</Text>
                                </View>
                                <View style={styles.view2}>
                                     <Text style={styles.item}>{`Bank Deposit`}</Text>
                                     <Text style={[styles.item1,{textAlign:'center'}]}>{`FD Type`}</Text>
                                </View>
                        </View>
                 </View>
                  {/* first row */}
                   <View style={styles.view4}>
                          <View style={styles.container}>
                                  <View style={styles.view2}>
                                       <Text style={styles.item}>{`10%`}</Text>
                                       <Text style={[styles.item1,{textAlign:'center'}]}>{`Premature Penalty`}</Text>
                                 </View>
                                 <View style={styles.view2}>
                                     <Text style={styles.item}>{`Yes`}</Text>
                                     <Text style={styles.item1}>{`Pan Requirement`}</Text>
                                 </View>
                                 <View style={styles.view2}>
                                      <Text style={styles.item}>{`Yes`}</Text>
                                     <Text style={[styles.item1,{textAlign:'center'}]}>{`Savings A/c Required`}</Text>
                                 </View>
                          </View>
                          <View style={styles.line}></View>
                          <View style={styles.container}>
                                 <View style={styles.view2}>
                                      <Text style={styles.item}>{`8%`}</Text>
                                     <Text style={styles.item1}>{`Loan on  FD Rate`}</Text>
                                  </View>
                                  <View style={[styles.view2,{marginRight:165}]}>
                                       <Text style={styles.item}>{`N/A`}</Text>
                                       <Text style={styles.item1}>{`TDS`}</Text>
                                  </View>
                                 
                          </View>
                         
                     </View>
           
                       {/*  ButtonView */}
                      <View style={styles.bank}>
                           <TouchableOpacity 
                           onPress={()=>navigation.navigate('BankDetail')}
                         //   onPress={()=>navigation.navigate('NomineeList')}
                           >

                               <Text style={styles.bankDetails}>BANK DETAILS</Text>
                          </TouchableOpacity>
                          <TouchableOpacity>
                               <Text style={styles.bankDetails}>DOWNLOAD FORM</Text>
                          </TouchableOpacity>
                      </View>
                      {/* Second row */}
                      <View style={styles.top}>
                           <Text style={styles.tds}>TDS applicable with info of 15 G option :</Text>
                         <Text style={styles.lorem}>
                            TDS is applicable to various interest income a taxpayer
                            earns during the financial year. There are many
                            taxpayers who have an income that is eligible for TDS
                            deduction but the total tax payable in a financial year
                            is nil.
                          </Text>
                       </View>
                       <View style={styles.top}>
                          <Text style={styles.tds}>Feature :</Text>
                          <View style={styles.view3}>
                               <View style={styles.point}></View>
                                  <Text style={styles.pointText}>
                                     {`The returns on your deposit are assured and remain\nunaffected by market fluctuations.`}
                                  </Text> 
                         </View>
                               <View style={styles.view3}> 
                                       <View style={styles.point}></View>
                                            <Text style={styles.pointText}>
                                               {`The returns on your deposit are assured and remain\nunaffected by market fluctuations.`}
                                            </Text> 
                                </View>
                                 <View style={styles.view3}> 
                                        <View style={styles.point}></View>
                                            <Text style={styles.pointText}>
                                                {`The returns on your deposit are assured and remain\nunaffected by market fluctuations.`}
                                             </Text> 
                                     </View>
                     </View>

                     <View style={styles.top}>
                           <Text style={styles.tds}>Insurance :</Text>
                           <Text style={styles.lorem}>
                             Lorem Ipsum is simply dummy text of the printing and 
                             typesetting industry. Lorem Ipsum has been the
                             industry's standard dummy text ever since the 1500s,
                             when an unknown printer took a galley.
                         </Text>
                         <View style={styles.view3}>
                              <View style={styles.point}></View>
                               <Text style={styles.pointText}>
                                  {`The returns on your deposit are assured and remain\nunaffected by market fluctuations.`}
                               </Text> 
                         </View>
                         <View style={styles.view3}>
                               <View style={styles.point}></View>
                                  <Text style={styles.pointText}>
                                    {`The returns on your deposit are assured and remain\nunaffected by market fluctuations.`}
                                 </Text> 
                         </View>
                     </View>

                      <View style={styles.top}>
                          <Text style={styles.tds}>Eligibility :</Text>
                         <Text style={styles.lorem}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                            sed do eiusmod tempor incididunt ut labore et dolore
                            magna aliqua. Ut enim ad minim veniam, quis nostrud
                            exercitation ullamco laboris nisi ut aliquip ex ea comm
                            odo consequat. Duis aute irure dolor in reprehenderit in 
                            voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                            Excepteur sint occaecat cupidatat non proident, sunt in
                            culpa qui officia deserunt mollit anim id est laborum.
                         </Text>
                      </View>
                     <View style={styles.button}>
                         <TouchableOpacity style={styles.btCont}>
                           <Text style={styles.text3}>CREATE FD</Text>
                         </TouchableOpacity>
                         <TouchableOpacity style={styles.btCont}>
                           <Text style={styles.text3}>DOWNLOAD FORM</Text>
                         </TouchableOpacity>
                     </View>
         </ScrollView>
        
     </View>
       
    )
}
export default FDList;