import { StyleSheet ,Platform} from 'react-native';
import colors from '../../../component/colors';
import fontSize from '../../../component/fontSize';
export default StyleSheet.create({
    container:
    {
         flex: 1,
         backgroundColor:colors.card,
         //paddingTop:Platform.OS=='android'?0:40
    },
    main:
    {
        paddingHorizontal:30,
        marginTop:50,
        marginBottom:20
    }, 
    
    card:
    {
        shadowColor:colors.black,
        shadowOpacity:0.25,
        shadowRadius:8,
        shadowOffset:{height:2,width:0},
        elevation:5,
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        backgroundColor:colors.white,
        marginHorizontal:15,
        paddingVertical:18,
        //paddingHorizontal:20,
        marginTop:-32,
        height:'100%'
    },
    pfile:
    {
        width:'100%',
        height:254,
        backgroundColor:'#B2B2F9',
        alignItems:'center',
        justifyContent:'center',
       
    },
    touch:{
        width:'50%',
        backgroundColor:colors.bc
        ,height:40,
        borderRadius:30,
        flexDirection:'row',
        justifyContent:'space-between',
        paddingHorizontal:30,
        paddingVertical:4,
        alignItems:'center',
        marginTop:10
        },
    view1:
    {
        flexDirection:'row',
        justifyContent:'space-between',
        paddingHorizontal:10,
        alignItems:'center'
    },
    view2:
    {
        paddingHorizontal:10,
        width:'100%'
    },
    view3:
    {
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        width:'100%',paddingHorizontal:10
    },
    view4:
    {
        width:'100%',
        alignItems:'center',
        justifyContent:'center',
        marginTop:30
    },
    view5:
    {
        width:'50%',
        borderWidth:1,
        borderRadius:2,
        borderStyle:'dotted',
        justifyContent:'center',
        alignItems:'center',
        height:40,
        marginVertical:10,
        backgroundColor:'#EDEDEB'
       
    },
    text1:
    {
        width:'90%',
        fontFamily:'Montserrat-Regular',
        fontSize:fontSize.fourteen,
        color:colors.textColor
    },
    text2:
    {
        fontSize:fontSize.eleven,
        color:colors.heading
    },
    text4:
    {
        fontSize:fontSize.ten,
        color:colors.heading
    },
    line:
    {
        width:'100%',
        borderWidth:1,
        borderColor:'#DDDDDD',
        marginVertical:15
    },
    line1:
    {
        width:60,
        height:1,
        backgroundColor:colors.black,
    },
    round:
    {
        width:56,
        borderWidth:2,
        height:56,
        borderRadius:28,
        borderColor:colors.bc,
        alignItems:'center',
        justifyContent:'center'
    },
    text:
    {
        fontSize:fontSize.thirty,
        color:colors.bc
    },
    text3:{
        color:colors.white,
        fontFamily:'Montserrat-Regular',
        fontSize:fontSize.fourteen
    },
    row:
        {color:colors.textColor,textAlign:'center',fontSize:11,fontFamily:'Montserrat-Regular'}
    
})