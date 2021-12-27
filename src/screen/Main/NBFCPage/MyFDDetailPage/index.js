import React,{useEffect,useState} from 'react';
import { View,Text,StyleSheet,Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import colors from '../../../../component/colors';
import Header from '../../../../component/header';
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import styles from "./styles";
import CustomButton from '../../../../component/button1';

const MyFDDetail=()=>{
    const navigation=useNavigation()
    const selector=useSelector(state=>state.MYFDetail)
    const date=selector[0].create_date
   
    const [dd1,mm1,yyyy1]=selector[0].create_date.split('/')
    var msDiff = (new Date().getTime() - new Date(`${yyyy1}-${mm1}-${dd1}`).getTime())
    const days = (msDiff/(1000 * 60 * 60 * 24)).toFixed(0)
    const years=days/365
    console.log('this is yesr',years);
     const value=(selector[0].amount* Math.pow((1 + (selector[0].interest_rate / (1 * 100))), (1 * years))).toFixed(2)

     console.log('narendra pal',date,value);


    return(
        <View style={styles.container}>
           <Header
           title={'MY FD Detail'}
           source={require('../../../../assets/Image/arrow2.png')}
           onPress={()=>navigation.goBack()}
           />  
            <View style={styles.list}>
                         <Image  resizeMode='contain'
                       style={{height:20,width:80}}
                         source={{uri:`https://demo.webshowcase-india.com/indiadeposit/writable/uploads/bank/${selector[0].bank_logo}`}}/>
                       {selector[0].fd_status==2?<View/>: 
                       <View style={{alignItems
                       :'center',justifyContent:'center',flexDirection:'row'}}>
                        <Text style={{fontFamily:'Montserrat-Regular',fontSize:16,
                         marginTop:10,
                         color:colors.textColor,
                         fontWeight:'600',
                        
                         textAlign:'center'
                        
                        }}>{`Current Balance`}</Text>
                         <Text style={{fontFamily:'Montserrat-Bold',fontSize:16,
                         marginTop:10,
                         color:colors.textColor,
                         fontWeight:'600',
                         marginLeft:10,
                         textAlign:'center'
                        
                        }}>{`${value}`}</Text>
                           </View>}
            </View>
      
          <ScrollView>
          <View style={styles.view4}>
                       <View style={styles.container1}> 
                              <View style={[styles.view2]}>
                              <Text style={[styles.item1,{textAlign:'center'}]}>{selector[0].my_fixed_deposit_id}</Text>
                                  <Text style={styles.item}>{'FD Name/ID'}</Text>
                                
                             </View>
                             <View style={[styles.view2]}>
                             <Text style={styles.item1}>{selector[0].type}</Text>
                                   <Text style={styles.item}>{'FD Type'}</Text>
                                 
                              </View>
                             
                      </View>
                      </View>
                      <View style={styles.line}></View>
                     <View style={styles.view4}>
                       <View style={styles.container1}> 
                              <View style={styles.view2}>
                              <Text style={[styles.item1,{textAlign:'center'}]}>{selector[0].amount}</Text>
                                  <Text style={styles.item}>{'FD Open Amount'}</Text>
                                
                             </View>
                              <View style={[styles.view2]}>
                              <Text style={styles.item1}>{selector[0].create_date}</Text>
                                   <Text style={styles.item}>{'FD Created Date'}</Text>
                                  
                              </View>
                             
                      </View>
                      </View>
                      <View style={styles.line}></View>
                      <View style={styles.view4}>
                       <View style={styles.container1}> 
                               <View style={[styles.view2]}>
                               <Text style={styles.item1}>{`${selector[0].tenure} Years`}</Text>
                                   <Text style={styles.item}>{'Tenure'}</Text>
                                  
                              </View>
                              <View style={styles.view2}>
                              <Text style={[styles.item1,{textAlign:'center'}]}>{`${selector[0].interest_rate}%`}</Text>
                                  <Text style={styles.item}>{'Interest Rate'}</Text>
                               
                             </View>
                            
                             
                      </View>
                      </View>
                      <View style={styles.line}></View>
                      <View style={styles.view4}>
                      {selector[0].fd_status==2?

                            <View style={styles.container1}> 
                                            
                            <View style={styles.view2}>
                            <Text style={[styles.item1,{textAlign:'center'}]}>{selector[0].redeemed_amount}</Text>
                                <Text style={styles.item}>{'Redeemed Amount'}</Text>
                               
                            </View>
                            <View style={[styles.view2]}>
                            <Text style={styles.item1}>{selector[0].redemption_date}</Text>
                                <Text style={styles.item}>{'Redeemed Date'}</Text>
                               
                            </View>
                            </View>
                      :
                      <View style={styles.container1}> 
                   
                      <View style={styles.view2}>
                      <Text style={[styles.item1,{textAlign:'center'}]}>{selector[0].maturity_amount}</Text>
                            <Text style={styles.item}>{'Maturity Amount'}</Text>
                           
                       </View>
                        <View style={[styles.view2]}>
                        <Text style={styles.item1}>{selector[0].date_of_maturity}</Text>
                             <Text style={styles.item}>{'Maturity Date'}</Text>
                            
                        </View>
                 </View>
                       
                       }
                   
                      </View>
                      <View style={[styles.view4,{marginTop:10,marginBottom:10}]}>
                       <View style={[styles.container1,]}> 
                       <View style={styles.view2}>
                       <Text style={[styles.item1,{textAlign:'center'}]}>{`${selector[0].username}`}</Text>
                                  <Text style={styles.item}>{'Name'}</Text>
                                
                             </View>
                              <View style={styles.view2}>
                              <Text style={[styles.item1,{textAlign:'center'}]}>{selector[0].user_dob}</Text>
                                  <Text style={styles.item}>{'Date of Birth'}</Text>
                                
                             </View>
                             
                             
                      </View>
                      </View> 
           </ScrollView>
          {selector[0].fd_status==1? <View style={{bottom:0,left:0,right:0,position:'absolute',backgroundColor:'#fff',paddingHorizontal:15,paddingVertical:15}}>
                <CustomButton
                title='REDEEM'
                onPress={()=>navigation.navigate('Redeem',{
                    name:selector[0].username,
                    currentBalance:value,
                    my_fixed_deposit_id:selector[0].my_fixed_deposit_id
                })}
                />
           </View>:<View/>}
        </View>
    )
}
export default MyFDDetail;

