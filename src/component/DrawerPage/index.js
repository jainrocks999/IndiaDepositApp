import React, { useState,useEffect} from 'react';
import { View, Image,TouchableOpacity,Platform ,BackHandler, Alert} from 'react-native';
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


let backPress=0
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
    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        return () => {
          BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
        };
      }, []);
      const handleBackButtonClick=() =>{
          if(backPress>0){
            navigation.goBack();
              backPress = 0;
            }
            else{
            backPress++
            navigation.goBack();
            setTimeout( () => { backPress = 0}, 2000);
            BackHandler.removeEventListener('hardwareBackPress');
            }  
        return true;
      }

    useEffect(async()=>{
        let user_id=await AsyncStorage.getItem(Storage.user_id)
        dispatch({
            type: 'User_Detail_Request',
            url: 'profile',
            user_id,
             })
        dispatch({
            type: 'Contact_Detail_Request',
            url: 'getpagecontent',
            key:'contact',
        })
        dispatch({
            type: 'Get_Faq_Request',
            url: 'getfaq',
        })
        dispatch({
            type: 'State_List_Request',
            url: 'statelist',
          })
        
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

    const validateUser1=()=>{
        navigation.navigate('Support',{
            name,email,mobile
        })
         navigation.dispatch(DrawerActions.closeDrawer())
    }

    const validateUser2=()=>{
        navigation.navigate('Feedback')
         navigation.dispatch(DrawerActions.closeDrawer())
    }
  
    return (
        <DrawerContentScrollView
        contentContainerStyle={{  }}
        {...props}>
            <View style={{flex:1}}>
           {/* Bottom Code For Popup */}
           <Modal isVisible={isModalVisible}>
                <View style={styles.modal}>
                <View style={styles.modal1}>
                    <Text
                    style={styles.modaltext}>
                    CONFIRM
                    </Text>
                </View>
                <TouchableOpacity style={styles.ModelmsgView}>
                    <Text style={styles.ModelMsgText}>{'Are you sure want to logout?'}</Text>
                </TouchableOpacity>
                <View
                    style={styles.modal2}>
                    <TouchableOpacity style={styles.popup}
                     onPress={()=>getLogout()}
                     >
                    <Text style={styles.ModelBtntext}>YES</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.popup}
                     onPress={()=>setModalVisible(false)}
                     >
                    <Text style={styles.ModelBtntext}>CANCEL</Text>
                    </TouchableOpacity>
                </View>
                </View>
            </Modal>
            <View style={styles.main}>
                 <View style={styles.main1}>
                 {image?<Image style={styles.img} 
                    source={{uri: image}}
                 />:null
                //  <Image style={{ height:84,
                //     width:84,
                //     borderRadius:42}}
                //     ource={require('../../assets/Image/user-couple.png')}/>
                    }
                            {/* <TouchableOpacity
                                    // onPress={()=>setVisible(true)} 
                                      style={styles.camera}>
                                         <Image source={require('../../assets/Image/camera.png')}/>
                                     </TouchableOpacity> */}
                { !name?
                    <View style={styles.view}>
                        <Text style={styles.text2}>John</Text>
                        <Text style={styles.text3}>9633984668</Text>
                        <Text style={styles.text3}>test@gmail.com</Text>
                    </View>:
                    <View style={styles.view}>
                        <Text style={styles.text2}>{name}</Text>
                        <Text style={styles.text3}>{mobile}</Text>
                        <Text style={styles.text3}>{email}</Text>
                    </View>
                    }
                 
                  </View>
                  <TouchableOpacity 
                  onPress={()=>navigation.dispatch(DrawerActions.closeDrawer())}
                  style={{marginTop:10,}}>
                    <Image style={{width:20,height:32}} source={require('../../assets/Image/arrow2.png')}/>
                  </TouchableOpacity>
              </View>
                <TouchableOpacity
                    onPress={() => validateUser()}
                    >
                    <View style={[styles.drawer]}>
                        <View style={styles.row}>
                            <View style={styles.view1}>
                            <View style={styles.iconView}>
                                <Image style={styles.imageicon} 
                                source={require('../../assets/Image/user.png')}/>
                            </View>
                            <Text style={styles.text}>{'Profile'}</Text>
                            </View>
                            <Image
                            style={styles.arrow}
                            source={require('../../assets/Image/arrowF.png')}/>
                         </View>
                    </View>
                    
                    </TouchableOpacity>
                   
                <TouchableOpacity
                onPress={() => navigation.navigate('Calculator')}
                    >
                    <View style={[styles.drawer]}>
                    <View style={styles.row}>
                            <View style={styles.view1}>
                            <View style={styles.iconView}>
                                <Image style={styles.imageicon} 
                                source={require('../../assets/Image/cal.png')}/>
                            </View>
                            <Text style={styles.text}>{'Calculator'}</Text>
                            </View>
                            <Image
                            style={styles.arrow}
                            source={require('../../assets/Image/arrowF.png')}/>
                           
                        </View>
                    </View>  
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('AboutUs')
                    }}>
                    <View style={[styles.drawer]}>
                    <View style={styles.row}>
                            <View style={styles.view1}>
                            <View style={styles.iconView}>
                                <Image style={styles.imageicon} 
                                source={require('../../assets/Image/about.png')}/>
                            </View>
                            <Text style={styles.text}>{'About Us'}</Text>
                            </View>
                            <Image style={styles.arrow} source={require('../../assets/Image/arrowF.png')}/>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('Contact',{
                             name:name,
                             email:email,
                             mobile:mobile
                        })
                    }}>
                    <View style={[styles.drawer]}>
                    <View style={styles.row}>
                            <View style={styles.view1}>
                            <View style={styles.iconView}>
                                <Image style={styles.imageicon} 
                                source={require('../../assets/Image/contact_us.png')}/>
                            </View>
                            <Text style={styles.text}>{'Contact Us'}</Text>
                            </View>
                            <Image style={styles.arrow} source={require('../../assets/Image/arrowF.png')}/>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={()=>{navigation.navigate('Notification')}}
                    style={[styles.drawer]}>
                         <View style={styles.row}>
                            <View style={styles.view1}>
                            <View style={styles.iconView}>
                                <Image style={styles.imageicon} 
                                source={require('../../assets/Image/noti.png')}/>
                            </View>
                            <Text style={styles.text}>{'Notification'}</Text>
                            </View>
                            <Image style={styles.arrow} source={require('../../assets/Image/arrowF.png')}/>
                        </View>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={()=>navigation.navigate('KnowledgeCenter')}
                    style={[styles.drawer]}>
                        <View style={styles.row}>
                            <View style={styles.view1}>
                            <View style={styles.iconView}>
                                <Image style={styles.imageicon} 
                                source={require('../../assets/Image/knowledege.png')}/>
                            </View>
                            <Text style={styles.text}>{'Knowledge Center'}</Text>
                            </View>
                            <Image style={styles.arrow} source={require('../../assets/Image/arrowF.png')}/>
                        </View>
                </TouchableOpacity>

                <TouchableOpacity 
                    onPress={()=>navigation.navigate('BankHoliday')}
                    style={[styles.drawer]}>
                        <View style={styles.row}>
                            <View style={styles.view1}>
                            <View style={styles.iconView}>
                                <Image style={styles.imageicon} 
                                source={require('../../assets/Image/bank-holiday.png')}/>
                            </View>
                            <Text style={styles.text}>{'Bank Holiday'}</Text>
                            </View>
                            <Image style={styles.arrow} source={require('../../assets/Image/arrowF.png')}/>
                        </View>
                </TouchableOpacity>

                <TouchableOpacity 
                    onPress={()=>navigation.navigate('Trending')}
                    style={[styles.drawer]}>
                        <View style={styles.row}>
                            <View style={styles.view1}>
                            <View style={styles.iconView}>
                                <Image style={styles.imageicon} 
                                source={require('../../assets/Image/icon-chart-line1.png')}/>
                            </View>
                            <Text style={styles.text}>{'Trending'}</Text>
                            </View>
                            <Image style={styles.arrow} source={require('../../assets/Image/arrowF.png')}/>
                        </View>
                </TouchableOpacity>

                <TouchableOpacity 
                    onPress={()=>validateUser1()}
                    style={[styles.drawer]}>
                         <View style={styles.row}>
                            <View style={styles.view1}>
                            <View style={styles.iconView}>
                                <Image style={styles.imageicon} 
                                source={require('../../assets/Image/support.png')}/>
                            </View>
                            <Text style={styles.text}>{'Support'}</Text>
                            </View>
                            <Image style={styles.arrow} source={require('../../assets/Image/arrowF.png')}/>
                        </View>
                </TouchableOpacity>

               

                <TouchableOpacity 
                    onPress={()=>validateUser2()}
                    style={[styles.drawer]}>
                        <View style={styles.row}>
                            <View style={styles.view1}>
                            <View style={styles.iconView}>
                                <Image style={styles.imageicon} 
                                source={require('../../assets/Image/feedback.png')}/>
                            </View>
                            <Text style={styles.text}>{'Feedback'}</Text>
                            </View>
                            <Image style={styles.arrow} source={require('../../assets/Image/arrowF.png')}/>
                        </View>
                </TouchableOpacity>

                <TouchableOpacity 
                onPress={()=>navigation.navigate('Referal')}
                    style={[styles.drawer]}>
                        <View style={styles.row}>
                            <View style={styles.view1}>
                            <View style={styles.iconView}>
                                <Image style={styles.imageicon} 
                                source={require('../../assets/Image/ref.png')}/>
                            </View>
                            <Text style={styles.text}>{'Referral'}</Text>
                            </View>
                            <Image style={styles.arrow} source={require('../../assets/Image/arrowF.png')}/>
                        </View>
                </TouchableOpacity>
                <TouchableOpacity
                     onPress={() => navigation.navigate('Policy')}
                    >
                    <View style={[styles.drawer]}>
                    <View style={styles.row}>
                            <View style={styles.view1}>
                            <View style={styles.iconView}>
                                <Image style={styles.imageicon} 
                                source={require('../../assets/Image/privacy.png')}/>
                            </View>
                            <Text style={styles.text}>{'Policy'}</Text>
                            </View>
                            <Image style={styles.arrow} source={require('../../assets/Image/arrowF.png')}/>
                        </View>
                    </View>  
                </TouchableOpacity>
                <View style={{marginBottom:100}}>
                <TouchableOpacity
                    onPress={() => setModalVisible(true)}>
                    <View style={[styles.drawer]}>
                    <View style={styles.row}>
                            <View style={styles.view2}>
                            <View style={styles.iconView}>
                                <Image style={styles.imageicon} 
                                source={require('../../assets/Image/logout.png')}/>
                            </View>
                            <Text style={styles.text}>{'Logout'}</Text>
                            </View>
                                <Image style={styles.arrow} source={require('../../assets/Image/arrowF.png')}/>
                    </View>
                    </View>  
                </TouchableOpacity>
                </View>
            </View>
        </DrawerContentScrollView>
    );
}
export default DrawerContent;
