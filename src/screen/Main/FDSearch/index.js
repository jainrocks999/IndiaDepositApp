import React,{useState}from 'react';
import { View,Text,Image,ScrollView,TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import StatusBar from '../../../component/StatusBar';
import color from '../../../component/colors';
import { TextInput } from 'react-native';
import colors from '../../../component/colors';
import Header from '../../../component/header';
import Button from '../../../component/button1'
import RNPickerSelect from "react-native-picker-select";
import { ProgressBar, Colors } from 'react-native-paper';
import BottomTab from '../../../component/StoreButtomTab';

const Contact=()=>{
    const navigation=useNavigation()
    const [gender, setGender] = useState('')
    const [day, setDay] = useState('')

    return(
        <View style={styles.container}>
              <Header
                  title={'FD SEARCH'}
                  source={require('../../../assets/Images/arrow.png')}
                  onPress={()=>navigation.goBack()}
              />
             <ScrollView style={styles.scroll}>
                <View style={styles.main}>
                  < View style={styles.view}>
                      <Text style={[styles.text1,{fontSize:13}]}>
                        Lorem ipsum, or lipsum as it is sometimes known,
                        is dummy text used in laying out print, graphic or
                        web designs. The passage is attributed to an
                        unknown typesetter book.
                     </Text>
                     <View  style={styles.view}>
                        <Text style={styles.text1}>Tenure</Text>
                     </View>
                     <View style={styles.view1}>
                        <View style={styles.view2}>
                              <View style={styles.view3}>
                                 <View style={styles.input}>
                                    <RNPickerSelect
                                      onValueChange={(val)=>setDay(val)}
                                      items={days}
                                      style={{ 
                                      inputAndroid: { color: color.textColor,width:'100%',height:40 },
                                      placeholder:{color:'#333333',fontSize:12}
                                      }}
                                      value={day}
                                      useNativeAndroidPickerStyle={false}
                                      placeholder={{ label: "Days", value: null }}
                                      Icon={()=><Image 
                                      style={styles.image} 
                                      source={require('../../../assets/Image/down.png')}/>}
                                    />
                                  </View>
                               </View>
                               <View style={styles.view3}>
                                    <View style={styles.input}>
                                       <RNPickerSelect
                                          onValueChange={(val)=>setGender(val)}
                                          items={Month}
                                          style={{ 
                                          inputAndroid: { color: color.textColor,width:'100%',height:40 },
                                          placeholder:{color:'#333333',fontSize:12}
                                          }}
                                          value={gender}
                                          useNativeAndroidPickerStyle={false}
                                          placeholder={{ label: "Month", value: null }}
                                          Icon={()=><Image 
                                          style={styles.image} 
                                          source={require('../../../assets/Image/down.png')}/>}
                                        />
                                     </View>
                               </View>
                               <View style={styles.view3}>
                                    <View style={styles.input}>
                                       <RNPickerSelect
                                           onValueChange={(val)=>setGender(val)}
                                           items={Years}
                                           style={{ 
                                           inputAndroid: { color: color.textColor,width:'100%',height:40 },
                                           placeholder:{color:'#333333',fontSize:12}
                                           }}
                                           value={gender}
                                           useNativeAndroidPickerStyle={false}
                                           placeholder={{ label: "Year", value: null }}
                                           Icon={()=><Image 
                                           style={styles.image} 
                                           source={require('../../../assets/Image/down.png')}/>}
                                       />
                                     </View>
                                 </View>
                             </View>
                        </View>
                      </View>
                      <View style={styles.view1}>
                           <View style={styles.view4}>
                               <Text style={styles.text1}>Amount</Text>
                           </View>
                           <View style={{marginTop:-10}}>
                              <TextInput
                                 style={{borderBottomWidth:1.5,borderColor:'#3D4785',paddingBottom:-10}}
                                 keyboardType='number-pad'
                              />
                           </View>
                      </View>
                      <View style={styles.view1}>
                          <View style={styles.view4}>
                              <Text style={styles.text1}>Location</Text>
                          </View>
                          <View style={styles.view5}>
                                <Image source={require('../../../assets/Image/search.png')}/>
                                <Text style={[styles.text1,{marginLeft:30}]}>Current Location</Text>
                          </View>
                       </View>
                       <View style={styles.view6}>
                             <Text>OR</Text>
                       </View>
                      <View style={styles.view7}>
                           <TextInput
                              style={{borderBottomWidth:1.5,borderColor:'#3D4785',paddingBottom:0}}
                              placeholder='Enter Pincode'
                           />
                       </View>
                       <View style={styles.view8}>
                            <Button
                                onPress={()=>navigation.navigate('FDList')}
                                title='SEARCH'
                            />
                       </View>
                     </View>
            </ScrollView>
                  <BottomTab/>
                 <StatusBar/>
     </View>
    )
}
export default Contact;

const days=[
  { label: '01', value: '01'},
  { label: '02', value: '02' },
  { label: '03', value: '03' },
  { label: '04', value: '04' },
  { label: '05', value: '05' },
  { label: '06', value: '06' },
  { label: '07', value: '07' },
  { label: '08', value: '08' },
  { label: '09', value: '09' },
  { label: '10', value: '10' },
  { label: '11', value: '11' },
  { label: '12', value: '12' },
  { label: '13', value: '13' },
  { label: '14', value: '14' },
  { label: '15', value: '15' },
  { label: '16', value: '16' },
  { label: '17', value: '17' },
  { label: '18', value: '18' },
  { label: '19', value: '19' },
  { label: '20', value: '20' },
  { label: '21', value: '21' },
  { label: '22', value: '22' },
  { label: '23', value: '23' },
  { label: '24', value: '24' },
  { label: '25', value: '25' },
  { label: '26', value: '26' },
  { label: '27', value: '27' },
  { label: '28', value: '28' },
  { label: '29', value: '29' },
  { label: '30', value: '30' },

]
const Month=[
  
  { label: 'January', value: 'January' },
  { label: 'February', value: 'February' },
  { label: 'March', value: 'March' },
  { label: 'April', value: 'April' },
  { label: 'May', value: 'May' },
  { label: 'June', value: 'June' },
  { label: 'July', value: 'July' },
  { label: 'August', value: 'August' },
  { label: 'September', value: 'September' },
  { label: 'October', value: 'October' },
  { label: 'November', value: 'November' },
  { label: 'December', value: 'December' },
]

const Years=[
  { label: '2000', value: '2000' },
  { label: '2001', value: '2001' },
  { label: '2002', value: '2002' },
  { label: '2003', value: '2003' },
  
]