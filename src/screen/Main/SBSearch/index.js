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
import CheckBox from '@react-native-community/checkbox';

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
    const [toggleCheckBox,setToggleCheckBox]=useState(false)
  


const keepme = async (newValue) => {
      setToggleCheckBox(newValue);
    };
    return(
        <View style={styles.container}>
            <Header
            title={'SB ACCOUNT SEARCH'}
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
                        style={{marginTop:16,marginRight:8}} 
                        source={require('../../../assets/Images/down.png')}/>}
                    />
                  </View>
                  <View style={styles.input}>
                    <TextInput 
                    style={styles.input1}
                    placeholder='Account Type'
                    maxLength={40}
                    />
                  </View>
                  <View style={styles.input}>
                    <TextInput 
                    style={styles.input1}
                    placeholder='Minimum Amount'
                    keyboardType={'number-pad'}
                    maxLength={40}
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
                  
                 
                    <View style={{marginTop:15}}>
                    <Button
                    onPress={()=>navigation.navigate('AccountList')}
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

