import React from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';

const Button = props => {
  const { text, onPress, style } = props;

  return (
    <TouchableOpacity style={{ ...styles.button, ...style }} activeOpacity={0.9} onPress={onPress}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

Button.defaultProps = {
  style: {},
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 40,
    paddingVertical: 8,
    borderRadius: 4,
    marginTop: 40,
    alignSelf: 'center',
  },
  buttonText: {
    color: Colors.white,
  },
});

export default Button;
