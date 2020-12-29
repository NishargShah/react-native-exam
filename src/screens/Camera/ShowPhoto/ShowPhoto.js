import React from 'react';
import { View, ImageBackground, Text } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { HeaderBackButton } from '@react-navigation/stack';
import { Camera } from 'expo-camera';
import Colors from '../../../constants/Colors';
import styles from './ShowPhotoStyle';

const ShowPhoto = props => {
  const { navigation, route } = props;
  const { photoData } = route.params;

  const mirrorImage = type =>
    type === Camera.Constants.Type.front
      ? {
          transform: [
            {
              scaleX: -1,
            },
          ],
        }
      : {};

  const sendImageData = async () => {
    const dataObj = new FormData();
    dataObj.append('file', {
      uri: photoData.uri,
      name: `image/${photoData.uri.split('.').pop()}`,
      type: `image/${photoData.uri.split('.').pop()}`,
    });
    navigation.navigate('AddContact', {
      photo: photoData,
      extraData: route.params.extraData,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.cameraWrapper}>
        <ImageBackground
          source={{ uri: photoData.uri }}
          style={[styles.camera, mirrorImage(photoData.cameraType)]}
        >
          <View style={styles.topWrapper}>
            <HeaderBackButton
              tintColor={Colors.white}
              onPress={navigation.goBack}
              labelVisible={false}
            />
            <Text style={styles.cameraText}>Camera</Text>
            <View style={styles.gap} />
          </View>
          <View style={[styles.footerWrapper, mirrorImage(photoData.cameraType)]}>
            <View style={[styles.iconWrapper, styles.danger]}>
              <MaterialIcon
                name="close"
                style={styles.icon}
                onPress={() => {
                  navigation.navigate('CapturePhoto');
                }}
              />
            </View>
            <View style={[styles.iconWrapper, styles.success]}>
              <MaterialIcon name="check" style={styles.icon} onPress={sendImageData} />
            </View>
          </View>
        </ImageBackground>
      </View>
    </View>
  );
};

export default ShowPhoto;
