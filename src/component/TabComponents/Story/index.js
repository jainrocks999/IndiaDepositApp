import React,{useState,useEffect}from 'react';
import { View,Text,Image,ScrollView,FlatList,TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch ,useSelector} from "react-redux";
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
    const dispatch=useDispatch()
    const Blogs=useSelector(state=>state.Story)
    useEffect(()=>{
        dispatch({
            type: 'Get_Story_Request',
            url: 'getpost',
            post_category_id:2
        })
    },[])
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
                            <Text style={styles.Text1}>{item.title}</Text>
                        </TouchableOpacity>
                        {/* </View> */}
                        <View style={styles.view}>
                            <Text style={styles.Textt}>{item.short_content}</Text>
                        </View>
                        <View style={styles.view}>
                            <Text style={styles.Textp}>{`published on july 14th, 2021`}</Text>
                        </View>
                        {/* <View style={styles.view}>
                            <Text style={styles.Textc}>{item.short_content}</Text>
                        </View> */}
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

