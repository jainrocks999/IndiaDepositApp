import { StyleSheet } from 'react-native';
import colors from '../../../component/colors';

export default StyleSheet.create({
    same:{
        fontSize:11,
        fontFamily:'Montserrat-Normal',
        color:'#5A4392',
        textAlign:'center'
    },
    title:{
        fontSize:14,
        fontFamily:'Montserrat-Medium',
        color:'#5A4392'
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
       // height:85,
        padding:13,
    },
    cont:{
        paddingHorizontal:10,
        paddingVertical:8
    },
    row1:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:7,
        paddingHorizontal:0,
        width:'100%'
    },
    row:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:7,
        paddingHorizontal:10,
        width:'100%'
    },
    list:{
        alignItems:'center',
        justifyContent:'center',
        flex:1
    }
})
