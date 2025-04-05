import {StyleSheet} from 'react-native';
import {COLORS} from '../theme/colors';

const defaultScreenStyle = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: COLORS.white,
  },
  safeAreaContainer: {
    flex: 1,
  },
});

export {defaultScreenStyle};
