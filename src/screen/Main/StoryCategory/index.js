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
               <View style={styles.main}>
                    <View style={styles.main1}>
                        <Text style={styles.title}>{'Blog'}</Text>
                        <Text style={styles.title1}>{'  >>  '}</Text>
                        <Text style={styles.title}>{data.catergory_name}</Text>
                        <Text style={styles.title1}>{'  >>  '}</Text>
                        <Text style={styles.title}>{data.title}</Text>
                    </View>
                    <View style={styles.view2}>
                      <Text style={styles.title2}>{`${data.title}`}</Text>
                    </View>
                    <View style={[styles.main1,{marginTop:15}]}>
                      <Text style={styles.title3}>{`Posted on july 14th, 2021`}</Text>
                      <View style={styles.view}>
                          <Text style={styles.Text1}>{data.catergory_name}</Text>
                      </View>
                    </View>
                    <View style={styles.view1}>
                           <Text style={styles.Text2}>Dummy Image</Text>
                    </View>
                    <View style={styles.view2}>
                      <Text style={styles.Text3}>{`${data.content}`}</Text>
                    </View>
               </View>
              <StatusBar/>
           </View>
    )
}
export default BlogCategory;

  