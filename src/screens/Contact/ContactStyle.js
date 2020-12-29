import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

const styles = StyleSheet.create({
  flatListContainer: {
    margin: 15,
  },
  search: {
    paddingHorizontal: 30,
    paddingTop: 30,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.contactBorder,
    paddingVertical: 10,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    marginLeft: 20,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.black,
  },
  rightContainer: {
    flexDirection: 'row',
  },
  actionImage: {
    width: 20,
    height: 20,
    marginLeft: 15,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: Colors.primary,
    marginHorizontal: 30,
    marginVertical: 20,
  },
  picker: {
    width: '100%',
  },
  noContacts: {
    alignSelf: 'center',
    marginTop: 20,
  },
});

export default styles;
