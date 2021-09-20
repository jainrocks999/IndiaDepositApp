import React,{useState}from 'react';
import { View,Text,Image,ScrollView} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import StatusBar from '../../../component/StatusBar';
import color from '../../../component/colors';
import Stars from 'react-native-stars';
import CustomButton from '../../../component/button1';
import { TextInput } from 'react-native';
import RNPickerSelect from "react-native-picker-select";
import colors from '../../../component/colors';
import Header from '../../../component/header';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from '@react-native-community/async-storage';
import Storage from '../../../component/AsyncStorage';
import Loader from '../../../component/loader';
import { useDispatch,useSelector } from 'react-redux';

const data=
[{ label: 'Quality', value: 'Quality'},
{ label: 'Service', value: 'Service' },
{ label: 'Performance', value: 'Performance' },]

const data1=
[{ label: 'Quality', value: 'Quality'},
{ label: 'Service', value: 'Service' },
{ label: 'Performance', value: 'Performance' },]


const Contact=()=>{
    const navigation=useNavigation()
    const [value, setValue] = useState('');
    const [value1, setValue1] = useState('');
    const [rating,setRatting]=useState('')
    const [message,setMessage]=useState('')
    const dispatch=useDispatch()
    const isFetching=useSelector(state=>state.isFetching)
const validateUser=async()=>{
    const user_id=await AsyncStorage.getItem(Storage.user_id)
    dispatch({
        type: 'Feedback_Request',
        url: 'feedback',
        user_id,
        rating:rating,
        ans_key1:value,
        ans_key2:value1,
        message:message

    })
}

    return(
          <View style={styles.container}>
              <Header
                  title={'FEEDBACK'}
                  source={require('../../../assets/Images/arrow.png')}
                  onPress={()=>navigation.goBack()}
             />
              <KeyboardAwareScrollView>
                <View style={styles.view1}>
                    {isFetching?<Loader/>:null}
                        <View style={styles.main}>
                          <Text style={styles.how}>How would you rate your experience with india deposit app?</Text>
                          <View style={styles.star}>
                              <Stars
                                half={true}
                                default={0}
                                update={(val)=>setRatting(val)}
                                spacing={20}
                                starSize={25}
                                count={5}
                                emptyStar={require('../../../assets/Images/star.png')}
                                fullStar={require('../../../assets/Images/full.png')}
                                halfStar={require('../../../assets/Images/half.png')}
                              />
                           </View>
                            <Text style={styles.what}>What do you like most about the India Deposit    app?</Text>
                            <View style={styles.drop}>
                                  <RNPickerSelect
                                         onValueChange={(val)=>setValue(val)}
                                         items={data}
                                         style={{ 
                                         inputAndroid: { color: color.textColor,width:'100%',height:35 },
                                         placeholder:{color:colors.textColor}
                                         }}
                                         value={value}
                                         useNativeAndroidPickerStyle={false}
                                         placeholder={{ label: "Select", value: null }}
                                         Icon={()=>
                                         <Image style={{marginLeft:12,width:25,height:9,marginTop:11}} 
                                         source={require('../../../assets/Image/down.png')}/>}
                                   />
                          </View>
                          <Text style={styles.better}>What can we do better?</Text>
                          <View style={styles.drop}>
                                 <RNPickerSelect
                                         onValueChange={(val)=>setValue1(val)}
                                         items={data1}
                                         style={{ 
                                         inputAndroid: { color: color.textColor,width:'100%',height:35 },
                                         placeholder:{color:colors.textColor}
                                         }}
                                         value={value1}
                                         useNativeAndroidPickerStyle={false}
                                         placeholder={{ label: "Select", value: '' }}
                                         Icon={()=>
                                         <Image style={{marginLeft:12,width:25,height:9,marginTop:11}} 
                                         source={require('../../../assets/Image/down.png')}/>}
                                  />
                          </View>
                          <Text style={styles.better}>In case you have other suggestions / feedback, please provide</Text>
                         <View style={styles.view2}>
                               <View style={styles.bottom}>
                                    <TextInput 
                                    onChangeText={(val)=>setMessage(val)}
                                    multiline={true}
                                    style={styles.input} 
                                    placeholderTextColor={colors.heading1}
                                    />
                               </View>
                              <View style={styles.bottomView}>
                                  <CustomButton
                                      onPress={()=>validateUser()}
                                      title='SUBMIT'
                                 />
                              </View>
                          </View>
                        </View>
                  </View>
            </KeyboardAwareScrollView>
             <StatusBar/>
        
        </View>
    )
}
export default Contact;


