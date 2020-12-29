import React, { Fragment, useState, useEffect, useContext } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { AppContext } from '../../context/AppContext';
import styles from './ContactStyle';
import Input from '../../components/Input';
import Colors from '../../constants/Colors';

const data = [
  {
    id: Math.floor(Math.random() * 10000) + 1,
    image: 'https://randomuser.me/api/portraits/men/3.jpg',
    fname: 'Nisharg',
    lname: 'Shah',
    mobile: '8733940250',
    email: 'nishargshah3101@gmail.com',
    category: 1,
  },
  {
    id: Math.floor(Math.random() * 10000) + 1,
    image: 'https://randomuser.me/api/portraits/men/52.jpg',
    fname: 'Nisharg007',
    lname: 'Shah',
    mobile: '7016684438',
    email: 'nishargshah007@gmail.com',
    category: 2,
  },
  {
    id: Math.floor(Math.random() * 10000) + 1,
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    fname: 'Nisharg07',
    lname: 'Shah',
    mobile: '0123456789',
    email: 'nishargshah07@gmail.com',
    category: 3,
  },
  {
    id: Math.floor(Math.random() * 10000) + 1,
    image: 'https://randomuser.me/api/portraits/women/70.jpg',
    fname: 'Nisharg47',
    lname: 'Shah',
    mobile: '1234567890',
    email: 'nishargshah47@gmail.com',
    category: 4,
  },
];

const Contact = ({ navigation, route }) => {
  const { params } = route;
  const { categories } = useContext(AppContext);
  const [contacts, setContacts] = useState(data);
  const [category, setCategory] = useState('');
  const [isFilterMode, setFilterMode] = useState(false);
  const [filteredContacts, setFilteredContacts] = useState(contacts);
  const [isSearchMode, setSearchMode] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (params) {
      const { isEditMode, item } = params;
      if (item) {
        if (isEditMode) {
          const modifiedContacts = contacts.map(cur => (cur.id === item.id ? item : cur));
          setContacts(modifiedContacts);
        } else {
          setContacts(con => [...con, item]);
        }
        navigation.setParams({ item: null, isEditMode: null });
      }
    }
  }, [params]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ flexDirection: 'row', marginRight: 10 }}>
          <TouchableOpacity
            onPress={() => {
              setFilterMode(prev => !prev);
              setSearchMode(false);
              setCategory('');
            }}
          >
            <Image
              style={{ width: 25, height: 25, marginLeft: 10 }}
              source={require('../../assets/icons/filter.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setSearchMode(prev => !prev);
              setFilterMode(false);
              setSearch('');
            }}
          >
            <Image
              style={{ width: 25, height: 25, marginLeft: 10 }}
              source={require('../../assets/icons/search.png')}
            />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  const handleEdit = item => {
    navigation.navigate('AddContact', {
      item,
      isEditMode: true,
    });
  };

  const handleDelete = item => {
    setContacts(contact => contact.filter(cur => cur.id !== item.id));
  };

  const handleSearch = text => {
    setSearch(text);
    setFilteredContacts(contacts.filter(cur => cur.fname.includes(text)));
  };

  const handleSelect = text => {
    setCategory(text);
    setFilteredContacts(contacts.filter(cur => cur.category === text));
  };

  const renderContacts = ({ item }) => (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <Image style={styles.image} source={{ uri: item.image }} />
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
    <Fragment>
      {isSearchMode && (
        <Input
          containerStyle={styles.search}
          placeholder="Search"
          value={search}
          onChangeText={handleSearch}
          error=""
        />
      )}
      {isFilterMode && (
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={category}
            onValueChange={handleSelect}
            style={styles.picker}
            dropdownIconColor={Colors.primary}
          >
            <Picker.Item color={Colors.gray} label="Select" value="" />
            {categories.map((cur, i) => (
              <Picker.Item color={Colors.gray} key={i} label={cur.label} value={cur.value} />
            ))}
          </Picker>
        </View>
      )}
      {(search || category ? filteredContacts.length : contacts.length) ? (
        <FlatList
          keyExtractor={(_, index) => index.toString()}
          data={search || category ? filteredContacts : contacts}
          renderItem={renderContacts}
          style={styles.flatListContainer}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <Text style={styles.noContacts}>No Contacts Found</Text>
      )}
    </Fragment>
  );
};

export default Contact;
