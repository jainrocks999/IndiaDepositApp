import { StyleSheet } from 'react-native';
import colors from '../../../component/colors';

export default StyleSheet.create({
    same:{
        fontSize:11,
        fontFamily:'Montserrat-Normal',
        color:colors.textColor
    },
    title:{
        fontSize:14,
        fontFamily:'Montserrat-Normal',
        color:colors.textColor
    },
    cardView:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    card:{
        shadowColor:'black',
        shadowOpacity:0.25,
        shadowRadius:4,
        shadowOffset:{height:2,width:0},
        elevation:5,
        borderRadius:6,
        backgroundColor:'white',
        height:85,
        padding:13,
    },
   
    cont:{
        paddingHorizontal:25,
        paddingVertical:8,
       
    },
   
   
    list:{
        shadowColor:'black',
        shadowOpacity:0.25,
        shadowRadius:4,
        shadowOffset:{height:2,width:0},
        elevation:2,
        borderRadius:10,
        backgroundColor:'white',
        paddingVertical:10,
        margin:15
    }
})
