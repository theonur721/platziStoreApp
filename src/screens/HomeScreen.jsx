import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {defaultScreenStyle} from '../styles/defaultScreenStyle';

const HomeScreen = () => {
  return (
    <SafeAreaView style={defaultScreenStyle.safeAreaContainer}>
      <View>
        <Text>HomeScreen</Text>
        <TouchableOpacity>
          <Image
            source={require('../assets/picture-2.jpg')}
            style={styles.image}
          />
        </TouchableOpacity>
        <View style={defaultScreenStyle.container}>
          <Text>Home Products</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  image: {
    height: 200,
    width: '100%',
  },
});
