import {StyleSheet} from 'react-native';
import colors from '../../../component/colors';
import fontSize from '../../../component/fontSize';
export default StyleSheet.create({
    container:
    {
        flex:1,
        backgroundColor:colors.bc
    },
    image:
    {
        width:'86%',
        height:80,marginBottom:30
    },
    main:
    {
        justifyContent:'center',
        alignItems:'center',
        width:'100%',
        height:'100%'
    },
    modal: 
    {
        width: 320,
        height:172,
        borderRadius: 10,
        flexDirection: 'column',
        alignSelf: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      },
      ModelBtntext:
      {
        color:colors.white,
        fontSize:fontSize.fefteen,
        alignSelf: 'center',
        fontFamily: 'Poppins-Bold',
        fontWeight: 'bold',
        textAlign: 'center',
      },
      ModelMsgText: 
      {
        width: '99%',
        color: colors.textColor,
        fontSize: fontSize.fourteen,
        textAlign: 'center',
        margin:10
      },
      ModelmsgView: 
      {
        width: '99%',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
      },
      popup:
      {
        height: 40,
        marginTop: 10,
        backgroundColor:colors.bc,
        justifyContent: 'center',
        borderRadius: 4,
        alignItems: 'center',
        alignSelf: 'center',
        paddingHorizontal:10
      },
      view1:
      {
        width: '100%',
        borderWidth:1,
        backgroundColor:colors.bc,
        paddingVertical:5
      },
      view2:
      {
        bottom:30,
        position:'absolute',
        width:'100%',
        marginTop:50
      },
      view3:
      {
        alignItems:'center'
      },
      view4:
      {
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingHorizontal:80
      },
      view5:
      {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
      },
      img:
      {
        width:65,
        height:65
      },
      img1:
      {
        width:116,
        height:50
      },
      text1:
      {
        color: colors.white,
        fontSize:fontSize.twenty,
        fontWeight: 'bold',
        textAlign: 'center',
      },
    text2:
    {
      color:colors.white,
      fontFamily:'Montserrat-SemiBold',
      fontSize:fontSize.twenty,
      marginBottom:20
    },
});