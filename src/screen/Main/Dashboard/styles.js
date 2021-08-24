import { StyleSheet } from "react-native";
import colors from '../../../component/colors';
export default StyleSheet.create({
    container:{
        flexDirection:'row',
        justifyContent:'space-between',
        //marginTop:38
    },
    imageView:{
        // width:60,
        // height:60,
        // backgroundColor:colors.bc,
        // borderRadius:30,
        // justifyContent:'center',
        // alignItems:'center'
    },
    text:{
        fontFamily:'Montserrat-SemiBold',
        fontSize:12,
        color:colors.textColor,
        marginTop:6,
        fontWeight:'600',
        textAlign: 'center',
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
       // height:200,
        width:'100%',
        backgroundColor:'#C4C4C4',
        justifyContent:'center',
        alignItems:'center'
    },
    item:{
        width:'100%',
        justifyContent:'center',
        alignContent:'center',
        backgroundColor:'#FFFFFF',
        borderRadius:10,
        marginBottom:20,
        // paddingVertical:25,
    }
})
