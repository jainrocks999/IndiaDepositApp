import React,{useState,useEffect}from 'react';
import { View,Text,Image,ScrollView,BackHandler} from 'react-native';
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
import Toast from "react-native-simple-toast";
const data=
[{ label: 'Quality', value: 'Quality'},
{ label: 'Service', value: 'Service' },
{ label: 'Performance', value: 'Performance' }]

const data1=
[{ label: 'Quality', value: 'Quality'},
{ label: 'Service', value: 'Service' },
{ label: 'Performance', value: 'Performance' },]


const Contact=()=>{
    const navigation=useNavigation()
    const [value, setValue] = useState('');
    const [value1, setValue1] = useState('');
    const [rating1,setRatting1]=useState('')
    const [rating2,setRatting2]=useState('')
    const [rating3,setRatting3]=useState('')
    const [rating4,setRatting4]=useState('')
    const [rating5,setRatting5]=useState('')
    const [msg1,setMsg1]=useState('')
    const [msg2,setMsg2]=useState('')
    const [msg3,setMsg3]=useState('')
    const [msg4,setMsg4]=useState('')
    const [msg5,setMsg5]=useState('')

    const [message,setMessage]=useState('')
    const dispatch=useDispatch()
    const isFetching=useSelector(state=>state.isFetching)
console.log('this rating ',rating1);
useEffect(()=>{
    const backAction = () => {
        navigation.navigate('Main')
        return true;
      };
    
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );
    
      return () => backHandler.remove();
},[])

