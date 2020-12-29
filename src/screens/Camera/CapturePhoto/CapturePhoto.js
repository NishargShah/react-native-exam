import React, { useState, useEffect, useRef } from 'react';
import { View, TouchableHighlight, Text } from 'react-native';
import { withNavigationFocus } from '@react-navigation/compat';
import { HeaderBackButton } from '@react-navigation/stack';
import PropTypes from 'prop-types';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import Colors from '../../../constants/Colors';
import styles from './CapturePhotoStyle';

const CapturePhoto = props => {
  const { navigation, route, isFocused } = props;
  const [hasPermission, setPermission] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [flashIcon, setFlashIcon] = useState('flash-off');
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { granted: cameraGrant } = await Permissions.askAsync(Permissions.CAMERA);
      const { granted: galleryGrand } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
      setPermission(cameraGrant && galleryGrand);
    })();
  }, []);

  const handleCameraType = () => {
    setCameraType(prevState =>
      prevState === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  const handleFlash = () => {
    const flashIcons = ['flash-on', 'flash-off', 'flash-auto'];
    const findCurrentFlashIcon = flashIcons.findIndex(cur => cur === flashIcon);
    const currentFlashIcon =
      flashIcon === flashIcons[flashIcons.length - 1]
        ? flashIcons[0]
        : flashIcons[findCurrentFlashIcon + 1];
    setFlashIcon(currentFlashIcon);
  };

  const handleCapture = async () => {
    if (cameraRef.current) {
      const data = await cameraRef.current.takePictureAsync({ quality: 0.5 });
      data.cameraType = cameraType;
      navigation.navigate('ShowPhoto', {
        photoData: data,
        extraData: route.params.extraData,
      });
    }
  };

  const handleGallery = async () => {
    const data = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    if (!data.cancelled) {
      data.cameraType = cameraType;
      navigation.navigate('ShowPhoto', {
        photoData: data,
        extraData: route.params.extraData,
      });
    }
  };

  if (hasPermission === null || !isFocused) {
    return <View />;
  }

  if (hasPermission === false) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.cameraWrapper}>
        <Camera
          ref={cameraRef}
          style={styles.camera}
          type={cameraType}
          flashMode={flashIcon.split('-')[1]}
          zoom={0}
          ratio="16:9"
          autoFocus
        >
          <View style={styles.topWrapper}>
            <HeaderBackButton
              tintColor={Colors.white}
              onPress={navigation.goBack}
              labelVisible={false}
            />
            <Text style={styles.cameraText}>Camera</Text>
            <AntDesignIcon
              name="picture"
              style={[styles.cameraIcon, styles.galleryIcon]}
              onPress={handleGallery}
            />
          </View>
          <View style={styles.footerWrapper}>
            <TouchableHighlight
              style={styles.cameraIconWrapper}
              onPress={handleFlash}
              underlayColor={Colors.primary}
            >
              <MaterialIcon name={flashIcon} style={styles.cameraIcon} />
            </TouchableHighlight>
            <MaterialCommunityIcon
              name="circle-outline"
              style={styles.captureIcon}
              onPress={handleCapture}
            />
            <TouchableHighlight
              style={styles.cameraIconWrapper}
              onPress={handleCameraType}
              underlayColor={Colors.primary}
            >
              <IoniconsIcon name="ios-camera-reverse" style={styles.cameraIcon} />
            </TouchableHighlight>
          </View>
        </Camera>
      </View>
    </View>
  );
};

CapturePhoto.propTypes = {
  isFocused: PropTypes.bool.isRequired,
};

export default withNavigationFocus(CapturePhoto);
