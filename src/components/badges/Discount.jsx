// src/components/Badge/Discount.js
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../theme/colors';
import normalize from '../../constants/normalize';

const Discount = () => {
  return (
    <View style={styles.container}>
      <Icon size={normalize(20)} name="bag-add" color={COLORS.secondary} />
      <Text style={styles.text}>BOGO 50%</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    width: normalize(100),
    padding: normalize(6),
  },
  text: {
    fontSize: normalize(12),
    fontWeight: '600',
    marginTop: normalize(5),
  },
});

export default Discount;
