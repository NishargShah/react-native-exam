import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import styles from './ContactStyle';

const data = [
  {
    id: Math.floor(Math.random() * 10000) + 1,
    image: require('../../assets/icons/profile.png'),
    fname: 'Nisharg',
    lname: 'Shah',
    mobile: '8733940250',
    email: 'nishargshah3101@gmail.com',
    category: 'fullstack',
  },
  {
    id: Math.floor(Math.random() * 10000) + 1,
    image: require('../../assets/icons/profile.png'),
    fname: 'Nisharg007',
    lname: 'Shah',
    mobile: '7016684438',
    email: 'nishargshah007@gmail.com',
    category: 'web',
  },
  {
    id: Math.floor(Math.random() * 10000) + 1,
    image: require('../../assets/icons/profile.png'),
    fname: 'Nisharg07',
    lname: 'Shah',
    mobile: '0123456789',
    email: 'nishargshah07@gmail.com',
    category: 'app',
  },
  {
    id: Math.floor(Math.random() * 10000) + 1,
    image: require('../../assets/icons/profile.png'),
    fname: 'Nisharg47',
    lname: 'Shah',
    mobile: '1234567890',
    email: 'nishargshah47@gmail.com',
    category: 'devops',
  },
];

const Contact = ({ navigation, route }) => {
  const { params } = route;
  const [contacts, setContacts] = useState(data);

  useEffect(() => {
    if (params) {
      const { isEditMode, item } = params;
      if (isEditMode) {
        const modifiedContacts = contacts.map(cur => (cur.id === item.id ? item : cur));
        setContacts(modifiedContacts);
      } else {
        setContacts(con => [...con, item]);
      }
    }
  }, [params]);

  const handleEdit = item => {
    navigation.navigate('AddContact', {
      item,
      isEditMode: true,
    });
  };

  const handleDelete = item => {
    setContacts(contact => contact.filter(cur => cur.id !== item.id));
  };

  const renderContacts = ({ item }) => (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <Image style={styles.image} source={item.image} />
        <Text style={styles.name}>{item.fname}</Text>
      </View>
      <View style={styles.rightContainer}>
        <TouchableOpacity activeOpacity={0.9} onPress={() => handleEdit(item)}>
          <Image style={styles.actionImage} source={require('../../assets/icons/edit.png')} />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.9} onPress={() => handleDelete(item)}>
          <Image style={styles.actionImage} source={require('../../assets/icons/delete.png')} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <FlatList
      keyExtractor={(_, index) => index.toString()}
      data={contacts}
      renderItem={renderContacts}
      style={styles.flatListContainer}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default Contact;
