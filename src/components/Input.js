import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Text, TextInput, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';

const Input = props => {
  const { value, onChangeText, placeholder, error, style } = props;

  return (
    <Fragment>
      <TextInput
        style={{ ...styles.input, ...style }}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={Colors.gray}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </Fragment>
  );
};

Input.defaultProps = {
  style: {},
};

Input.propTypes = {
  value: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
};

const styles = StyleSheet.create({
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
