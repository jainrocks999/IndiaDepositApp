import React,{useState,useEffect}from 'react';
import { View,Text,Image,ScrollView,TextInput} from 'react-native';
import styles from './styles';
import colors from '../../colors';
import StatusBar from '../../StatusBar';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from '@react-native-community/async-storage';
import Storage from '../../AsyncStorage';
import Loader from '../../loader';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';


const Profile=()=>{
  const selector=useSelector((state)=>state.UserData)
  const value=selector[0]
    const [name,setName]=useState('')
    const [mother,setMName]=useState('')
    const [father,setFName]=useState('')
    const [email,setEmail]=useState('')
    const [gender, setGender] = useState('');
    const [dob, setDob] = useState('');
    const [pan, setPan] = useState('');
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');
    const [occupation, setOccu] = useState('');
    const [pincode, setPincode] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [income_group, setIncome] = useState('');
    const [marital_status, setMarital] = useState('');
    const [residential_status, setResidentail] = useState('');
    const [education, setEducation] = useState('');
    const [mobile, setMobile] = useState('');
    const [visible,setVisible]=useState(true)
    const [visible1,setVisible1]=useState(true)

  useEffect(async()=>{
     const name=await AsyncStorage.getItem(Storage.name)
     const email=await AsyncStorage.getItem(Storage.email)
    // const father=await AsyncStorage.getItem(Storage.fatherName)
    // const mother=await AsyncStorage.getItem(Storage.motherName)
    // const dob=await AsyncStorage.getItem(Storage.dob)
    // const gender=await AsyncStorage.getItem(Storage.gender)

    // const pan=await AsyncStorage.getItem(Storage.pan)
    // const mobile=await AsyncStorage.getItem(Storage.mobile)
    // const address1=await AsyncStorage.getItem(Storage.address1)
    // const address2=await AsyncStorage.getItem(Storage.address2)
    // const occupation=await AsyncStorage.getItem(Storage.occupation)
    // const pincode=await AsyncStorage.getItem(Storage.pincode)
    // const country=await AsyncStorage.getItem(Storage.country)
    // const state=await AsyncStorage.getItem(Storage.state)
    // const city=await AsyncStorage.getItem(Storage.city)
    // const income=await AsyncStorage.getItem(Storage.income_group)
    // const residen=await AsyncStorage.getItem(Storage.residential)
    // const marital=await AsyncStorage.getItem(Storage.marital)
    // const education=await AsyncStorage.getItem(Storage.education)
     setName(name)
     setEmail(email)
    // setFName(father)
    // setMName(mother)
    // setDob(dob)
    // setGender(gender)
    // setPan(pan)
    // setMobile(mobile)
    // setAddress1(address1)
    // setAddress2(address2)
    // setOccu(occupation)
    // setPincode(pincode)
    // setCountry(country)
    // setState(state)
    // setCity(city)
    // setIncome(income)
    // setResidentail(residen)
    // setMarital(marital)
    // setEducation(education)

  })
  const manageDrop=()=>{
    if (visible==true) {
       setVisible(false)
    } else {
      setVisible(true)
    }
  }
  const manageDrop1=()=>{
    if (visible1==true) {
       setVisible1(false)
    } else {
      setVisible1(true)
    }
  }
    return(
        <View style={styles.container}>
              <View style={{padding:10}}>
              {name==''&&email==''?<Loader/>:null}
                 <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
                   <TouchableOpacity
                   onPress={()=>manageDrop()}
                   style={{
                     width:'100%',
                     height:45,
                     backgroundColor:colors.bc,
                     flexDirection:'row',
                     alignItems:'center',
                     justifyContent:'space-between',
                     paddingHorizontal:10
                     }}>
                     <Text style={{color:colors.white}}>Personal Details</Text>
                     {visible?
                     <Image resizeMethod='resize' 
                     style={{tintColor:'white',height:20,width:20}} 
                     source={require('../../../assets/Image/down.png')}/>
                     :
                     <Image resizeMethod='resize' 
                     style={{tintColor:'white',height:20,width:20}} 
                     source={require('../../../assets/Image/arrowF.png')}/>}
                   </TouchableOpacity>
                   {visible?<View>
                   {/* {value.name==0||null? <View/>: */}
                      <View>
                         <Text style={styles.better}>Name</Text>
                          <View style={styles.drop}>
                            <Text style={styles.better1}>{`${value.name==0||null?'':value.name}`}</Text></View>
                      </View>
                    {/* } */}

                    {value.father_spouse_name==0||null?
                    <View/>:
                    <View>
                    <Text style={styles.better}>Father/Spouse Name</Text>
                      <View style={styles.drop}>
                      <Text style={styles.better1}>{`${value.father_spouse_name==0||null?'':value.father_spouse_name}`}</Text>
                    </View>
                    </View>}

                    {/* {value.mother_maiden_name==0||null?<View/>:<View> */}
                    <Text style={styles.better}>Mother Maiden Name</Text>
                      <View style={styles.drop}>
                      <Text style={styles.better1}>{`${value.mother_maiden_name==0||null?'':value.mother_maiden_name}`}</Text>
                    </View>
                    {/* </View>} */}
              
                    <View style={styles.view}>
                         {/* {value.gender==0||null?<View/>: */}
                        <View style={styles.view1}>
                            <Text style={styles.better}>Gender</Text>
                            <View style={styles.drop}>
                            <Text style={styles.better1}>{`${value.gender==0||null?'':value.gender}`}</Text>
                            </View>
                        </View>
                        {/* } */}
                    
                        {/* {value.dob==0||null?<View/>: */}
                        <View style={styles.view1}>
                            <Text style={styles.better}>Date of Birth</Text>
                            <View style={styles.dropCal}>
                            <Text style={styles.better1}>{`${value.dob==0||null?'':value.dob}`}</Text>
                            </View>
                        </View>
                        {/* } */}
                        
                    </View>

                     {/* {value.email==0||null?<View/>: */}
                     <View>
                      <Text style={styles.better}>E-mail</Text>
                      <View style={styles.drop}>
                      <Text style={styles.better1}>{`${value.email==0||null?'':value.email}`}</Text>
                    </View>
                    </View>
                    {/* } */}

                    {/* {value.pan==0||null?<View/>: */}
                    <View>
                    <Text style={styles.better}>Pan Card</Text>
                      <View style={styles.drop}>
                      <Text style={styles.better1}>{`${value.pan==0||null?'':value.pan}`}</Text>
                    </View>
                    </View>
                    {/* } */}

                     {/* {value.mobile==0||null?<View/>: */}
                     <View>
                      <Text style={styles.better}>Mobile</Text>
                      <View style={styles.drop}>
                       <Text style={styles.better1}>{value.mobile==0||null?'':value.mobile}</Text>
                      </View>
                    </View>
                    {/* } */}

                    {/* {value.address1==0||null?<View/>: */}
                    <View>
                    <Text style={styles.better}>Address Line1</Text>
                      <View style={styles.drop}>
                      <Text style={styles.better1}>{value.address1==0||null?'':value.address1}</Text>
                    </View>
                    </View>
                    {/* } */}
                    
                   </View>:<View></View>

                   }

                    <TouchableOpacity
                   onPress={()=>manageDrop1()}
                   style={{
                     width:'100%',
                     height:45,
                     backgroundColor:colors.bc,
                     flexDirection:'row',
                     alignItems:'center',
                     justifyContent:'space-between',
                     paddingHorizontal:10,
                     marginTop:10
                     }}>
                     <Text style={{color:colors.white}}>Additional Details</Text>
                     {visible1?<Image resizeMethod='resize' 
                     style={{tintColor:'white',height:20,width:20}} 
                     source={require('../../../assets/Image/down.png')}/>:
                     <Image resizeMethod='resize' 
                     style={{tintColor:'white',height:20,width:20}} 
                     source={require('../../../assets/Image/arrowF.png')}/>
                     }
                   </TouchableOpacity>
                   {visible1?<View>

                      {/* {value.address2==0||null?<View/>: */}
                      <View>
                        <Text style={styles.better}>Address Line2</Text>
                          <View style={styles.drop}>
                          <Text style={styles.better1}>{`${value.address2==0||null?'':value.address2}`}</Text>
                        </View>
                      </View>
                      {/* } */}

                      {/* {value.city==0||null?<View/>: */}
                      <View>
                        <Text style={styles.better}>City</Text>
                          <View style={styles.drop}>
                          <Text style={styles.better1}>{value.city_name==0||null?'':value.city_name}</Text>
                        </View>
                      </View>
                      {/* } */}

                      {/* {value.state==0||null?<View/>: */}
                      <View>
                        <Text style={styles.better}>State</Text>
                          <View style={styles.drop}>
                          <Text style={styles.better1}>{value.state_name==0||null?'':value.state_name}</Text>
                        </View>
                       </View>
                       {/* } */}

                       {/* {value.country==0||null?<View/>: */}
                       <View> 
                        <Text style={styles.better}>Country</Text>
                          <View style={styles.drop}>
                          <Text style={styles.better1}>{value.country_name==0||null?'':value.country_name}</Text>
                        </View>
                      </View>
                      {/* } */}

                      {/* {value.pincode==0||null?<View/>: */}
                      <View>
                        <Text style={styles.better}>Pincode</Text>
                          <View style={styles.drop}>
                          <Text style={styles.better1}>{value.pincode==0||null?'':value.pincode}</Text>
                        </View>
                      </View>
                      {/* } */}

                      {/* {value.income_group==0||null ?<View/>: */}
                      <View>
                        <Text style={styles.better}>Income Group</Text>
                          <View style={styles.drop}>
                          <Text style={styles.better1}>{value.income_group==0||null?'':value.income_group}</Text>
                        </View>
                      </View>
                      {/* } */}

                      {/* {value.education==0||null?<View/>: */}
                      <View>
                        <Text style={styles.better}>Education</Text>
                          <View style={styles.drop}>
                          <Text style={styles.better1}>{value.education==0||null?'':value.education}</Text>
                        </View>
                      </View>
                      {/* } */}

                      {/* {value.occupation==0||null?<View/>: */}
                      <View>
                        <Text style={styles.better}>Occupation</Text>
                          <View style={styles.drop}>
                          <Text style={styles.better1}>{value.occupation==0||null?'':value.occupation}</Text>
                        </View>
                      </View>
                      {/* } */}

                      {/* {value.marital_status==0||null?<View/>: */}
                      <View>
                        <Text style={styles.better}>Marital Status</Text>
                          <View style={styles.drop}>
                          <Text style={styles.better1}>{value.marital_status==0||null?'':value.marital_status}</Text>
                        </View>
                      </View>
                      {/* } */}

                      {/* {value.residential_status==0||null?<View/>: */}
                      <View>
                        <Text style={styles.better}>Residential Status</Text>
                          <View style={styles.drop}>
                          <Text style={styles.better1}>{value.residential_status==0||null?'':value.residential_status}</Text>
                        </View>   
                      </View>   
                       {/* }  */}
                   </View>:<View></View>
                   }
                    <View style={styles.view3}>
                     
                    </View>
                    </KeyboardAwareScrollView>
                    </View>
         <StatusBar/>
         {/* <BottomTab/> */}
       </View>
    )
}
export default Profile;

