import { StyleSheet ,Platform} from 'react-native';
import colors from '../../../../component/colors';
import fontSize from '../../../../component/fontSize';
export default StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor:colors.card,
    },
    card:{
        shadowColor:colors.black,
        shadowOpacity:0.25,
        shadowRadius:8,
        shadowOffset:{height:2,width:0},
        elevation:2,
        borderRadius:10,
        backgroundColor:colors.white,
        paddingHorizontal:15,
        paddingVertical:10
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
        justifyContent:'center',
        alignItems:'center',
        marginVertical:2,
        marginTop:13,

    },
    text:
    {
        marginTop:10,
        fontSize:fontSize.fourteen,
        color:colors.bc,
        fontFamily:'Montserrat-Medium',
        fontWeight:'600',
        width:'70%',
        textAlign:'center'
    },
    container1:
    {
        flexDirection:'row',
        justifyContent:'space-between',
        paddingVertical:13,
        paddingHorizontal:12
    },
    view2:
    {
        alignItems:'center',
        width:'45%'
    },
    item:
    {
        fontSize:13,
        fontFamily:'Montserrat-Regular',
        color:colors.heading
    },
    item1:
    {
        fontSize:11,
        fontFamily:'Montserrat-SemiBold',
        color:colors.textColor
    },
    view4:{
        backgroundColor:colors.white,
        marginTop:0
    },
    line:
    {
        borderWidth:1,
        borderColor:'#C7BEBE'
    },
    status:{fontFamily:'Montserrat-SemiBold',fontSize:12,color:colors.textColor}

})

