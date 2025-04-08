import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS} from '../theme/colors';

const AddToCart = ({...props}) => {
  return (
    <TouchableOpacity>
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
    padding: 15,
    borderRadius: 20,
    alignItems: 'center',
  },
  text: {
    fontSize: 22,
    fontWeight: 'bold',
  },
});
