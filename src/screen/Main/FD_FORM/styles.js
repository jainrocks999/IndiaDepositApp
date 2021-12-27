// import { StyleSheet ,Platform} from 'react-native';
// import colors from '../../../component/colors';
// import fontSize from '../../../component/fontSize';
// export default StyleSheet.create({
//     container:
//     {
//     flex: 1,
//     backgroundColor:colors.card,
//    // paddingTop:Platform.OS=='android'?0:40
//     },
//     card:
//     {
//         shadowColor:colors.black,
//         shadowOpacity:0.25,
//         shadowRadius:8,
//         shadowOffset:{height:2,width:0},
//         elevation:5,
//         borderRadius:10,
//         backgroundColor:colors.white,
//         marginBottom:40,
//         paddingHorizontal:15,
//         paddingVertical:20,
//         height:'100%'
//     },
    
//     heading:
//     {
//         fontSize:13,
//         fontWeight:'500',
//         fontFamily:'Montserrat-Regular',
//         color:colors.textColor
//     },
//     normal:
//     {
//         fontSize:fontSize.fourteen,
//         fontFamily:'Montserrat-Regular',
//         color:colors.textColor,
//        // marginTop:10,
//         paddingHorizontal:10,
//         paddingVertical:20
//     },
//     view:{
//         width:'48%',
//         borderWidth:1,
//         borderRadius:10,
//         justifyContent:'center',
//         paddingHorizontal:5,
//         borderColor:colors.textColor
//      }
    
// })
import { StyleSheet ,Platform} from 'react-native';
import colors from '../../../component/colors';
import fontSize from '../../../component/fontSize';
export default StyleSheet.create({
    container:
    {
    flex: 1,
    backgroundColor:colors.card,
   // paddingTop:Platform.OS=='android'?0:40
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
        marginBottom:20,
        paddingHorizontal:15,
        // paddingBottom:50,
        // height:'100%'
    },
    
    heading:
    {
        fontSize:13,
        fontWeight:'500',
        fontFamily:'Montserrat-Regular',
        color:colors.textColor
    },
    normal:
    {
        fontSize:fontSize.fourteen,
        fontFamily:'Montserrat-Regular',
        color:colors.textColor,
       // marginTop:10,
        paddingHorizontal:10,
        paddingVertical:20
    },
    view:{
        width:'48%',
        borderWidth:1,
        borderRadius:10,
        justifyContent:'center',
        paddingHorizontal:5,
        borderColor:colors.textColor,
        // paddingVertical:Platform.OS=='android'?0:6
     },
      border1:
    {
        borderColor: colors.textColor,
        borderStyle: 'dashed',
        borderWidth: .5,
        borderRadius:0.000001
    },
    item2:
    {
        fontSize:fontSize.thirteen,
        fontFamily:'Montserrat-Regular',
        color:colors.textColor
    },
    item3:{
        textAlign:'center',
        color:colors.bc,
        fontSize:fontSize.seventeen,
        fontFamily:'Montserrat-Bold',
        marginLeft:10
    },
    container1:
    {
        flexDirection:'row',
        alignItems:'center',
        width:'100%',
        paddingHorizontal:20,
        paddingVertical:10,
        justifyContent:'space-between',
        marginTop:0
    },
    headerText: {
        fontSize: 14,
        fontWeight: '600',
        color:colors.white,
        fontFamily:'Montserrat-Regular'
      },
      fdata:{
        color:colors.textColor,
        fontSize:fontSize.thirteen
    },
    Textview:
    {
         backgroundColor:colors.white,
         borderRadius:10,
        //  shadowColor:colors.black,
        //  shadowOpacity:0.25,
        //  shadowRadius:8,
        //  shadowOffset:{height:2,width:0},
        //  elevation:5,
         marginBottom:40,
        
        //  paddingHorizontal:15,
        //  paddingVertical:20,
    },
})