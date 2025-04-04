import {View, StyleSheet} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Router from './src/navigation/Router';

const App = () => {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Router />
      </View>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1, // Tüm ekranı kaplamasını sağlıyoruz
  },
});
