import React from 'react';
import { View,Text,TouchableOpacity ,StyleSheet,Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import colors from '../colors';
const Header=({title,onPress1,titleTwo,source,onPress})=>{
    const navigation=useNavigation()
    return(
        <View>
            <View style={styles.main}>
            <TouchableOpacity onPress={onPress}>
            <Image style={{height:35,width:35,tintColor:colors.white}}  source={source}/>
            </TouchableOpacity>
            <View style={styles.view}>
            <Text style={styles.text}>{title} </Text>
            </View>
            {titleTwo?
            <TouchableOpacity onPress={onPress1}
            style={styles.squareView}>
                <Text style={{fontSize:11,color:'#ffffff',fontFamily:'Montserrat-Normal',}}>{titleTwo}</Text>
            </TouchableOpacity>:<View></View>
            }
            {/* </View> */}
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
        fontFamily:'Montserrat-SemiBold',
        marginRight:10
    },
    view:{
        marginLeft:15
       // flexDirection:'row',
       // alignItems:'center',
        //width:'50%',
       // justifyContent:'space-between',
        //paddingHorizontal:5
    },
    squareView:{
        height:30,
        borderWidth:1,
        borderColor:'#ffffff',
        borderRadius:6,
        justifyContent:'center',
        alignItems:'center',
        paddingHorizontal:10
    }
})