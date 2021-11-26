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
        marginBottom:40,
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
        // flexDirection:'row',
        // justifyContent:'space-between',
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
    }
})
