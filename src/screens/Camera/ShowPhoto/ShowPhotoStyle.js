import { StyleSheet } from 'react-native';
import Colors from '../../../constants/Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cameraWrapper: {
    flex: 1,
    height: '100%',
    width: '100%',
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  topWrapper: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    top: 15,
    left: 0,
    right: 10,
    paddingHorizontal: 5,
  },
  cameraText: {
    color: Colors.white,
    textTransform: 'uppercase',
  },
  gap: {
    width: 50,
  },
  spinner: {
    flex: 1,
  },
  footerWrapper: {
    width: '75%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 25,
  },
  iconWrapper: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'red',
    padding: 10,
  },
  icon: {
    color: Colors.white,
    fontSize: 30,
  },
  success: {
    backgroundColor: Colors.primary,
  },
  danger: {
    backgroundColor: Colors.danger,
  },
});

export default styles;
