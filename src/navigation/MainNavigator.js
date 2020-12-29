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
      <DrawerNavigator
        initialRouteName="Contact"
        drawerContentOptions={drawerOptions}
        drawerType="slide"
      >
        <DrawerScreen
          name="AddCategory"
          component={Category}
          options={props => ({
            ...headerOptions(props),
            title: 'Add Category',
            headerTitle: 'Create and store category',
          })}
        />
        <DrawerScreen
          name="AddContact"
          component={AddContact}
          options={props => ({ ...headerOptions(props), title: 'Add Contact' })}
        />
        <DrawerScreen
          name="Contact"
          component={Contact}
          options={props => ({
            ...headerOptions(props),
            title: 'Contact List',
          })}
        />
      </DrawerNavigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
