import { StyleSheet } from "react-native";
import colors from '../../../component/colors';
export default StyleSheet.create({
    container:{
        flexDirection:'row',
        justifyContent:'space-between',
       width:'98%',
        marginTop:38
    },
    imageView:{
        width:56,
        height:56,
        backgroundColor:'#FFFFFF',
        borderRadius:28,
        borderWidth:2,
        borderColor:'#5A4392',
        justifyContent:'center',
        alignItems:'center'
    },
    text:{
        fontFamily:'Montserrat-Normal',
        fontSize:17,
        color:'#000000',
        marginTop:15,
        fontWeight:'600',
        textAlign: 'center',
        marginBottom:15,
    },
   
    main:{
        alignItems:'center',
        justifyContent:'center',
        height: 21,
        width: 161,
        left: 127,
        top: 115,
//border-radius: nullpx;

    },
    item:{
        flex:1,
        width:'95%',
        marginTop:20,
        marginBottom:20,
        marginLeft:10,
        backgroundColor:'#FFFFFF',
        borderColor:'black',
        borderRadius:10,
    },
    text1:{
        fontFamily:'Montserrat-Normal',
        fontStyle:'normal',
        fontSize:16,
        color:'#FFFFFF',
        marginTop:0,
        fontWeight:'700',
    },
    main1:{
        alignItems:'center',
        justifyContent:'center',
         width: '100%',
          height: 40,
       backgroundColor:'#5A4392',
    },
    text2:{
        fontFamily:'Montserrat-Normal',
        fontSize:12,
        color:'#000000',
        marginTop:10,
        fontWeight:'200',
        textAlign: 'center',
        marginBottom:10,
    },
    main3:{flexDirection:'row',justifyContent:'space-between',marginHorizontal:10},
    cardspace:{height:0,width:"100%",borderWidth:0.5,backgroundColor:'#DDDDDD',marginTop:0},
})
