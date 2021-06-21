import { StyleSheet } from 'react-native';
import colors from '../../../component/colors';

export default StyleSheet.create({
    container:{
        width:'100%',
        height:45,
        backgroundColor:'#DDDDDD',
        justifyContent:'center',
        alignItems:'center'
    },
    title:{
        fontFamily:'Montserrat-Medium',
        fontSize:14,
        color:colors.textColor
    },
    row:{
        width:'100%',
        height:45,
        flexDirection:'row',
        alignItems:'center',
        paddingHorizontal:60,
        justifyContent:'space-between'
    },
    value:{
        fontFamily:'Montserrat-Normal',
        fontSize:12,
        color:colors.textColor
    },
    card:{
        shadowColor:'black',
        shadowOpacity:0.25,
        shadowRadius:4,shadowOffset:{height:2,width:0},
        elevation:5,
        borderRadius:6,
        backgroundColor:'white',
        height:150,
        alignItems:'center',
        width:160,
        paddingVertical:10
    },
    xview:{alignItems:'flex-end',width:'100%',marginTop:-22,marginRight:-10},
    row1:{width:28,height:28,borderRadius:14,backgroundColor:colors.bc,justifyContent:'center',alignItems:'center'},
    title1:{marginTop:17,fontFamily:'Montserrat-SemiBold',color:colors.textColor},
    button:{width:120,height:35,backgroundColor:colors.bc,borderRadius:30,justifyContent:'center',alignItems:'center'},
    invest:{color:colors.white,fontSize:10,fontFamily:'Montserrat-SemiBold'}
})
