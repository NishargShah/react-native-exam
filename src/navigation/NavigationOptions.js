import React from 'react';
import { DefaultTheme } from '@react-navigation/native';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Colors from '../constants/Colors';

export const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#fff',
  },
};

export const headerOptions = props => ({
  headerShown: true,
  headerTitleAlign: 'center',
  headerStyle: {
    backgroundColor: Colors.primary,
  },
  headerTintColor: Colors.white,
  headerLeft: () => (
    <TouchableOpacity onPress={() => props.navigation.toggleDrawer()}>
      <Image
        style={{ width: 25, height: 25, marginLeft: 10 }}
        source={require('../assets/icons/menu.png')}
      />
    </TouchableOpacity>
  ),
});

export const drawerOptions = {
  activeTintColor: Colors.white,
  inactiveTintColor: Colors.white,
  style: {
    backgroundColor: Colors.sidebar,
    marginVertical: 0,
  },
  itemStyle: {
    backgroundColor: Colors.sidebar,
    marginHorizontal: 0,
    marginVertical: 0,
    borderRadius: 0,
    borderBottomWidth: 1,
    borderBottomColor: Colors.sidebarBorder,
    paddingVertical: 10,
  },
};

export const headerIcons = props => ({
  headerRight: () => (
    <View style={{ flexDirection: 'row', marginRight: 10 }}>
      <TouchableOpacity onPress={() => props.navigation.toggleDrawer()}>
        <Image
          style={{ width: 25, height: 25, marginLeft: 10 }}
          source={require('../assets/icons/filter.png')}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => props.navigation.toggleDrawer()}>
        <Image
          style={{ width: 25, height: 25, marginLeft: 10 }}
          source={require('../assets/icons/search.png')}
        />
      </TouchableOpacity>
    </View>
  ),
});
