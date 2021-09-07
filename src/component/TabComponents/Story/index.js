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
                showsVerticalScrollIndicator={false}
                data={blogpost}
                renderItem={({item})=>(
                    <View style={styles.card}>
                        <View style={styles.titleView}>
                            <Text style={styles.text}>{item.catergory_name}</Text>
                        </View>
                        <View style={styles.view1}>
                            <Text style={styles.text1}>{item.title}</Text>
                        </View>
                        <View style={styles.view1}>
                            <Text style={styles.text2}>{`published on july 14th, 2021`}</Text>
                        </View>
                        <View style={styles.view1}>
                            <Text style={styles.text3}>{item.short_content}</Text>
                        </View>
                        <View style={styles.line}/>
                        <TouchableOpacity onPress={()=>navigation.navigate('StoryCategory',{item})}>
                            <Text style={styles.text4}>Read More</Text>
                        </TouchableOpacity>
                 </View>
                )}
                />
                
              
                </View>
       </View>
    )
}
export default Blog;

