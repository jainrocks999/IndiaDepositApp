import React,{useState,useCallback}from 'react';
import { View,Text,Image,ScrollView, TextInput, Platform} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import ProgressBar from 'react-native-progress/Bar';
import colors from '../../colors';
import fontsize from '../../../component/fontSize';
import Slider  from "react-native-slider";
import PieChart from 'react-native-pie-chart';
let value=1
const FD=()=>{
    const navigation=useNavigation()
    const [price,setPrice]=useState('1000')
    const [interest,setInterest]=useState('1')
    const [time,setTime]=useState('1')
    const [totalInvestment,setTotalInvestment]=useState('1000')
    const [totalInterest,setTotalInterest]=useState('10')
    const [muturityValue,setMuturityValue]=useState('1010')

    const investmentAmount=totalInvestment
    const interestAmount=(totalInvestment* Math.pow((1 + (interest / (1 * 100))), (1 * time))-totalInvestment).toFixed(1)
    const maturityAmount=(totalInvestment*Math.pow((1+interest/100),(1*time))).toFixed(1)
    console.log('hi this is out put');
    return(
        <View style={styles.container}>
             <ScrollView showsVerticalScrollIndicator={false} style={{flex:1}}>
                <View style={styles.main}>
                    <Text style={styles.total}>Total Investment</Text>
                    <View style={styles.main}>
                        <Image style={styles.img} source={require('../../../assets/Image/rupay.png')}/>
                        <View>
                        <TextInput 
                        defaultValue={totalInvestment}
                        keyboardType='number-pad'
                        onChangeText={(val)=>setTotalInvestment(val)}
                        maxLength={10}
                        />
                        <View style={{borderBottomWidth:1,marginTop:Platform.OS=='android'?-8:0,borderColor:colors.bc}}/>
                        </View>
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
                     <View>
                        <TextInput 
                        onChangeText={(val)=>setInterest(val)}
                        defaultValue={interest}
                        style={{borderBottomWidth:0,}}
                        keyboardType='number-pad'
                        maxLength={2}
                        />
                        <View style={{borderBottomWidth:1,marginTop:Platform.OS=='android'?-8:0,borderColor:colors.bc}}/>
                        </View>
                    <Text style={{marginLeft:2,marginTop:Platform.OS=='android'?5:0}}>{'%'}</Text>
                    </View>
                </View>
                <Slider
                        minimumValue={1}
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
                       <View>
                        <TextInput 
                        onChangeText={(val)=>setTime(val)}
                        style={{borderBottomWidth:0,}}
                        defaultValue={time==''?0:time}
                        keyboardType='number-pad'
                        maxLength={2}
                        />
                        <View style={{borderBottomWidth:1,marginTop:Platform.OS=='android'?-8:0,borderColor:colors.bc}}/>
                        </View>
                          <Text style={{marginLeft:2,marginTop:Platform.OS=='android'?5:0,fontSize:12,color:colors.textColor}}>{'Year'}</Text>
                    </View>
                </View>
                <Slider
                        minimumValue={1}
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
                        <Text>{investmentAmount==0||''?1000:investmentAmount}</Text>
                    </View>
                    <View style={{alignItems:'center'}}>
                        <Text style={styles.total}>Total Interest</Text>
                        <Text>{interestAmount==0||''?0:interestAmount}</Text>
                    </View>
                </View>
                <View style={{alignItems:'center',marginTop:20}}>
                      
                        <Text style={{fontSize:fontsize.fefteen,color:colors.textColor,fontFamily:'Montserrat-Regular'
                      }}>{`Maturity Value  ₹ ${maturityAmount==0||''?1000:maturityAmount}`}</Text>
                </View>

                <View style={{alignItems:'center',marginBottom:100,marginTop:20}}>
                  <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',width:'100%',marginBottom:20}}>
                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                      <View style={{width:30,height:10,backgroundColor:'#FA5E8E'}}/>
                      <Text style={{fontSize:12,color:colors.textColor,fontFamily:'Montserrat-Regular',marginLeft:5}}>Investment Amount</Text>
                    </View>
                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                      <View style={{width:30,height:10,backgroundColor:'#AC4BE0'}}/>
                      <Text style={{fontSize:12,color:colors.textColor,fontFamily:'Montserrat-Regular',marginLeft:5}}>Total Interest</Text>
                    </View>
                  </View>
                <PieChart
                  widthAndHeight={250}
                  // series={[100,100]}
                  series={[parseInt(interestAmount==0||''?0:interestAmount),parseInt(investmentAmount==0||''?1010:investmentAmount)
                   ]}
                  sliceColor={['#AC4BE0','#FA5E8E']}
                  doughnut={true}
                  coverRadius={0.45}
                  coverFill={'#FFF'}
                />
                </View>
              </ScrollView>
       </View>
    )
}
export default FD;

