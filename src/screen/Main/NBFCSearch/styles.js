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
    view:
    {
        marginTop:10
    },
    view1:
    {
        marginTop:10
    },
    view2:
    {
        flexDirection:'row',
        justifyContent:'space-between'
    },
    view3:
    {
        width:'29%'
    },
    view4:
    {
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    view5:
    {
        marginTop:10,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
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
    text1:
    {
        color:colors.textColor,
        fontFamily:'Montserrat-Regular',
        
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
        marginBottom:40
    },
    input:
    {
        marginTop:-8,
        height:40,
        justifyContent:'center',
      
    },
    input1:
    {
        marginTop:-8,
        borderBottomWidth:1.5,
        borderColor:'#3D4785',
        height:40,
        justifyContent:'center',
        width:'27%'
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
        marginTop:Platform.OS=='android'?16:4,
        marginRight:-5,
        height:7,
        width:20,
    },
})