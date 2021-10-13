import React,{useState,useCallback}from 'react';
import { View,Text,Image,ScrollView, TextInput} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import ProgressBar from 'react-native-progress/Bar';
import colors from '../../colors';
import fontsize from '../../../component/fontSize';
import Slider  from "react-native-slider";
const FD=()=>{
    const navigation=useNavigation()
    const [price,setPrice]=useState('1000')
    const [interest,setInterest]=useState('1')
    const [time,setTime]=useState('1')
    const [totalInvestment,setTotalInvestment]=useState('1000')
    const [totalInterest,setTotalInterest]=useState('10')
    const [muturityValue,setMuturityValue]=useState('1010')

  
         
    return(
        <View style={styles.container}>
             <ScrollView style={{flex:1}}>
                <View style={styles.main}>
                    <Text style={styles.total}>Total Investment</Text>
                    <View style={styles.main}>
                        <Image style={styles.img} source={require('../../../assets/Image/rupay.png')}/>
                        <TextInput 
                        defaultValue={totalInvestment}
                        style={{borderBottomWidth:0,}}
                        keyboardType='number-pad'
                        onChangeText={(val)=>setTotalInvestment(val)}
                        maxLength={10}
                        />
                    </View>
                </View>
              
                         <Slider
                         minimumValue={1000}
                         maximumValue={100000}
                         step={1000}
                         value={parseInt(totalInvestment==''?0:totalInvestment)}
                         thumbTintColor={colors.bc}
                         minimumTrackTintColor={colors.bc}
                         onValueChange={(value) =>setTotalInvestment(JSON.stringify(value))} 
                            />

                <View style={styles.main}>
                    <Text style={styles.total}>Rate of Interest (P.A)</Text>
                    <View style={styles.input}>
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
                <View style={styles.main}>
                    <Text style={styles.total}>Time Period</Text>
                    <View style={styles.main}>
                       
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
                <View style={styles.main1}>
                    <View style={{alignItems:'center'}}> 
                        <Text style={styles.total}>Total Investment</Text>
                        <Text>{totalInvestment}</Text>
                    </View>
                    <View style={{alignItems:'center'}}>
                        <Text style={styles.total}>Total Interest</Text>
                        <Text>{(totalInvestment* Math.pow((1 + (interest / (1 * 100))), (1 * time))-totalInvestment).toFixed(0)}</Text>
                    </View>
                </View>
                <View style={{alignItems:'center',marginTop:20}}>
                      
                        <Text style={{fontSize:fontsize.seventeen,color:colors.textColor,fontFamily:'Montserrat-Regular'
                      }}>{`Maturity Value  ₹ ${(totalInvestment*Math.pow((1+interest/100),(1*time))).toFixed(0)}`}</Text>
                </View>
              </ScrollView>
       </View>
    )
}
export default FD;

