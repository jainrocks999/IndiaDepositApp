import React,{useState}from 'react';
import { View,Text,Image,ScrollView} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import StatusBar from '../../../component/StatusBar';
import color from '../../../component/colors';
import CustomButton from '../../../component/button1';
import Header from '../../../component/header';
import BottomTab from '../../../component/StoreButtomTab';
import { FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native';
const dummy=[
    {title:'Lorem Ipsum Dolor Sit Amet',desc:'Lorem ipsum, or lipsum as it is sometimes'},
    {title:'Lorem Ipsum Dolor Sit Amet',desc:'Lorem ipsum, or lipsum as it is sometimes'},
    {title:'Lorem Ipsum Dolor Sit Amet',desc:'Lorem ipsum, or lipsum as it is sometimes'},
    {title:'Lorem Ipsum Dolor Sit Amet',desc:'Lorem ipsum, or lipsum as it is sometimes'},
    {title:'Lorem Ipsum Dolor Sit Amet',desc:'Lorem ipsum, or lipsum as it is sometimes'},
    {title:'Lorem Ipsum Dolor Sit Amet',desc:'Lorem ipsum, or lipsum as it is sometimes'},
    {title:'Lorem Ipsum Dolor Sit Amet',desc:'Lorem ipsum, or lipsum as it is sometimes'},
    {title:'Lorem Ipsum Dolor Sit Amet',desc:'Lorem ipsum, or lipsum as it is sometimes'},
    {title:'Lorem Ipsum Dolor Sit Amet',desc:'Lorem ipsum, or lipsum as it is sometimes'},
    {title:'Lorem Ipsum Dolor Sit Amet',desc:'Lorem ipsum, or lipsum as it is sometimes'},
    {title:'Lorem Ipsum Dolor Sit Amet',desc:'Lorem ipsum, or lipsum as it is sometimes'},
    {title:'Lorem Ipsum Dolor Sit Amet',desc:'Lorem ipsum, or lipsum as it is sometimes'},
]
const Contact=()=>{
    const navigation=useNavigation()
    return(
        <View style={styles.container}>
           <Header
            source={require('../../../assets/Images/arrow.png')}
           title={'NOTIFICATIONS'}
           onPress={()=>navigation.goBack()}
           />
             <View style={styles.card}>   
              <FlatList
              showsVerticalScrollIndicator={false}
              data={dummy}
              renderItem={({item})=>
              <View>
               <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:15}}>
                   <View>
                       <Text style={{fontFamily:'Montserrat-Normal'}}>{item.title}</Text>
                       <Text style={{color:'grey',fontSize:12,fontFamily:'Montserrat-Normal'}}>{item.desc}</Text>
                   </View>
                   <TouchableOpacity style={{
                       width:24,
                       height:24,
                       borderRadius:12,
                       backgroundColor:'#5A4392',
                       alignItems:'center',
                       justifyContent:'center'
                   }}>
                       <Text style={{color:'white'}}>x</Text>
                   </TouchableOpacity>
               </View>
               <View style={{borderWidth:1,marginTop:15,borderColor:'#DDDDDD'}}></View>
              </View>
              }
              /> 
             </View>
         <StatusBar/>
         {/* <BottomTab/> */}
       </View>
    )
}
export default Contact;

