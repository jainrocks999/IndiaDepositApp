import { StyleSheet ,Platform} from 'react-native';
import colors from '../../../component/colors';
import fontSize from '../../../component/fontSize';
export default StyleSheet.create({
    container:
    {
        width:'100%',
        height:45,
        backgroundColor:'#DDDDDD',
        justifyContent:'center',
        alignItems:'center',
        
    },
    title:
    {
        fontFamily:'Montserrat-Medium',
        fontSize:fontSize.fourteen,
        color:colors.bc
    },
    row:
    {
        width:'100%',
        height:45,
        flexDirection:'row',
        alignItems:'center',
        paddingHorizontal:60,
        justifyContent:'space-between'
    },
    value:
    {
        fontFamily:'Montserrat-Regular',
        fontSize:fontSize.twelve,
        color:colors.textColor
    },
    card:
    {
        shadowColor:colors.black,
        shadowOpacity:0.25,
        shadowRadius:4,shadowOffset:{height:2,width:0},
        elevation:5,
        borderRadius:6,
        backgroundColor:colors.white,
        height:150,
        alignItems:'center',
        width:'48%',
        paddingVertical:10
    },
    xview:
    {
        alignItems:'flex-end',
        width:'100%',
        marginTop:-22,
        marginRight:-10
    },
    row1:
    {
        width:28,
        height:28,
        borderRadius:14,
        backgroundColor:colors.bc,
        justifyContent:'center',
        alignItems:'center'
    },
    title1:
    {
        marginTop:17,
        fontFamily:'Montserrat-SemiBold',
        color:colors.textColor
    },
    button:
    {
        width:120,
        height:35,
        backgroundColor:colors.bc,
        borderRadius:30,
        justifyContent:'center',
        alignItems:'center'
    },
    invest:
    {
        color:colors.white,
        fontSize:fontSize.eleven,
        fontFamily:'Montserrat-SemiBold'
    },
    View:
    {
        paddingHorizontal:10,
        paddingVertical:20,
        flexDirection:'row',justifyContent:'space-between',
        backgroundColor:'#DDDDDD',
    },
    xtext:
    {
        color:colors.white,
        marginTop:-5,
        fontSize:fontSize.twenty
    },
    view2:
    {
        // alignItems:'center',
        // justifyContent:'center',
        // flex:1
    },
    df:
    {
        paddingHorizontal:20,
        paddingVertical:20
    },
})
