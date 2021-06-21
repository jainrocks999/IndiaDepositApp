import React from "react";
import {View,Text,FlatList,Image,TouchableOpacity} from 'react-native';
import Header from '../../../component/compareHeader';
import colors from '../../../component/colors';
import {useNavigation} from '@react-navigation/native';
import styles from './styles';
const data=[
    {source:require('../../../assets/Images/sbi.png'),title:'Regular Fixed Deposit',value1:'Saving \nAccount',value2:'9%',value3:'3 Lakh',value4:'offer'},
    {source:require('../../../assets/Images/union.png'),title:'Regular Fixed Deposit',value1:'Saving \nAccount',value2:'9%',value3:'3 Lakh',value4:'offer'},
    {source:require('../../../assets/Images/axis.png'),title:'Regular Fixed Deposit',value1:'Saving \nAccount',value2:'9%',value3:'3 Lakh',value4:'offer'},
    {source:require('../../../assets/Images/pnb.png'),title:'Regular Fixed Deposit',value1:'Saving \nAccount',value2:'9%',value3:'3 Lakh',value4:'offer'},
    {source:require('../../../assets/Images/hdfc.png'),title:'Regular Fixed Deposit',value1:'Saving \nAccount',value2:'9%',value3:'3 Lakh',value4:'offer'},
    {source:require('../../../assets/Images/bob.png'),title:'Regular Fixed Deposit',value1:'Saving \nAccount',value2:'9%',value3:'3 Lakh',value4:'offer'}
]
const FDList=()=>{
        const navigation=useNavigation()
const renderItem=(item)=>{
      return(
          <View style={styles.cont}>
          <TouchableOpacity 
          onPress={()=>navigation.navigate('AccountDetail')}
           style={styles.card}>
             <View style={styles.cardView}>
               <Image source={item.source}/>
               <Text style={styles.title}>{item.title}</Text>
               <View style={{width:'20%'}}></View>
             </View>
             <View style={styles.row}>
               <Text style={styles.same}>{item.value1}</Text>
               <Text style={styles.same}>{item.value2}</Text>
               <Text style={styles.same}>{item.value3}</Text>
               <Text style={styles.same}>{item.value4}</Text>
             
             </View>
          </TouchableOpacity>
          </View>
      )
}
    return(
        <View style={{flex:1}}>
          <Header
            title={'ACCOUNT LIST'}
            source={require('../../../assets/Images/arrow.png')}
            titleTwo='Compare'
            onPress={()=>navigation.goBack()}
            onPress1={()=>navigation.navigate('CompareSBAccount')}
            /> 
            <View style={styles.list}>
                <FlatList
                 data={data}
                 renderItem={({item})=>renderItem(item)}
                 keyExtractor={(item, index) => item.source}
                 style={{width:'100%'}}
                />
            </View>
        </View>
    )
}
export default FDList;