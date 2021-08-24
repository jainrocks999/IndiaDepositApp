import React,{useState,useEffect}from 'react';
import { View,Text,Image,ScrollView,FlatList,TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import Loader from '../../../component/loader';
import { useDispatch,useSelector } from "react-redux";


const Faq=()=>{
    const navigation=useNavigation()
    const dispatch=useDispatch()
    const selector=useSelector(state=>state.Faq)
    const isFetching=useSelector(state=>state.isFetching)
   console.log('this is selector respose',selector);

useEffect(()=>{
        dispatch({
          type: 'Faq_Request',
          url: 'getpagecontent',
          key:'faq',
    })
},[])
const showContent=()=>{
        if (selector.length>0) {
          
          return(
              <View>
                  <FlatList
                  data={selector}
                  renderItem={({item})=>(
                     console.log('hi hebrew',JSON.stringify(item))
                  )}
                  />
                  {/* <TouchableOpacity>
                      <Text>{}</Text>
                  </TouchableOpacity> */}
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
export default Faq;

