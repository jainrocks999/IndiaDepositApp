import React from "react";
import {View,Text,FlatList,Image,ScrollView} from 'react-native';
import Header from '../../../component/compareHeader';
import colors from '../../../component/colors';
import styles from './styles';
import {useNavigation} from '@react-navigation/native'
const data=[
      
]
const FDList=()=>{
const navigation=useNavigation()
const renderItem=(item)=>{
      return(
          <View style={styles.cont}>
          
          </View>
      )
}
    return(
        <View style={{flex:1,backgroundColor:'#E5E5E5'}}>
          <Header
            title={'FD DETAILS'}
            source={require('../../../assets/Images/arrow.png')}
            titleTwo='Compare'
            onPress={()=>navigation.goBack()}
            onPress1={()=>navigation.navigate('CompareFD')}
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