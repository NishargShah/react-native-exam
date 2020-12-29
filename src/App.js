import React from 'react';
import { SafeAreaView, StyleSheet, StatusBar } from 'react-native';
import MainNavigator from './navigation/MainNavigator';
import AppContextProvider from './context/AppContext';

const App = () => (
  <AppContextProvider>
    <StatusBar barStyle="dark-content" />
    <SafeAreaView style={styles.safeAreaView}>
      <MainNavigator />
    </SafeAreaView>
  </AppContextProvider>
);

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
});

export default App;
