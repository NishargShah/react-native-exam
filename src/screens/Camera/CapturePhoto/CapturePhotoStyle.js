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
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingVertical: 35,
  },
  footerWrapper: {
    width: '75%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  captureIcon: {
    fontSize: 80,
    color: Colors.white,
    marginHorizontal: 20,
  },
  cameraIconWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  cameraIcon: {
    color: Colors.white,
    fontSize: 30,
    padding: 10,
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
  galleryIcon: {
    fontSize: 25,
  },
});

export default styles;
