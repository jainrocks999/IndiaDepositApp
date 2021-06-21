import React from "react";
import {View,Text,FlatList,Image,ScrollView, TouchableOpacity} from 'react-native';
import Header from '../../../component/header';
import colors from '../../../component/colors';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import Button from '../../../component/button1';
import { Item } from "react-native-paper/lib/typescript/components/List/List";

const FDList=()=>{
const navigation=useNavigation()
const renderItem=(item)=>{
    if(item.title=='list'){
        return(
            <FlatList
            horizontal
            data={item.data}
            showsHorizontalScrollIndicator={false}
            renderItem={({item})=>
            <View style={{paddingHorizontal:10,paddingVertical:20}}>
                <View style={styles.card}>
                <View style={styles.xview}>
                <View style={styles.row1}>
               <Text style={{color:colors.white,marginTop:-5,fontSize:20}}>x</Text>
                </View>
                </View>
                <Image source={item.source}/>
                <Text style={styles.title1}>{item.title}</Text>
                <View style={{position:'absolute',bottom:15}}>
                <TouchableOpacity 
                //onPress={()=>navigation.navigate('BuyNow')}
                style={styles.button}>
                   <Text style={styles.invest}>{'OPEN ACCOUNT'}</Text>
                </TouchableOpacity>
                </View>
                </View>
            </View>
        }
            />
        )
    }
    else{
      return(
          <View>
          <View style={styles.container}>
              <Text style={styles.title}>{item.title}</Text>
          </View>
          <View style={styles.row}>
              <Text style={styles.value}>{item.value}</Text>
              <Text style={styles.value}>{item.value1}</Text>
          </View>
          </View>
      )
    }
}
    return(
        <View style={{flex:1}}>
          <Header
            title={'COMPARE SB ACCOUNT'}
            source={require('../../../assets/Images/arrow.png')}
            onPress={()=>navigation.goBack()}
            /> 
            <View style={{alignItems:'center',justifyContent:'center',flex:1}}>
                <FlatList
                 data={data}
                 renderItem={({item})=>renderItem(item)}
                 keyExtractor={(item, index) => item.source}
                 style={{width:'100%'}}
                />
            </View>
            <View style={{paddingHorizontal:20,paddingVertical:20}}>
                <Button
                title='DOWNLOAD FORM'
                />
            </View>
            <View>
            </View>
        </View>
    )
}
export default FDList;
const data=[
    {title:'list',data:[
    {source:require('../../../assets/Images/sbi.png'),title:'State Bank of\n       India',},
    {source:require('../../../assets/Images/union.png'),title:'Union Bank of\n        India',},
    {source:require('../../../assets/Images/axis.png'),title:'Axis Bank',},
    {source:require('../../../assets/Images/pnb.png'),title:'Panjab National\n          Bank',},
    {source:require('../../../assets/Images/hdfc.png'),title:'HDFC Bank',},
    {source:require('../../../assets/Images/bob.png'),title:'Bank of Baroda',}
    ]},
    {title:'Account type',value:'5.5%',value1:'7.5%'},
    {title:'Rate of interest',value:'9%',value1:'10%'},
    {title:'Minimum Balance',value:'3 Lakh',value1:'5 Lakh'},
    {title:'Security',value:'12%',value1:'15%'},
    {title:'Minimum Age',value:'Normal FD',value1:'Tax-saving FD'},
    {title:'Nomination',value:'3 Years',value1:'5 Years'},
    {title:'Eligibility',value:'---------',value1:'---------'},
    {title:'Net Banking operation',value:'5000',value1:'10000'},
    {title:'Joining kit',value:'1.5 Lakh',value1:'5Lakh'},
    {title:'Debit card AMC charges',value:'7 days',value1:'7 days'},
    {title:'Free ATM transaction',value:'15 Years',value1:'10 Years'},
    {title:'PAN required',value:'----------',value1:'---------'},
    {title:'Non-Maitenance Penalty',value:'Yes',value1:'Yes'},
    {title:'ECS/IMPS/NEFT/RTGS',value:'----------',value1:'-------------'},
    {title:'Debit card',value:'Yes',value1:'Yes'},
    {title:'ATM Points',value:'Indian resident',value1:'Indian resident'},
    {title:'Phone banking',value:'-------',value1:'-----------'},
    {title:'Free Cheques',value:'Yes',value1:'Yes'},
    {title:'Locker Facility',value:'--------',value1:'-------'},
    {title:'TDS on Interest',value:'1.00%',value1:'1.00%'},
    {title:'Auto Sweep',value:'Yes',value1:'Yes'},
    {title:'Interest Calculation Frequency',value:'Yes',value1:'Yes'},
    {title:'Cash Withdrawal Limit',value:'Yes',value1:'Yes'},
    {title:'Cash Transaction Limit',value:'-------------',value1:'---------'},
    {title:'Salient feature',value:'5 Lakh',value1:'5 Lakh'},
    {title:'Insuarance',value:'-----------',value1:'-----------'},
    {title:'Offers',value:'-----------',value1:'-----------'},
 
]