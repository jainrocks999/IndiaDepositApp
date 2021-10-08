import { StyleSheet } from "react-native";
import colors from '../../../component/colors';
import fontSize from "../../../component/fontSize";
export default StyleSheet.create({
    container:
    {
        flexDirection:'row',
        justifyContent:'space-between',
        //marginTop:38
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
        fontFamily:'Montserrat-Normal'
    },
    last:
    {
        color:colors.white,
        fontSize:fontSize.thirteen,
        fontFamily:'Montserrat-Normal'
    },
    pfile:
    {
        width:76,
        height:76,
        borderRadius:37,
        backgroundColor:colors.white,
        justifyContent:'center',
        alignItems:'center'
    },
    main:
    {
       // height:250,
        width:'100%',
        backgroundColor:'#C4C4C4',
        justifyContent:'center',
        alignItems:'center'
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
    view1:
    {
        borderBottomWidth:1,
        paddingVertical:8,
        paddingHorizontal:15,
        borderColor:'#DDDDDD',
        flexDirection:'row',
        justifyContent:'space-between'
    },
    text2:
    {
        fontSize:fontSize.sixteen,
        fontFamily:'Montserrat-SemiBold'
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
        fontSize:fontSize.eleven,
        fontFamily:'Montserrat-Normal',
        fontWeight:'500'
    },
    buttomview1:
    {
        width:'100%',
        paddingHorizontal:15,
        marginTop:-10
    },
    width:
    {
        width:'30%'
    },
    touch1:
    {
        alignItems:'center',
        width:'98%',
        paddingVertical:15,
        borderRadius:10,
    
    },
    touch2:
    {
        alignItems:'center',
        width:'90%',
        paddingVertical:15,
        borderRadius:10
    },
    button:{
        backgroundColor:colors.bc,
        paddingHorizontal:15,
        alignItems:'center',
        justifyContent:'center',
        paddingVertical:5,
        borderRadius:10
    },
    search:{
        color:colors.white,
        fontSize:fontSize.twelve,
        fontFamily:'Montserrat-Normal'
    },
    enable:{
        position: 'absolute',
        top: 0,
        left: 0,
        width:'100%',
        height:90,
        backgroundColor:colors.bc,
        borderRadius:10 ,
        alignItems:'center',justifyContent:'center'
   },
   modal: {
    width: 350,
    height:200,
    borderRadius: 10,
    flexDirection: 'column',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor:colors.white,
    //paddingHorizontal:15,
    paddingVertical:12,
    
},
  modal1:{
      alignItems:'center',
      justifyContent:'center',
      height:44,
      width:75,
      borderRadius:10,
      marginTop:15,
      backgroundColor:colors.bc,
    
    },
    modaltext:{
        color: colors.textColor,
        fontSize: fontSize.thirteen,
        fontWeight: '500',
        textAlign: 'center',
    },
  ModelMsgText: {
    width: '99%',
    color: colors.white,
    fontSize: fontSize.nineteen,
    textAlign: 'center',
    fontWeight:'700'
   // margin:10
  },
  ModelmsgView: {
    width: '99%',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
   // marginTop:10
  },
  circleM:{
      height:8,
    width:8,
    borderRadius:4,
    backgroundColor:colors.textColor,
    alignItems:'center',
    justifyContent:'center',
   marginTop:17,
   marginRight:8
},
modaltext1:{
    color: colors.textColor,
    fontSize: fontSize.twelve,
    fontWeight: '500',
    marginTop:12,
    marginRight:100
    //textAlign: 'center',
},
})

