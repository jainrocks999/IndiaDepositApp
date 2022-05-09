import { StyleSheet } from 'react-native';
import colors from '../../../component/colors';
export default StyleSheet.create({
    container: {
      flex: 1,
      // marginTop:10,
    },
    titleText: {
      flex: 1,
      fontSize: 22,
      fontWeight: 'bold',
    },
    header: {
      backgroundColor: '#F5FCFF',
    },
    headerText: {
      fontSize: 14,
      fontWeight: '600',
      color:colors.white,
      fontFamily:'Montserrat-Regular',width:'95%'
    },
    separator: {
      height: 0.5,
      backgroundColor: '#808080',
      width: '95%',
      marginLeft: 16,
      marginRight: 16,
    },
    text: {
      fontSize: 13,
      color: colors.textColor,
      padding: 10,
      fontFamily:'Montserrat-Regular',
      fontWeight:'400'
    },
    content: {
      paddingLeft: 10,
      paddingRight: 10,
      backgroundColor:colors.white,
    },
  });