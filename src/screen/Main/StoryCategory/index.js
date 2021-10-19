import React,{useState}from 'react';
import { View,Text,TouchableOpacity,Image,ScrollView} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import StatusBar from '../../../component/StatusBar';
import Header from '../../../component/header';
import colors from '../../../component/colors';
import HTMLView from 'react-native-htmlview';

const StoryCategory=({route})=>{
   const navigation=useNavigation()
   const data=route.params.item
    return(
      <View style={styles.container}>
             
      <View style={styles.main5}>
        <TouchableOpacity onPress={()=>navigation.goBack()}>
          <Image style={{height:32,width:32,tintColor:colors.white}}   
          source={require('../../../assets/Images/arrow.png')}/>
        </TouchableOpacity>
        <Text style={styles.textTitle}>{data.title} </Text>
   </View>
   <ScrollView style={{flex:1}}>
       <View style={styles.view}>
            <View style={styles.view1}>
                
                <Text style={styles.text}>{data.catergory_name}</Text>
                <Text style={styles.text2}>{'  >>  '}</Text>
                <Text style={styles.text1}>{data.title}</Text>
            </View>
            {data.short_content?<View style={styles.view5}>
              <Text style={styles.text3}>{`${data.short_content}`}</Text>
            </View>:null}
            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center', marginTop:15,}}>
                    <Text style={styles.text1}>{`published on ${data.created_date}`}</Text>
                    <View style={styles.view3}>
                          <Text style={styles.text4}>{data.catergory_name}</Text>
                      </View>
                      <View style={styles.view3}>
                          <Text style={styles.text4}>{data.tag_name}</Text>
                      </View>
                    </View>
            <View style={styles.view4}>
             { !data.image?  <Text style={styles.text5}>Dummy Image</Text>:
             <Image 
             resizeMode='contain'
             style={styles.img}
             source={{uri:data.image}}/>
             }
            </View>
            <View style={styles.view5}>
            <HTMLView
              value={data.content.trim().replace(new RegExp('<p>', 'g'), '<span>')}
            />
            </View>
       </View>
       </ScrollView>
      <StatusBar/>
   </View>
    )
}
export default StoryCategory;

  