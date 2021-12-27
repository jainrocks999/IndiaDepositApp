import React,{useEffect,useState} from 'react';
import { View,Text,StyleSheet,Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import colors from '../../../../component/colors';
import Header from '../../../../component/header';
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import styles from "./styles";
import CustomButton from '../../../../component/button1';
import CheckBox from "@react-native-community/checkbox";
import axios from 'axios';
import Loader from '../../../../component/loader';
import Toast from "react-native-simple-toast";

const MyFDDetail=({route})=>{
    const navigation=useNavigation()
    const [toggleCheckBox,setToggleCheckBox]=useState(false)
    const [data,setData]=useState('')
    const [loader,setLoader]=useState(false)
    console.log(data);
useEffect(async()=>{
    try {
        setLoader(true)
        const data = new FormData();
        data.append('my_fixed_deposit_id',route.params.my_fixed_deposit_id)
        const response = await axios({
          method: 'POST',
          data,
          headers: {
            'content-type': 'multipart/form-data',
            Accept: 'multipart/form-data',
          },
          url: 'https://demo.webshowcase-india.com/indiadeposit/public/apis/myjointuserdetail',
        });
        if (response.data.status==200) {
            setLoader(false)
            setData(response.data)
           } 
      } catch (error) {
          setLoader(false)
      }
},[])

const manageUser=()=>{
    if(toggleCheckBox==true){
        navigation.navigate('PaymentMode',{
            my_fixed_deposit_id:data.primaryuser[0].my_fixed_deposit_id,
            amount:data.primaryuser[0].amount
        })
    }
    else{
        Toast.show('Please verify above user')
    }
}
        if (data) {
            return(
                <View style={styles.container}>
                   <Header
                   title={'FD PURCHASE DETAIL'}
                   source={require('../../../../assets/Image/arrow2.png')}
                   onPress={()=>navigation.goBack()}
                   />  
                   {loader?<Loader/>:null}
                    <View style={[styles.list,{alignItems:'center'}]}>
                                 <Image  resizeMode='contain'
                                 style={{height:30,width:80}}
                                 source={{uri:`https://demo.webshowcase-india.com/indiadeposit/writable/uploads/bank/${data.primaryuser[0].bank_logo}`}}/>
                                 <Text style={{fontFamily:'Monterrat-Bold',fontSize:18,
                                 color:colors.bc,
                                 fontWeight:'700',
                                 textAlign:'center'
                                }}>{data.primaryuser[0].bank_name}</Text>
                    </View>
                  <ScrollView >
                  <View style={[styles.list]}>
                      <View style={{paddingHorizontal:20}}>
                        <Text style={{fontFamily:'Montserrat-Normal',fontSize:14,color:colors.textColor,marginTop:20}}>DEPOSITOR DETAILS</Text>
                        <View style={{marginTop:10}}>
                        <Text style={{fontFamily:'Montserrat-Normal',fontSize:14,color:colors.textColor}}>FD Holder Name</Text>
                        <Text style={{fontFamily:'Montserrat-Bold',fontSize:16,color:colors.textColor}}>{data.primaryuser[0].username}</Text>
                        </View>
                        {data.secondaryuser.length>0?<View style={{marginTop:10}}>
                        <Text style={{fontFamily:'Montserrat-Normal',fontSize:14,color:colors.textColor}}>Joint Applicant Name</Text>
                        <Text style={{fontFamily:'Montserrat-Bold',fontSize:16,color:colors.textColor}}>{data.secondaryuser[0].name}</Text>
                        {data.secondaryuser.length>1?<Text style={{fontFamily:'Montserrat-Bold',fontSize:16,color:colors.textColor}}>{data.secondaryuser[1].name}</Text>:<View/>}
                        </View>:<View/>}
                        <View style={{marginTop:30}}>
                        <Text style={{fontFamily:'Montserrat-Normal',fontSize:14,color:colors.textColor}}>INVESTMENT DETAILS</Text>
                          <View style={{flexDirection:'row',marginTop:10}}>
                            <View style={{width:'45%'}}>
                            <Text style={{fontFamily:'Montserrat-Normal',fontSize:14,color:colors.textColor}}>Investment Amount</Text>
                            <Text style={{fontFamily:'Montserrat-Bold',fontSize:16,color:colors.textColor}}>{data.primaryuser[0].amount}</Text>
                            </View>
                            <View style={{width:'45%',marginLeft:35}}>
                            <Text style={{fontFamily:'Montserrat-Normal',fontSize:14,color:colors.textColor}}>Tenure</Text>
                            <Text style={{fontFamily:'Montserrat-Bold',fontSize:16,color:colors.textColor}}>{`${data.primaryuser[0].tenure} Years`}</Text>
                            </View>
                          </View>
                          <View style={{flexDirection:'row',marginTop:10}}>
                            <View style={{width:'45%'}}>
                            <Text style={{fontFamily:'Montserrat-Normal',fontSize:14,color:colors.textColor}}>Interest Rate</Text>
                            <Text style={{fontFamily:'Montserrat-Bold',fontSize:16,color:colors.textColor}}>{`${data.primaryuser[0].interest_rate}% p.a`}</Text>
                            </View>
                            <View style={{width:'45%',marginLeft:35}}>
                            <Text style={{fontFamily:'Montserrat-Normal',fontSize:14,color:colors.textColor}}>Maturity Amount</Text>
                            <Text style={{fontFamily:'Montserrat-Bold',fontSize:16,color:colors.textColor}}>{
                              data.primaryuser[0].maturity_amount
                                //  (data.primaryuser[0].amount* Math.pow((1 + (data.primaryuser[0].interest_rate / (1 * 100))), (1 * data.primaryuser[0].tenure))).toFixed(0)
                            }</Text>
                            </View>
                          </View>
                        </View>
                        <View style={{marginTop:30,flexDirection:'row',marginBottom:20}}>
                        <CheckBox
                            disabled={false}
                            value={toggleCheckBox}
                            onValueChange={(newValue) => setToggleCheckBox(newValue)}
                            tintColors={{ true: '#5A4392', false: '#5A4392' }}
                          />
                            <Text style={{fontFamily:'Montserrat-Normal',fontSize:14,color:colors.textColor,marginLeft:10,width:'90%',marginTop:5}}>I verify that the above information is correct.</Text>
                        </View>
                        
                     </View>
                    </View>
                    <View style={{height:100}}></View>
                   </ScrollView>
                   <View style={{bottom:0,left:0,right:0,position:'absolute',backgroundColor:'#fff',paddingHorizontal:15,paddingVertical:15}}>
                     <CustomButton 
                      title='Verify & Continue'
                      onPress={()=>manageUser()}
                     />
                   </View>
                </View>
            )
        } else {
            return<Loader/>
        }
        
        }
export default MyFDDetail;


