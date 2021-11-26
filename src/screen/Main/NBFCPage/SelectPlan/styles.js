import { StyleSheet } from "react-native";
import colors from '../../../../component/colors';
import fontSize from "../../../../component/fontSize";
export default StyleSheet.create({
    container:{
        width:'100%',
        backgroundColor:colors.bc,
        alignItems:'center',
        justifyContent:'space-between',
        paddingHorizontal:10,
        flexDirection:'row',
        paddingVertical:10,
},
    container1:{
        flex:1,
        backgroundColor:colors.card
    },
    text:
    {
        fontFamily:'Montserrat-SemiBold',
        fontSize:fontSize.twelve,
        marginTop:6,
        fontWeight:'500',
        textAlign: 'center',
    },
    
   
 
    text2:{
        //fontSize:13,
        fontWeight:'700',
        color:colors.textColor,
        marginLeft:7,
        marginTop:-10,

    },
    text3:
    {fontSize:18,
        color:colors.white,
         fontFamily:'Montserrat-SemiBold',
         marginRight:100,marginTop:-10
        },
    view2:
    {
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        // width:'100%',
    },
    circle:
    {
        width:12,
        height:12,
        borderRadius:6,
        borderWidth:1,
        marginTop:6,
        marginLeft:5,
        alignItems:'center',
        justifyContent:'center'
    },
    buttomview:
    {
        borderTopWidth:1,
        paddingVertical:8,
        paddingHorizontal:15,
        borderColor:'#DDDDDD'
    },
    Text1:
    {
        fontWeight:'700',
        color:colors.textColor,
         marginTop:10,
    },
    buttomview1:
    {
        width:'100%',
        paddingHorizontal:15,
        marginTop:-10
    },
    imageView:
    {
       borderWidth:0.5,
       height:70,
       width:'100%',
       borderRadius:10,
    
       alignItems:'center',
       
       paddingVertical:9,
      // paddingHorizontal:10
    },
    card:
    {
        shadowColor:colors.black,
        shadowOpacity:0.25,
        shadowRadius:8,
        shadowOffset:{height:2,width:0},
        elevation:5,
        borderRadius:10,
        backgroundColor:colors.white,
        marginBottom:40,
        paddingHorizontal:10,
        paddingVertical:20
    },
    touch1:
    {
        alignItems:'center',
        width:'90%',
       // paddingVertical:14,
        borderRadius:10,
    
    },
    enable:{
        position: 'absolute',
        top: 0,
        left: 0,
        width:'100%',
        height:70,
        backgroundColor:colors.bc,
        borderRadius:10,
        alignItems:'center',justifyContent:'center',
   },
 
   tt:{color:colors.bc,fontSize:13,} ,
   maturity:{
       fontFamily:'Montserrat-Regular',
       fontSize:13,
       color:colors.textColor
    },
    amount:{
       fontFamily:'Montserrat-SemiBold',
       fontSize:14,
       color:colors.textColor
    },
    mContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingHorizontal:10,
        paddingVertical:10
    }
})

