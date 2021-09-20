import React from 'react';
import { View,Text,TouchableOpacity ,StyleSheet,Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import fontSize from '../fontSize';
import colors from '../colors';
const Header=({title,source,onPress,source1,onPress1})=>{
    const navigation=useNavigation()
    return(
        <View>
            <View style={styles.main}>
                <TouchableOpacity onPress={onPress}>
                  <Image style={{height:32,width:32,tintColor:colors.white}}  source={source}/>
                </TouchableOpacity>
                <Text style={styles.text}>{title} </Text>
                <TouchableOpacity onPress={onPress1}>
                <Image style={{width:25,height:30}} source={source1}/>
                </TouchableOpacity>
           </View>
        </View>
    )
}
export default Header
const styles=StyleSheet.create({
    main:{
        width:'100%',
        backgroundColor:colors.bc,
        alignItems:'center',
        justifyContent:'space-between',
        paddingHorizontal:16,
        flexDirection:'row',
        paddingVertical:10
    },
    drawer:{
        width:30,
        height:30,
        tintColor:'white'
    },
    text:{
        color:colors.white,
        fontSize:fontSize.eighteen,
        fontFamily:'Montserrat-SemiBold',
        marginLeft:10
    },
})