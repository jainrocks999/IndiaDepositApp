import React,{useState}from 'react';
import { View,Text,Image,ScrollView,TextInput} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import StatusBar from '../../../component/StatusBar';
import color from '../../../component/colors';
import CustomButton from '../../../component/button1';
import Header from '../../../component/header';
import BottomTab from '../../../component/StoreButtomTab';
import { FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native';

const Refferal=()=>{
    const navigation=useNavigation()
    return(
        <View style={styles.container}>
           <Header
              source={require('../../../assets/Images/arrow.png')}
              title={'REFERRAL'}
              onPress={()=>navigation.goBack()}
           />
            <View style={styles.pfile}> 
                <Image 
                source={require('../../../assets/Image/Invite-fd.png')}/>
            </View> 
             <View style={styles.card}>
                <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:10,alignItems:'center'}}>
                   <Image source={require('../../../assets/Image/Vect.png')}/>
                   <View style={{paddingHorizontal:10,width:'100%'}}>
                   <Text style={{width:'90%',fontFamily:'Montserrat-Normal',fontSize:14}}>Share your referral link and invite your friends via SMS / Email Whatsapp.</Text>
                   </View>
                </View>
                <View style={{width:'100%',borderWidth:1,borderColor:'#DDDDDD',marginVertical:15}}></View>
                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                    <View>
                   <View style={styles.round}>
                       <Text style={styles.text}>1</Text>
                   </View>
                   {/* <Text>{'Invites your\nfriends to\nsign up'}</Text> */}
                   </View>
                   <View style={{width:60,height:1,backgroundColor:'#000',}}></View>
                   <View>
                   <View style={styles.round}>
                   <Text style={styles.text}>2</Text>
                   </View>
                   {/* <Text>narend</Text> */}
                   </View>
                   <View style={{width:60,height:1,backgroundColor:'#000',}}></View>
                   <View>
                   <View style={styles.round}>
                   <Text style={styles.text}>3</Text>
                   </View>
                   {/* <Text>narend</Text> */}
                   </View>
                </View>
                 <View style={{width:'100%',alignItems:'center',justifyContent:'center',marginTop:30}}>
                  <Text style={{fontSize:11,color:'#777777'}}>ENTER REFERRAL CODE</Text>
                    <View style={{width:'60%',
                    borderWidth:1,
                    borderRadius:2,
                    borderStyle:'dotted',
                    justifyContent:'center',
                    alignItems:'center',
                    height:40,
                    marginTop:10,
                    marginBottom:20
                    }}>
                    <TextInput
                    
                    />
                    </View>
                    <Text style={{fontSize:11,color:'#777777'}}>TAP TO COPY</Text>
             </View>
             </View>
         <StatusBar/>
       </View>
    )
}
export default Refferal;

