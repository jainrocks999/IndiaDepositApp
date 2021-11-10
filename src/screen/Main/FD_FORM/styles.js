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
        marginBottom:40,
        paddingHorizontal:15,
        paddingVertical:20,
        height:'100%'
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
        borderColor:colors.textColor
     }
    
})