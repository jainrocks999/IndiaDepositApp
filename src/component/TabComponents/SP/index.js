import React,{useState,useEffect}from 'react';
import { View,Text,Image,ScrollView, TextInput} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import colors from '../../colors';
import Slider  from "react-native-slider";
import PieChart from 'react-native-pie-chart';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import Storage from '../../AsyncStorage';

const SIP=()=>{
    const navigation=useNavigation()
    const [interest,setInterest]=useState('1')
    const [time,setTime]=useState('1')
    const [totalInvestment,setTotalInvestment]=useState('500')
   
  let investmentAmount=totalInvestment*time*12
  let interestAmount=((totalInvestment*[Math.pow((1 + (interest/12/100)), 12*time)-1]*
  (1+(interest/12/100))/(interest/12/100))-totalInvestment*time*12).toFixed(0)
  let maturityAmount=((totalInvestment*[Math.pow((1 + (interest/12/100)), 12*time)-1]* (1+(interest/12/100))/(interest/12/100)).toFixed(0))
 const [len,setLen]=useState(5)
 console.log(investmentAmount,interestAmount,maturityAmount);


 useEffect(async()=>{
  const user_id=await AsyncStorage.getItem(Storage.user_id)
  try {
    const data = new FormData();
    data.append('calculator_name','sip')
    data.append('user_id',user_id)
    const response = await axios({
      method: 'POST',
      data,
      headers: {
        'content-type': 'multipart/form-data',
        Accept: 'multipart/form-data',
      },
      url: 'https://indiadeposit.in/admin/public/apis/calculator',
    });
    if (response.data.status==200) {
    } 
  } catch (error) {
   throw error;
  }
},[])


  const principalOnchange=(val)=>{
    if(val>100000){
      setTotalInvestment(JSON.stringify(100000))
    }
    else{
      if(isNaN(val)){

      }
      else{
      setTotalInvestment(val)
      }
    }
  }
  const rateOnchange=(value)=>{
  if(value>15){
    setInterest(parseFloat(15).toString())
  }
  else{
    if(isNaN(value)){
    }
    else{
    setInterest(value)
    if(value<10){
      setLen(4)
    }
    else{
      setLen(5)
    }
    }  
  }
  }
  const rateOnchange1=(val)=>{
    if(!isNaN(val)){
      const float = parseFloat(val)
      setInterest(float.toFixed(2))
    }
  }
  const timeOnchange=(val)=>{
    if(val>25){
      setTime(JSON.stringify(25))
    }
    else{
      if(isNaN(val)){
        
      }else{
      setTime(val)
      }
    }
  }
  return(
        <View style={styles.container}>
             <ScrollView showsVerticalScrollIndicator={false} style={{flex:1}}>
               <View style={styles.card}>
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
                        onChangeText={(val)=>principalOnchange(val)}
                        maxLength={6}
                        returnKeyType='done'
                        />
                        <View style={{borderBottomWidth:1,marginTop:-8,borderColor:colors.bc}}/>
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

                    onChangeText={(val)=>rateOnchange(val==''?0:val)}
                    value={interest}
                    style={{borderBottomWidth:0,}}
                    keyboardType='number-pad'
                    maxLength={len}
                    returnKeyType='done'
                    />
                   <View style={{borderBottomWidth:1,marginTop:-8,borderColor:colors.bc}}/>
                    </View>
                    <Text style={{marginLeft:2,marginTop:8}}>{'%'}</Text>
                    </View>
                </View>
                <Slider
                        minimumValue={.1}
                        maximumValue={15}
                        onValueChange={(val)=>setInterest(parseFloat(JSON.stringify(val)).toFixed(2))}
                        step={.1}
                        value={parseInt(interest==''?1:interest)}
                        thumbTintColor={colors.bc}
                        minimumTrackTintColor={colors.bc}
                        />
                <View style={styles.view}>
                    <Text 
                    style={styles.text}>
                        Tenure</Text>
                    <View style={styles.view}>
                       <View>
                        <TextInput 
                        onChangeText={(val)=>timeOnchange(val)}
                        style={{borderBottomWidth:0,}}
                        defaultValue={time}
                        keyboardType='number-pad'
                        maxLength={2}
                        returnKeyType='done'
                        />
                        <View style={{borderBottomWidth:1,marginTop:-8,borderColor:colors.bc}}/>
                        </View>
                        <Text style={{marginLeft:2,marginTop:5,fontSize:13,color:colors.textColor,fontFamily:'Montserrat-Regular'}}>{'Year'}</Text>
                    </View>
                </View>
                   <Slider
                        minimumValue={1}
                        maximumValue={25}
                        onValueChange={(val)=>setTime(JSON.stringify(val))}
                        step={1}
                        value={parseInt(time==''?0:time)}
                        thumbTintColor={colors.bc}
                        minimumTrackTintColor={colors.bc}
                        />
                <View style={{flexDirection:'row',width:'100%',justifyContent:'space-between'}}>
                  <View > 
                  <View style={styles.view1}>
                    <View style={{alignItems:'center'}}> 
                        <Text style={styles.text}>Total Investment</Text>
                        {/* <View style={{marginLeft:30}}> */}
                        <Text style={styles.font}>{`₹ ${investmentAmount==0||''?6000:isNaN(investmentAmount)?6000:investmentAmount}`}</Text>
                        {/* </View> */}
                    </View>
                    <View style={{marginTop:10,alignItems:'center'}}>
                        <Text style={styles.font}>Total Interest</Text>
                        <Text style={styles.font}>{`₹ ${interestAmount==0||''?0:isNaN(interestAmount)?0:interestAmount}`}</Text>
                    </View>
                </View>
                <View style={{marginTop:10,alignItems:'center'}}>
                  <Text style={styles.font}>{'Maturity Value'}</Text>
                        <Text style={styles.text}>{`₹ ${maturityAmount==0||''?6000:isNaN(maturityAmount)?6000:maturityAmount}`}</Text> 
                  </View>
                  </View>
                  <View>
                  <View style={{alignItems:'center',marginTop:20,width:'100%'}}>
                 
                <PieChart
                  widthAndHeight={140}
                  series={[
                    parseInt(interestAmount==0||''||isNaN(interestAmount)?0:interestAmount), parseInt(investmentAmount==0||''||isNaN(investmentAmount)?6000:investmentAmount)
                   ]}
                  sliceColor={['#AC4BE0','#FA5E8E']}
                  doughnut={true}
                  coverRadius={0.45}
                  coverFill={'#FFF'}
                />
                </View>
                
                  </View>
                  
                </View>
                <View style={styles.row}>
                    <View style={styles.colorBox}>
                      <View style={styles.box}/>
                      <Text style={styles.total}>Invest Amount</Text>
                    </View>
                    <View style={styles.colorBox}>
                      <View style={styles.box1}/>
                      <Text style={styles.total}>Total Interest</Text>
                    </View>
                  </View>
               </View>
              </ScrollView>
       </View>
    )
}
export default SIP;



