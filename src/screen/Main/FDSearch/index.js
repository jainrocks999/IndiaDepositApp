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

const data=[
  { label: 'Male', value: 'Male'},
  { label: 'Female', value: 'Female' },
  { label: 'Other', value: 'Other' },
]

const data1=[
  { label: '10-20 Years', value: '10-20 Years'},
  { label: '20-50 Years', value: '20-50 Years' },
  { label: '50-80 Years', value: '50-80 Years' },
]

const data2=[
  { label: 'Any', value: 'Any'},
  { label: 'Any', value: 'Any' },
  { label: 'Any', value: 'Any' },
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
              <View style={{marginTop:20}}>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                  <Text style={{color:colors.textColor,fontFamily:'Montserrat-Normal'}}>Tenure</Text>
                  <Text style={{color:colors.textColor,fontFamily:'Montserrat-Normal'}}>0 Days</Text>
                </View>
                <View style={{marginTop:15}}>
                <ProgressBar progress={0.5} color={Colors.grey700} />
                </View>
            </View>
            <View style={{marginTop:20}}>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                  <Text style={{color:colors.textColor,fontFamily:'Montserrat-Normal'}}>Amount</Text>
                  <Text style={{color:colors.textColor,fontFamily:'Montserrat-Normal'}}>Rs 0.0</Text>
                </View>
                <View style={{marginTop:15}}>
                <ProgressBar progress={0.5} color={Colors.grey700} />
                </View>
            </View>
            <View style={{marginTop:20}}>
              <Text style={{color:colors.textColor,fontFamily:'Montserrat-Normal'}}>Gender</Text>
                <View style={styles.input}>
                    <RNPickerSelect
                        onValueChange={(val)=>setValue(val)}
                        items={data}
                        style={{ 
                        inputAndroid: { color: color.textColor,width:'100%',height:40 },
                        placeholder:{color:colors.textColor}
                        }}
                        value={value}
                        useNativeAndroidPickerStyle={false}
                        placeholder={{ label: "Select", value: null }}
                        Icon={()=><Image 
                            style={styles.image} 
                            source={require('../../../assets/Images/down.png')}/>}
                        />
                  </View>
            </View>
            <View style={{marginTop:20}}>
              <Text style={{color:colors.textColor,fontFamily:'Montserrat-Normal'}}>Age</Text>
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
                        placeholder={{ label: "Select", value: null }}
                        Icon={()=><Image 
                            style={styles.image} 
                            source={require('../../../assets/Images/down.png')}/>}
                        />
                  </View>
            </View>
            <View style={{marginTop:20}}>
              <Text style={{color:colors.textColor,fontFamily:'Montserrat-Normal'}}>Type</Text>
                <View style={styles.input}>
                    <RNPickerSelect
                        onValueChange={(val)=>setValue(val)}
                        items={data2}
                        style={{ 
                        inputAndroid: { color: color.textColor,width:'100%',height:40 },
                        placeholder:{color:colors.textColor}
                        }}
                        value={value}
                        useNativeAndroidPickerStyle={false}
                        placeholder={{ label: "Select", value: null }}
                        Icon={()=><Image 
                            style={styles.image} 
                            source={require('../../../assets/Images/down.png')}/>}
                        />
                  </View>
            </View>
            <Text style={{color:colors.textColor,fontFamily:'Montserrat-Normal',marginTop:20}}>Interest Payout</Text>
            <View style={styles.input}>
                      <TextInput 
                      style={styles.input1}
                      //placeholder='Amount'
                      keyboardType='number-pad'
                      maxLength={30}
                      />
            </View>
                    
                    <View style={{marginTop:15,marginBottom:20}}>
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

