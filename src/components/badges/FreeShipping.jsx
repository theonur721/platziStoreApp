import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../theme/colors';

const FreeShipping = () => {
  return (
    <View style={styles.container}>
      <Icon size={20} name="cube-sharp" color={COLORS.primary} />
      <Text style={styles.text}>Free shipping</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.tertiary,
    width: '30%',
    padding: 2,
  },
  text: {
    color: COLORS.BLACK,
    fontSize: 8,
    fontWeight: 'semibold',
    marginTop: 5,
  },
});

export default FreeShipping;
