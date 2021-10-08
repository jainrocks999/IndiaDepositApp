import React,{useState,useEffect}from 'react';
import { View,Text,Image,ScrollView,StyleSheet} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import Loader from '../../../component/loader';
import { useDispatch,useSelector } from "react-redux";
import HTMLView from 'react-native-htmlview';

const Privacy=()=>{
    const navigation=useNavigation()
    const dispatch=useDispatch()
    const selector=useSelector(state=>state.Privacy)
    const isFetching=useSelector(state=>state.isFetching)
    useEffect(()=>{
        dispatch({
          type: 'Privacy_Request',
          url: 'getpagecontent',
          key:'privacy',
    })
},[])
// replace(new RegExp('<p>', 'g'), '<span>')
const showContent=()=>{
    if (selector.length>0) {
      return(
        <View>
        <HTMLView
        value={selector[0].value.trim().replace(new RegExp('<p>', 'g'), '<span>')}
        addLineBreaks={false}
        stylesheet={richTextStyles}
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
             <ScrollView  style={{flex:1}}>
                {showContent()}
                </ScrollView>
       </View>
    )
}
export default Privacy;
const richTextStyles = StyleSheet.create({
  p: {
    marginTop: 3,
    marginBottom: 3
  }
})

