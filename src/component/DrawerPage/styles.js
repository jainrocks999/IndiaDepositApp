import { StyleSheet } from 'react-native';
import colors from '../../component/colors';
export default StyleSheet.create({
    drawerContent: {
        flex: 1,
        paddingHorizontal:6
    },
    title: {
        fontFamily:'Montserrat-SemiBold',
        fontSize:16,
        width:'95%',
        color:colors.textColor
    },
    caption: {
        fontSize: 14,
        fontFamily:'Montserrat-Normal',
        color:colors.textColor
    },
    drawers: {
        borderBottomWidth: 1,
        borderBottomColor: '#b6b8b6',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical:20,
        height:120
    },
    drawer: {
        borderBottomWidth: 1,
        borderBottomColor: '#b6b8b6',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 14, 
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    iconView: {
        width: 30,
        height: 24,
       // backgroundColor: 'grey'
    },
    text: {
        marginLeft: 10,
        fontFamily:'Montserrat-Normal',
        fontSize:16,
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
        fontSize: 16 ,
        fontFamily:'Krdev016'
    },
    image:{ 
        height: 30, 
        width: 30 
    },
    imageicon:{
      //  width:'100%',
      //  height:'100%'
    }
})