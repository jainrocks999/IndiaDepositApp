import React,{useState,useEffect}from 'react';
import { View,Text,Image,ScrollView} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import Loader from '../../../component/loader';
import { useDispatch,useSelector } from "react-redux";
import HTMLView from 'react-native-htmlview';


const Security=()=>{
    const navigation=useNavigation()
    const dispatch=useDispatch()
    const selector=useSelector(state=>state.Security)
    const isFetching=useSelector(state=>state.isFetching)
useEffect(()=>{
        dispatch({
          type: 'Security_Request',
          url: 'getpagecontent',
          key:'security',
    })
},[])

const showContent=()=>{
    if (selector.length>0) {
      return(
        <HTMLView
        value={selector[0].value}
      />
      )
      // return <Text style={styles.normal}>
      //         {selector[0].value}
      // </Text>
    } else {
      return<View></View>
    }
}
    return(
        <View style={styles.container}>
             {isFetching?<Loader/>:null}
             <ScrollView style={{flex:1}}>
              {showContent()}
             </ScrollView>
       </View>
    )
}
export default Security;

