import { StyleSheet } from 'react-native';
import colors from '../../../component/colors';
import fontSize from '../../fontSize';
export default StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor:colors.white
    },
    card:{
        shadowColor:'black',
        shadowOpacity:0.25,
        shadowRadius:8,
        shadowOffset:{height:2,width:0},
        elevation:5,
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        backgroundColor:'white',
        marginHorizontal:15,
        paddingHorizontal:18,
        paddingVertical:20,
        marginTop:20,
        height:'100%'
    }, 
    better:{
        color:colors.textColor,
        marginTop:13,
        fontSize:fontSize.twelve,
        fontFamily:'Montserrat-Normal'
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
    }
})