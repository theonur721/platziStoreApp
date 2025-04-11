import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS} from '../theme/colors';
import normalize from '../constants/normalize';

const AddToCart = ({...props}) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={styles.container}>
        <Text style={styles.text}>{props.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default AddToCart;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.quaternary,
    padding: normalize(15),
    borderRadius: normalize(20),
    alignItems: 'center',
    minWidth: '50%',
  },
  text: {
    fontSize: normalize(22),
    fontWeight: 'bold',
  },
});
