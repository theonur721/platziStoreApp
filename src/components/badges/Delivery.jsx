import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../theme/colors';
import normalize from '../../constants/normalize'; // düzeltildi: normalize default değil named export

const Delivery = () => {
  return (
    <View style={styles.container}>
      <Icon size={normalize(20)} name="flash" color={COLORS.quaternary} />
      <Text style={styles.text}>Express Delivery</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F9F7',
    width: normalize(100), // %30 yerine yaklaşık genişlik değeri
    padding: normalize(6),
  },
  text: {
    fontSize: normalize(12),
    fontWeight: '600', // semibold yerine numeric
    marginTop: normalize(5),
  },
});

export default Delivery;
