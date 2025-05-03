import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {COLORS} from '../theme/colors';
import normalize from '../constants/normalize';

const CustomNotification = ({onClose}) => {
  return (
    <View style={styles.overlay}>
      <View style={styles.notificationContainer}>
        <Text style={styles.notificationText}>
          Your order has been successfully placed! 🎉🛍️ We’re processing it and
          will update you soon!
        </Text>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  notificationContainer: {
    backgroundColor: COLORS.green,
    padding: normalize(15),
    borderRadius: normalize(8),
    alignItems: 'center',
    width: '80%',
  },
  notificationText: {
    color: COLORS.white,
    fontSize: normalize(22),
    textAlign: 'center',
    marginBottom: normalize(10),
  },
  closeButton: {
    paddingVertical: normalize(10),
    paddingHorizontal: normalize(24),
    backgroundColor: COLORS.red,
    borderRadius: normalize(5),
    marginTop: normalize(10),
  },
  closeButtonText: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
});

export default CustomNotification;
