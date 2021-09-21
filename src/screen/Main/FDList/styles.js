import { StyleSheet } from 'react-native';
import colors from '../../../component/colors';
import fontSize from '../../../component/fontSize';
export default StyleSheet.create({
    same:
    {
        fontSize:fontSize.ten,
        fontFamily:'Montserrat-Normal',
        color:colors.textColor,
       
       
       
    },
    title:
    {
        fontSize:fontSize.fourteen,
        fontFamily:'Montserrat-Medium',
        color:colors.bc
    },
    cardView:
    {
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    card:
    {
        shadowColor:colors.black,
        shadowOpacity:0.25,
        shadowRadius:4,
        shadowOffset:{height:2,width:0},
        elevation:5,
        borderRadius:6,
        backgroundColor:colors.white,
        padding:13,
        width:'100%'
    },
    cont:
    {
        paddingHorizontal:10,
        paddingVertical:8
    },
    row:
    {
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:7,
        paddingHorizontal:5,
        width:'90%'
    },
      row1:
    {
        flexDirection:'row',
        justifyContent:'space-between',
        // marginTop:7,
        paddingHorizontal:5,
        marginHorizontal:-8,
        width:'100%',
        marginLeft:2,
      
    },
    row2:
    {
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:7,
        paddingHorizontal:5,
        marginHorizontal:-8,
        width:'95%',
        marginLeft:2
    },

    list:
    {
        alignItems:'center',
        justifyContent:'center',
        flex:1
    },
    width:{
        width:'20%',
        alignSelf:'center',
        justifyContent:'center',
        alignItems:'center'
       // flex:1
    },
    image:{width:25,height:25}
})
