import { StyleSheet } from 'react-native';
import colors from '../../component/colors';
import fontSize from '../fontSize';
export default StyleSheet.create({
    drawerContent: {
       // flex: 1,
       // paddingHorizontal:6
    },
    title: {
        fontFamily:'Montserrat-SemiBold',
        fontSize:fontSize.sixteen,
        width:'95%',
        color:colors.textColor
    },
    caption: {
        fontSize: fontSize.fourteen,
        fontFamily:'Montserrat-Normal',
        color:colors.textColor
    },
   
    drawer: {
        borderBottomWidth: 1,
        borderBottomColor: '#b6b8b6',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15, 
        justifyContent: 'space-between',
        height:40,
        
    },
    drawer1: {
        borderBottomWidth: 1,
        borderBottomColor: '#b6b8b6',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        height:40,
        backgroundColor:'#EDEDEB'
    },
    iconView: {
        // width: 30,
        // height: 24,
       // backgroundColor: 'grey'
    },
    text: {
        marginLeft: 15,
        fontFamily:'Montserrat-Normal',
        fontSize:fontSize.sixteen,
        color:colors.textColor
    },
    icon: {
        width: 20,
        height: 20
    },
    profile: {
        marginLeft: 20,
        justifyContent: 'center',
    },
    bottom:{ 
        alignItems: 'center', 
        paddingVertical: 25, 
        backgroundColor: '#53b175' 
    },
    stop:{ 
        alignItems: 'center', 
        paddingVertical: 20
    },
    text1:{ 
        color: 'white', 
        fontSize: fontSize.sixteen ,
        fontFamily:'Krdev016'
    },
    image:{ 
        height: 30, 
        width: 30 
    },
    row:{ 
        flexDirection: 'row',
        alignItems:'center',
        justifyContent:'space-between',
        flex:1 
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
        color: '#fff',
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