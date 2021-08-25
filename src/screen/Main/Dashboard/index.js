import React,{useEffect, useState} from "react";
import {View,Text,Image,TouchableOpacity,ScrollView} from 'react-native';
import Header from '../../../component/header';
import colors from '../../../component/colors'
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import Storage from '../../../component/AsyncStorage';
import BottomTab from '../../../component/StoreButtomTab';
const dashboard=()=>{
    const navigation=useNavigation()
    const [photo,setPhoto]=useState('')
  
    useEffect(async()=>{
        const photo=await AsyncStorage.getItem(Storage.photo)
        console.log(photo)
    },[])
    return(
        <View style={{flex:1,backgroundColor:'#E5E5E5'}}>
              <Header
                  title={'DASHBOARD'}
                  source ={require('../../../assets/Images/drawer.png')}
                  onPress={()=>navigation.toggleDrawer()}
                  source1={require('../../../assets/Image/notification.png')}
                  onPress1={()=>navigation.navigate('Notification')}
               /> 
               <ScrollView style={{flex:1}}>
                       <View style={styles.main}>
                           <Image 
                            source={require('../../../assets/Image/fixed-deposit.png')}/>
                        </View>
                        <View style={styles.view}>
                              <View style={styles.item}>
                                  <View style={styles.view1}>
                                     <Text style={styles.text2}>{'Fixed Deposit'}</Text>
                                 </View>
                                  <View style={[styles.container,{paddingHorizontal:20,paddingVertical:10,marginTop:10}]}>
                                           <TouchableOpacity 
                                              onPress={()=>navigation.navigate('FDSearch')}
                                              style={styles.touch1}>
                                               <View style={styles.imageView}>
                                                 <Image source={require('../../../assets/Image/regular-fd.png')}/> 
                                               </View>
                                              <View style={styles.view2}>
                                                 <Text style={styles.text}>{'Regular'}</Text>
                                                 <View style={styles.circle}></View>
                                              </View>
                                           </TouchableOpacity>
                                          <TouchableOpacity
                                              onPress={()=>navigation.navigate('SBSearch')}
                                              style={styles.touch1}>
                                             <View style={styles.imageView}>
                                                <Image source={require('../../../assets/Image/tax-fd.png')}/> 
                                             </View>
                                             <Text style={styles.text}>{'Tax Saving'}</Text>
                                         </TouchableOpacity>

                                         <TouchableOpacity
                                             onPress={()=>navigation.navigate('SBSearch')}
                                             style={styles.touch1}>
                                             <View style={styles.imageView}>
                                               <Image source={require('../../../assets/Image/nri-fd.png')}/>
                                              </View>
                                             <Text style={styles.text}>{'NRI'}</Text>
                                         </TouchableOpacity>
                                   </View>
                                   <View style={[styles.container,{paddingHorizontal:20,paddingVertical:10}]}>
                                        <TouchableOpacity 
                                             onPress={()=>navigation.navigate('FDSearch')}
                                             style={styles.touch1}>
                                             <View style={styles.imageView}>
                                                 <Image source={require('../../../assets/Image/senior_citizen.png')}/> 
                                             </View>
                                             <Text style={styles.text}>{'Senior\nCitizen'}</Text>
                                      </TouchableOpacity>
                                  </View>
                                  <View style={styles.buttomview}>
                                       <Text style={styles.Text1}>{'*Tap & Hold to make multiple selection'}</Text>
                                  </View>
                             </View>
                     </View>

                 {/*  */}
                       <View style={styles.buttomview1}>
                             <View style={styles.item}>
                                     <View style={styles.buttomview}>
                                         <Text style={styles.text2}>{'Savings Bank Account'}</Text>
                                      </View>
                                    <View style={[styles.container,{paddingHorizontal:20,paddingVertical:10,marginTop:10}]}>
                       
                                        <TouchableOpacity 
                                             onPress={()=>navigation.navigate('FDSearch')}
                                             style={styles.touch1}>
                                             <View style={styles.imageView}>
                                                   <Image source={require('../../../assets/Image/regular-fd.png')}/> 
                                             </View>
                                            <Text style={styles.text}>{'Regular'}</Text>
                                      </TouchableOpacity>

                                       <TouchableOpacity
                                               onPress={()=>navigation.navigate('SBSearch')}
                                               style={styles.touch1}>
                                              <View style={styles.imageView}>
                                                  <Image source={require('../../../assets/Image/sb-female.png')}/> 
                                              </View>
                                              <Text style={styles.text}>{'Female'}</Text>
                                       </TouchableOpacity>

                                      <TouchableOpacity
                                            onPress={()=>navigation.navigate('SBSearch')}
                                            style={styles.touch1}>
                                            <View style={styles.imageView}>
                                                  <Image source={require('../../../assets/Image/nri-fd.png')}/>
                                          </View>
                                          <Text style={styles.text}>{'Defense'}</Text>
                                     </TouchableOpacity>
                                 </View>
                                 <View style={[styles.container,{paddingHorizontal:20,paddingVertical:10}]}>
                        
                                    <TouchableOpacity 
                                           onPress={()=>navigation.navigate('FDSearch')}
                                           style={styles.touch1}>
                                           <View style={styles.imageView}>
                                              <Image source={require('../../../assets/Image/sb-zb.png')}/> 
                                          </View>
                                          <Text style={styles.text}>{'Zero\nBalance'}</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity 
                                         onPress={()=>navigation.navigate('FDSearch')}
                                         style={styles.touch1}>
                                         <View style={styles.imageView}>
                                              <Image source={require('../../../assets/Image/senior_citizen.png')}/> 
                                         </View>
                                        <Text style={styles.text}>{'Senior\nCitizen'}</Text>
                                  </TouchableOpacity>

                                  <View style={styles.width}></View>
                             </View>
                             <View style={styles.buttomview}>
                                   <Text style={styles.Text1}>{'*Tap & Hold to make multiple selection'}</Text>
                              </View>
                          </View>
                      </View>
                  </ScrollView>
                   <BottomTab/>
              </View>
     )
}
export default dashboard;