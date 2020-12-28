import { DefaultTheme } from '@react-navigation/native';
import Colors from '../constants/Colors';

export const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#fff',
  },
};

export const headerOptions = {
  headerShown: true,
  headerTitleAlign: 'center',
  headerStyle: {
    backgroundColor: Colors.primary,
  },
  headerTintColor: Colors.white,
};

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
