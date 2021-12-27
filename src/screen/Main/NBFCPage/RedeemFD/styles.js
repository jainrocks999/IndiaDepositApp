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
        paddingVertical:10,
        flexDirection:'row',alignItems:'center',
        justifyContent:'space-between'
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
        marginTop:13
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
        fontSize:14,
        fontFamily:'Montserrat-Regular',
        color:colors.heading
    },
    item1:
    {
        fontSize:15,
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
    cont:
    {
        paddingHorizontal:10,
        paddingVertical:5
    },
    cardView:
    {
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    row:
    {
        flexDirection:'row',
        justifyContent:'space-between',
        width:'100%'
    },
    same:
    {
        fontSize:fontSize.eleven,
        fontFamily:'Montserrat-Regular',
        color:colors.textColor
    },
    Touch:{
        backgroundColor:colors.bc,
        paddingHorizontal:15,
        paddingVertical:6,
        borderRadius:10
    },
    cross:{
        borderRadius:30,
        height:30,width:30,
        justifyContent:'center',
        alignItems:'center'

    },
    x:{
        color:colors.bc,
        fontFamily:'Montserrat-Regular',
        fontSize:20,
        marginBottom:5,
    },
    drop:{
        marginTop:8 ,
        // borderWidth:1,
        // height:40,
        // borderColor:colors.textColor,
        // borderRadius:6,
        // paddingHorizontal:5,
        // justifyContent:'center',
        // width:'100%',
        // paddingHorizontal:10,
        borderWidth:1,
        height:40,
        borderRadius:6,
        paddingHorizontal:10,
        borderColor:colors.black,
        justifyContent:'center',
        marginTop:2
    },
    better:{
        color:colors.textColor,
        marginTop:10,
        fontSize:fontSize.twelve,
        fontFamily:'Montserrat-SemiBold'
    },
    input:{
        color:colors.textColor,
        height:40

    },
})