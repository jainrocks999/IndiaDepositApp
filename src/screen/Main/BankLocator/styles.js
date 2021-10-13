import { StyleSheet } from 'react-native';
import colors from '../../../component/colors';
import fontSize from '../../../component/fontSize';
export default StyleSheet.create({
    container:
    {
        flex: 1,
        backgroundColor:colors.card
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
        paddingHorizontal:18,
        paddingVertical:20,
        marginTop:20,
        height:'100%'
    }, 
    better:
    {
        color:colors.textColor,
        marginTop:13,
        fontSize:fontSize.twelve,
        fontFamily:'Montserrat-Normal'
    },
    drop:
    {
        marginTop:13 ,
        borderWidth:1,
        height:35,
        borderColor:colors.textColor,
        borderRadius:6,
        paddingHorizontal:5,
    },
})