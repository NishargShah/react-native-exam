import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { MyTheme, headerOptions, drawerOptions } from './NavigationOptions';
import Category from '../screens/Category/Category';
import Contact from '../screens/Contact/Contact';
import AddContact from '../screens/Contact/AddContact/AddContact';

const Drawer = createDrawerNavigator();

const MainNavigator = () => {
  const { Navigator: DrawerNavigator, Screen: DrawerScreen } = Drawer;

  return (
    <NavigationContainer theme={MyTheme}>
      <DrawerNavigator drawerContentOptions={drawerOptions} drawerType="slide">
        <DrawerScreen
          name="DrawerAddCategory"
          component={Category}
          options={{
            ...headerOptions,
            title: 'Add Category',
            headerTitle: 'Create and store category',
          }}
        />
        <DrawerScreen
          name="DrawerAddContact"
          component={AddContact}
          options={{ ...headerOptions, title: 'Add Contact' }}
        />
        <DrawerScreen
          name="DrawerContact"
          component={Contact}
          options={{ ...headerOptions, title: 'Contact List' }}
        />
      </DrawerNavigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
