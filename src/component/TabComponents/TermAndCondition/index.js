import React,{useState,useEffect}from 'react';
import { View,Text,Image,ScrollView} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import Loader from '../../../component/loader';
import { useDispatch,useSelector } from "react-redux";
import HTMLView from 'react-native-htmlview';

const TermAndCondition=()=>{
    const navigation=useNavigation()
    const dispatch=useDispatch()
    const selector=useSelector(state=>state.TermCondition)
    const isFetching=useSelector(state=>state.isFetching)
useEffect(()=>{
        dispatch({
          type: 'TermAndCondition_Request',
          url: 'getpagecontent',
          key:'term_condition',
    })
},[])

const showContent=()=>{
    if (selector.length>0) {
      // return <Text style={styles.normal}>
      //         {selector[0].value}
      // </Text>
      return(
        <View>
        <HTMLView
          value={selector[0].value.trim().replace(new RegExp('<p>', 'g'), '<span>')} 
          addLineBreaks={false}
        // value={selector[0].value}
      />
      <View style={{height:50}}></View>
      </View>
      )
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
export default TermAndCondition;

