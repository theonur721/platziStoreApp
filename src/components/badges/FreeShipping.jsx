// src/components/Badge/FreeShipping.js
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../theme/colors';
import normalize from '../../constants/normalize';

const FreeShipping = () => {
  return (
    <View style={styles.container}>
      <Icon size={normalize(20)} name="cube-sharp" color={COLORS.primary} />
      <Text style={styles.text}>Free shipping</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.tertiary,
    width: normalize(100),
    padding: normalize(6),
  },
  text: {
    color: COLORS.BLACK,
    fontSize: normalize(12),
    fontWeight: '600',
    marginTop: normalize(5),
  },
});

export default FreeShipping;
