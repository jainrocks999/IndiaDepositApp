import React, { useState,useEffect} from 'react';
import { View, Image,TouchableOpacity } from 'react-native';
import {
    DrawerContentScrollView,
} from '@react-navigation/drawer';
import { useNavigation ,DrawerActions} from '@react-navigation/native';
import {
    Text,
} from 'react-native-paper';
import styles from './styles';
import { useDispatch } from 'react-redux';
import colors from '../colors';
import AsyncStorage from "@react-native-community/async-storage";
import Storage from '../AsyncStorage';
import Modal from "react-native-modal";
import fontSize from '../fontSize';
const DrawerContent=({props})=> {
    const navigation = useNavigation();
    const dispatch=useDispatch()
    const [isModalVisible, setModalVisible] = useState(false);
    const [name,setName]=useState()
    const [mother,setMName]=useState()
    const [father,setFName]=useState()
    const [email,setEmail]=useState()
    const [gender, setGender] = useState('');
    const [dob, setDob] = useState('');
    const [mobile,setMobile]=useState('')
    const [image,setImage]=useState('')

    useEffect(async()=>{
        let name=await AsyncStorage.getItem(Storage.name)
        let motherName=await AsyncStorage.getItem(Storage.motherName)
        let fatherName=await AsyncStorage.getItem(Storage.fatherName)
        let gender=await AsyncStorage.getItem(Storage.gender)
        let dob=await AsyncStorage.getItem(Storage.dob)
        let email=await AsyncStorage.getItem(Storage.email)
        let mobile=await AsyncStorage.getItem(Storage.mobile)
        let image=await AsyncStorage.getItem(Storage.image)
        setImage(image)

         setMobile(mobile)
         setName(name)
         setMName(motherName)
         setFName(fatherName)
         setGender(gender)
         setDob(dob)
         setEmail(email)
    })
   
    const getLogout=async()=>{
     const user_id=await AsyncStorage.getItem(Storage.user_id)
     setModalVisible(false)
     dispatch({
        type: 'User_Logout_Request',
        url: 'logout',
        user_id,
        navigation:navigation,
      })
    }

    const validateUser=()=>{
        navigation.navigate('Profile',{
            name,email,dob,gender,mother,father
        })
        navigation.dispatch(DrawerActions.closeDrawer())
    }
  
    return (
        <DrawerContentScrollView
        contentContainerStyle={{ paddingTop: 0 }}
        {...props}>
            <View style={{flex:1}}>
           {/* Bottom Code For Popup */}
           <Modal isVisible={isModalVisible}>
                <View style={styles.modal}>
                <View style={{width: '100%',borderWidth:1,backgroundColor:colors.bc,paddingVertical:5}}>
                    <Text
                    style={{
                        color: colors.white,
                        fontSize: fontSize.twenty,
                        fontWeight: 'bold',
                        textAlign: 'center',
                    }}>
                    CONFIRM
                    </Text>
                </View>
                <TouchableOpacity style={styles.ModelmsgView}>
                    <Text style={styles.ModelMsgText}>{'Are you sure want to logout?'}</Text>
                </TouchableOpacity>
                <View
                    style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    width: '100%',
                    bottom:20,
                    position:'absolute'
                    }}>
                    <TouchableOpacity style={styles.popup}
                     onPress={()=>getLogout()}
                     >
                    <Text style={styles.ModelBtntext}>OK</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.popup}
                     onPress={()=>setModalVisible(false)}
                     >
                    <Text style={styles.ModelBtntext}>CANCEL</Text>
                    </TouchableOpacity>
                </View>
                </View>
            </Modal>

              <View style={{
                   height:'22%',
                   backgroundColor:'#5A4392',
                   flexDirection:'row',
                   paddingHorizontal:20,
                   justifyContent:'space-between'
                  }}>
                 <View style={{flexDirection:'row', alignItems:'center',}}>
                 {image?<Image style={{height:84,
                    width:84,
                    borderRadius:42}} 
                    source={{uri: image}}
                 />
                        :<Image 
                            source={require('../../assets/Image/profile-pic.png')}/>}
                { !name?
                    <View style={{marginLeft:20}}>
                        <Text style={{color:colors.white,fontFamily:'Montserrat-SemiBold'}}>John</Text>
                        <Text style={{color:colors.white,fontSize:fontSize.twelve,fontFamily:'Montserrat-Normal'}}>9633984668</Text>
                        <Text style={{color:colors.white,fontSize:fontSize.twelve,fontFamily:'Montserrat-Normal'}}>test@gmail.com</Text>
                    </View>:
                    <View style={{marginLeft:20}}>
                        <Text style={{color:colors.white,fontFamily:'Montserrat-SemiBold'}}>{name}</Text>
                        <Text style={{color:colors.white,fontSize:fontSize.twelve,fontFamily:'Montserrat-Normal'}}>{mobile}</Text>
                        <Text style={{color:colors.white,fontSize:fontSize.twelve,fontFamily:'Montserrat-Normal'}}>{email}</Text>
                    </View>
                    }
                 
                  </View>
                  <TouchableOpacity 
                  onPress={()=>navigation.dispatch(DrawerActions.closeDrawer())}
                  style={{paddingVertical:20,}}>
                    <Image source={require('../../assets/Image/arrow2.png')}/>
                  </TouchableOpacity>
              </View>
                <TouchableOpacity
                    onPress={() => validateUser()}
                    >
                    <View style={[styles.drawer]}>
                        <View style={styles.row}>
                            <View style={{ flexDirection: 'row' }}>
                            <View style={styles.iconView}>
                                <Image style={styles.imageicon} 
                                source={require('../../assets/Image/profile1.png')}/>
                            </View>
                            <Text style={styles.text}>{'Profile'}</Text>
                            </View>
                            <Image source={require('../../assets/Image/arrowF.png')}/>
                         </View>
                    </View>
                    
                    </TouchableOpacity>
                   
                <TouchableOpacity
                onPress={() => navigation.navigate('Calculator')}
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
                    onPress={() => {
                        navigation.navigate('Contact')
                    }}>
                    <View style={[styles.drawer]}>
                    <View style={styles.row}>
                            <View style={{ flexDirection: 'row' }}>
                            <View style={styles.iconView}>
                                <Image style={styles.imageicon} 
                                source={require('../../assets/Image/about.png')}/>
                            </View>
                            <Text style={styles.text}>{'Contact Us'}</Text>
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
                onPress={()=>navigation.navigate('Referal')}
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
                     onPress={() => navigation.navigate('Policy')}
                    >
                    <View style={[styles.drawer]}>
                    <View style={styles.row}>
                            <View style={{ flexDirection: 'row' }}>
                            <View style={styles.iconView}>
                                <Image style={styles.imageicon} 
                                source={require('../../assets/Image/privacy.png')}/>
                            </View>
                            <Text style={styles.text}>{'Policy'}</Text>
                            </View>
                            <Image source={require('../../assets/Image/arrowF.png')}/>
                        </View>
                    </View>  
                </TouchableOpacity>
                <View style={{marginBottom:100}}>
                <TouchableOpacity
                    onPress={() => setModalVisible(true)}>
                    <View style={[styles.drawer]}>
                    <View style={styles.row}>
                            <View style={{ flexDirection: 'row',alignItems:'center',justifyContent:'center' }}>
                            <View style={styles.iconView}>
                                <Image style={styles.imageicon} 
                                source={require('../../assets/Image/logout.png')}/>
                            </View>
                            <Text style={styles.text}>{'Logout'}</Text>
                            </View>
                                <Image source={require('../../assets/Image/arrowF.png')}/>
                    </View>
                    </View>  
                </TouchableOpacity>
                </View>
            </View>
        </DrawerContentScrollView>
    );
}
export default DrawerContent;
