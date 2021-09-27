// import { StyleSheet } from 'react-native';
// import colors from '../../../component/colors';
// import fontSize from '../../../component/fontSize';
// export default StyleSheet.create({
//     same:
//     {
//         fontSize:fontSize.eleven,
//         fontFamily:'Montserrat-Normal',
//         color:colors.bc,
//         textAlign:'center'
//     },
//     same1:
//     {
//         fontSize:fontSize.eleven,
//         fontFamily:'Montserrat-Normal',
//         color:colors.textColor,
//         textAlign:'center'
//     },
//     title:
//     {
//         fontSize:fontSize.fourteen,
//         fontFamily:'Montserrat-Medium',
//         color:colors.bc
//     },
//     cardView:
//     {
//         flexDirection:'row',
//         justifyContent:'space-between',
//         alignItems:'center'
//     },
//     card:
//     {
//         shadowColor:colors.black,
//         shadowOpacity:0.25,
//         shadowRadius:4,
//         shadowOffset:{height:2,width:0},
//         elevation:5,
//         borderRadius:6,
//         backgroundColor:colors.white,
//        // height:85,
//         padding:13,
//     },
//     cont:
//     {
//         paddingHorizontal:10,
//         paddingVertical:8
//     },
//     row1:
//     {
//         flexDirection:'row',
//         justifyContent:'space-between',
//         marginTop:7,
//         paddingHorizontal:0,
//         width:'100%'
//     },
//     row:
//     {
//         flexDirection:'row',
//         justifyContent:'space-between',
//         marginTop:7,
//         paddingHorizontal:10,
//         width:'100%'
//     },
//     list:
//     {
//         alignItems:'center',
//         justifyContent:'center',
//         flex:1
//     }
// })
import { StyleSheet } from 'react-native';
import colors from '../../../component/colors';
import fontSize from '../../../component/fontSize';
export default StyleSheet.create({
    same:
    {
        fontSize:fontSize.ten,
        fontFamily:'Montserrat-Normal',
        color:colors.textColor,
        textAlign:'center'
    },
    title:
    {
        fontSize:fontSize.fourteen,
        fontFamily:'Montserrat-Medium',
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
        paddingVertical:5
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
        // marginTop:7,
        paddingHorizontal:5,
        marginHorizontal:-8,
        width:'100%',
        marginLeft:2,
      
    },
    row2:
    {
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:7,
        paddingHorizontal:5,
        marginHorizontal:-8,
        width:'95%',
        marginLeft:2
    },

    list:
    {
        alignItems:'center',
        justifyContent:'center',
        flex:1
    },
    width:{
        width:'20%',

        justifyContent:'center',
      
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
        fontFamily:'Montserrat-Normal',
        
    },
    view52:
    {
        flexDirection:'row',
        justifyContent:'space-between'
    },
    view53:
    {
        width:'27%'
    },
    input5:
    {
        marginTop:-8,
        borderBottomWidth:1.5,
        borderColor:'#3D4785',
        height:40,
        justifyContent:'center'
    },
    image4:
    {
        marginTop:16,
        marginRight:0,
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
        marginTop:30,
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
