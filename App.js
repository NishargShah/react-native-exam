import React, { Fragment } from 'react';
import { SafeAreaView, StyleSheet, Text, StatusBar } from 'react-native';

const App = () => (
  <Fragment>
    <StatusBar barStyle="dark-content" />
    <SafeAreaView>
      <Text>Hello World</Text>
    </SafeAreaView>
  </Fragment>
);

const styles = StyleSheet.create({});

export default App;
