import { StyleSheet ,Platform} from 'react-native';
import  colors  from '../../../component/colors';
import fontSize from '../../../component/fontSize';
export default StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor:colors.card,
        //paddingTop:Platform.OS=='android'?0:40
    },
    card:{
        shadowColor:colors.black,
        shadowOpacity:0.25,
        shadowRadius:8,
        shadowOffset:{height:2,width:0},
        elevation:5,
        // borderTopLeftRadius:10,
        // borderTopRightRadius:10,
        backgroundColor:colors.white,
        marginHorizontal:15,
        // paddingVertical:20,
        marginTop:20,
        height:'76%',
        borderBottomLeftRadius:10,
        borderBottomRightRadius:10
    }, 
    title:{
      fontSize:fontSize.eleven,
      fontFamily:'Montserrat-SemiBold' ,
    },
    container1:{
        flex: 1,
        backgroundColor:colors.white,
        padding:15,
        borderBottomRightRadius:10,
        borderBottomLeftRadius:10
    },
    card1:{
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
    better:{
        color:colors.textColor,
        marginTop:15,
        fontSize:fontSize.fefteen,
        fontFamily:'Montserrat-Regular'
    },
    better1:{
        fontFamily:'Montserrat-SemiBold',
        color:colors.black,
        fontSize:fontSize.seventeen
    },
    drop:{
        marginTop:7 ,
        borderWidth:1,
        height:40,
        borderColor:colors.textColor,
        borderRadius:6,
        paddingHorizontal:5,
        justifyContent:'center'

    },
    drop1:{
         marginTop:13 ,
        // borderWidth:1,
        // height: Platform.OS == 'android' ? '' : 50,
        // borderColor:colors.textColor,
        // borderRadius:6,
        // paddingHorizontal:5, 
        // justifyContent:'flex-start'
        borderWidth:1,
        borderRadius:6,
        borderColor:colors.textColor,
        paddingHorizontal:10,
        alignItems:'flex-start',
        justifyContent:'center',
        flex:1,
        paddingVertical:10
    },
    error:{
        width:'90%',
        justifyContent:'center',
        alignItems:'flex-start',
        paddingHorizontal:8,
        marginTop:6
    },
    warn:{
        fontSize:fontSize.twelve,
        color:'red'
    },
    
})