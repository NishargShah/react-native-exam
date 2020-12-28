import React, { useState, useEffect } from 'react';
import { View, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import styles from './AddContactStyle';
import Colors from '../../../constants/Colors';

const categories = [
  { label: 'Full Stack Developer', value: 'fullstack' },
  { label: 'Web Developer', value: 'web' },
  { label: 'App Developer', value: 'app' },
  { label: 'DevOps Engineer', value: 'devops' },
];

const AddContact = ({ route }) => {
  const { params } = route;
  const initialData = {
    fname: '',
    lname: '',
    mobile: '',
    email: '',
    category: '',
  };
  const [image, setImage] = useState('');
  const [data, setData] = useState(initialData);
  const [error, setError] = useState({});
  const [isRendered, setRendered] = useState(false);

  useEffect(() => {
    if (params) {
      const { isEditMode, item } = params;
      console.log(params);
      setData(item);
    }
    setRendered(true);
  }, [params]);

  const emailCheck = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const formCheck = () => {
    if (!data.fname) {
      setError(err => ({ ...err, fname: 'Please Enter First Name' }));
      return false;
    }
    if (!data.lname) {
      setError(err => ({ ...err, lname: 'Please Enter Last Name' }));
      return false;
    }
    if (!data.mobile) {
      setError(err => ({ ...err, mobile: 'Please Enter Mobile Number' }));
      return false;
    }
    if (!data.email) {
      setError(err => ({ ...err, email: 'Please Enter Email Name' }));
      return false;
    }
    if (!emailCheck.test(data.email)) {
      setError(err => ({ ...err, email: 'Please Enter Valid Email' }));
      return false;
    }
    return true;
  };

  const handleData = (key, value) => {
    setData(cur => ({ ...cur, [key]: value }));
  };

  const handleSave = () => {
    if (!formCheck()) {
      return null;
    }
    setError({});
    setData(initialData);
    return true;
  };

  if (!isRendered) {
    return null;
  }

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Image style={styles.image} source={require('../../../assets/icons/profile.png')} />
      <Input
        style={styles.input}
        value={data.fname}
        onChangeText={text => handleData('fname', text)}
        placeholder="First Name"
        error={error.fname || ''}
      />
      <Input
        style={styles.input}
        value={data.lname}
        onChangeText={text => handleData('lname', text)}
        placeholder="Last Name"
        error={error.lname || ''}
      />
      <Input
        style={styles.input}
        value={data.mobile}
        onChangeText={text => handleData('mobile', text)}
        placeholder="Mobile Number"
        error={error.mobile || ''}
      />
      <Input
        style={styles.input}
        value={data.email}
        onChangeText={text => handleData('email', text)}
        placeholder="Email"
        error={error.email || ''}
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
      <Button text="Save" onPress={handleSave} />
    </KeyboardAwareScrollView>
  );
};

export default AddContact;
