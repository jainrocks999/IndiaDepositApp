import { StyleSheet } from 'react-native';
import colors from '../../colors';
import fontSize from '../../fontSize';
export default StyleSheet.create({
    same:
    {
        fontSize:fontSize.eleven,
        fontFamily:'Montserrat-Regular',
        color:colors.textColor
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
      //  height:85,
        paddingHorizontal:13,
        paddingVertical:10
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
        width:'90%'
    },
    row1:
    {
        flexDirection:'row',
        justifyContent:'space-between',
        width:'100%',
    },
    list:
    {
        alignItems:'center',
        justifyContent:'center',
        // flex:1
    },
    button:{
        backgroundColor:colors.bc,
        paddingVertical:3,
        paddingHorizontal:4,
        borderRadius:6,
        alignItems:'center',
        justifyContent:'center',
        width:60
    },
    text:{
        color:colors.white,
        fontFamily:'Montserrat-Regular',
        fontSize:12
    },
    modal: {
        width: 320,
        height:172,
        borderRadius: 10,
        flexDirection: 'column',
        alignSelf: 'center',
        alignItems: 'center',
        backgroundColor:colors.white,
      },
      modal1:{
          width: '100%',
          borderWidth:1,
          backgroundColor:colors.bc,
          paddingVertical:5
        },
        modal2:{
            flexDirection: 'row',
            justifyContent: 'space-around',
            width: '100%',
            bottom:20,
            position:'absolute'
            },
        modaltext:{
            color: colors.white,
            fontSize: fontSize.twenty,
            fontWeight: 'bold',
            textAlign: 'center',
        },
      ModelBtntext: {
        color:colors.white,
        fontSize: fontSize.fefteen,
        alignSelf: 'center',
        fontFamily: 'Poppins-Bold',
        fontWeight: 'bold',
        textAlign: 'center',
      },
      ModelMsgText: {
        width: '99%',
        color: colors.textColor,
        fontSize: fontSize.sixteen,
        textAlign: 'center',
        margin:10
      },
      ModelmsgView: {
        width: '99%',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop:10
      },
      modal: {
        width: 320,
        height:172,
        borderRadius: 10,
        flexDirection: 'column',
        alignSelf: 'center',
        alignItems: 'center',
        backgroundColor:colors.white,
      },
      modal1:{
          width: '100%',
          borderWidth:1,
          backgroundColor:colors.bc,
          paddingVertical:5
        },
        modal2:{
            flexDirection: 'row',
            justifyContent: 'space-around',
            width: '100%',
            bottom:20,
            position:'absolute'
            },
        modaltext:{
            color: colors.white,
            fontSize: fontSize.twenty,
            fontWeight: 'bold',
            textAlign: 'center',
        },
      ModelBtntext: {
        color:colors.white,
        fontSize: fontSize.fefteen,
        alignSelf: 'center',
        fontFamily: 'Poppins-Bold',
        fontWeight: 'bold',
        textAlign: 'center',
      },
      ModelMsgText: {
        width: '99%',
        color: colors.textColor,
        fontSize: fontSize.sixteen,
        textAlign: 'center',
        margin:10
      },
      ModelmsgView: {
        width: '99%',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop:10
      },
      popup: {
        height: 40,
        width:100,
        marginTop: 10,
        backgroundColor:colors.bc,
        justifyContent: 'center',
        borderRadius: 4,
        alignItems: 'center',
        alignSelf: 'center',
        paddingHorizontal:10
      },
})
