import React, { useState } from "react";
import {View,Text,FlatList,ScrollView,Image} from 'react-native';
import Header from '../../../component/header';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import BottomTab from '../../../component/StoreButtomTab';
import { TextInput } from "react-native-gesture-handler";
import colors from "../../../component/colors";
import { TouchableOpacity } from "react-native";
const data =
[
          {title:'Bank ',value:'STATE BANK OF INDIA'},
          {title:'Address',value:'OPP. GOVT. GIRLS HR.\nSEC. SCHOOL, A.B.\nROAD, RAU'},
          {title:'State',value:'Madhya Pradesh'},
          {title:'District',value:'Indore'},
          {title:'Branch',value:'A.B.ROAD, RAU,INDORE'},
          {title:'Contact',value:'+91 000 0000 000'},
          {title:'IFSC Code',value:'SBIN0030460'},
          {title:'Branch Code',value:'Last six characters of\nIFSC Code represent\n Branch code.'},
          {title:'MICR Code',value:'452002076'}
]
const data1 =
[
          {title:'Bank Timings\nFor Week days\n[Monday to Friday] ',value:'10.00 AM to 4:00 PM'},
          {title:'Bank Timings on\n1st, 3rd and 5th\nSaturday of Month',value:'10.00 AM to 4:00 PM'},
          {title:'Bank Timings on\n2nd and 4th\nSaturday of Month',value:'Closed'},
          {title:'Bank Timings For\nall Sundays',value:'Closed'},
  
]
const Holiday=()=>{
    const navigation=useNavigation()
    const [jan,setJan]=useState(false)
    const [feb,setFeb]=useState(false)
    const [march,setMarch]=useState(false)
    const [april,setAp]=useState(false)
    const [may,setMay]=useState(false)

  const checkJan=()=>
  {
     if(jan==true)
     {
       setJan(false)
     }
     else
     {
       setJan(true)
     }
  }
  const checkFeb=()=>
  {
     if(feb==true) 
     {
       setFeb(false)
     }
     else
     {
       setFeb(true)
     }
  }
  const checkMarch=()=>
  {
    if(march==true)
     {
       setMarch(false)
     }
     else
      {
       setMarch(true)
      }
  }
  const checkApril=()=>
  {
    if(april==true)
    {
       setAp(false)
     }
     else
      {
       setAp(true)
     }
  }
  const checkMay=()=>
  {
    if(may==true)
     {
       setMay(false)
     }
    else
     {
       setMay(true)
     }
  }
    return(
            <View style={styles.container1}>
                   <Header
                      title={'BANK HOLIDAYS'}
                      source ={require('../../../assets/Images/drawer.png')}
                      onPress={()=>navigation.toggleDrawer()}
                      source1={require('../../../assets/Image/download.png')}
                   /> 
               <ScrollView>
                    <View style={styles.Textview}>
                       <View style={styles.Textview1}>
                         <Text style={styles.dummy}>
                                 Lorem ipsum, or lipsum as it is sometimes known,
                                 is dummy text used in laying out print, graphic or
                                  web designs. The passage is attributed to an
                                 unknown typesetter book.
                          </Text>
                       </View>
                       <View style={styles.Textview1}>
                             <View style={styles.input}>
                                  <TextInput
                                      placeholder='Search Bank'
                                      style={{color:colors.textColor}}
                                  />
                              </View>
                        </View>
                       <View style={styles.Textview1}>
                            <TouchableOpacity style={styles.button}>
                                 <Text style={styles.search}>SEARCH</Text>
                            </TouchableOpacity>
                           <Text style={styles.result}>Result of your search</Text>
                       </View>
                {/* Branch Detail */}
                       <View style={styles.main}>
                           <Text style={styles.heading}>{`BRANCH DETAILS`}</Text>
                          <FlatList
                             data={data}
                             style={{width:'100%'}}
                            renderItem={({item})=>(
                            <View>
                                <View style={styles.border1}></View>
                                 <View style={styles.container}>
                                    <View style={{width:'50%'}}>
                                         <Text style={styles.item1}>{item.title}</Text>
                                    </View>
                                    <View style={{width:'50%'}}>
                                        <Text style={styles.item2}>{item.value}</Text>
                                     </View>
                               </View>
                             </View>
                             )}
                          />
                       </View>
                {/* Branch Timing */}
                   <View style={styles.main}>
                              <Text style={styles.heading}>{`BRANCH TIMING`}</Text>
                         <FlatList
                              data={data1}
                              style={{width:'100%'}}
                             renderItem={({item})=>(
                               <View>
                                  <View style={styles.border1}></View>
                                     <View style={styles.container}>
                                          <View style={{width:'50%'}}>
                                               <Text style={styles.item1}>{item.title}</Text>
                                          </View>
                                          <View style={{width:'50%'}}>
                                                <Text style={styles.item2}>{item.value}</Text>
                                          </View>
                                     </View>
                               </View>
                              )}
                           />
                     </View>
                {/* Bank Holiday */}
                   <View style={styles.main}>
                           <Text style={styles.heading}>{`BANK HOLIDAYS LIST`}</Text>
                          <View style={styles.border}></View>
                          <TouchableOpacity style={styles.jan}
                                   onPress={()=>checkJan()}>
                                   <Text style={styles.month}>January</Text>
                                    {jan ==false? <Image source={require('../../../assets/Image/wFarword.png')}/>:
                                    <Image source={require('../../../assets/Image/wDown.png')}/>}
                           </TouchableOpacity> 
                 </View>
                      {jan ==true?<View>
                            <FlatList 
                                 data={Holidays}
                                renderItem={({item})=>(
                              <View>
                                   <View style={styles.container}>
                                        <Text style={{color:colors.textColor}}>{item.date}</Text>
                                        <Text style={{color:colors.textColor}}>{item.day}</Text>
                                        <Text style={{color:colors.textColor}}>{item.leave}</Text>
                                   </View>
                                   <View style={styles.border1}></View>
                               </View>
                                  )}
                            />
                            </View>:null
                        } 
                    <View>
                          <View style={styles.border}></View>
                         <TouchableOpacity style={styles.jan}
                                onPress={()=>checkFeb()}>
                                <Text style={styles.month}>February</Text>
                                {
                                 feb ==false? <Image source={require('../../../assets/Image/wFarword.png')}/>:
                                 <Image source={require('../../../assets/Image/wDown.png')}/>
                                }
                         </TouchableOpacity> 
                    </View>
                    {feb ==true?<View>
                            <FlatList 
                                data={Holidays}
                                 renderItem={({item})=>(
                                  <View>
                                    <View style={styles.border1}></View>
                                        <View style={styles.container}>
                                              <Text style={{color:colors.textColor}}>{item.date}</Text>
                                              <Text style={{color:colors.textColor}}>{item.day}</Text>
                                              <Text style={{color:colors.textColor}}>{item.leave}</Text>
                                         </View>
                                   </View>
                                 )}
                             />
                         </View>:null
                       } 
                      <View>
                             <View style={styles.border}></View>
                             <TouchableOpacity style={styles.jan}
                                   onPress={()=>checkMarch()}>
                                   <Text style={styles.month}>March</Text>
                                    {
                                       march ==false? <Image source={require('../../../assets/Image/wFarword.png')}/>:
                                       <Image source={require('../../../assets/Image/wDown.png')}/>
                                    }
                              </TouchableOpacity> 
                       </View>
                    {march ==true?<View>
                            <FlatList 
                                data={Holidays}
                               renderItem={({item})=>(
                                 <View>
                                     <View style={styles.border1}></View>
                                     <View style={styles.container}>
                                          <Text style={{color:colors.textColor}}>{item.date}</Text>
                                          <Text style={{color:colors.textColor}}>{item.day}</Text>
                                          <Text style={{color:colors.textColor}}>{item.leave}</Text>
                                     </View>
                                   </View>
                                )}
                           />
                          </View>:null
                    } 


                         <View>
                              <View style={styles.border}></View>
                                     <TouchableOpacity style={styles.jan}
                                          onPress={()=>checkApril()}>
                                         <Text style={styles.month}>April</Text>
                                          { 
                                            april ==false? <Image source={require('../../../assets/Image/wFarword.png')}/>:
                                             <Image source={require('../../../assets/Image/wDown.png')}/>
                                          }
                                     </TouchableOpacity> 
                        </View>
                      {april ==true?<View>
                            <FlatList 
                                  data={Holidays}
                                  renderItem={({item})=>(
                                    <View>
                                       <View style={styles.border1}></View>
                                             <View style={styles.container}>
                                                   <Text style={{color:colors.textColor}}>{item.date}</Text>
                                                   <Text style={{color:colors.textColor}}>{item.day}</Text>
                                                   <Text style={{color:colors.textColor}}>{item.leave}</Text>
                                              </View>
                                    </View>
                                  )}
                            />
                           </View>:null
                      } 

                        <View>
                            <View style={styles.border}></View>
                            <TouchableOpacity style={styles.jan}
                                      onPress={()=>checkMay()}>
                                     <Text style={styles.month}>May</Text>
                                     {
                                          may ==false? <Image source={require('../../../assets/Image/wFarword.png')}/>:
                                          <Image source={require('../../../assets/Image/wDown.png')}/>
                                      }
                            </TouchableOpacity> 
                        </View>
                    {may ==true?<View>
                            <FlatList 
                                 data={Holidays}
                                 renderItem={({item})=>(
                                   <View>
                                       <View style={styles.border1}></View>
                                       <View style={styles.container}>
                                             <Text style={{color:colors.textColor}}>{item.date}</Text>
                                             <Text style={{color:colors.textColor}}>{item.day}</Text>
                                            <Text style={{color:colors.textColor}}>{item.leave}</Text>
                                        </View>
                                   </View>
                                  )}
                            />
                         </View>:null
                     } 
                <View>
                       
              </View>
           </View>
           </ScrollView>
          <BottomTab/>
       </View>
    )
}
export default Holiday;
const Holidays=[
    {date:'January 09',day:'Saturday',leave:'Second Saturday'},
    {date:'January 23',day:'Saturday',leave:'Fourth Saturday'},
    {date:'January 26',day:'Tuesday',leave:'Republic Day/\nGaan-Ngai'}
]