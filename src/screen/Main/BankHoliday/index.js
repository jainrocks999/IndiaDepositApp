import React from "react";
import {View,Text,FlatList,ScrollView} from 'react-native';
import Header from '../../../component/header';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
const data =[
      {title:'JANUARY',value1:'January 09',value2:'Saturday',value3:'Second Saturday',value4:'January 09',value5:'Saturday',value6:'Second Saturday',},
      {title:'FEBRUARY',value1:'January 09',value2:'Saturday',value3:'Second Saturday',value4:'January 09',value5:'Saturday',value6:'Second Saturday'},
      {title:'MARCH',value1:'January 09',value2:'Saturday',value3:'Second Saturday',value4:'January 09',value5:'Saturday',value6:'Second Saturday'},
      {title:'APRIL',value1:'January 09',value2:'Saturday',value3:'Second Saturday',value4:'January 09',value5:'Saturday',value6:'Second Saturday'},
      {title:'MAY',value1:'January 09',value2:'Saturday',value3:'Second Saturday',value4:'January 09',value5:'Saturday',value6:'Second Saturday'},
      {title:'JUN',value1:'January 09',value2:'Saturday',value3:'Second Saturday',value4:'January 09',value5:'Saturday',value6:'Second Saturday'},
      {title:'JULY',value1:'January 09',value2:'Saturday',value3:'Second Saturday',value4:'January 09',value5:'Saturday',value6:'Second Saturday'},
      {title:'AUGUST',value1:'January 09',value2:'Saturday',value3:'Second Saturday',value4:'January 09',value5:'Saturday',value6:'Second Saturday'},
      {title:'SEPTEMBER',value1:'January 09',value2:'Saturday',value3:'Second Saturday',value4:'January 09',value5:'Saturday',value6:'Second Saturday'},
      {title:'OCTOBER',value1:'January 09',value2:'Saturday',value3:'Second Saturday',value4:'January 09',value5:'Saturday',value6:'Second Saturday'},
      {title:'NOVEMBER',value1:'January 09',value2:'Saturday',value3:'Second Saturday',value4:'January 09',value5:'Saturday',value6:'Second Saturday'},
      {title:'DECEMBER',value1:'January 09',value2:'Saturday',value3:'Second Saturday',value4:'January 09',value5:'Saturday',value6:'Second Saturday'},
]
const Holiday=()=>{
    const navigation=useNavigation()
    const renderItem=(item)=>{
      return(
        <View style={{flex:1}}>
          <View style={styles.main1}>
          <Text style={styles.text1}>{item.title}</Text>
          </View>
          <View style={styles.main3}>
           
            <Text style={styles.text2}>{item.value1}</Text>
            <Text style={styles.text2}>{item.value2}</Text>
            <Text style={styles.text2}>{item.value3}</Text>
          </View>
         
          <View style={styles.cardspace}></View>
          <View style={styles.main3}>
           
           <Text style={styles.text2}>{item.value4}</Text>
           <Text style={styles.text2}>{item.value5}</Text>
           <Text style={styles.text2}>{item.value6}</Text>
         </View>
        
          </View>
    )

    }
    return(
        <View style={{flex:1,}}>
            <Header
            title={'BANK HOLIDAYS'}
            source ={require('../../../assets/Images/arrow.png')}
            onPress={()=>navigation.goBack()}
            /> 
            <ScrollView style={{flex:1,backgroundColor:'#E5E5E5'}}>
            <View style={styles.item}>
                 <View sty={styles.main}>
                     <Text style={styles.text}>{'Bank Holidays List'}</Text>
                 </View>
                 <View style={styles.list}>
                <FlatList
                 data={data}
                 renderItem={({item})=>renderItem(item)}
                 keyExtractor={(item) => item.title}
                 style={{width:'100%'}}
                />
            </View>



            </View>
                   



                 </ScrollView>
        </View>
    )
}
export default Holiday;