import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../theme/colors';

const Discount = () => {
  return (
    <View style={styles.container}>
      <Icon size={20} name="bag-add" color={COLORS.secondary} />
      <Text style={styles.text}>BOGO 50%</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    width: '30%',
    padding: 2,
  },
  text: {
    fontSize: 8,
    fontWeight: 'semibold',
    marginTop: 5,
  },
});

export default Discount;
