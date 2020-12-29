import { StyleSheet } from 'react-native';
import Colors from '../../../constants/Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  contentContainer: {
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: Colors.black,
    marginVertical: 25,
  },
  input: {
    marginBottom: 20,
  },
  pickerContainer: {
    width: '100%',
    borderWidth: 1,
    borderColor: Colors.primary,
    paddingLeft: 10,
  },
  picker: {
    width: '100%',
  },
  button: {
    marginBottom: 30,
  },
});

export default styles;
