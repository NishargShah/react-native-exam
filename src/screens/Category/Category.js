import React, { useState, useEffect, useContext } from 'react';
import { Text, View, Image, TouchableOpacity, FlatList, LogBox } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import styles from './CategoryStyle';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { AppContext } from '../../context/AppContext';

const Category = () => {
  const { categories, setCategories } = useContext(AppContext);
  const [category, setCategory] = useState('');
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);

  const handleSave = () => {
    if (!category.trim()) {
      setError('Please enter category');
      return null;
    }
    if (categories.some(cur => cur.label.toLowerCase() === category.toLowerCase())) {
      setError('Category Already Exist');
      return null;
    }
    if (editId) {
      setCategories(cat =>
        cat.map(cur => {
          if (cur.value === editId) {
            const temp = { ...cur };
            temp.label = category;
            return temp;
          }
          return cur;
        })
      );
    } else {
      setCategories(cat => [
        ...cat,
        { value: Math.floor(Math.random() * 10000) + 1, label: category },
      ]);
    }
    setCategory('');
    setEditId(null);
    setError('');
    return true;
  };

  const handleText = text => {
    setCategory(text);
    if (!text.trim()) {
      setError('Please enter category');
    } else {
      setError('');
    }
  };

  const handleEdit = item => {
    setCategory(item.label);
    setEditId(item.value);
  };

  const handleDelete = item => {
    setCategories(cat => cat.filter(cur => cur.value !== item.value));
  };

  const renderCategories = ({ item }) => (
    <View style={styles.categoryContainer}>
      <Text style={styles.categoryTitle}>{item.label}</Text>
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
