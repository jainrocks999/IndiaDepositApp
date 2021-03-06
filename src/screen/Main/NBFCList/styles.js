import { Platform, StyleSheet } from 'react-native';
import colors from '../../../component/colors';
import fontSize from '../../../component/fontSize';
export default StyleSheet.create({
    same:
    {
        fontSize:fontSize.ten,
        fontFamily:'Montserrat-Regular',
        color:colors.textColor,
        textAlign:'center'
       
       
    },
    same1:
    {
        fontSize:fontSize.ten,
        fontFamily:'Montserrat-SemiBold',
        color:colors.textColor,
        textAlign:'center'
       
       
    },
    title:
    {
        fontSize:fontSize.fourteen,
        fontFamily:'Montserrat-SemiBold',
        color:colors.bc
    },
    cardView:
    {
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    card:
    {
        shadowColor:colors.black,
        shadowOpacity:0.25,
        shadowRadius:4,
        shadowOffset:{height:2,width:0},
        elevation:5,
        borderRadius:6,
        // backgroundColor:colors.white,
        width:'100%'
    },
    cont:
    {
        paddingHorizontal:10,
        paddingVertical:5,
        
    },
    row:
    {
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:7,
        paddingHorizontal:5,
        width:'90%'
    },
      row1:
    {
        flexDirection:'row',
        justifyContent:'space-between',
        // paddingHorizontal:5,
        width:'100%',
      
    },
    row2:
    {
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:7,
        paddingHorizontal:5,
        // marginHorizontal:-8,
        
        marginLeft:2
    },

    list:
    {
        alignItems:'center',
        justifyContent:'center',
         flex:1
    },
    width:{
        //width:'20%',
       // alignSelf:'center',
        justifyContent:'center',
       // alignItems:'center'
       // flex:1
    },
    image:{width:25,height:25},
    main:{
        paddingHorizontal:30,
        shadowColor:colors.black,
        shadowOpacity:0.25,
        shadowRadius:4,
        shadowOffset:{height:2,width:0},
        elevation:2,
        borderRadius:10,
        backgroundColor:colors.white,
        paddingHorizontal:15,
        paddingVertical:10,
        marginBottom:40
    },
    view5:
    {
        marginTop:10
    },
    text5:
    {
        color:colors.textColor,
        fontFamily:'Montserrat-Regular',
        
    },
    view52:
    {
        flexDirection:'row',
        justifyContent:'space-between'
    },
    view53:
    {
        width:'29%'
    },
    input5:
    {
        marginTop:-8,
        // borderWidth:1,
        height:40,
        borderRadius:6,
        paddingHorizontal:10,
        borderColor:colors.black,
        justifyContent:'center',
        marginTop:2
    },
    image4:
    {
        marginTop:Platform.OS=='android'? 16:6,
        marginRight:-2,
        height:7,
        width:20,
    },
    view4:
    {
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    view6:
    {
        marginTop:20,
        alignItems:'center'
    },
    view7:
    {
        marginTop:5
    },
    view8:
    {
        marginTop:15,
        marginBottom:20
    },
    mains:{
        width:'100%',
        backgroundColor:colors.bc,
        height:50,
        alignItems:'center',
        justifyContent:'space-between',
        paddingHorizontal:16,
        flexDirection:'row'
    },
    drawers:{
        width:30,
        height:30,
        tintColor:'white'
    },
    texts:{
        color:colors.white,
        fontSize:fontSize.eighteen,
        fontFamily:'Montserrat-SemiBold',
        marginRight:10
    },
    views:{
        marginLeft:15,
    },
    squareView:{
        height:30,
        borderWidth:1,
        borderColor:'#ffffff',
        borderRadius:6,
        justifyContent:'center',
        alignItems:'center',
        paddingHorizontal:10,
        backgroundColor:colors.white
    }
})
