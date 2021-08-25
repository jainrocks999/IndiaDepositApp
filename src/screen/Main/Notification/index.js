import React,{useState}from 'react';
import { View,Text,Image,ScrollView} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import StatusBar from '../../../component/StatusBar';
import colors from '../../../component/colors';
import Header from '../../../component/header';
import { FlatList } from 'react-native';
const dummy=
[
    {title:'Lorem Ipsum Dolor Sit Amet',desc:'Lorem ipsum, or lipsum as it is sometimes',time:'10 min ago'},
    {title:'Lorem Ipsum Dolor Sit Amet',desc:'Lorem ipsum, or lipsum as it is sometimes',time:'5 min ago'},
    {title:'Lorem Ipsum Dolor Sit Amet',desc:'Lorem ipsum, or lipsum as it is sometimes',time:'7 min ago'},
    {title:'Lorem Ipsum Dolor Sit Amet',desc:'Lorem ipsum, or lipsum as it is sometimes',time:'9 min ago'},
    {title:'Lorem Ipsum Dolor Sit Amet',desc:'Lorem ipsum, or lipsum as it is sometimes',time:'2 min ago'},
    {title:'Lorem Ipsum Dolor Sit Amet',desc:'Lorem ipsum, or lipsum as it is sometimes',time:'12 min ago'},
    {title:'Lorem Ipsum Dolor Sit Amet',desc:'Lorem ipsum, or lipsum as it is sometimes',time:'21 min ago'},
    {title:'Lorem Ipsum Dolor Sit Amet',desc:'Lorem ipsum, or lipsum as it is sometimes',time:'20 min ago'},
    {title:'Lorem Ipsum Dolor Sit Amet',desc:'Lorem ipsum, or lipsum as it is sometimes',time:'30 min ago'},
    {title:'Lorem Ipsum Dolor Sit Amet',desc:'Lorem ipsum, or lipsum as it is sometimes',time:'50 min ago'},
    {title:'Lorem Ipsum Dolor Sit Amet',desc:'Lorem ipsum, or lipsum as it is sometimes',time:'31 min ago'},
    {title:'Lorem Ipsum Dolor Sit Amet',desc:'Lorem ipsum, or lipsum as it is sometimes',time:'20 min ago'},
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
                               <View style={styles.view1}>
                                   <View>
                                        <View style={styles.view2}>
                                           <Text style={styles.text1}>{item.title}</Text>
                                           <Text style={styles.text2}>{item.time}</Text>
                                        </View>
                                        <Text style={styles.text3}>{item.desc}</Text>
                                   </View>
                                </View>
                                <View style={styles.line}></View>
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

