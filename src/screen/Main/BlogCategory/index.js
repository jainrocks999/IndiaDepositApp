import React,{useState}from 'react';
import { View,Text,Image} from 'react-native';
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
               <View style={styles.view}>
                    <View style={styles.view1}>
                        <Text style={styles.text}>{'Blog'}</Text>
                        <Text style={styles.text2}>{'  >>  '}</Text>
                        <Text style={styles.text}>{data.catergory_name}</Text>
                        <Text style={styles.text2}>{'  >>  '}</Text>
                        <Text style={styles.text1}>{data.title}</Text>
                    </View>
                    <View style={styles.view5}>
                      <Text style={styles.text3}>{`${data.title}`}</Text>
                    </View>
                    <View style={styles.view2}>
                      <Text style={styles.text1}>{`Posted on july 14th, 2021`}</Text>
                      <View style={styles.view3}>
                          <Text style={styles.text4}>{data.catergory_name}</Text>
                      </View>
                    </View>
                    <View style={styles.view4}>
                     { !data.image?  <Text style={styles.text5}>Dummy Image</Text>:
                     <Image style={styles.img}
                     source={{uri:data.image}}/>
                     }
                           
                    </View>
                    <View style={styles.view5}>
                      <Text style={styles.text6}>{`${data.content}`}</Text>
                    </View>
               </View>
              <StatusBar/>
           </View>
    )
}
export default BlogCategory;

  