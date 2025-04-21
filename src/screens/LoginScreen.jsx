import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {defaultScreenStyle} from '../styles/defaultScreenStyle';
import {COLORS} from '../theme/colors';
import {ROUTES} from '../navigation/routes';
import {useNavigation} from '@react-navigation/native';

const LoginScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView
      style={[
        defaultScreenStyle.safeAreaContainer,
        {backgroundColor: COLORS.primary},
      ]}>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome my app!</Text>

        {/* Üst görsel */}
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require('../assets/picture.png')}
          />
        </View>

        {/* Inputlar */}
        <View style={styles.inputGroup}>
          <TextInput
            placeholder="Email"
            placeholderTextColor="#999"
            style={styles.input}
          />
          <TextInput
            placeholder="Password"
            placeholderTextColor="#999"
            secureTextEntry
            style={styles.input}
          />
        </View>

        {/* Butonlar */}
        <View style={styles.buttonGroup}>
          <TouchableOpacity
            onPress={() => navigation.navigate(ROUTES.TAB)}
            style={styles.button}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          <Text style={styles.noAccountText}>Don't have an account?</Text>

          <TouchableOpacity style={styles.buttonOutline}>
            <Text style={[styles.buttonText, {color: 'black'}]}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: COLORS.secondary,
    marginBottom: 30,
  },
  imageContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  image: {
    width: 240,
    height: 170,
    resizeMode: 'contain',
    borderRadius: 3500,
  },
  inputGroup: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
    fontSize: 16,
    color: '#000',
  },
  buttonGroup: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: COLORS.secondary,
    paddingVertical: 14,
    borderRadius: 30,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  buttonOutline: {
    backgroundColor: COLORS.tertiary,
    paddingVertical: 14,
    borderRadius: 30,
    marginTop: 10,
    width: '80%',
    alignItems: 'center',
    elevation: 4,
    borderWidth: 1,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.white,
  },
  noAccountText: {
    marginTop: 15,
    fontSize: 14,
    color: COLORS.secondary,
  },
});
