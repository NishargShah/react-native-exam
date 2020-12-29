import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, TextInput, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';

const Input = props => {
  const { value, onChangeText, placeholder, error, style, containerStyle } = props;
  const inputProps = { ...props };
  delete inputProps.value;
  delete inputProps.onChangeText;
  delete inputProps.placeholder;
  delete inputProps.error;
  delete inputProps.style;
  delete inputProps.containerStyle;

  return (
    <View style={{ ...styles.container, ...containerStyle }}>
      <TextInput
        style={{ ...styles.input, ...style }}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={Colors.gray}
        {...inputProps}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

Input.defaultProps = {
  containerStyle: {},
  style: {},
};

Input.propTypes = {
  value: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
  containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: Colors.primary,
    paddingHorizontal: 20,
  },
  errorText: {
    color: 'red',
    alignSelf: 'flex-start',
  },
});

export default Input;
