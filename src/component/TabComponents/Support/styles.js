import { StyleSheet } from 'react-native';
import colors from '../../../component/colors';
import fontSize from '../../fontSize';
export default StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor:'#FFF',
        padding:15
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
        marginTop:1,
        fontSize:fontSize.fourteen,
        fontFamily:'Montserrat-Normal'
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
        borderWidth:1,
        height:70,
        borderColor:colors.textColor,
        borderRadius:6,
        paddingHorizontal:5, 
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
