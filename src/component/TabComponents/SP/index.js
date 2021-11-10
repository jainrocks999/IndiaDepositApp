import React,{useState,useCallback}from 'react';
import { View,Text,Image,ScrollView, TextInput, Platform} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import ProgressBar from 'react-native-progress/Bar';
import colors from '../../colors';
import fontsize from '../../../component/fontSize';
import Slider  from "react-native-slider";
import PieChart from 'react-native-pie-chart';

const SIP=()=>{
    const navigation=useNavigation()
    const [interest,setInterest]=useState('1')
    const [time,setTime]=useState('1')
    const [totalInvestment,setTotalInvestment]=useState('500')
   console.log(interest,'dlskfjdsklafjdlk');
  const investmentAmount=totalInvestment*time*12
  const interestAmount=((totalInvestment*[Math.pow((1 + (interest/12/100)), 12*time)-1]*
  (1+(interest/12/100))/(interest/12/100))-totalInvestment*time*12).toFixed(0)
  const maturityAmount=((totalInvestment*[Math.pow((1 + (interest/12/100)), 12*time)-1]* (1+(interest/12/100))/(interest/12/100)).toFixed(0))
    console.log('this is user list',maturityAmount,investmentAmount,interestAmount);
  return(
        <View style={styles.container}>
             <ScrollView showsVerticalScrollIndicator={false} style={{flex:1}}>
                <View style={styles.view}>
                    <Text 
                    style={styles.text}>
                        Monthly Investment</Text>
                    <View style={styles.view}>
                        <Image style={styles.img} source={require('../../../assets/Image/rupay.png')}/>
                        <View>
                        <TextInput 
                        defaultValue={totalInvestment}
                        style={{borderBottomWidth:0,}}
                        keyboardType='number-pad'
                        onChangeText={(val)=>setTotalInvestment(val)}
                        maxLength={6}
                        />
                        <View style={{borderBottomWidth:1,marginTop:Platform.OS=='android'?-8:0,borderColor:colors.bc}}/>
                        </View>

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
                <View style={styles.view}>
                    <Text 
                    style={styles.text}>
                        Expected Return Rate</Text>
                    <View style={styles.view3}>
                      <View>
                    <TextInput 
                    onChangeText={(val)=>setInterest(val==''?1:val)}
                    defaultValue={interest}
                    style={{borderBottomWidth:0,}}
                    keyboardType='number-pad'
                    maxLength={2}
                    />
                   <View style={{borderBottomWidth:1,marginTop:Platform.OS=='android'?-8:0,borderColor:colors.bc}}/>
                    </View>
                    <Text style={{marginLeft:2,marginTop:Platform.OS=='android'?8:0}}>{'%'}</Text>
                    </View>
                </View>
                <Slider
                        minimumValue={1}
                        maximumValue={15}
                        onValueChange={(val)=>setInterest(JSON.stringify(val))}
                        step={1}
                        value={parseInt(interest==''?1:interest)}
                        thumbTintColor={colors.bc}
                        minimumTrackTintColor={colors.bc}
                        />
                <View style={styles.view}>
                    <Text 
                    style={styles.text}>
                        Time Period</Text>
                    <View style={styles.view}>
                       <View>
                        <TextInput 
                        onChangeText={(val)=>setTime(val)}
                        style={{borderBottomWidth:0,}}
                        defaultValue={time}
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
                        // thumbImage={source=require('../../../assets/Image/down.png')}
                        />
                <View style={styles.view1}>
                    <View style={styles.view2}> 
                        <Text style={styles.text}>Total Investment</Text>
                        <Text>{investmentAmount==0||''?6000:investmentAmount}</Text>
                    </View>
                    <View style={{alignItems:'center'}}>
                        <Text style={{fontSize:fontsize.fefteen,
                            color:colors.textColor,
                            fontFamily:'Montserrat-Regular'
                            }}>Total Interest</Text>
                       <Text>{interestAmount==0||''?0:interestAmount}</Text>
                      {/* } */}
                    </View>
                </View>
                <View style={{alignItems:'center',marginTop:20}}>
                        <Text style={styles.text}> 
                     {`Maturity Value  ₹ ${maturityAmount==0||''?6000:maturityAmount}`}
                     </Text> 
                      </View>
                <View style={{alignItems:'center',marginBottom:100,marginTop:20}}>
                  <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',width:'100%',marginBottom:20}}>
                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                      <View style={{width:30,height:10,backgroundColor:'#FA5E8E'}}/>
                      <Text style={{fontSize:12,color:colors.textColor,fontFamily:'Montserrat-Regular',marginLeft:5}}>Invest Amount</Text>
                    </View>
                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                      <View style={{width:30,height:10,backgroundColor:'#AC4BE0'}}/>
                      <Text style={{fontSize:12,color:colors.textColor,fontFamily:'Montserrat-Regular',marginLeft:5}}>Total Interest</Text>
                    </View>
                  </View>
                <PieChart
                  widthAndHeight={250}
                  series={[
                    // 100,200
                    parseInt(interestAmount==0||''?0:interestAmount), parseInt(investmentAmount==0||''?6000:investmentAmount)
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
export default SIP;



