import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, Image, TouchableOpacity, FlatList, LogBox } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import styles from './CategoryStyle';
import Input from '../../components/Input';
import Button from '../../components/Button';

const data = [
  { id: Math.floor(Math.random() * 10000) + 1, title: 'Category 1' },
  { id: Math.floor(Math.random() * 10000) + 1, title: 'Category 2' },
  { id: Math.floor(Math.random() * 10000) + 1, title: 'Category 3' },
  { id: Math.floor(Math.random() * 10000) + 1, title: 'Category 1' },
  { id: Math.floor(Math.random() * 10000) + 1, title: 'Category 2' },
  { id: Math.floor(Math.random() * 10000) + 1, title: 'Category 3' },
];

const Category = () => {
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState(data);
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);

  const handleSave = () => {
    if (!category) {
      return null;
    }
    if (editId) {
      setCategories(cat =>
        cat.map(cur => {
          if (cur.id === editId) {
            const temp = { ...cur };
            temp.title = category;
            return temp;
          }
          return cur;
        })
      );
    } else {
      setCategories(cat => [
        ...cat,
        { id: Math.floor(Math.random() * 10000) + 1, title: category },
      ]);
    }
    setCategory('');
    setEditId(null);
    setError('');
    return true;
  };

  const handleText = text => {
    setCategory(text);
    if (!text) {
      setError('Please enter category');
    } else {
      setError('');
    }
  };

  const handleEdit = item => {
    setCategory(item.title);
    setEditId(item.id);
  };

  const handleDelete = item => {
    setCategories(cat => cat.filter(cur => cur.id !== item.id));
  };

  const renderCategories = ({ item }) => (
    <View style={styles.categoryContainer}>
      <Text style={styles.categoryTitle}>{item.title}</Text>
      <View style={styles.categorySubContainer}>
        <TouchableOpacity activeOpacity={0.9} onPress={() => handleEdit(item)}>
          <Image style={styles.image} source={require('../../assets/icons/edit.png')} />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.9} onPress={() => handleDelete(item)}>
          <Image style={styles.image} source={require('../../assets/icons/delete.png')} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
      <View style={styles.inputContainer}>
        <Input
          value={category}
          onChangeText={handleText}
          placeholder="Add Category"
          error={error}
        />
        <Button text="Save" onPress={handleSave} />
      </View>
      <FlatList
        keyExtractor={(_, index) => index.toString()}
        data={categories}
        renderItem={renderCategories}
        style={styles.flatListContainer}
        showsVerticalScrollIndicator={false}
      />
    </KeyboardAwareScrollView>
  );
};

export default Category;
