import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Image, TouchableOpacity, View, Text, BackHandler } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { useFocusEffect } from '@react-navigation/native';
import { AppContext } from '../../../context/AppContext';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import styles from './AddContactStyle';
import Colors from '../../../constants/Colors';

const AddContact = ({ navigation, route }) => {
  const { params } = route;
  const initialData = {
    fname: '',
    lname: '',
    mobile: '',
    email: '',
    category: '',
    image: '',
  };
  const { categories } = useContext(AppContext);
  const [data, setData] = useState(initialData);
  const [error, setError] = useState({});
  const [isRendered, setRendered] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (params?.item) {
        const { item } = params;
        setData(item);
      } else {
        setData(initialData);
      }
      if (params?.isEditMode) {
        navigation.setOptions({
          headerTitle: 'Edit Contact',
        });
      } else {
        navigation.setOptions({
          headerTitle: 'Add Contact',
        });
      }
      if (params?.extraData) {
        setData({ ...params.extraData, image: params.photo?.uri ?? '' });
      }
    });
    setRendered(true);
    return unsubscribe;
  }, [route, navigation]);

  useEffect(
    () =>
      navigation.addListener('blur', () => {
        navigation.setParams({
          item: null,
          isEditMode: null,
          photo: null,
          extraData: null,
          forceBack: false,
        });
        setData(initialData);
        setError({});
      }),
    [route, navigation]
  );

  const handleBack = () => {
    if (params?.forceBack) {
      navigation.navigate('Contact');
      return true;
    }
    return false;
  };

  useFocusEffect(
    useCallback(() => {
      BackHandler.addEventListener('hardwareBackPress', handleBack);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', handleBack);
      };
    }, [navigation, route])
  );

  const emailCheck = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const formCheck = () => {
    const validation = [];
    if (!data.image.trim()) {
      setError(err => ({ ...err, image: 'Please Upload Image' }));
      validation.push(false);
    }
    if (!data.fname.trim()) {
      setError(err => ({ ...err, fname: 'Please Enter First Name' }));
      validation.push(false);
    }
    if (!data.lname.trim()) {
      setError(err => ({ ...err, lname: 'Please Enter Last Name' }));
      validation.push(false);
    }
    if (!data.mobile.trim()) {
      setError(err => ({ ...err, mobile: 'Please Enter Mobile Number' }));
      validation.push(false);
    }
    if (data.mobile.trim() && data.mobile.length !== 10) {
      setError(err => ({ ...err, mobile: 'Please Enter Valid Mobile Number' }));
      validation.push(false);
    }
    if (!data.email.trim()) {
      setError(err => ({ ...err, email: 'Please Enter Email' }));
      validation.push(false);
    }
    if (data.email.trim() && !emailCheck.test(data.email)) {
      setError(err => ({ ...err, email: 'Please Enter Valid Email' }));
      validation.push(false);
    }
    if (!data.category) {
      setError(err => ({ ...err, category: 'Please Select Category' }));
      validation.push(false);
    }
    return validation;
  };

  const handleData = (key, value) => {
    setData(cur => ({ ...cur, [key]: value }));
  };

  const handleSave = () => {
    setError({});
    const checks = formCheck();
    if (checks.some(cur => !cur)) {
      return null;
    }
    setData(initialData);
    navigation.navigate('Contact', {
      item: data,
      isEditMode: params?.isEditMode ?? false,
    });
    return true;
  };

  if (!isRendered) {
    return null;
  }

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps="handled"
    >
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() =>
          navigation.navigate('CapturePhoto', {
            extraData: data,
            isEditMode: params?.isEditMode ?? false,
          })
        }
      >
        <Image
          style={styles.image}
          source={data.image ? { uri: data.image } : require('../../../assets/icons/profile.png')}
        />
        {error.image && (
          <Text style={{ ...styles.errorText, ...styles.errorTextCenter }}>{error.image}</Text>
        )}
      </TouchableOpacity>
      <Input
        containerStyle={styles.input}
        value={data.fname}
        onChangeText={text => handleData('fname', text.replace(/ +/g, ' ').trimLeft())}
        placeholder="First Name"
        error={error.fname || ''}
      />
      <Input
        containerStyle={styles.input}
        value={data.lname}
        onChangeText={text => handleData('lname', text.replace(/ +/g, ' ').trimLeft())}
        placeholder="Last Name"
        error={error.lname || ''}
      />
      <Input
        containerStyle={styles.input}
        value={data.mobile}
        onChangeText={text => handleData('mobile', text.trim())}
        placeholder="Mobile Number"
        error={error.mobile || ''}
        keyboardType="number-pad"
        maxLength={10}
      />
      <Input
        containerStyle={styles.input}
        value={data.email}
        onChangeText={text => handleData('email', text.trim())}
        placeholder="Email"
        error={error.email || ''}
        keyboardType="email-address"
        autoCapitalize="none"
        caretHidden
      />
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={data.category}
          onValueChange={value => handleData('category', value)}
          style={styles.picker}
          dropdownIconColor={Colors.primary}
        >
          <Picker.Item color={Colors.gray} label="Select" value="" />
          {categories.map((cur, i) => (
            <Picker.Item color={Colors.gray} key={i} label={cur.label} value={cur.value} />
          ))}
        </Picker>
      </View>
      {error.category && <Text style={styles.errorText}>{error.category}</Text>}
      <Button text="Save" onPress={handleSave} style={styles.button} />
    </KeyboardAwareScrollView>
  );
};

export default AddContact;
