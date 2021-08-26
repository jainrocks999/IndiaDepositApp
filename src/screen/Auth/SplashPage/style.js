import {StyleSheet} from 'react-native';
import colors from '../../../component/colors';
import fontSize from '../../../component/fontSize';
export default StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colors.bc
    },
    image:{
        width:'92%',
        height:85
    },
    main:{
        justifyContent:'center',
        alignItems:'center',
        width:'100%',
        height:'100%'
    },
    modal: {
        width: 320,
        height:172,
        borderRadius: 10,
        flexDirection: 'column',
        alignSelf: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      },
      ModelBtntext: {
        color:colors.white,
        fontSize:fontSize.fefteen,
        alignSelf: 'center',
        fontFamily: 'Poppins-Bold',
        fontWeight: 'bold',
        textAlign: 'center',
      },
      ModelMsgText: {
        width: '99%',
        color: colors.textColor,
        fontSize: fontSize.fourteen,
        textAlign: 'center',
        margin:10
      },
      ModelmsgView: {
        width: '99%',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
      },
      popup: {
        height: 40,
        marginTop: 10,
        backgroundColor:colors.bc,
        justifyContent: 'center',
        borderRadius: 4,
        alignItems: 'center',
        alignSelf: 'center',
        paddingHorizontal:10
      },
});