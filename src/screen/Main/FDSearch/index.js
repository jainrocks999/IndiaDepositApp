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
import { RadioButton } from 'react-native-paper';

const data=[
{ label: 'Monday', value: 'Monday'},
{ label: 'Tuesday', value: 'Tuesday' },
{ label: 'Wednesday', value: 'Wednesday' },
{ label: 'Thursday', value: 'Thursday' },
{ label: 'Friday', value: 'Friday' },
{ label: 'Saturday', value: 'Saturday' },
{ label: 'Sunday', value: 'Sunday' },
]
const data1=[
  { label: 'State Bank Of India', value: 'State Bank Of India'},
  { label: 'Bank Of Baroda', value: 'Bank Of Baroda' },
  { label: 'Union Bank', value: 'Union Bank' },
  { label: 'Gramin Bank', value: 'Gramin Bank' },
  { label: 'HDFC Bank', value: 'HDFC Bank' },
  
  ]

const Contact=()=>{
    const navigation=useNavigation()
    const [value, setValue] = useState('')
    const [checked, setChecked] = React.useState(false);

    return(
        <View style={styles.container}>
            <Header
            title={'FD SEARCH'}
            source={require('../../../assets/Images/arrow.png')}
            onPress={()=>navigation.goBack()}
            />
          <ScrollView style={{flex:1}}>
            <View style={styles.main}>
             <View style={styles.input}>
                <RNPickerSelect
                    onValueChange={(val)=>setValue(val)}
                    items={data1}
                    style={{ 
                    inputAndroid: { color: color.textColor,width:'100%',height:40 },
                    placeholder:{color:colors.textColor}
                    }}
                    value={value}
                    useNativeAndroidPickerStyle={false}
                    placeholder={{ label: "Bank Name", value: null }}
                    Icon={()=><Image 
                        style={styles.image} 
                        source={require('../../../assets/Images/down.png')}/>}
                    />
                    </View>
                    <View style={styles.input}>
                      <TextInput 
                      style={styles.input1}
                      placeholder='Amount'
                      keyboardType='number-pad'
                      maxLength={30}
                      />
                    </View>
                    <View style={styles.interest}>
                      <TextInput 
                      style={styles.input1} 
                      placeholder='Interest Rate'
                      keyboardType={'number-pad'}
                      maxLength={20}
                      />
                      <Image 
                      style={{marginRight:5}} 
                      source={require('../../../assets/Images/percent.png')}/>
                    </View>
                    <View style={styles.container1}>
                        <View style={styles.same}>
                        <TextInput 
                            style={styles.ten} 
                            placeholder='Tenure'
                            keyboardType={'number-pad'}
                            maxLength={20}
                            />
                        </View>
                        <View style={styles.same}>
                        <RNPickerSelect
                            onValueChange={(val)=>setValue(val)}
                            items={data}
                            style={{ 
                            inputAndroid: { color: color.textColor,width:'100%',height:40 },
                            placeholder:{color:colors.textColor}
                            }}
                            value={value}
                            useNativeAndroidPickerStyle={false}
                            placeholder={{ label: "Days", value: null }}
                            Icon={()=><Image 
                                style={styles.image} 
                                source={require('../../../assets/Images/down.png')}/>}
                            />
                            </View>
                          
                          </View>
                          <View style={styles.row}>
                           {/* <CheckBox
                              
                              disabled={false}
                              value={toggleCheckBox}
                              onValueChange={(newValue) => keepme(newValue)}
                              boxType="square"                    
                              onFillColor={colors.textColor}
                              tintColors={{ true: colors.textColor, false: colors.textColor }}
                           /> */}
                            <RadioButton
                              value={checked}
                              status={ checked === true ? 'checked' : 'unchecked' }
                              onPress={() =>!checked?setChecked(true) :setChecked(false)}
                              color={'#777777'}
                              />
                           <Text style={{color:colors.textColor,fontSize:12}}>Senior Citizen?</Text>
                     </View>
                    <View style={{marginTop:15}}>
                    <Button
                    onPress={()=>navigation.navigate('FDList')}
                    title='SEARCH'
                    />
                    </View>
             </View>
          </ScrollView>
         <StatusBar/>
       </View>
    )
}
export default Contact;

