import { StyleSheet } from 'react-native';
import colors from '../../../component/colors';
import fontSize from '../../fontSize';
export default StyleSheet.create({
    container:{
    flex: 1,
    paddingHorizontal:16
    // backgroundColor:'#E5E5E5'
    },
    main:{
        marginBottom:100
    },
    card:{
        shadowColor:colors.black,
        shadowOpacity:0.25,
        shadowRadius:8,
        shadowOffset:{height:2,width:0},
        elevation:5,
        borderRadius:10,
        backgroundColor:colors.white,
        paddingHorizontal:18,
        paddingVertical:15,
        marginVertical:4,
        alignItems:'flex-start',
       
    },
    titleView:{
        shadowColor:colors.black,
        shadowOpacity:0.25,
        shadowRadius:8,
        shadowOffset:{height:2,width:0},
        elevation:5,
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        backgroundColor:colors.bc,
        paddingHorizontal:18,
        paddingVertical:10,
        // width:130,
        alignItems:'center',
        justifyContent:'center'
       
    },
    Text1:{
        fontSize:fontSize.twelve,
        color:colors.white
    },
    Textt:{
        fontSize:fontSize.fourteen,
        color:colors.black,
        fontFamily:'Montserrat-Regular'
    },
    Textp:{fontSize:fontSize.eleven,
        color:colors.heading,
        fontFamily:'Montserrat-Regular'
    },
    Textc:{
        fontSize:fontSize.thirteen,
        color:colors.black,
        fontFamily:'Montserrat-Regular'
    },
    Textr:{
        fontSize:fontSize.twelve,
        color:colors.bc,
        fontFamily:'Montserrat-Regular'
    },
    line:{
        borderWidth:1,
        width:'100%',
        borderColor:'#DDDDDD',
        marginVertical:10
    },
    view:{
        marginTop:10
    },
    heading:{
        fontSize:fontSize.eighteen,
        color:colors.textColor,
        fontFamily:'Montserrat-Regular'
    },
    normal:{
        fontSize:fontSize.thirteen,
        fontFamily:'Montserrat-Regular',
        color:colors.textColor,
        marginTop:10
    },
    
    
   
    
})