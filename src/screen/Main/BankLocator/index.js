import React,{useState}from 'react';
import { View,Text,Image,ScrollView} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import StatusBar from '../../../component/StatusBar';
import color from '../../../component/colors';
import CustomButton from '../../../component/button1';
import Header from '../../../component/header';
import RNPickerSelect from "react-native-picker-select";
import fontSize from '../../../component/fontSize';
const data=
[
   { label: 'Item', value: 'Item'},
   { label: 'Item', value: 'Item' },
   { label: 'Item', value: 'Item' },
]

const Security=()=>{
    const navigation=useNavigation()
    const [value, setValue] = useState('');
    const [value1, setValue1] = useState('');
    const [value2, setValue2] = useState('');
    const [value3, setValue3] = useState('');

    return(
        <View style={styles.container}>
             <Header
                  source={require('../../../assets/Images/arrow.png')}
                  title={'BANK LOCATOR'}
                  onPress={()=>navigation.goBack()}
             />
             <View style={styles.card}>
                <ScrollView style={{flex:1}}>
                      <Text style={styles.better}>Bank</Text>
                      <View style={styles.drop}>
                         <RNPickerSelect
                            onValueChange={(val)=>setValue(val)}
                            items={data}
                            style={{ 
                            inputAndroid: { color: color.textColor,width:'100%',height:35 },
                            placeholder:{color:'#555555',fontSize:fontSize.thirteen}
                            }}
                            value={value}
                            useNativeAndroidPickerStyle={false}
                            placeholder={{ label: "Select Bank", value: '' }}
                            Icon={()=>
                            <Image style={{margin:12}} 
                            source={require('../../../assets/Image/down.png')}/>}
                           />
                       </View>
                       <Text style={styles.better}>State</Text>
                       <View style={styles.drop}>
                         <RNPickerSelect
                            onValueChange={(val)=>setValue1(val)}
                            items={data}
                            style={{ 
                            inputAndroid: { color: color.textColor,width:'100%',height:35 },
                            placeholder:{color:'#555555',fontSize:fontSize.thirteen}
                            }}
                            value={value1}
                            useNativeAndroidPickerStyle={false}
                            placeholder={{ label: "Select State", value: '' }}
                            Icon={()=>
                            <Image style={{margin:12}} 
                            source={require('../../../assets/Image/down.png')}/>}
                           />
                       </View>
                        <Text style={styles.better}>District</Text>
                        <View style={styles.drop}>
                         <RNPickerSelect
                            onValueChange={(val)=>setValue2(val)}
                            items={data}
                            style={{ 
                            inputAndroid: { color: color.textColor,width:'100%',height:35 },
                            placeholder:{color:'#555555',fontSize:fontSize.thirteen}
                            }}
                            value={value2}
                            useNativeAndroidPickerStyle={false}
                            placeholder={{ label: "Select District", value: '' }}
                            Icon={()=>
                            <Image style={{margin:12}} 
                            source={require('../../../assets/Image/down.png')}/>}
                           />
                        </View>
                        <Text style={styles.better}>Branch</Text>
                        <View style={styles.drop}>
                          <RNPickerSelect
                            onValueChange={(val)=>setValue3(val)}
                            items={data}
                            style={{ 
                            inputAndroid: { color: color.textColor,width:'100%',height:35 },
                            placeholder:{color:'#555555',fontSize:fontSize.thirteen}
                            }}
                            value={value3}
                            useNativeAndroidPickerStyle={false}
                            placeholder={{ label: "Select Branch", value: '' }}
                            Icon={()=>
                            <Image style={{margin:12}} 
                            source={require('../../../assets/Image/down.png')}/>}
                           />
                        </View>
                        <View style={{marginTop:20}}>
                            <CustomButton
                                title='SEARCH'
                           />
                        </View>
           </ScrollView>
       </View>
         
         <StatusBar/>
         {/* <BottomTab/> */}
    </View>
   )
}
export default Security;

