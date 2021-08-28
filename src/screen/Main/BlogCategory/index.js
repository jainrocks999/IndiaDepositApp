import React,{useState}from 'react';
import { View,Text} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import StatusBar from '../../../component/StatusBar';
import Header from '../../../component/header';
import colors from '../../../component/colors';


  
const BlogCategory=({route})=>{
   const navigation=useNavigation()
   const data=route.params.item
    return(
           <View style={styles.container}>
              <Header
                source={require('../../../assets/Images/arrow.png')}
                title={data.title}
                onPress={()=>navigation.goBack()}
              />
               <View style={{flex:1,padding:20}}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Text style={{color:colors.bc,fontSize:12,fontFamily:'Montserrat-Normal'}}>{'Blog'}</Text>
                        <Text style={{color:'#777777'}}>{'  >>  '}</Text>
                        <Text style={{color:colors.bc,fontSize:12,fontFamily:'Montserrat-Normal'}}>{data.catergory_name}</Text>
                        <Text style={{color:'#777777'}}>{'  >>  '}</Text>
                        <Text style={{color:'#777777',fontSize:12,fontFamily:'Montserrat-Normal'}}>{data.title}</Text>
                    </View>
                    <View style={{marginTop:15}}>
                      <Text style={{color:'#000',fontSize:16,fontFamily:'Montserrat-Normal'}}>{`${data.title}`}</Text>
                    </View>
                    <View style={{marginTop:15,flexDirection:'row',alignItems:'center'}}>
                      <Text style={{color:'#777777',fontSize:12,fontFamily:'Montserrat-Normal'}}>{`Posted on july 14th, 2021`}</Text>
                      <View style={{backgroundColor:colors.bc,paddingHorizontal:12,paddingVertical:2,marginLeft:12}}>
                          <Text style={{color:colors.white,fontSize:12,fontFamily:'Montserrat-Normal'}}>{data.catergory_name}</Text>
                      </View>
                    </View>
                    <View style={{width:'100%',height:120,backgroundColor:'#EDEDEB',marginTop:20,alignItems:'center',justifyContent:'center'}}>
                           <Text style={{fontSize:16}}>Dummy Image</Text>
                    </View>
                    <View style={{marginTop:15}}>
                      <Text style={{color:colors.textColor,fontSize:13,fontFamily:'Montserrat-Normal'}}>{`${data.content}`}</Text>
                    </View>
               </View>
              <StatusBar/>
           </View>
    )
}
export default BlogCategory;

  