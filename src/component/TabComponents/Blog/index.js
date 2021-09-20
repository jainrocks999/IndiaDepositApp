import React,{useEffect, useState}from 'react';
import { View,Text,Image,ScrollView,FlatList,TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import { useSelector,useDispatch } from "react-redux";


const Blog=()=>{
    const navigation=useNavigation()
    const dispatch=useDispatch()
    const Blogs=useSelector(state=>state.Blog)
    console.log('this is blog array',Blogs);

    useEffect(()=>{
        dispatch({
            type: 'Get_Blog_Request',
            url: 'getpost',
            post_category_id:1
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

