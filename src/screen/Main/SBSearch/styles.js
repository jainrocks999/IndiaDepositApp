
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
    scroll:
    {
        flex:1,
        paddingHorizontal:15,
        paddingVertical:15
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
        marginBottom:50
    },
    view:
    {
        marginTop:20
    },
    view1:
    {
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    view2:
    {
        marginTop:15,
        marginBottom:20
    },
    text1:
    {
        fontSize:fontSize.thirteen,
        fontFamily:'Montserrat-Regular',
        color:colors.textColor
    },
    text2:
    {
        color:colors.textColor,
        fontFamily:'Montserrat-Regular'
    },
    text3:
    {
        color:colors.textColor,
        fontFamily:'Montserrat-Regular',
        marginLeft:10
    },
    textinput:
    {
        // borderBottomWidth:1.5,
        borderColor:'#3D4785',
        height:40,
        marginTop:-10,
        width:'100%'
    },
    textinput1:
    {
        borderBottomWidth:1,
        borderColor:'#3D4785',
        paddingBottom:5
    },
    input:
    {
        marginTop:-8,
        borderBottomWidth:1.5,
        borderColor:'#3D4785',
        borderRadius:6,
        height:40,
        justifyContent:'center'
    },
    interest:
    {
        marginTop:15,
        borderWidth:1,
        borderColor:colors.textColor,
        borderRadius:6,
        height:40,
        paddingHorizontal:10,
        justifyContent:'space-between',
        flexDirection:'row',
        alignItems:'center'
    },
    container1:
    {
        width:'100%',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginTop:15
    },
    same:
    {
        width:'47%',
        borderWidth:1,
        height:40,
        borderRadius:6,
        borderColor:colors.textColor,
        paddingHorizontal:8
    },
    input1:
    {
        height:40,
        width:'90%',
        fontSize:fontSize.thirteen,
        color:colors.textColor
    },
    ten:
    {
        height:40,
        width:'99%',
        fontSize:fontSize.thirteen,
        color:colors.textColor
    },
    row:
    {
        flexDirection:'row',
        alignItems:'center',
        marginLeft:-5,
        marginTop:10
    },
    image:
    {
        marginTop:16,
        marginRight:8
    },
    warn:
    {
        fontSize:fontSize.twelve,
        color:'red'
    },
    error:
    {
        width:'90%',
        justifyContent:'center',
        alignItems:'flex-start',
        paddingHorizontal:10,
        marginTop:6
    },
    
})