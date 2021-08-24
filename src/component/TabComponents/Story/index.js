import React,{useState}from 'react';
import { View,Text,Image,ScrollView} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';


const Story=()=>{
    const navigation=useNavigation()
    return(
        <View style={styles.container}>
             {/* <ScrollView style={{flex:1}}> */}
                <Text style={styles.heading}>Lorem Ipsum is simply dummy text. </Text> 
                <Text style={styles.normal}>
                It is a long established fact that a reader will be
                distracted by the readable content of a page when
                looking at its layout. The point of using Lorem 
                Ipsum is that.
                </Text>
                <Text style={[styles.heading,{marginTop:37}]}>Lorem Ipsum is simply dummy text. </Text> 
                <Text style={styles.normal}>
                It is a long established fact that a reader will be
                distracted by the readable content of a page when
                looking at its layout. The point of using Lorem 
                Ipsum is that.
                </Text>
                <Text style={[styles.heading,{marginTop:37}]}>Lorem Ipsum is simply dummy text. </Text> 
                <Text style={styles.normal}>
                It is a long established fact that a reader will be
                distracted by the readable content of a page when
                looking at its layout. The point of using Lorem 
                Ipsum is that.
                </Text>
                {/* </ScrollView> */}
       </View>
    )
}
export default Story;

