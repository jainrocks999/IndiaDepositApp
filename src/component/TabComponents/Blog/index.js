import React,{useState}from 'react';
import { View,Text,Image,ScrollView,FlatList,TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
const blogpost= [
    {
        "title": "state level championship!",
        "content": "There are 12 clubs who have won either the National Football League or the I-League and 4 clubs who have won the Indian Super League since the league became the .",
        "short_content": "There are 12 clubs who have won either.",
        "image": null,
        "post_category_id": "1",
        "catergory_name": "footbal",
        "description": "League since the league became the .",
        "tag_name": "footwork"
    },
    {
        "title": "state level championship!",
        "content": "There are 12 clubs who have won either the National Football League or the I-League and 4 clubs who have won the Indian Super League since the league became the .",
        "short_content": "There are 12 clubs who have won either.",
        "image": null,
        "post_category_id": "1",
        "catergory_name": "footbal",
        "description": "League since the league became the .",
        "tag_name": "footwork"
    },
    {
        "title": "state level championship!",
        "content": "There are 12 clubs who have won either the National Football League or the I-League and 4 clubs who have won the Indian Super League since the league became the .",
        "short_content": "There are 12 clubs who have won either.",
        "image": null,
        "post_category_id": "1",
        "catergory_name": "footbal",
        "description": "League since the league became the .",
        "tag_name": "footwork"
    }
]

const Blog=()=>{
    const navigation=useNavigation()
    return(
        <View style={styles.container}>
             <View style={{marginBottom:60}}>
                <FlatList
                data={blogpost}
                showsVerticalScrollIndicator={false}
                renderItem={({item})=>(
                    <View style={styles.card}>
                        <View style={styles.titleView}>
                            <Text style={{fontSize:12,color:'#fff'}}>{item.catergory_name}</Text>
                        </View>
                        <View style={{marginTop:10}}>
                            <Text style={{fontSize:14,color:'#000',fontFamily:'Montserrat-Normal'}}>{item.title}</Text>
                        </View>
                        <View style={{marginTop:10}}>
                            <Text style={{fontSize:11,color:'#777777',fontFamily:'Montserrat-Normal'}}>{`published on july 14th, 2021`}</Text>
                        </View>
                        <View style={{marginTop:10}}>
                            <Text style={{fontSize:13,color:'#000',fontFamily:'Montserrat-Normal'}}>{item.short_content}</Text>
                        </View>
                        <View style={{borderWidth:1,borderColor:'#DDDDDD',marginVertical:10}}/>
                        <TouchableOpacity onPress={()=>navigation.navigate('BlogCategory',{item})}>
                            <Text style={{fontSize:12,color:'#5A4392',fontFamily:'Montserrat-Normal'}}>Read More</Text>
                        </TouchableOpacity>
                 </View>
                )}
                />
                
              
                </View>
       </View>
    )
}
export default Blog;

