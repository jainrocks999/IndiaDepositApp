import React, { useState, useEffect } from 'react';
import { View, Image, ScrollView, Alert,TouchableOpacity } from 'react-native';
import {
    DrawerContentScrollView,
} from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import {
    Text,
} from 'react-native-paper';
import styles from './styles';
import { useSelector,useDispatch } from 'react-redux';
import colors from '../colors';

const DrawerContent=({props})=> {
    const navigation = useNavigation();
    const dispatch=useDispatch()
    const [expand,setExpand]=useState(false)
    const [expandCal,setExpandCal]=useState(false)
    const [expandBank,setExpandBank]=useState(false)
    const getLogout=async()=>{}

    const Logout = () => {
        console.log('this is working');
        Alert.alert(
            "Are you want to logout ?",
            "",
            [
                {
                    text: "Cancel",
                    onPress: () => {
                        cancelable: false;
                    },
                    style: "cancel",
                },
                { text: "ok", onPress: () => getLogout() },
            ],
            { cancelable: false }
        );
    };
    const expandProfile=()=>{
        if(expand){
            setExpand(false)
        }
        else{
            setExpand(true)
        }
    }
    const expandCalculater=()=>{
        if(expandCal){
            setExpandCal(false)
        }
        else{
            setExpandCal(true)
        }
    }
    const expandBanks=()=>{
        if(expandBank){
            setExpandBank(false)
        }
        else{
            setExpandBank(true)
        }
    }
    return (
        <DrawerContentScrollView
        contentContainerStyle={{ paddingTop: 0 }}
        {...props}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={{
                  width:'100%',
                  height:130,
                  backgroundColor:'#5A4392',
                  flexDirection:'row',
                  alignItems:'center',
                  paddingHorizontal:20
                  }}>
                  <View>
                      <Image source={require('../../assets/Image/team.png')}/>
                  </View>
                  <View style={{marginLeft:20}}>
                      <Text style={{color:colors.white,fontFamily:'Montserrat-SemiBold'}}>Rohit</Text>
                      <Text style={{color:colors.white,fontSize:12,fontFamily:'Montserrat-Normal'}}>9633984668</Text>
                      <Text style={{color:colors.white,fontSize:12,fontFamily:'Montserrat-Normal'}}>rohit@gmail.com</Text>
                  </View>
              </View>
                <TouchableOpacity
                    onPress={() => expandProfile()}>
                    <View style={[styles.drawer]}>
                        <View style={styles.row}>
                            <View style={{ flexDirection: 'row' }}>
                            <View style={styles.iconView}>
                                <Image style={styles.imageicon} 
                                source={require('../../assets/Image/profile1.png')}/>
                            </View>
                            <Text style={styles.text}>{'Profile'}</Text>
                            </View>
                           {expand? <Image source={require('../../assets/Image/down.png')}/>:
                                  <Image source={require('../../assets/Image/arrowF.png')}/>}
                        </View>
                    </View>
                    
                    </TouchableOpacity>
                    {expand?
                       <View>
                            <View style={[styles.drawer1]}>
                                <Image style={{marginLeft:40}}
                                source={require('../../assets/Image/arrowB.png')}/>
                                <Text style={[styles.text,{marginLeft:20}]}>{'Profile'}</Text>
                            </View>

                            <View style={[styles.drawer1]}>
                                <Image style={{marginLeft:40}}
                                source={require('../../assets/Image/arrowB.png')}/>
                                <Text style={[styles.text,{marginLeft:20}]}>{'Personal Details'}</Text>
                            </View>

                            <View style={[styles.drawer1]}>
                            <Image style={{marginLeft:40}}
                            source={require('../../assets/Image/arrowB.png')}/>
                            <Text style={[styles.text,{marginLeft:20}]}>{'Bank Details'}</Text>
                        </View>
                        <View style={[styles.drawer1]}>
                            <Image style={{marginLeft:40}}
                            source={require('../../assets/Image/arrowB.png')}/>
                            <Text style={[styles.text,{marginLeft:20}]}>{'Nominee Details'}</Text>
                        </View>
                        <View style={[styles.drawer1]}>
                            <Image style={{marginLeft:40}}
                            source={require('../../assets/Image/arrowB.png')}/>
                            <Text style={[styles.text,{marginLeft:20}]}>{'Others'}</Text>
                        </View>
                        </View>:
                        <View></View>}
                <TouchableOpacity
                    onPress={() => expandCalculater()}
                    >
                    <View style={[styles.drawer]}>
                    <View style={styles.row}>
                            <View style={{ flexDirection: 'row' }}>
                            <View style={styles.iconView}>
                                <Image style={styles.imageicon} 
                                source={require('../../assets/Image/cal.png')}/>
                            </View>
                            <Text style={styles.text}>{'Calculator'}</Text>
                            </View>
                            {expandCal? <Image source={require('../../assets/Image/down.png')}/>:
                                  <Image source={require('../../assets/Image/arrowF.png')}/>}
                        </View>
                    </View>  
                </TouchableOpacity>
                {expandCal?
                       <View>
                            <View style={[styles.drawer1]}>
                                <Image style={{marginLeft:40}}
                                source={require('../../assets/Image/arrowB.png')}/>
                                <Text style={[styles.text,{marginLeft:20}]}>{'SIP'}</Text>
                            </View>

                            <View style={[styles.drawer1]}>
                                <Image style={{marginLeft:40}}
                                source={require('../../assets/Image/arrowB.png')}/>
                                <Text style={[styles.text,{marginLeft:20}]}>{'FD'}</Text>
                            </View>
                        </View>:
                        <View></View>}
                <TouchableOpacity
                    onPress={()=>expandBanks()}
                    >
                    <View style={[styles.drawer]}>
                    <View style={styles.row}>
                            <View style={{ flexDirection: 'row' }}>
                            <View style={styles.iconView}>
                                <Image style={styles.imageicon} 
                                source={require('../../assets/Image/bank-holiday.png')}/>
                            </View>
                            <Text style={styles.text}>{'Bank Holidays'}</Text>
                            </View>
                            {expandBank? <Image source={require('../../assets/Image/down.png')}/>:
                                  <Image source={require('../../assets/Image/arrowF.png')}/>}
                        </View>
                    </View>
                </TouchableOpacity>
                {expandBank?
                       <View>
                            <View style={[styles.drawer1]}>
                                <Image style={{marginLeft:40}}
                                source={require('../../assets/Image/arrowB.png')}/>
                                <Text style={[styles.text,{marginLeft:20}]}>{'Holiday'}</Text>
                            </View>

                            <View style={[styles.drawer1]}>
                                <Image style={{marginLeft:40}}
                                source={require('../../assets/Image/arrowB.png')}/>
                                <Text style={[styles.text,{marginLeft:20}]}>{'Timing'}</Text>
                            </View>
                        </View>:
                        <View></View>}

               
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('BankLocator')
                    }}>
                    <View style={[styles.drawer]}>
                    <View style={styles.row}>
                            <View style={{ flexDirection: 'row' }}>
                            <View style={styles.iconView}>
                                <Image style={styles.imageicon} 
                                source={require('../../assets/Image/bank-locator.png')}/>
                            </View>
                            <Text style={styles.text}>{'Bank Locator'}</Text>
                            </View>
                            <Image source={require('../../assets/Image/arrowF.png')}/>
                        </View>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('AboutUs')
                    }}>
                    <View style={[styles.drawer]}>
                    <View style={styles.row}>
                            <View style={{ flexDirection: 'row' }}>
                            <View style={styles.iconView}>
                                <Image style={styles.imageicon} 
                                source={require('../../assets/Image/about.png')}/>
                            </View>
                            <Text style={styles.text}>{'About'}</Text>
                            </View>
                            <Image source={require('../../assets/Image/arrowF.png')}/>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={()=>navigation.navigate('Notification')}
                    style={[styles.drawer]}>
                         <View style={styles.row}>
                            <View style={{ flexDirection: 'row' }}>
                            <View style={styles.iconView}>
                                <Image style={styles.imageicon} 
                                source={require('../../assets/Image/noti.png')}/>
                            </View>
                            <Text style={styles.text}>{'Notification'}</Text>
                            </View>
                            <Image source={require('../../assets/Image/arrowF.png')}/>
                        </View>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={()=>navigation.navigate('KnowledgeCenter')}
                    style={[styles.drawer]}>
                        <View style={styles.row}>
                            <View style={{ flexDirection: 'row' }}>
                            <View style={styles.iconView}>
                                <Image style={styles.imageicon} 
                                source={require('../../assets/Image/knowledege.png')}/>
                            </View>
                            <Text style={styles.text}>{'Knowledge Center'}</Text>
                            </View>
                            <Image source={require('../../assets/Image/arrowF.png')}/>
                        </View>
                </TouchableOpacity>

                <TouchableOpacity 
                    onPress={()=>navigation.navigate('Support')}
                    style={[styles.drawer]}>
                         <View style={styles.row}>
                            <View style={{ flexDirection: 'row' }}>
                            <View style={styles.iconView}>
                                <Image style={styles.imageicon} 
                                source={require('../../assets/Image/support.png')}/>
                            </View>
                            <Text style={styles.text}>{'Support'}</Text>
                            </View>
                            <Image source={require('../../assets/Image/arrowF.png')}/>
                        </View>
                </TouchableOpacity>

                <TouchableOpacity 
                    onPress={()=>navigation.navigate('Feedback')}
                    style={[styles.drawer]}>
                        <View style={styles.row}>
                            <View style={{ flexDirection: 'row' }}>
                            <View style={styles.iconView}>
                                <Image style={styles.imageicon} 
                                source={require('../../assets/Image/feedback.png')}/>
                            </View>
                            <Text style={styles.text}>{'Feedback'}</Text>
                            </View>
                            <Image source={require('../../assets/Image/arrowF.png')}/>
                        </View>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={[styles.drawer]}>
                        <View style={styles.row}>
                            <View style={{ flexDirection: 'row' }}>
                            <View style={styles.iconView}>
                                <Image style={styles.imageicon} 
                                source={require('../../assets/Image/ref.png')}/>
                            </View>
                            <Text style={styles.text}>{'Referral'}</Text>
                            </View>
                            <Image source={require('../../assets/Image/arrowF.png')}/>
                        </View>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={[styles.drawer]}>
                        <View style={styles.row}>
                            <View style={{ flexDirection: 'row' }}>
                            <View style={styles.iconView}>
                                <Image style={styles.imageicon} 
                                source={require('../../assets/Image/privacy.png')}/>
                            </View>
                            <Text style={styles.text}>{'Privacy'}</Text>
                            </View>
                            <Image source={require('../../assets/Image/arrowF.png')}/>
                        </View>
                </TouchableOpacity>

                <TouchableOpacity 
                    onPress={()=>navigation.navigate('Security')}
                    style={[styles.drawer]}>
                         <View style={styles.row}>
                            <View style={{ flexDirection: 'row' }}>
                            <View style={styles.iconView}>
                                <Image style={styles.imageicon} 
                                source={require('../../assets/Image/security.png')}/>
                            </View>
                            <Text style={styles.text}>{'Security'}</Text>
                            </View>
                            <Image source={require('../../assets/Image/arrowF.png')}/>
                        </View>
                </TouchableOpacity>

                <TouchableOpacity 
                    onPress={()=>navigation.navigate('TermAndCondition')}
                    style={[styles.drawer,{marginBottom:50}]}>
                        <View style={styles.row}>
                            <View style={{ flexDirection: 'row' }}>
                            <View style={styles.iconView}>
                                <Image style={styles.imageicon} 
                                source={require('../../assets/Image/term.png')}/>
                            </View>
                            <Text style={styles.text}>{'Term Condition'}</Text>
                            </View>
                            <Image source={require('../../assets/Image/arrowF.png')}/>
                        </View>
                </TouchableOpacity>

                {/* <TouchableOpacity 
                    onPress={()=>Logout()}
                    style={[styles.drawer]}>
                        <View style={{ flexDirection: 'row' }}>
                        <View style={styles.iconView}>
                                <Image style={styles.imageicon} 
                                source={require('../../assets/Images/logout1.png')}/>
                            </View>
                            <Text style={styles.text}>{'Log out'}</Text>
                        </View>
                </TouchableOpacity> */}
               
               
            </ScrollView>
        </DrawerContentScrollView>
    );
}
export default DrawerContent;
