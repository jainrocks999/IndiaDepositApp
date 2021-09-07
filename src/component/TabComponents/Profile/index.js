import React,{useState,useEffect}from 'react';
import { View,Text,Image,ScrollView,TextInput} from 'react-native';
import styles from './styles';
import StatusBar from '../../../component/StatusBar';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from '@react-native-community/async-storage';
import Storage from '../../../component/AsyncStorage';
const Profile=()=>{
    const [name,setName]=useState()
    const [mother,setMName]=useState()
    const [father,setFName]=useState()
    const [email,setEmail]=useState()
    const [gender, setGender] = useState('');
    const [dob, setDob] = useState('');
  useEffect(async()=>{
    const name=await AsyncStorage.getItem(Storage.name)
    const email=await AsyncStorage.getItem(Storage.email)
    const father=await AsyncStorage.getItem(Storage.fatherName)
    const mother=await AsyncStorage.getItem(Storage.motherName)
    const dob=await AsyncStorage.getItem(Storage.dob)
    const gender=await AsyncStorage.getItem(Storage.gender)
    setName(name)
    setEmail(email)
    setFName(father)
    setMName(mother)
    setDob(dob)
    setGender(gender)
  })
    
    return(
        <View style={styles.container}>
              <View style={{padding:10}}>
                 <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
                    <Text style={styles.better}>Name</Text>
                      <View style={styles.drop}>
                        <TextInput
                         style={styles.input}
                        //  placeholder='Jhon Mathew'
                         value={name==0?'':name}
                         editable={false}
                        />
                    </View>
                    <Text style={styles.better}>Father/Spouse Name</Text>
                      <View style={styles.drop}>
                        <TextInput
                         style={styles.input}
                        //  placeholder='Father/Spouse Name'
                         value={father==0?'':father}
                         editable={false}
                        />
                    </View>
                    <Text style={styles.better}>Mother Maiden Name</Text>
                      <View style={styles.drop}>
                        <TextInput
                        style={styles.input}
                        // placeholder='Mother Maiden Name'
                        value={mother==0?'':mother}
                        editable={false}
                        />
                    </View>
                    <View style={styles.view}>
                        <View style={styles.view1}>
                            <Text style={styles.better}>Gender</Text>
                            <View style={styles.drop}>
                         
                              <TextInput
                              style={styles.input}
                              // placeholder='Gender'
                              value={gender==0?'':gender}
                              editable={false}
                              />
                            </View>
                        </View>
                        <View style={styles.view1}>
                            <Text style={styles.better}>Date of Birth</Text>
                            <View style={styles.dropCal}>
                            <TextInput
                              style={styles.input}
                              // placeholder='Date of Birth'
                              value={dob==0?'':dob}
                              editable={false}
                              />
                            </View>
                        </View>
                    </View>
                   
                    <Text style={styles.better}>E-mail</Text>
                      <View style={styles.drop}>
                        <TextInput
                        style={styles.input}
                        // placeholder='example@domain.com'
                        value={email==0?'':email}
                        editable={false}
                        />
                    </View>
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

