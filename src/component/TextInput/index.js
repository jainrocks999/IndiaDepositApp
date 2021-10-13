import React from 'react';
import {
  ImagePropTypes,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import colors from '../colors';
const CustomButton = (props) => {
  return (
    <TextInput
      {...props}
      defaultValue={props.defaultValue}
      style={[styles.textInput, props.style]}
      placeholder={props.placeholder}
      placeholderTextColor={colors.textGrey}
      editable={props.editable}
      keyboardType={props.keyboardType}
      maxLength={props.maxLength}
      secureTextEntry={props.secureTextEntry}
      onChangeText={props.onChangeText}
    />
  );
};
const styles = StyleSheet.create({
  textInput: {
    alignSelf: 'center',
    width: '100%',
    height: 40,
    marginTop: 0,
    backgroundColor: colors.white,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 6,
    borderColor:colors.grey
  },
});

export default CustomButton;
