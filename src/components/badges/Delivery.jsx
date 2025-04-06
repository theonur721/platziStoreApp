import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../theme/colors';

const Delivery = () => {
  return (
    <View style={styles.container}>
      <Icon size={20} name="flash" color={COLORS.quaternary} />
      <Text style={styles.text}>Express Delivery</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F9F7',
    width: '30%',
    padding: 2,
  },
  text: {
    fontSize: 8,
    fontWeight: 'semibold',
    marginTop: 5,
  },
});

export default Delivery;
