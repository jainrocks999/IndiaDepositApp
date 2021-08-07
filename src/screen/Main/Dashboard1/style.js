import { StyleSheet } from "react-native";
import colors from '../../../component/colors';
export default StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'row',
        justifyContent:'space-between',
        //marginTop:38
    },
    imageView:{
//width:60,
  //      height:60,
        //backgroundColor:'grey',
       // borderRadius:30,
         justifyContent:'center',
         alignItems:'center'
    },
    text:{
        fontFamily:'Montserrat-Normal',
        fontSize:14,
        color:colors.textColor,
        marginTop:6,
        fontWeight:'600',
        textAlign: 'center',
        marginBottom:15
    },
    name:{
        color:colors.white,
        fontSize:19,
        fontFamily:'Montserrat-Normal'
    },
    last:{
        color:colors.white,
        fontSize:13,
        fontFamily:'Montserrat-Normal'
    },
    pfile:{
        width:76,
        height:76,
        borderRadius:37,
        backgroundColor:'#fff',
        justifyContent:'center',
        alignItems:'center'
    },
    main:{
        height:165,
        width:'100%',
        backgroundColor:'#C4C4C4',
        justifyContent:'center',
        alignItems:'center'
    },
    image:{
        width:'100%',
        height:165,
    },
    item:{
        flex:1,
        width:'95%',
        marginTop:-20,
        marginBottom:35,
        justifyContent:'center',
        alignContent:'center',
        marginLeft:10,
        backgroundColor:'#FFFFFF',
        borderColor:'black',
        borderRadius:7
       // paddingHorizontal:5
    },
    text1:{
        fontFamily:'Montserrat-Medium',
        fontSize:16,
        color:colors.textColor,
        marginTop:6,
        fontWeight:'500',
        //textAlign: 'center',
        marginLeft:20,
    },
    imageicon:{height:35,width:35, tintColor:'#5A4392'},
})
