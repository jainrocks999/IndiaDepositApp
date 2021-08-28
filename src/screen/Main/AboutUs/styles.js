import { StyleSheet } from 'react-native';
import colors from '../../../component/colors';
import fontSize from '../../../component/fontSize';
export default StyleSheet.create({
    container:
    {
    flex: 1,
    backgroundColor:'#E5E5E5'
    },
    card:
    {
        shadowColor:'black',
        shadowOpacity:0.25,
        shadowRadius:8,
        shadowOffset:{height:2,width:0},
        elevation:5,
        borderRadius:10,
        //borderTopLeftRadius:10,
        //borderTopRightRadius:10,
        backgroundColor:'white',
       // marginHorizontal:15,
       // paddingHorizontal:18,
       // paddingVertical:20,
       // marginTop:20,
        //height:'100%',
        marginBottom:40
    },
    
    heading:
    {
        fontSize:fontSize.eighteen,
        color:colors.textColor,
        fontFamily:'Montserrat-Normal'
    },
    normal:
    {
        fontSize:fontSize.fourteen,
        fontFamily:'Montserrat-Normal',
        color:colors.textColor,
       // marginTop:10,
        paddingHorizontal:15,
        paddingVertical:20
    },
    
})