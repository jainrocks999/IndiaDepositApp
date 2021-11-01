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
    view1:
    { 
        paddingHorizontal:15,
        paddingVertical:20},
    view2:
    {
         marginTop:13
         },
    imageContainer:
    {
        alignItems:'center',
        marginTop:20
    }, 
    textView:
    {
        justifyContent:'center',
        alignItems:'center',
        marginTop:30
    },
    text:
    {
        fontFamily:'Montserrat-SemiBold',
        color:colors.textColor,
        fontSize:fontSize.twenty
    },
    logo:
    {
        width:'80%',
        height:75,
        resizeMode:'stretch'
    },
    main:
    {
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
        marginBottom:40,
    },
    how:
    {
        color:colors.textColor,
        fontSize:fontSize.fourteen,
        fontFamily:'Montserrat-SemiBold',
         marginTop:5
    },
    star:
    {
        alignItems:'flex-start',
        marginLeft:-8,
        marginTop:3
    },
    what:
    {
        color:colors.textColor,
        marginTop:13,
        fontSize:fontSize.fourteen,
        fontFamily:'Montserrat-SemiBold'
    },
    drop:
    {
        marginTop:13 ,
        borderWidth:1,
        height:35,
        borderColor:colors.textColor,
        borderRadius:6,
        paddingHorizontal:5,
    },
    better:
    {
        color:colors.textColor,
        marginTop:13,
        fontSize:fontSize.fourteen,
        fontFamily:'Montserrat-SemiBold'
    },
    bottom:
    {
        // height:60,
        borderWidth:1,
        borderRadius:6,
        borderColor:colors.textColor,
        paddingHorizontal:10,
        alignItems:'flex-start',
        justifyContent:'flex-start',
        flex:1,
        paddingVertical:Platform.OS=='android'?0:10
    },
    input:
    {
        width:'100%',
        color:colors.textColor,
    },
    bottomView:{
        marginTop:18,
        marginBottom:20
    },
    bordrView:{ 
        marginTop:5 ,
        borderWidth:1,
        // height:40,
        borderColor:colors.textColor,
        borderRadius:6,
        paddingHorizontal:5,
        justifyContent:'center',

        width:'100%',
        paddingHorizontal:10,
        paddingVertical:Platform.OS=='android'?0:10,
    }
    
   
    
})