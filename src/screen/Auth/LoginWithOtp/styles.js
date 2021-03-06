import {StyleSheet} from 'react-native';
import colors from '../../../component/colors';
import fontSize from '../../../component/fontSize';
export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: colors.card,
  },

  imageContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  round: {
    width: 115,
    height: 115,
    backgroundColor: colors.bc,
    borderRadius: 57,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input1: {
    width: '90%',
    marginLeft: 1,
    paddingVertical: -10,
    color: colors.textColor,
  },
  card: {
    shadowColor: colors.black,
    shadowOpacity: 0.25,
    shadowRadius: 4,
    shadowOffset: {height: 2, width: 0},
    elevation: 2,
    borderRadius: 10,
    backgroundColor: colors.white,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginTop: 18,
    borderColor: colors.bc,
    borderWidth: 1,
  },
  heading: {
    fontSize: fontSize.thirteen,
    fontFamily: 'Montserrat-Regular',
    color: colors.heading,
  },
  input: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: -3,
  },
  main: {
    paddingHorizontal: 30,
    marginTop: 50,
  },
  button: {
    width: '100%',
    marginTop: 15,
  },
  bottom: {
    flexDirection: 'row',
    marginTop: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  account: {
    color: colors.textColor,
    fontSize: fontSize.fourteen,
    fontFamily: 'Montserrat-Regular',
  },
  account1: {
    color: colors.bc,
    fontSize: fontSize.twelve,
    fontFamily: 'Montserrat-Regular',
  },
  error: {
    width: '90%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: 15,
    marginTop: 6,
  },
  warn: {
    fontSize: fontSize.twelve,
    color: 'red',
  },
});
