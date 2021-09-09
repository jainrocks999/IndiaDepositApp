import { StyleSheet } from 'react-native';
import colors from '../../../../component/colors';
import fontSize from '../../../../component/fontSize';
export default StyleSheet.create({
    better:{
        color:colors.textColor,
        marginTop:10,
        fontSize:fontSize.fourteen,
        fontFamily:'Montserrat-Normal'
    },
    drop:{
        marginTop:8 ,
        borderWidth:1,
        height:40,
        borderColor:colors.textColor,
        borderRadius:6,
        paddingHorizontal:5,
        justifyContent:'center',
        width:'100%',
        paddingHorizontal:10,
       
    },
    input:{
        color:colors.textColor
    },
    card:
    { 
        shadowColor:'black',
        shadowOpacity:0.25,
        shadowRadius:4,
        shadowOffset:{height:2,width:0},
        elevation:5,
        borderRadius:10,
        backgroundColor:'white',
        marginBottom:40,
        paddingHorizontal:15,
        paddingBottom:20,
        paddingVertical:10
    },
    error:
    {
        width:'90%',
        justifyContent:'center',
        alignItems:'flex-start',
        paddingHorizontal:8,
        marginTop:6
    },
    warn:
    {
        fontSize:fontSize.twelve,
        color:'red'
    },
})
