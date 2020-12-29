import React, { useEffect, useState, useContext } from 'react';
import { Image, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { AppContext } from '../../../../context/AppContext';
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
  };
  const { categories } = useContext(AppContext);
  const [image, setImage] = useState('');
  const [data, setData] = useState(initialData);
  const [error, setError] = useState({});
  const [isRendered, setRendered] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log(params);
      if (params?.item) {
        const { isEditMode, item } = params;
        console.log(params);
        setData(item);
        navigation.setOptions({
          headerTitle: 'Edit Contact',
        });
      } else {
        navigation.setOptions({
          headerTitle: 'Add Contact',
        });
      }
      console.log('sad');
    });
    setRendered(true);
    return unsubscribe;
  }, [route, navigation]);

  const emailCheck = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const formCheck = () => {
    const validation = [];
    if (!data.fname) {
      setError(err => ({ ...err, fname: 'Please Enter First Name' }));
      validation.push(false);
    }
    if (!data.lname) {
      setError(err => ({ ...err, lname: 'Please Enter Last Name' }));
      validation.push(false);
    }
    if (!data.mobile) {
      setError(err => ({ ...err, mobile: 'Please Enter Mobile Number' }));
      validation.push(false);
    }
    if (data.mobile && data.mobile.length !== 10) {
      setError(err => ({ ...err, mobile: 'Please Enter Valid Mobile Number' }));
      validation.push(false);
    }
    if (!data.email) {
      setError(err => ({ ...err, email: 'Please Enter Email' }));
      validation.push(false);
    }
    if (data.email && !emailCheck.test(data.email)) {
      setError(err => ({ ...err, email: 'Please Enter Valid Email' }));
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
    navigation.setParams({ item: null });
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
      <Image style={styles.image} source={require('../../../assets/icons/profile.png')} />
      <Input
        containerStyle={styles.input}
        value={data.fname}
        onChangeText={text => handleData('fname', text)}
        placeholder="First Name"
        error={error.fname || ''}
      />
      <Input
        containerStyle={styles.input}
        value={data.lname}
        onChangeText={text => handleData('lname', text)}
        placeholder="Last Name"
        error={error.lname || ''}
      />
      <Input
        containerStyle={styles.input}
        value={data.mobile}
        onChangeText={text => handleData('mobile', text)}
        placeholder="Mobile Number"
        error={error.mobile || ''}
        keyboardType="number-pad"
        maxLength={10}
      />
      <Input
        containerStyle={styles.input}
        value={data.email}
        onChangeText={text => handleData('email', text)}
        placeholder="Email"
        error={error.email || ''}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={data.category}
          onValueChange={value => handleData('category', value)}
          style={styles.picker}
          dropdownIconColor={Colors.primary}
        >
          {categories.map((cur, i) => (
            <Picker.Item color={Colors.gray} key={i} label={cur.label} value={cur.value} />
          ))}
        </Picker>
      </View>
      <Button text="Save" onPress={handleSave} style={styles.button} />
    </KeyboardAwareScrollView>
  );
};

export default AddContact;
