import React,{useState,useCallback}from 'react';
import { View,Text,Image,ScrollView, TextInput} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import ProgressBar from 'react-native-progress/Bar';
import colors from '../../colors';
import fontsize from '../../../component/fontSize';
import RangeSlider from '@3beeepb/react-native-range-slider';
import Slider  from "react-native-slider";
const SIP=()=>{
    const navigation=useNavigation()
    const [interest,setInterest]=useState('1')
    const [time,setTime]=useState('1')
    const [totalInvestment,setTotalInvestment]=useState('500')
   
   

    const handleValueChange = useCallback((low, high, isUpdate) => {
        if (isUpdate) {
          setTotalInvestment(JSON.stringify(low))
        }
      }, []);

      const handleValueChange1 = useCallback((low, high, isUpdate) => {
        if (isUpdate) {
          setInterest(JSON.stringify(low))
        }
      }, []);

      const handleValueChange2 = useCallback((low, high, isUpdate) => {
        if (isUpdate) {
          setTime(JSON.stringify(low))
        }
      }, []);
    return(
        <View style={styles.container}>
             <ScrollView style={{flex:1}}>
                <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                    <Text 
                    style={{fontSize:fontsize.seventeen,color:colors.textColor,fontFamily:'Montserrat-Normal'}}>
                        Monthly Investment</Text>
                    <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                        <Image style={{width:20,height:22}} source={require('../../../assets/Image/rupay.png')}/>
                        <TextInput 
                        defaultValue={totalInvestment}
                        style={{borderBottomWidth:0,}}
                        keyboardType='number-pad'
                        onChangeText={(val)=>setTotalInvestment(val)}
                        maxLength={6}
                        />
                    </View>
                </View>
                <View>
                <Slider
                         minimumValue={500}
                         maximumValue={100000}
                         step={500}
                         value={parseInt(totalInvestment==''?0:totalInvestment)}
                         thumbTintColor={colors.bc}
                         minimumTrackTintColor={colors.bc}
                         onValueChange={(value) =>setTotalInvestment(JSON.stringify(value))} 
                            />
                        </View>
                <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                    <Text 
                    style={{fontSize:fontsize.seventeen,color:colors.textColor,fontFamily:'Montserrat-Normal'}}>
                        Expected Return Rate</Text>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                    <TextInput 
                    onChangeText={(val)=>setInterest(val)}
                    defaultValue={interest}
                    style={{borderBottomWidth:0,}}
                    keyboardType='number-pad'
                    maxLength={2}
                    />
                    <Text>{'%'}</Text>
                    </View>
                </View>
                <Slider
                        minimumValue={0}
                        maximumValue={15}
                        onValueChange={(val)=>setInterest(JSON.stringify(val))}
                        step={1}
                        value={parseInt(interest==''?0:interest)}
                        thumbTintColor={colors.bc}
                        minimumTrackTintColor={colors.bc}
                        />
                <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                    <Text 
                    style={{fontSize:fontsize.seventeen,color:colors.textColor,fontFamily:'Montserrat-Normal'}}>
                        Time Period</Text>
                    <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                       
                        <TextInput 
                        onChangeText={(val)=>setTime(val)}
                        style={{borderBottomWidth:0,}}
                        defaultValue={time}
                        keyboardType='number-pad'
                        maxLength={2}
                        />
                          <Text>{'year'}</Text>
                    </View>
                </View>
                   <Slider
                        minimumValue={0}
                        maximumValue={10}
                        onValueChange={(val)=>setTime(JSON.stringify(val))}
                        step={1}
                        value={parseInt(time==''?0:time)}
                        thumbTintColor={colors.bc}
                        minimumTrackTintColor={colors.bc}
                        />
                <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:20,paddingHorizontal:20}}>
                    <View style={{alignItems:'center'}}> 
                        <Text style={{fontSize:fontsize.seventeen,
                            color:colors.textColor,
                            fontFamily:'Montserrat-Normal'
                            }}>Total Investment</Text>
                        <Text>{time==0?'0':totalInvestment*time*12}</Text>
                    </View>
                    <View style={{alignItems:'center'}}>
                        <Text style={{fontSize:fontsize.seventeen,
                            color:colors.textColor,
                            fontFamily:'Montserrat-Normal'
                            }}>Total Interest</Text>

                       {time && interest=='0'? <Text>0</Text>: 
                       <Text>{((totalInvestment*[Math.pow((1 + (interest/12/100)), 12*time)-1]*
                        (1+(interest/12/100))/(interest/12/100))-totalInvestment*time*12).toFixed(0)}</Text>}
                    </View>
                </View>
                <View style={{alignItems:'center',marginTop:20}}>
                      
                       {time && interest=='0'?<Text
                       style={{
                        fontSize:fontsize.seventeen,
                        color:colors.textColor,
                        fontFamily:'Montserrat-Normal'
                        }}>{`Maturity Value  ₹ 0`}</Text>: <Text style={{
                            fontSize:fontsize.seventeen,
                            color:colors.textColor,
                            fontFamily:'Montserrat-Normal'
                            }}> 
                   
                     {`Maturity Value  ₹ ${(totalInvestment*[Math.pow((1 + (interest/12/100)), 12*time)-1]* (1+(interest/12/100))/(interest/12/100)).toFixed(0)}`}
                     </Text> } 
                     
                     {/* {} */}
                </View>
              </ScrollView>
              {/* totalInvestment * (Math.pow(1 + (interest/12/100), 12*time) - 1) /( interest/12/100) */}
       </View>
    )
}
export default SIP;
  {/* {`Maturity Value  ₹ ${(totalInvestment * (1+interest/100) *
  ((Math.pow((1+interest/100),12*time)) - 1)/(interest/100)).toFixed(0)}`}*/}


