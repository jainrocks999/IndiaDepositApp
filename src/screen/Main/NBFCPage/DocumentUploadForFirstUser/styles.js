import { StyleSheet } from 'react-native';
import colors from '../../../../component/colors';
import fontSize from '../../../../component/fontSize';
export default StyleSheet.create({
   main:{
       paddingHorizontal:15,
       paddingVertical:20,
       justifyContent:'center',
       alignItems:'center'
    },
    container:{
        height:200,
        width:'100%',
        borderWidth:1,
        borderStyle:'dashed',
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center'
    },
    image:{
        resizeMode:'contain',
        height:180,
        width:200
    },
    button:{
        backgroundColor:colors.bc,
        paddingVertical:10,
        paddingHorizontal:15,
        borderRadius:10,
        marginVertical:20
    },
    title:{
        fontFamily:'Montserrat-SemiBold',
        color:colors.white,
        fontSize:12
    },
    place:{
        fontSize:12,
        color:'grey',
        fontFamily:'Montserrat-Regular'
    },
    bottom:{
        position:'absolute',
        bottom:70,
        left:0,right:0,
        flex:1,
        paddingHorizontal:20
    },
    button1:{
        width:'100%',
        height:50,
        borderRadius:30,
        alignItems:'center',
        justifyContent:'center'
    },
    row:{
        alignItems:'center',
        justifyContent:'center'
    },
    modalView:
    {
        width:'100%',
        paddingHorizontal:10,
        justifyContent:'space-between',
        flexDirection:'row',
        marginTop:10,
    },
    buton:
    {
         marginTop:35,
    },
    came:
    {
        color:colors.bc,
        fontFamily:'Montserrat-SemiBold',
        fontSize:16
    },
    img1:{
        width:60,
        height:40
    }
})
