import React from 'react';
import { View,Text,TouchableOpacity ,StyleSheet,Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import colors from '../colors';
const Header=({title,source,onPress})=>{
    const navigation=useNavigation()
    return(
        <View>
            <View style={styles.main}>
            <TouchableOpacity onPress={onPress}>
            <Image style={{height:35,width:35,tintColor:colors.white}}  source={source}/>
            </TouchableOpacity>
            <Text style={styles.text}>{title} </Text>
            <View style={{width:20}}></View>
           </View>
        </View>
    )
}
export default Header
const styles=StyleSheet.create({
    main:{
        width:'100%',
        backgroundColor:colors.bc,
        height:50,
        alignItems:'center',
        justifyContent:'space-between',
        paddingHorizontal:16,
        flexDirection:'row'
    },
    drawer:{
        width:30,
        height:30,
        tintColor:'white'
    },
    text:{
        color:'white',
        fontSize:18,
        fontFamily:'Montserrat-SemiBold'
    },
})