const validateUser=async()=>{
    const user_id=await AsyncStorage.getItem(Storage.user_id)
    // if(value==''){
    //  Toast.show('Please select type')
    // }else if(value1==''){
    // Toast.show('Please select type')
    // }
    // else if(message==''){
    //     Toast.show('Please enter message')
    // }
    // else{
    dispatch({
        type: 'Feedback_Request',
        url: 'feedback',
        user_id,
        message:message,
        information_rating:rating1,
        information_msg_rating:msg1,
        navigation_rating:rating2,
        navigation_msg_rating:msg2,
        product_rating:rating3,
        product_msg_rating:msg3,
        onboarding_rating:rating4,
        onboarding_msg_rating:msg4,
        service_rating:rating5,
        service_msg_rating:msg5,
        navigation:navigation
    })
// }
}

    return(
          <View style={styles.container}>
              <Header
                  title={'FEEDBACK'}
                  source={require('../../../assets/Image/arrow2.png')}
                  onPress={()=>navigation.goBack()}
             />
             <ScrollView>
              <KeyboardAwareScrollView
                extraScrollHeight={0}
                enableOnAndroid={true} 
                keyboardShouldPersistTaps='handled'
                contentContainerStyle={{flex:1}}
                >
                <View style={styles.view1}>
                    {isFetching?<Loader/>:null}
                        <View style={styles.main}>
                          {/* <Text style={styles.how}>How would you rate your experience with India Deposit app?</Text>
                          <View style={styles.star}>
                              <Stars
                                half={true}
                                default={0}
                                update={(val)=>setRatting(val)}
                                spacing={10}
                                starSize={40}
                                count={5}
                                emptyStar={require('../../../assets/Image/star-blank.png')}
                                fullStar={require('../../../assets/Image/star.png')}
                                halfStar={require('../../../assets/Image/star-half.png')}
                              />
                           </View> */}
                           <Text style={[styles.how,{marginTop:15}]}>How would you rate your experience with India Deposit app?</Text>
                           <Text style={styles.how}>Information :</Text>

                          <View style={styles.star}>
                              <Stars
                                half={true}
                                default={0}
                                update={(val)=>setRatting1(val)}
                                spacing={10}
                                starSize={35}
                                count={5}
                                emptyStar={require('../../../assets/Image/icon-star-blank.png')}
                                fullStar={require('../../../assets/Image/icon-star.png')}
                                halfStar={require('../../../assets/Image/icon-star-half.png')}
                              />
                           </View>
                           {rating1!=''&&rating1<3?
                           <View style={styles.bordrView}>
                               <TextInput
                               style={{color:colors.textColor,marginVertical:-6,marginBottom:1}}
                               onChangeText={(val)=>setMsg1(val)}
                               placeholder='Any Suggestion/Feedback'
                               multiline
                               />
                           </View>:<View/>}

                           <Text style={styles.how}>Navigation :</Text>
                          <View style={styles.star}>
                              <Stars
                                half={true}
                                default={0}
                                update={(val)=>setRatting2(val)}
                                spacing={10}
                                starSize={40}
                                count={5}
                                emptyStar={require('../../../assets/Image/star-blank.png')}
                                fullStar={require('../../../assets/Image/star.png')}
                                halfStar={require('../../../assets/Image/star-half.png')}
                              />
                           </View>
                           {rating2!=''&&rating2<3?
                           <View style={styles.bordrView}>
                               <TextInput
                               style={{color:colors.textColor,marginVertical:-6,marginBottom:1}}
                               onChangeText={(val)=>setMsg2(val)}
                               placeholder='Any Suggestion/Feedback'
                               multiline
                               />
                           </View>:<View/>}
                           <Text style={styles.how}>Products :</Text>
                          <View style={styles.star}>
                              <Stars
                                half={true}
                                default={0}
                                update={(val)=>setRatting3(val)}
                                spacing={10}
                                starSize={40}
                                count={5}
                                emptyStar={require('../../../assets/Image/star-blank.png')}
                                fullStar={require('../../../assets/Image/star.png')}
                                halfStar={require('../../../assets/Image/star-half.png')}
                              />
                           </View>
                           {rating3!=''&&rating3<3?
                           <View style={styles.bordrView}>
                               <TextInput
                               style={{color:colors.textColor,marginVertical:-6,marginBottom:1}}
                               onChangeText={(val)=>setMsg3(val)}
                               multiline
                               placeholder='Any Suggestion/Feedback'
                               />
                           </View>:<View/>}
                           <Text style={styles.how}>Onboarding :</Text>
                          <View style={styles.star}>
                              <Stars
                                half={true}
                                default={0}
                                update={(val)=>setRatting4(val)}
                                spacing={10}
                                starSize={40}
                                count={5}
                                emptyStar={require('../../../assets/Image/star-blank.png')}
                                fullStar={require('../../../assets/Image/star.png')}
                                halfStar={require('../../../assets/Image/star-half.png')}
                              />
                           </View>
                           {rating4!=''&&rating4<3?
                           <View style={styles.bordrView}>
                               <TextInput
                               style={{color:colors.textColor,marginVertical:-6,marginBottom:1}}
                               onChangeText={(val)=>setMsg4(val)}
                               placeholder='Any Suggestion/Feedback'
                               multiline
                               />
                           </View>:<View/>}
                           <Text style={styles.how}>Service :</Text>
                          <View style={styles.star}>
                              <Stars
                                half={true}
                                default={0}
                                update={(val)=>setRatting5(val)}
                                spacing={10}
                                starSize={40}
                                count={5}
                                emptyStar={require('../../../assets/Image/star-blank.png')}
                                fullStar={require('../../../assets/Image/star.png')}
                                halfStar={require('../../../assets/Image/star-half.png')}
                              />
                           </View>
                           {rating5!=''&&rating5<3?
                           <View style={styles.bordrView}>
                               <TextInput
                               style={{color:colors.textColor,marginVertical:-6,marginBottom:1}}
                               onChangeText={(val)=>setMsg5(val)}
                               placeholder='Any Suggestion/Feedback'
                               multiline
                               />
                           </View>:<View/>}
                          <Text style={styles.better}>In case you have other suggestions / feedback, please provide</Text>
                         <View style={styles.view2}>
                               <View style={styles.bottom}>
                                    <TextInput 
                                    onChangeText={(val)=>setMessage(val)}
                                    multiline={true}
                                    style={{color:colors.textColor,height:'100%',width:'100%'}} 
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
            </ScrollView>
             <StatusBar/>
        
        </View>
    )
}
export default Contact;


