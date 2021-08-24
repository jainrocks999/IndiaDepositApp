import { StyleSheet } from "react-native";
import colors from '../../../component/colors';
export default StyleSheet.create({
   jan:{
        flexDirection:'row',
        alignItems:'center',
        width:'100%',
        paddingHorizontal:20,paddingVertical:10,
        backgroundColor:colors.bc,
        justifyContent:'space-between'
    },
    border:{
        borderColor: colors.white,
        borderWidth: 1,
    },
    month:{
        fontSize:16,
        fontFamily:'Montserrat-Normal',
        color:colors.white
    },
    border1:{
        borderColor: colors.textColor,
        borderStyle: 'dashed',
        borderWidth: .5,
        borderRadius:0.000001
    },
    container:{
        flexDirection:'row',
        alignItems:'center',
        width:'100%',
        paddingHorizontal:20,
        paddingVertical:10,
        justifyContent:'space-between'
    },
    main:{
        marginTop:20,
        alignItems:'center',
        justifyContent:'center'
    },
    heading:{
        fontSize:16,
        color:colors.bc,
        marginBottom:15
    },
    item1:{
        fontSize:14,
        fontFamily:'Montserrat-Normal',
        color:colors.textColor
    },
    item2:{
        fontSize:13,
        fontFamily:'Montserrat-Normal',
        color:colors.textColor
    },
    result:{
        color:colors.textColor,
        fontFamily:'Montserrat-Normal',
        fontSize:14,
        marginTop:20
    },
    search:{
        color:colors.white,
        fontFamily:'Montserrat-Normal',
        fontSize:14
    },
    button:{
        backgroundColor:colors.bc,
        width:'100%',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:30,
        height:50
    },
    input:{
        borderWidth:1,
        height:40,
        borderRadius:10,
        paddingHorizontal:10,
        borderColor:'#000'
    },
    dummy:{
        fontSize:13,
        fontFamily:'Montserrat-Normal',
        color:colors.textColor
    }
})
