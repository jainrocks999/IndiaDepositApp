import React from "react";
import {View,Text,FlatList,Image,ScrollView} from 'react-native';
import Header from '../../../component/compareHeader';
import colors from '../../../component/colors';
import styles from './styles';
import {useNavigation} from '@react-navigation/native'
import { TouchableOpacity } from "react-native";
import StatusBar from '../../../component/StatusBar';
import BottomTab from '../../../component/StoreButtomTab';
const data=[
      
]
const FDList=()=>{
const navigation=useNavigation()
 return(
       <View style={styles.container1}>
         <Header
          title={'SB A/C DETAILS'}
          source={require('../../../assets/Image/arrow.png')}
         // titleTwo='Compare'
          onPress={()=>navigation.goBack()}
         // onPress1={()=>navigation.navigate('CompareFD')}
         /> 
    <ScrollView style={{flex:1,paddingHorizontal:15,paddingVertical:20, marginBottom:10}}>
             <View>
                 <View style={styles.list}>
                     <Image style={styles.img} source={require('../../../assets/Image/sbi.png')}/>
                     <Text  onPress={()=>navigation.navigate('CompareFD')} style={styles.Text1}>Saving Account</Text>
                     <Text style={styles.Text2}>Account</Text>
                 </View>
              </View>
             <View style={styles.card}>
                 <View style={styles.container}>
                      <View style={styles.undercard}>
                          <Text style={styles.item}>{`6%`}</Text>
                          <Text style={styles.item1}>{`Interest Rate`}</Text>
                      </View>
                     <View style={styles.undercard}>
                           <View style={styles.rup}>
                               <Image style={styles.rupay} source={require('../../../assets/Image/rupay.png')}/>
                                <Text style={styles.item}>{`300`}</Text>
                          </View>
                          <Text style={styles.item1}>{`Non-Maintenance Penalty`}</Text>
                       </View>
                       <View style={styles.undercard}>
                            <Text style={styles.item}>{`Yes`}</Text>
                            <Text style={styles.item1}>{`Locker Facility`}</Text>
                        </View>
                  </View>
                  <View style={styles.line}></View>
                   <View style={styles.container}>
                         <View style={styles.undercard}>
                              <Text style={styles.item}>{`Yes`}</Text>
                              <Text style={styles.item1}>{`Joining Kit`}</Text>
                         </View>
                         <View style={styles.undercard}>
                               <Text style={styles.item}>{`Yes`}</Text>
                               <Text style={styles.item1}>{`Net banking`}</Text>
                         </View>
                         <View style={styles.undercard}>
                                <Text style={styles.item}>{`Yes`}</Text>
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
                                   <Text style={styles.item}>{`1 Lakh`}</Text>
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
                                  <Text style={styles.item}>{`3`}</Text>
                                  <Text style={[styles.item1,{textAlign:'center'}]}>{`Atm Free no of\nTransaction`}</Text>
                            </View>
                  </View>
                  <View style={styles.line}></View>
                    <View style={styles.container}>
                            <View style={styles.undercard}>
                                  <Text style={styles.item}>{`Yes`}</Text>
                                  <Text style={styles.item1}>{`Pan requirement`}</Text>
                            </View>
                            <View style={styles.undercard}>
                                 <Text style={styles.item}>{`15`}</Text>
                                 <Text style={styles.item1}>{`Bank Atm points`}</Text>
                           </View>
                            <View style={styles.undercard}>
                                   <View style={styles.rup}>
                                        <Image style={styles.rupay} source={require('../../../assets/Image/rupay.png')}/>
                                        <Text style={styles.item}>{`100`}</Text>
                                    </View>
                                   <Text style={styles.item1}>{`ATM transaction\ncharges`}</Text>
                             </View>
                    </View>
                    <View style={styles.line}></View>
                    <View style={styles.container}>
                           <View style={styles.undercard}>
                                 <View style={styles.rup}>
                                      <Image style={styles.rupay} source={require('../../../assets/Image/rupay.png')}/> 
                                       <Text style={styles.item}>{`150`}</Text>
                                 </View>
                               <Text style={styles.item1}>{`ATM Free transaction\nfrom other bank`}</Text>
                         </View>
                     </View>
            </View>
               {/*  ButtonView */}
            <View style={styles.bank}>
                 <TouchableOpacity>
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
               <View style={styles.Textview}>
                   <View style={styles.point}></View>
                      <Text style={styles.pointText}>
                          {`The returns on your deposit are assured and remain\nunaffected by market fluctuations.`}
                      </Text> 
               </View>
               <View style={styles.Textview}>
                    <View style={styles.point}></View>
                       <Text style={styles.pointText}>
                           {`The returns on your deposit are assured and remain\nunaffected by market fluctuations.`}
                      </Text> 
               </View>
               <View style={styles.Textview}>
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
               <View style={styles.Textview}>
                     <View style={styles.point}></View>
                      <Text style={styles.pointText}>
                           {`The returns on your deposit are assured and remain\nunaffected by market fluctuations.`}
                    </Text> 
               </View>
               <View style={styles.Textview}>
                     <View style={styles.point}></View>
                    <Text style={styles.pointText}>
                          {`The returns on your deposit are assured and remain\nunaffected by market fluctuations.`}
                    </Text> 
               </View>
          </View>

         <View style={styles.top}>
                 <Text style={styles.Text3}>Eligibility :</Text>
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

            <View style={[styles.top,{marginBottom:20}]}>
                 <Text style={styles.Text3}>Bank contact information :</Text>
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
           
         </ScrollView>
         <BottomTab/>
         <StatusBar/>
     </View>
       
    )
}
export default FDList;