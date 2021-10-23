import { StyleSheet } from "react-native";
import colors from '../../../component/colors';
import fontSize from "../../../component/fontSize";
export default StyleSheet.create({
    container:
    { height:40,width:'100%',
    backgroundColor:colors.bc,
    alignItems:'center',
    justifyContent:'space-between',
     paddingHorizontal:15,
    flexDirection:'row',
    paddingVertical:0,
    alignItems:'center'
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
    name:
    {
        color:colors.white,
        fontSize:fontSize.nineteen,
        fontFamily:'Montserrat-Regular'
    },
   
    main:
    {
       // flexDirection:'row',
       // alignItems:'center',
 justifyContent:'flex-start',
    width:'98%',
    marginHorizontal:5,
    paddingVertical:-15,
    marginTop:-10,
    borderBottomWidth:1,
    borderBottomColor:colors.bc
},
    item:
    {
        width:'100%',
        justifyContent:'center',
        alignContent:'center',
        backgroundColor:'#FFFFFF',
        borderRadius:10,
        marginBottom:20,
        // paddingVertical:25,
    },
    view:
    {
        width:'100%',
        paddingHorizontal:15,
        marginTop:5
    },
    touch2:{
        marginTop:5,height:20,
        width:60,borderWidth:1,
        borderRadius:10,
        borderColor:colors.bc,
        backgroundColor:colors.white
    },
    view1:
    {
        height:40,
        width:'98%',
    //justifyContent:'space-between',
    //flexDirection:'row',
    marginTop:5,
    backgroundColor:colors.white,
    borderRadius:6,
    borderWidth:0.5,marginHorizontal:3
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
       // fontSize:13,
        fontWeight:'700',
        color:colors.textColor,
    marginLeft:7,
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
        paddingHorizontal:5,
        paddingVertical:20
    },
    touch1:
    {
        alignItems:'center',
        width:'97%',
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
   img:{
       height:35,width:35,tintColor:colors.white,marginRight:10,marginTop:-10},
   tt:{color:colors.bc,fontSize:13,}    
})

