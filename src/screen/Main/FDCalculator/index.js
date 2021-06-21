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
import { RadioButton } from 'react-native-paper';
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
           source={require('../../../assets/Images/arrow.png')}
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
             <View style={{marginTop:18}}>
                <Text style={styles.same}>Fixed Deposit Amount </Text> 
             <View style={styles.input}>
              <TextInput 
               style={{height:35,width:'90%',fontSize:13,color:colors.textColor}}
               placeholder='Amount'
               keyboardType='number-pad'
               />
             </View>
             </View>
             <View style={{marginTop:18}}>
                <Text style={styles.same}>Rate of Interest </Text> 
             <View style={styles.interest}>
              <TextInput 
              style={{height:35,width:'90%',fontSize:13,color:colors.textColor}} 
              placeholder='Interest'
              keyboardType={'number-pad'}
              />
              <Image style={{marginRight:5}} source={require('../../../assets/Images/percent.png')}/>
             </View>
             </View>
             <View style={{marginTop:18}}>
                <Text style={styles.same}>How Long do you want to save? </Text> 
                  <View style={styles.drop}>
                   <RNPickerSelect
                     onValueChange={(val)=>setValue(val)}
                     items={data}
                     style={{ 
                        inputAndroid:{ color: color.textColor,width:'100%',height:35,fontSize:12 },
                        placeholder:{fontSize:12,color:colors.textColor} }}
                     value={value}
                     useNativeAndroidPickerStyle={false}
                     placeholder={{ label: "Month / Years", value: null }}
                     Icon={()=><Image style={{marginTop:12,marginRight:5}} source={require('../../../assets/Images/down.png')}/>}
                  />
                  </View>
             </View>
             <View style={{marginTop:18}}>
                <Text style={styles.same}>Senior Citizen?  </Text> 
                <View style={{flexDirection:'row',width:'100%'}}>
                     <View style={{flexDirection:'row',alignItems:'center',marginLeft:-5}}>
                            <RadioButton
                              value={checked}
                              status={ checked === true ? 'checked' : 'unchecked' }
                              onPress={() =>!checked?setChecked(true) :setChecked(false)}
                              color={'#777777'}
                              />
                           <Text style={{color:colors.textColor,fontSize:12}}>Yes</Text>
                     </View>
                     {/* <View style={{flexDirection:'row',alignItems:'center',marginLeft:10}}>
                            <RadioButton
                              value={checked1}
                              status={ checked1 === true ? 'checked' : 'unchecked' }
                              onPress={() =>checked?setChecked(false) && setChecked1(true):setChecked1(true)}
                              color={'#777777'}
                              />
                           <Text style={{color:colors.textColor,fontSize:12}}>No</Text>
                     </View> */}
                 </View>
             </View>
             <View style={styles.buttonContainer}>
             <TouchableOpacity 
            // onPress={()=>navigation.navigate('Update')}
             style={styles.button}>
                <Text style={styles.cal}>CALCULATE</Text>
             </TouchableOpacity>
             <TouchableOpacity style={ styles.button}>
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

