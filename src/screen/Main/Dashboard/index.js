import React,{useEffect, useState} from "react";
import {View,Text,Image,TouchableOpacity,ScrollView} from 'react-native';
import Header from '../../../component/header';
import colors from '../../../component/colors'
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import Storage from '../../../component/AsyncStorage';
import StatusBar from "../../../component/StatusBar";
import BottomTab from '../../../component/StoreButtomTab';
import { FlatList } from "react-native-gesture-handler";
const dashboard=()=>{
    const navigation=useNavigation()
    const [photo,setPhoto]=useState('')
  
    useEffect(async()=>{
        const photo=await AsyncStorage.getItem(Storage.photo)
        console.log(photo)
    },[])
    return(
        <View style={styles.container1}>
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
                                     <FlatList
                                    style={{ width: '99%' }}
                                    data={data}
                                    numColumns={3}
                                    keyExtractor={(item, index) => item.id}
                                     renderItem={({item})=>(
                                         <View >
                                             <TouchableOpacity 
                                              onPress={()=>navigation.navigate('FDSearch')}
                                              style={styles.touch1}>
                                               <View style={styles.imageView}>
                                                 <Image source={item.image}/> 
                                               </View>
                                              <View style={styles.view2}>
                                                 <Text style={styles.text}>{item.name}</Text>
                                                 <View style={styles.circle}>
                                                     <Image 
                                                     source={require('../../../assets/Image/ic.png')}/>  
                                                 </View>
                                              </View>
                                           </TouchableOpacity>
                                         </View>
                                     )}
                                     />
                                     </View>
                                  {/* <View style={[styles.container,{paddingHorizontal:20,paddingVertical:10,marginTop:10}]}>
                                           <TouchableOpacity 
                                              onPress={()=>navigation.navigate('FDSearch')}
                                              style={styles.touch1}>
                                               <View style={styles.imageView}>
                                                 <Image source={require('../../../assets/Image/regular-fd.png')}/> 
                                               </View>
                                              <View style={styles.view2}>
                                                 <Text style={styles.text}>{'Regular'}</Text>
                                                 <View style={styles.circle}>
                                                     <Image 
                                                     source={require('../../../assets/Image/ic.png')}/>  
                                                 </View>
                                              </View>
                                           </TouchableOpacity>
                                          <TouchableOpacity
                                              onPress={()=>navigation.navigate('SBSearch')}
                                              style={styles.touch1}>
                                             <View style={styles.imageView}>
                                                <Image source={require('../../../assets/Image/tax-fd.png')}/> 
                                             </View>
                                             <View style={styles.view2} >
                                                  <Text style={styles.text}>{'Tax Saving'}</Text>
                                                  <View style={styles.circle}>
                                                     <Image 
                                                     source={require('../../../assets/Image/ic.png')}/>  
                                                 </View>
                                             </View>
                                         </TouchableOpacity>

                                         <TouchableOpacity
                                             onPress={()=>navigation.navigate('SBSearch')}
                                             style={styles.touch1}>
                                             <View style={styles.imageView}>
                                               <Image source={require('../../../assets/Image/nri-fd.png')}/>
                                              </View>
                                              <View style={styles.view2}>
                                                <Text style={styles.text}>{'NRI'}</Text>
                                                <View style={styles.circle}>
                                                     <Image 
                                                     source={require('../../../assets/Image/ic.png')}/>  
                                                 </View>
                                             </View>
                                         </TouchableOpacity>
                                   </View> */}
                                   {/* <View style={[styles.container,{paddingHorizontal:20,paddingVertical:10}]}>
                                        <TouchableOpacity 
                                             onPress={()=>navigation.navigate('FDSearch')}
                                             style={styles.touch1}>
                                             <View style={styles.imageView}>
                                                 <Image source={require('../../../assets/Image/senior_citizen.png')}/> 
                                             </View>
                                             <View style={styles.view2}>
                                                <Text style={styles.text}>{'Senior\nCitizen'}</Text>
                                                <View style={styles.circle}>
                                                     <Image 
                                                     source={require('../../../assets/Image/ic.png')}/>  
                                                 </View>
                                             </View>
                                      </TouchableOpacity>
                                  </View> */}
                                  <View style={styles.buttomview}>
                                       <Text style={styles.Text1}>{'*Tap & Hold to make multiple selection'}</Text>
                                  </View>
                             </View>
                     </View>

                 {/*  */}
                       <View style={styles.buttomview1}>
                             <View style={styles.item}>
                                     <View style={styles.view1}>
                                         <Text style={styles.text2}>{'Savings Bank Account'}</Text>
                                      </View>
                                      <View style={[styles.container,{paddingHorizontal:20,paddingVertical:10,marginTop:10}]}>
                                      <FlatList
                                    style={{ width: '99%' }}
                                    data={data1}
                                    numColumns={3}
                                    keyExtractor={(item, index) => item.id}
                                     renderItem={({item})=>(
                                         <View >
                                             <TouchableOpacity 
                                              onPress={()=>navigation.navigate('FDSearch')}
                                              style={styles.touch1}>
                                               <View style={styles.imageView}>
                                                 <Image source={item.image}/> 
                                               </View>
                                              <View style={styles.view2}>
                                                 <Text style={styles.text}>{item.name}</Text>
                                                 <View style={styles.circle}>
                                                     <Image 
                                                     source={require('../../../assets/Image/ic.png')}/>  
                                                 </View>
                                              </View>
                                           </TouchableOpacity>
                                         </View>
                                     )}
                                     />
                                     </View>
                                    {/* <View style={[styles.container,{paddingHorizontal:20,paddingVertical:10,marginTop:10}]}>
                       
                                        <TouchableOpacity 
                                             onPress={()=>navigation.navigate('FDSearch')}
                                             style={styles.touch1}>
                                             <View style={styles.imageView}>
                                                   <Image source={require('../../../assets/Image/regular-fd.png')}/> 
                                             </View>
                                             <View style={styles.view2}>
                                               <Text style={styles.text}>{'Regular'}</Text>
                                               <View style={styles.circle}>
                                                     <Image 
                                                     source={require('../../../assets/Image/ic.png')}/>  
                                                 </View>
                                            </View>
                                      </TouchableOpacity>

                                       <TouchableOpacity
                                               onPress={()=>navigation.navigate('SBSearch')}
                                               style={styles.touch1}>
                                              <View style={styles.imageView}>
                                                  <Image source={require('../../../assets/Image/sb-female.png')}/> 
                                              </View>
                                              <View style={styles.view2}>
                                                  <Text style={styles.text}>{'Female'}</Text>
                                                  <View style={styles.circle}>
                                                     <Image 
                                                     source={require('../../../assets/Image/ic.png')}/>  
                                                 </View>
                                              </View>
                                       </TouchableOpacity>

                                      <TouchableOpacity
                                            onPress={()=>navigation.navigate('SBSearch')}
                                            style={styles.touch1}>
                                            <View style={styles.imageView}>
                                                  <Image source={require('../../../assets/Image/nri-fd.png')}/>
                                          </View>
                                          <View style={styles.view2}>
                                              <Text style={styles.text}>{'Defense'}</Text>
                                              <View style={styles.circle}>
                                                     <Image 
                                                     source={require('../../../assets/Image/ic.png')}/>  
                                                 </View>
                                           </View>   
                                     </TouchableOpacity>
                                 </View> */}
                                 {/* <View style={[styles.container,{paddingHorizontal:20,paddingVertical:10}]}>
                        
                                    <TouchableOpacity 
                                           onPress={()=>navigation.navigate('FDSearch')}
                                           style={styles.touch1}>
                                           <View style={styles.imageView}>
                                              <Image source={require('../../../assets/Image/sb-zb.png')}/> 
                                          </View>
                                          <View style={styles.view2}>
                                              <Text style={styles.text}>{'Zero\nBalance'}</Text>
                                              <View style={styles.circle}>
                                                     <Image 
                                                     source={require('../../../assets/Image/ic.png')}/>  
                                                 </View>
                                           </View>   
                                    </TouchableOpacity>

                                    <TouchableOpacity 
                                         onPress={()=>navigation.navigate('FDSearch')}
                                         style={styles.touch1}>
                                         <View style={styles.imageView}>
                                              <Image source={require('../../../assets/Image/senior_citizen.png')}/> 
                                         </View>
                                         <View style={styles.view2}>
                                              <Text style={styles.text}>{'Senior\nCitizen'}</Text>
                                              <View style={styles.circle}>
                                                     <Image 
                                                     source={require('../../../assets/Image/ic.png')}/>  
                                                 </View>
                                          </View>
                                   </TouchableOpacity>

                                  <View style={styles.width}></View>
                             </View> */}
                             <View style={styles.buttomview}>
                                   <Text style={styles.Text1}>{'*Tap & Hold to make multiple selection'}</Text>
                              </View>
                          </View>
                      </View>
                  </ScrollView>
                  <StatusBar/>
                   <BottomTab/>
              </View>
     )
}
export default dashboard;
const data=[
    {name:'Regular',image:require('../../../assets/Image/regular-fd.png'),id:1},
    {name:'Tax Saving',image:require('../../../assets/Image/tax-fd.png'),id:2},
    {name:'NRI',image:require('../../../assets/Image/nri-fd.png'),id:3},
    {name:'Senior\nCitizen',image:require('../../../assets/Image/senior_citizen.png'),id:4},
]

const data1=[
    {name:'Regular',image:require('../../../assets/Image/saving-ac.png')},
    {name:'Female',image:require('../../../assets/Image/sb-female.png')},
    {name:'Defense',image:require('../../../assets/Image/sb-defence.png')},
    {name:'Zero\nBalance',image:require('../../../assets/Image/sb-zb.png')},
    {name:'Senior\nCitizen',image:require('../../../assets/Image/senior_citizen.png')},
]