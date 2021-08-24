import React,{useState}from 'react';
import { View,Text,Image,ScrollView,TextInput} from 'react-native';
import styles from './styles';
import CustomButton from '../../../component/button1';
const Support=()=>{
    return(
        <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false} style={{flex:1}}>
                  <Text style={{fontFamily:'Montserrat-SemiBold',color:'#000',fontSize:15}}>How can we help you?</Text>
                    <Text style={styles.better}>Name</Text>
                      <View style={styles.drop}>
                        <TextInput
                         style={{height:35}}
                         placeholder='Jhon Mathew'
                        />
                    </View>
                    <Text style={styles.better}>Email</Text>
                      <View style={styles.drop}>
                        <TextInput
                         style={{height:35}}
                         placeholder='Username@gmail.com'
                        />
                    </View>
                    <Text style={styles.better}>Mobile Number</Text>
                      <View style={styles.drop}>
                        <TextInput
                        style={{height:35}}
                        placeholder='+91 000 0000 000'
                        keyboardType='phone-pad'
                        />
                    </View>
                    <Text style={styles.better}>Subject</Text>
                      <View style={styles.drop}>
                      <TextInput
                        style={{height:35}}
                        placeholder=''
                        />
                    </View>
                    <Text style={styles.better}>Message</Text>
                      <View style={styles.drop1}>
                      <TextInput
                        multiline = {true}
                        style={{height:70}}
                        placeholder=''
                        />
                    </View>
                    <View style={{marginTop:20}}>
                      <CustomButton
                      title='SUBMIT'
                      />
                    </View>
                    <View style={{marginTop:80}}></View>
                </ScrollView>
       </View>
    )
}
export default Support;