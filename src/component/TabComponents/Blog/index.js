import React,{useState}from 'react';
import { View,Text,Image,ScrollView,FlatList,TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import { useSelector } from "react-redux";

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
    const Blogs=useSelector(state=>state.Blog)
    console.log('this is blog array',Blogs);
    return(
        <View style={styles.container}>
             <View style={styles.main}>
                <FlatList
                data={Blogs}
                showsVerticalScrollIndicator={false}
                renderItem={({item})=>(
                    <View style={styles.card}>
                        {/* <View style={styles.titleView}> */}
                        <TouchableOpacity style={styles.titleView}>
                            <Text style={styles.Text1}>{item.catergory_name}</Text>
                        </TouchableOpacity>
                        {/* </View> */}
                        <View style={styles.view}>
                            <Text style={styles.Textt}>{item.title}</Text>
                        </View>
                        <View style={styles.view}>
                            <Text style={styles.Textp}>{`published on july 14th, 2021`}</Text>
                        </View>
                        <View style={styles.view}>
                            <Text style={styles.Textc}>{item.short_content}</Text>
                        </View>
                        <View style={styles.line}/>
                        <TouchableOpacity onPress={()=>navigation.navigate('BlogCategory',{item})}>
                            <Text style={styles.Textr}>Read More</Text>
                        </TouchableOpacity>
                 </View>
                )}
                />
                
              
                </View>
       </View>
    )
}
export default Blog;

