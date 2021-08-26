import { StyleSheet } from 'react-native';
import colors from '../../../component/colors';
import fontSize from '../../../component/fontSize';
export default StyleSheet.create({
    same:{
        fontSize:fontSize.eleven,
        fontFamily:'Montserrat-Normal',
        color:colors.bc,
        textAlign:'center'
    },
    title:{
        fontSize:fontSize.fourteen,
        fontFamily:'Montserrat-Medium',
        color:colors.bc
    },
    cardView:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    card:{
        shadowColor:'black',
        shadowOpacity:0.25,
        shadowRadius:4,
        shadowOffset:{height:2,width:0},
        elevation:5,
        borderRadius:6,
        backgroundColor:'white',
       // height:85,
        padding:13,
    },
    cont:{
        paddingHorizontal:10,
        paddingVertical:8
    },
    row1:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:7,
        paddingHorizontal:0,
        width:'100%'
    },
    row:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:7,
        paddingHorizontal:10,
        width:'100%'
    },
    list:{
        alignItems:'center',
        justifyContent:'center',
        flex:1
    }
})
