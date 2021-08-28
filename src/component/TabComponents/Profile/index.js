import React,{useState}from 'react';
import { View,Text,Image,ScrollView,TextInput} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import StatusBar from '../../../component/StatusBar';
import color from '../../../component/colors';
import CustomButton from '../../../component/button1';
import Header from '../../../component/header';
import BottomTab from '../../../component/StoreButtomTab';
import RNPickerSelect from "react-native-picker-select";
import colors from '../../../component/colors';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import DatePicker from 'react-native-datepicker';


const data=[
  { label: 'Male', value: 'Male' },
  { label: 'Female', value: 'Female' },
  { label: 'Others', value: 'Others'}]


const Profile=()=>{
    const navigation=useNavigation()
  
    const [value, setValue] = useState('');
    const [value1, setValue1] = useState('');
   

    return(
        <View style={styles.container}>
              <View style={{padding:10}}>
                 <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
                    <Text style={styles.better}>Name</Text>
                      <View style={styles.drop}>
                        <TextInput
                         style={styles.input}
                         placeholder='Jhon Mathew'
                        />
                    </View>
                    <Text style={styles.better}>Father/Spouse Name</Text>
                      <View style={styles.drop}>
                        <TextInput
                         style={styles.input}
                         placeholder='Father/Spouse Name'
                        />
                    </View>
                    <Text style={styles.better}>Mother Maiden Name</Text>
                      <View style={styles.drop}>
                        <TextInput
                        style={styles.input}
                        placeholder='Mother Maiden Name'
                       
                        />
                    </View>
                    <View style={{flexDirection:'row' ,justifyContent:'space-between',width:'100%'}}>
                        <View style={{width:'47%'}}>
                            <Text style={styles.better}>Gender</Text>
                            <View style={styles.drop}>

                               <RNPickerSelect
                                     onValueChange={(val) => setValue(val)}
                                     items={data}
                                     style={{ inputAndroid: { color:colors.textColor,height:35 },
                                     placeholder:{color:colors.textColor}
                                     }}
                                     value={value}
                                     useNativeAndroidPickerStyle={false}
                                     placeholder={{ label: "Select Gender", value: null }}
                                     Icon={()=>
                                    <Image style={{margin:12}} 
                                       source={require('../../../assets/Image/down.png')}/>}
                                     />
                                 
                            </View>
                        </View>
                        <View style={{width:'47%',}}>
                            <Text style={styles.better}>Date of Birth</Text>
                            <View style={styles.drop}>
                               <DatePicker
                                    style={{width: '100%'}}
                                     date={value1}
                                     mode="date"
                                     placeholder="Date Of Birth"
                                     format="DD-MM-YYYY"
                                     maxDate={new Date()}
                                     confirmBtnText="Confirm"
                                     cancelBtnText="Cancel"
                                     customStyles={{
                                     placeholderText:{marginLeft:0,marginTop:0,color:colors.textColor},
                                     dateIcon: {
                                      width:0,
                                      height:0,
                                     // backgroundColor:colors.bc
                                       },
                                     dateInput: {
                                      marginLeft:-40,
                                      borderWidth:0, 
                                      // width:300 
                                       },
                                      dateText:{
                                        color:colors.textColor
                                        }
                                      }}
                
                                      onDateChange={(date)=> setValue1(date)}
                                     
                                  /> 
                                  {/* <Image style={{marginTop:-15,marginLeft:115}} 
                                    source={require('../../../assets/Image/down.png')}/> */}
                            </View>
                        </View>
                    </View>
                   
                    <Text style={styles.better}>E-mail</Text>
                      <View style={styles.drop}>
                        <TextInput
                        style={styles.input}
                        placeholder='E-mail'
                        />
                    </View>
                    <View style={{paddingVertical:20,marginBottom:50}}>
                     
                    </View>
                    </KeyboardAwareScrollView>
                    </View>
         <StatusBar/>
         {/* <BottomTab/> */}
       </View>
    )
}
export default Profile;

