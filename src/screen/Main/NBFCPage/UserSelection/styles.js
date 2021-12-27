import { StyleSheet } from 'react-native';
import colors from '../../../../component/colors';
import fontSize from '../../../../component/fontSize';
export default StyleSheet.create({
  
    Scroll:{
        flex:1,
        paddingHorizontal:15,
        paddingVertical:10
    },
    Touch:{
        backgroundColor:colors.bc,
        paddingHorizontal:15,
        paddingVertical:6,
        borderRadius:10
    },
    Button:{
        justifyContent:'space-between',
        alignItems:'center',
        flex:1,
        marginBottom:100,
        marginTop:20,
        // flexDirection:'row'
    },
    Btntext:{
        fontSize:fontSize.fourteen,
        color:colors.white
    },
    title:
    {
        fontSize:fontSize.fourteen,
        fontFamily:'Montserrat-Medium',
        color:colors.bc
    },
    card:
    {
        shadowColor:colors.black,
        shadowOpacity:0.25,
        shadowRadius:4,
        shadowOffset:{height:2,width:0},
        elevation:1,
        borderRadius:6,
        backgroundColor:colors.white,
        padding:13,
    },
    container:
    {
        paddingHorizontal:10,
        //paddingVertical:5
    },
   View:
    {
        marginTop:7,
        paddingHorizontal:5,
        width:'90%'
    },
    list:
    {
        alignItems:'center',
        justifyContent:'center',
        // flex:1
    },
    button:{
        backgroundColor:colors.bc,
        paddingVertical:3,
        paddingHorizontal:4,
        borderRadius:6,
        alignItems:'center',
        justifyContent:'center',
        width:60
    },
    text:{
        color:colors.white,
        fontFamily:'Montserrat-Regular',
        fontSize:fontSize.twelve
    },
    text:
    {
        fontSize:fontSize.eleven,
        fontFamily:'Montserrat-Regular',
        color:colors.textColor,
        // fontWeight:'bold'
    },
    container1:{
        flexDirection:'row',
        flex:1,
        justifyContent:'space-between',
        alignItems:'center',
        width:'100%'
    },
    button1:{
        width:'100%',
        height:50,
        borderRadius:30,
        alignItems:'center',
        justifyContent:'center'
    },
    cross:{
        borderRadius:30,
        height:30,width:30,
        justifyContent:'center',
        alignItems:'center'

    },
    x:{
        color:colors.bc,
        fontFamily:'Montserrat-Regular',
        fontSize:20,
        marginBottom:5,
    },
    better:{
        color:colors.textColor,
        marginTop:13,
        fontSize:fontSize.twelve,
        fontFamily:'Montserrat-SemiBold'
    },
    drop:{
        marginTop:5 ,
        // borderWidth:1,
        // height:40,
        // borderColor:colors.textColor,
        // borderRadius:6,
        // paddingHorizontal:5,
        // justifyContent:'center',
        // width:'100%',
        // paddingHorizontal:10,
        // alignContent:'center'
        borderWidth:1,
        height:40,
        borderRadius:6,
        paddingHorizontal:10,
        borderColor:colors.black,
        justifyContent:'center',
        marginTop:2
       
    }, 
    dropCal:{
        marginTop:5 ,
        borderWidth:1,
        height:40,
        borderColor:colors.textColor,
        borderRadius:6,
        paddingHorizontal:5,
        alignItems:'center',
        justifyContent:'space-between',
        width:'100%',
        paddingHorizontal:10,
        flexDirection:'row'
    }, 
})
