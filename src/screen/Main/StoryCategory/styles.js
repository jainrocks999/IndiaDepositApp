import { StyleSheet ,Platform} from 'react-native';
import fontSize from '../../../component/fontSize';
import colors from '../../../component/colors';


export default StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor:colors.white,
        //paddingTop:Platform.OS=='android'?0:40
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
        // paddingVertical:20,
        marginTop:20,
        
         height:'100%'
    }, 
    main:{
        flexDirection:'row',
        paddingHorizontal:20,
        marginBottom:10,
        marginTop:20
    },
    imageContainer:{
        height:84,
        width:84,
        borderRadius:42
    },
    camera:{
        width:28,
        height:28, 
        shadowColor:colors.black,
        shadowOpacity:0.25,
        shadowRadius:8,
        shadowOffset:{height:5,width:0},
        elevation:2,
        borderRadius:14,
        marginLeft:-28,marginTop:63,
        backgroundColor:colors.white,
        alignItems:'center',
        justifyContent:'center'
    },
    change:{
        fontSize:fontSize.thirteen,
        marginHorizontal:15,
        marginTop:5,
        color:colors.bc
    },
    title:{ 
     
        fontSize:fontSize.thirteen,
        //  hp('1.9%'),
        fontFamily:'Montserrat-SemiBold' 
    },
    prop:{
        backgroundColor:colors.white,
        borderTopRightRadius:10,
        borderTopLeftRadius:10
    },
    view:{
        flex:1,
        padding:20
    },
    view1:{
        flexDirection:'row',
        alignItems:'center'
    },
    view2:{
        marginTop:15,
        flexDirection:'row',
        alignItems:'center'
    },
    view3:{
        backgroundColor:colors.bc,
        paddingHorizontal:6,
        paddingVertical:2,
        alignItems:'center',
        justifyContent:'center'
       // marginLeft:12
    },
    view4:{
        width:'100%',
        backgroundColor:'#EDEDEB',
        marginTop:20,
        alignItems:'center',
        justifyContent:'center'
    },
    view5:{
        marginTop:10
    },
    text:{
        color:colors.bc,
        fontSize:fontSize.twelve,
        fontFamily:'Montserrat-Regular'
    },
    text1:{
        color:colors.heading,
        fontSize:fontSize.twelve,
        fontFamily:'Montserrat-Regular'
    },
    text2:{
        color:colors.heading
    },
    text3:{
        color:colors.black,
        fontSize:fontSize.seventeen,
        fontFamily:'Montserrat-Regular'
    },
    text4:{
        color:colors.white,
        fontSize:11,
        fontFamily:'Montserrat-Regular'
    },
    text5:{
        fontSize:fontSize.sixteen,
       
    },
    text6:{
        color:colors.textColor,
        fontSize:fontSize.thirteen,
        fontFamily:'Montserrat-Regular'
    },
    img:{
        width: '100%',
        height:200
    },
    main5:{
        width:'100%',
        backgroundColor:colors.bc,
        alignItems:'center',
        justifyContent:'space-between',
        paddingHorizontal:16,
        flexDirection:'row',
        paddingVertical:10
    },
    drawer:{
        width:30,
        height:30,
        tintColor:'white'
    },
    textTitle:{
        color:colors.white,
        fontSize:fontSize.twenty,
        fontFamily:'Montserrat-SemiBold',
        marginLeft:15,
        width:'90%'
    },

    
})