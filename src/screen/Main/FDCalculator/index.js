import React,{useState}from 'react';
import { View,Text,Image,ScrollView,TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import StatusBar from '../../../component/StatusBar';
import color from '../../../component/colors';
import { TextInput } from 'react-native';
import RNPickerSelect from "react-native-picker-select";
import colors from '../../../component/colors';
import Header from '../../../component/header';
import CheckBox from '@react-native-community/checkbox';
// import { RadioButton } from 'react-native-paper';
import fontSize from '../../../component/fontSize';
const data=[
{ label: 'Jan', value: 'Jan'},
{ label: 'Feb', value: 'Feb' },
{ label: 'March', value: 'March' },]

const FDCalculator=()=>{
    const navigation=useNavigation()
    const [value, setValue] = useState('');
    const [checked, setChecked] = React.useState(false);
    const [checked1, setChecked1] = React.useState(false);



    return(
        <View style={styles.container}>
              <Header
                    title="FD CALCULATOR"
                    source={require('../../../assets/Image/arrow2.png')}
                    onPress={()=>navigation.goBack()}
                />
             <ScrollView style={{flex:1}}>
            
                   <View style={styles.main}>
                      <View>
                           <Text style={styles.heading}>FIXED DEPOSIT CALCULATOR </Text> 
                           <Text style={styles.normal}>
                             It is a long established fact that a reader will be
                             distracted by the readable content.
                           </Text>
                      </View>
                      <View style={styles.main1}>
                           <Text style={styles.same}>Fixed Deposit Amount </Text> 
                          <View style={styles.input}>
                                <TextInput 
                                    style={styles.textinput}
                                    placeholder='Amount'
                                    placeholderTextColor={colors.heading1}
                                    keyboardType='number-pad'
                                    returnKeyType='done'
                                />
                            </View>
                      </View>
                      <View  style={styles.main1}>
                          <Text style={styles.same}>Rate of Interest </Text> 
                          <View style={styles.interest}>
                               <TextInput 
                                 style={styles.textinput} 
                                  placeholder='Interest'
                                  placeholderTextColor={colors.heading1}
                                  keyboardType={'number-pad'}
                                  returnKeyType='done'
                                />
                                <Image style={{marginRight:5}} 
                                  source={require('../../../assets/Images/percent.png')}/>
                            </View>
                      </View>
                      <View  style={styles.main1}>
                            <Text style={styles.same}>How Long do you want to save? </Text> 
                            <View style={styles.drop}>
                                   <RNPickerSelect
                                       onValueChange={(val)=>setValue(val)}
                                       items={data}
                                       style={{ 
                                       inputAndroid:{ color: color.textColor,width:'100%',height:35,fontSize:fontSize.twelve },
                                       placeholder:{fontSize:fontSize.twelve,color:colors.textColor} }}
                                       value={value}
                                       useNativeAndroidPickerStyle={false}
                                       placeholder={{ label: "Month / years", value: null }}
                                        Icon={()=><Image style={styles.icon1} 
                                        source={require('../../../assets/Images/down.png')}/>}
                                    />
                             </View>
                         </View>
                         <View  style={styles.main1}>
                              <Text style={styles.same}>Senior Citizen?  </Text> 
                             <View style={styles.view1}>
                                  <View style={styles.view2}>
                                      
                                         <Text style={styles.text1}>Yes</Text>
                                     </View>
                                       
                              </View>
                          </View>
                             <View style={styles.buttonContainer}>
                                  <TouchableOpacity delayPressIn={0}
                                     // onPress={()=>navigation.navigate('Update')}
                                     style={styles.button}>
                                     <Text style={styles.cal}>CALCULATE</Text>
                                  </TouchableOpacity>
                                  <TouchableOpacity delayPressIn={0} style={ styles.button}>
                                      <Text style={styles.cal}>RESET</Text>
                                  </TouchableOpacity>

                              </View>
                      </View>
            </ScrollView>
           <StatusBar/>
       </View>
    )
}
export default FDCalculator;

