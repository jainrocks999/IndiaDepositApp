import React,{useState, useEffect}from 'react';
import { View,Text,Image,ScrollView, TextInput,Platform} from 'react-native';
import styles from './styles';
import colors from '../../colors';
import Slider  from "react-native-slider";
import PieChart from 'react-native-pie-chart';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import Storage from '../../AsyncStorage';


let maturityAmount=0
let interestAmount=0                     
const FD=()=>{
    const [interest,setInterest]=useState('1')
    const [time,setTime]=useState('1')
    const [totalInvestment,setTotalInvestment]=useState('1000')
    const [period,setPeriod]=useState('1')
    const [f,setf]=useState('1')        
    const [len,setLen]=useState(5)
    const investmentAmount=totalInvestment
    const [selectedLanguage, setSelectedLanguage] = useState();


    



useEffect(async()=>{
  const user_id=await AsyncStorage.getItem(Storage.user_id)
  try {
    const data = new FormData();
    data.append('calculator_name','fd')
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

if (f==0) {
  interestAmount=((totalInvestment*interest*(time/period))/100).toFixed(0)
  let data=interestAmount
  let data1=totalInvestment
  maturityAmount=(parseInt(data)+parseInt(data1)).toFixed(0)
} else {

  

 let maturityAmount1= parseFloat(totalInvestment*Math.pow(1+(interest/(100*12)),(f))).toFixed(2)
  interestAmount=parseFloat((maturityAmount1-totalInvestment)*(1*time*(f==12?1:f==6?2:f==3?4:12)/period)).toFixed(2)
  maturityAmount=parseInt(totalInvestment)+(parseInt(interestAmount))
}

  let effective=(100*interestAmount/time/totalInvestment*period).toFixed(2)

  let effectiveRate=effective==Infinity?0:effective=='NaN'?0:effective

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
                <View style={styles.main}>
                    <Text style={styles.total}>Principal</Text>
                    <View style={styles.main}>
                        <Image style={styles.img} source={require('../../../assets/Image/rupay.png')}/>
                        <View>
                        <TextInput
                        style={{marginTop:Platform.OS=='android'?0:10}} 
                        value={totalInvestment}
                        keyboardType='number-pad'
                        onChangeText={(val)=>principalOnchange(val)}
                        maxLength={10}
                        returnKeyType='done'
                        />
                        <View style={{borderBottomWidth:1,marginTop:Platform.OS=='android'?-8:3,borderColor:colors.bc}}/>
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
                    <Text style={styles.total}>Rate of Interest</Text>
                    <View style={styles.input}>
                     <View>
                        <TextInput 
                        onChangeText={(val)=>rateOnchange(val==''?0:val)}
                        value={interest}
                        keyboardType='number-pad'
                        maxLength={len}
                        returnKeyType='done'
                        />
                        <View style={{borderBottomWidth:1,marginTop:Platform.OS=='android'?-8:3,borderColor:colors.bc}}/>
                        </View>
                    <Text style={{marginLeft:2,marginTop:Platform.OS=='android'?7:1}}>{'%'}</Text>
                    </View>
                </View>
                <Slider
                        minimumValue={.1}
                        maximumValue={15}
                        onValueChange={(val)=>setInterest(parseFloat(JSON.stringify(val)).toFixed(2))}
                        step={.1}
                        value={parseFloat(interest==''?0:interest)}
                        thumbTintColor={colors.bc}
                        minimumTrackTintColor={colors.bc}
                        />
                <View style={styles.main}>
                    <Text style={styles.total}>Tenure</Text>
                    <View style={styles.main}>
                       <View style={{marginTop:Platform.OS=='android'?-10:-10,marginRight:Platform.OS=='android'?0:3}}>
                        <TextInput 
                        onChangeText={(val)=>timeOnchange(val)}
                        style={{borderBottomWidth:0,marginTop:Platform.OS=='android'?0:13}}
                        value={time==''?0:time}
                        keyboardType='number-pad'
                        maxLength={2}
                        returnKeyType='done'
                        />
                        <View style={{borderBottomWidth:1,marginTop:Platform.OS=='android'?-12:2,borderColor:colors.bc}}/>
                        </View>
                        <View style={{
                          flexDirection:'row',
                          alignItems:'center',
                          justifyContent:'space-between',
                          // width:'40%'
                          }}>
                          <Text style={{marginRight:Platform.OS == 'android'?-13:10,color:colors.textColor,fontFamily:'Montserrat-Regular',fontSize:13}}>{
                            period==365?'Days':
                            period==12?'Months':
                            period==1?'Years':''
                            
                         }</Text>
                        <RNPickerSelect
                        onValueChange={(val)=>setPeriod(val)}
                        items={Data}
                        style={{ 
                        inputAndroid: { 
                          color: colors.textColor,
                          fontFamily:'Montserrat-Regular',
                          width:'100%',
                          fontSize:0,
                          marginRight:10,
                          height:40
                        },
                       inputIOS: { 
                          color: colors.textColor,
                          fontFamily:'Montserrat-Regular',
                          width:0,
                          fontSize:0,
                          marginRight:10,
                          height:40
                        },
                        placeholder:{color:colors.heading1,
                          alignSelf:'center'
                        }
                      }}
                        value={period==null||0?'':period}
                        fixAndroidTouchableBug={true}
					            	useNativeAndroidPickerStyle={false}
                        placeholder={{ }}
                        Icon={()=>
                          <Image 
                         style={{marginRight:Platform.OS=='android'?2:-6,width:25,height:9, marginTop:Platform.OS=='android'? 16:16}} 
                        source={require('../../../assets/Image/down.png')}/>} 
                        />    
                        </View>
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
                        

                    <View style={{justifyContent:'space-between',alignItems:'center',flexDirection:'row'}}> 
                    <Text style={styles.total}>{'Payout Frequency'}</Text>

                    <View style={{
                      height:40,
                      borderColor:colors.textColor,
                      borderRadius:6,
                      paddingHorizontal:15,
                      paddingHorizontal:10,
                      alignItems:'center',
                      flexDirection:'row',
                      justifyContent:'space-between'
                    }}>
                      <Text style={{marginRight:-13,
                        color:colors.textColor,fontFamily:'Montserrat-Regular',fontSize:13}}>
                        {f==12?'Yearly':
                        f==6?'Half-Yearly':
                        f==3?'Quarterly':
                        f==1?'Monthly':
                        f==0?'SimpleInterest':''
                        }
                        </Text>
                        <RNPickerSelect
                        onValueChange={(val)=>setf(val)}
                        items={Data1}
                        style={{ 
                        inputAndroid: { 
                          color: colors.textColor,
                          fontFamily:'Montserrat-Regular',
                          width:'100%',
                          fontSize:0,
                          height:40
                        },
                        inputIOS:{
 
                          color: colors.textColor,
                          fontFamily:'Montserrat-Regular',
                          width:0,
                          fontSize:0,
                          marginRight:8,
                          height:40,
                        },
                        placeholder:{color:colors.heading1,alignSelf:'center'}
                        }}
                        value={f==null||f==0?'':f}
                        fixAndroidTouchableBug={true}
					            	useNativeAndroidPickerStyle={false}
                        placeholder={{ }}
                        Icon={()=>
                          <Image 
                         style={{marginRight:Platform.OS=='android'?-8:-9,width:25,height:9, marginTop:Platform.OS=='android'? 16:16}} 
                        source={require('../../../assets/Image/down.png')}/>} 
                        />    
                </View>
               </View>
               
                <View style={{
                    flexDirection:'row',
                    marginTop:20,
                    width:'100%',
                    justifyContent:'space-between'
                }}>
                  <View>
                    <View style={{alignItems:'center'}}>
                        <Text style={styles.total}>Maturity Value</Text>
                        <Text style={styles.total}>{` ₹ ${(maturityAmount==0||''?1000:isNaN(maturityAmount)?1000:maturityAmount)}`}</Text>
                    </View>
                    <View style={{alignItems:'center',marginTop:10}}> 
                        <Text style={[styles.total]}>{`Interest Earned`}</Text>
                        <Text style={styles.total}>{`₹ ${isNaN(interestAmount)?0:interestAmount}`}</Text>
                    </View>
                    <View style={{alignItems:'center',marginTop:10}}> 
                        <Text style={styles.total}>{`Effective Rate`}</Text>
                        <Text style={styles.total}>{`${isNaN(effectiveRate)?0:effectiveRate} %`}</Text>
                    </View>
                  </View>
                    <PieChart
                  widthAndHeight={140}
                  series={[parseInt(interestAmount==0||''||isNaN(interestAmount)?0:interestAmount),parseInt(investmentAmount==0||''||isNaN(investmentAmount)?1010:investmentAmount)
                   ]}
                  sliceColor={['#AC4BE0','#FA5E8E']}
                  doughnut={true}
                  coverRadius={0.45}
                  coverFill={'#FFF'}
                />
                </View>

                <View style={{alignItems:'center',marginBottom:0,marginTop:20}}>
                  <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',width:'100%',marginBottom:0}}>
                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                      <View style={{width:30,height:10,backgroundColor:'#FA5E8E'}}/>
                      <Text style={{fontSize:12,color:colors.textColor,
                        fontFamily:'Montserrat-Regular',marginLeft:5}}>Principal</Text>
                    </View>
                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                      <View style={{width:30,height:10,backgroundColor:'#AC4BE0'}}/>
                      <Text style={{fontSize:12,color:colors.textColor,
                        fontFamily:'Montserrat-Regular',marginLeft:5}}>Interest Earned</Text>
                    </View>
                  </View>
               
                </View>
                </View>
              </ScrollView>
             
       </View>
    )
}
export default FD;

const Data=[
  { label: 'Days', value: '365' },
  { label: 'Months', value: '12' },
  { label: 'Years', value: '1'},
]
const Data1=[
  // { label: 'Simple Interest', value: '0' },
  { label: 'Monthly', value: '1' },
  { label: 'Quarterly', value: '3'},
  { label: 'Half-Yearly', value: '6'},
  { label: 'Yearly', value: '12'},

]
const Data2=[
  { label: 'Monthly', value: '1'},
  { label: 'Quarterly', value: '3'},
  { label: 'Half-Yearly', value: '6'},
  { label: 'Yearly', value: '12' },

]