import { StyleSheet ,Platform} from 'react-native';
import colors from '../../../../component/colors';
import fontSize from '../../../../component/fontSize';
export default StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor:colors.card,
    },
    
    list:
    {
        shadowColor:colors.black,
        shadowOpacity:0.25,
        shadowRadius:4,
        shadowOffset:{height:2,width:0},
        elevation:2,
        borderRadius:10,
        backgroundColor:colors.white,
        paddingVertical:15,
        marginHorizontal:15,
        marginVertical:2,
        marginTop:13,
    },
    font:{
        fontFamily:'Montserrat-Normal',
        fontSize:14,
        color:colors.textColor
    },
    font16:{
        fontFamily:'Montserrat-Bold',
        fontSize:14,
        color:colors.textColor
    }
   
})