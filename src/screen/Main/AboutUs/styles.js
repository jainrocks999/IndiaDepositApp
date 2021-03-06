import {StyleSheet, Platform} from 'react-native';
import colors from '../../../component/colors';
import fontSize from '../../../component/fontSize';
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.card,
  },
  card: {
    shadowColor: colors.black,
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: {height: 2, width: 0},
    elevation: 5,
    borderRadius: 10,
    backgroundColor: colors.white,
    marginBottom: 40,
    paddingHorizontal: 15,
    paddingVertical: 20,
  },

  heading: {
    fontSize: fontSize.eighteen,
    color: colors.textColor,
    fontFamily: 'Montserrat-Regular',
  },
  normal: {
    fontSize: fontSize.fourteen,
    fontFamily: 'Montserrat-Regular',
    color: colors.textColor,
    // marginTop:10,
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
});
