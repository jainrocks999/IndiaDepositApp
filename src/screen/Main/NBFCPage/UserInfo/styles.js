import { StyleSheet ,Platform} from 'react-native';
import colors from '../../../../component/colors';
import fontSize from '../../../../component/fontSize';
export default StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor:colors.card,
        paddingTop:Platform.OS=='android'?0:0
    },
    card:{
        shadowColor:colors.black,
        shadowOpacity:0.25,
        shadowRadius:8,
        shadowOffset:{height:2,width:0},
        elevation:5,
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        backgroundColor:colors.white,
        marginHorizontal:15,
        paddingHorizontal:18,
        paddingVertical:20,
        marginTop:20,
        height:'100%'
    },
    view1:{
        paddingVertical:30,
        marginBottom:10
    },
    view2: {
        flexDirection:'row' ,
        justifyContent:'space-between',
        width:'100%'
    }, 
    view3:{
        width:'47%'
    },
    better:{
        color:colors.textColor,
        marginTop:13,
        fontSize:fontSize.twelve,
        fontFamily:'Montserrat-SemiBold'
    },
    drop:{
        marginTop:5 ,
        borderWidth:1,
        height:40,
        borderColor:colors.textColor,
        borderRadius:6,
        paddingHorizontal:5,
        justifyContent:'center',
        width:'100%',
        paddingHorizontal:10,
        alignContent:'center'
       
    }, 
    dropCal:{
        marginTop:5 ,
        borderWidth:1,
        height:40,
        borderColor:colors.textColor,
        borderRadius:6,
        paddingHorizontal:5,
        alignItems:'center',
        justifyContent:'space-between',
        width:'100%',
        paddingHorizontal:10,
        flexDirection:'row'
    }, 
   
    input:{
        color:colors.textColor
    },
    image:{
        marginTop:16,
        marginRight:8
    },
    scroll:
    {
        flex:1,
        paddingHorizontal:15,
        paddingVertical:30
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
    error:
    {
        width:'90%',
        justifyContent:'center',
        alignItems:'flex-start',
        paddingHorizontal:8,
        marginTop:6
    },
    warn:
    {
        fontSize:fontSize.twelve,
        color:'red'
    },
    row:{
        flexDirection:'row',
        alignItems:'center'
    },
    star:{
        height:10,
        width:10,
        marginTop:6
    }
   
})