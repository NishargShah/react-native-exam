import React, { Fragment } from 'react';
import { SafeAreaView, StyleSheet, StatusBar } from 'react-native';
import MainNavigator from './navigation/MainNavigator';

const App = () => (
  <Fragment>
    <StatusBar barStyle="dark-content" />
    <SafeAreaView style={styles.safeAreaView}>
      <MainNavigator />
    </SafeAreaView>
  </Fragment>
);

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
});

export default App;
