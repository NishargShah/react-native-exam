import { Dimensions, StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    minHeight: (Dimensions.get('screen').height * 40) / 100,
    width: '80%',
    maxWidth: '80%',
    alignSelf: 'center',
  },
  flatListContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.category,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.categoryBorder,
  },
  categoryTitle: {},
  categorySubContainer: {
    flexDirection: 'row',
  },
  image: {
    width: 20,
    height: 20,
    marginLeft: 15,
  },
});

export default styles;
