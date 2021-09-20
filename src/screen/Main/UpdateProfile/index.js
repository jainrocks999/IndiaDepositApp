import React,{useState,useRef} from 'react';
import { View,Text,Image,ScrollView ,TouchableOpacity,TextInput} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import StatusBar from '../../../component/StatusBar';
import { useDispatch,useSelector } from 'react-redux';
import DatePicker from 'react-native-datepicker';
import RNPickerSelect from 'react-native-picker-select';
import colors from '../../../component/colors';
import Header from '../../../component/compareHeader';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Storage from '../../../component/AsyncStorage';
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-simple-toast';
import CustomButton from '../../../component/button1';
import Loader from '../../../component/loader';
const data=[
   { label: 'Male', value: 'Male' },
   { label: 'Female', value: 'Female' },
   { label: 'Others', value: 'Others'}]
 

const RegisterPage=({route})=>{
    const navigation=useNavigation()
    const dispatch=useDispatch()
    const isFetching=useSelector((state)=>state.isFetching)
    const [name,setName]=useState(route.params.name)
    const [mother,setMName]=useState(route.params.mother)
    const [father,setFName]=useState(route.params.father)
    const [email,setEmail]=useState(route.params.email)
    const [gender, setGender] = useState(route.params.gender);
    const [dob, setDob] = useState(route.params.dob);


   const validateUser=async()=>{
      const user_id=await AsyncStorage.getItem(Storage.user_id)
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if(name==''){
         Toast.show('Name required')
      }
      else if(reg.test(email)==false){
         Toast.show('Gmail required')
         return false
      }
      else if(father==''){
         Toast.show('Father/Spouse Name required')
      }
      else if(mother==''){
         Toast.show('Mother Maiden Name required')
      }
      else if(gender==''){
         Toast.show('Gender required')
      }
      else if(dob==''){
         Toast.show('Date of Birth required')
      }
      else{
      dispatch({
      type: 'Edit_Profile_Request',
      url: 'editprofile',
      user_id,
      name:name,
      email:email,
      father_spouse_name:father,
      mother_maiden_name:mother,
      dob:dob,
      gender:gender
       })
     }
   }

         return(
               <View style={styles.container}>
                  <Header
                     source={require('../../../assets/Images/arrow.png')}
                     title='EDIT PROFILE'
                     onPress={()=>navigation.push('Main')}
                  />
               { isFetching?<Loader/>:null}
                  <ScrollView style={styles.scroll}>
                     <View style={styles.main}>
                 <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
                    <Text style={styles.better}>Name</Text>
                      <View style={styles.drop}>
                        <TextInput
                         style={styles.input}
                         placeholder='Jhon Mathew'
                         defaultValue={name}
                         onChangeText={(val)=>setName(val)}
                        />
                    </View>
                    <Text style={styles.better}>Father/Spouse Name</Text>
                      <View style={styles.drop}>
                        <TextInput
                         style={styles.input}
                         placeholder='Father/Spouse Name'
                         defaultValue={father==0?'':father}
                         onChangeText={(val)=>setFName(val)}
                        />
                    </View>
                    <Text style={styles.better}>Mother Maiden Name</Text>
                      <View style={styles.drop}>
                        <TextInput
                        style={styles.input}
                        placeholder='Mother Maiden Name'
                        defaultValue={mother==0?'':mother}
                        onChangeText={(val)=>setMName(val)}
                        />
                    </View>
                    <View style={{flexDirection:'row' ,justifyContent:'space-between',width:'100%'}}>
                        <View style={{width:'47%'}}>
                            <Text style={styles.better}>Gender</Text>
                            <View style={styles.drop}>
                               <RNPickerSelect
                                         onValueChange={(val)=>setGender(val)}
                                         items={data}
                                         style={{ 
                                         inputAndroid: { color: colors.textColor,width:'100%',height:35 },
                                         placeholder:{color:colors.textColor}
                                         }}
                                         value={gender}
                                         useNativeAndroidPickerStyle={false}
                                         placeholder={{ label: "Select", value: null }}
                                         Icon={()=>
                                          <Image 
                                         style={{marginLeft:12,width:25,height:9,marginTop:11}} 
                                        source={require('../../../assets/Image/down.png')}/>}
                                        //  <Image style={{margin:12}} 
                                        //  source={require('../../../assets/Image/down.png')}/>}
                                   />

                            </View>
                        </View>
                        <View style={{width:'47%',}}>
                            <Text style={styles.better}>Date of Birth</Text>
                            <View style={styles.dropCal}>
                              <View style={{width:'80%',marginLeft:0}}>
                               <DatePicker
                                  //  style={{width: '100%',}}
                                     date={dob}
                                     mode="date"
                                     placeholder="Date Of Birth"
                                     format="YYYY-MM-DD"
                                     maxDate={new Date()}
                                     confirmBtnText="Confirm"
                                     cancelBtnText="Cancel"
                                     customStyles={{
                                     placeholderText:{color:'grey'},
                                     dateIcon: {
                                      width:0,
                                      height:0,
                                       },
                                     dateInput: {
                                      marginLeft:-40,
                                      borderWidth:0,
                                       },
                                      dateText:{
                                        color:colors.textColor
                                        }
                                      }}
                                      onDateChange={(date)=> setDob(date)}                                   
                                  /> 
                                  </View>
                                  <Image style={{marginLeft:0,width:25,height:9,marginTop:0}} 
                                    source={require('../../../assets/Image/down.png')}/>
                            </View>
                        </View>
                    </View>
                   
                    <Text style={styles.better}>E-mail</Text>
                      <View style={styles.drop}>
                        <TextInput
                        style={styles.input}
                        placeholder='example@gmail.com'
                        defaultValue={email}
                        onChangeText={(val)=>setEmail(val)}
                        editable={false}
                        />
                    </View>
                    <View style={{paddingVertical:30,marginBottom:10}}>
                     <CustomButton
                     title='UPDATE'
                     onPress={()=>validateUser()}
                     />
                    </View>
                    </KeyboardAwareScrollView>
                    </View>
                    </ScrollView>
                  
                 <StatusBar/>
             </View>
         
    )
}
export default RegisterPage;
