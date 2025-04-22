import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {loginUser, getUserProfile} from '../store/slice/authSlice';
import {useNavigation} from '@react-navigation/native';
import {defaultScreenStyle} from '../styles/defaultScreenStyle';
import {COLORS} from '../theme/colors';
import {ROUTES} from '../navigation/routes';
import normalize from '../constants/normalize';

const LoginScreen = () => {
  const [email, setEmail] = useState('john@mail.com'); // Default email
  const [password, setPassword] = useState('changeme'); // Default password
  const [errorMessage, setErrorMessage] = useState(''); // Hata mesajı için state
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {accessToken, user, error, loading} = useSelector(state => state.auth);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    // Hata mesajını temizle
    setErrorMessage('');

    const result = await dispatch(loginUser({email, password}));

    if (result.meta.requestStatus === 'fulfilled') {
      dispatch(getUserProfile()); // Kullanıcıyı al
    } else {
      // Hata durumunda error mesajını göster
      setErrorMessage('Incorrect email or password');
    }
  };

  useEffect(() => {
    if (user) {
      navigation.navigate(ROUTES.TAB); // Giriş başarılıysa yönlendirme
    }
  }, [user]);

  useEffect(() => {
    if (accessToken) {
      navigation.navigate(ROUTES.TAB); // Token varsa, kullanıcıyı yönlendir
    }
  }, [accessToken]);

  return (
    <SafeAreaView
      style={[
        defaultScreenStyle.safeAreaContainer,
        {backgroundColor: COLORS.primary},
      ]}>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to my app!</Text>

        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require('../assets/picture.png')}
          />
        </View>

        {/* Email ve Password Input */}
        <TextInput
          placeholder="Email"
          placeholderTextColor="#ccc"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor="#ccc"
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        {errorMessage ? (
          <Text style={styles.errorText}>{errorMessage}</Text> // Hata mesajı
        ) : null}

        <View style={styles.buttonGroup}>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>
              {loading ? 'Loading...' : 'Login'}
            </Text>
          </TouchableOpacity>

          <Text style={styles.accountText}>Don’t have an account?</Text>

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
    paddingHorizontal: normalize(24),
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: normalize(30),
    fontWeight: 'bold',
    color: COLORS.secondary,
    marginBottom: normalize(40),
  },
  imageContainer: {
    marginBottom: normalize(30),
    alignItems: 'center',
  },
  image: {
    width: normalize(240),
    height: normalize(170),
    resizeMode: 'contain',
    borderRadius: normalize(3500),
  },
  input: {
    width: '85%',
    backgroundColor: '#fff',
    padding: normalize(14),
    borderRadius: normalize(14),
    marginVertical: normalize(8),
    fontSize: normalize(16),
  },
  buttonGroup: {
    marginTop: normalize(20),
    width: '100%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: COLORS.secondary,
    paddingVertical: normalize(14),
    borderRadius: normalize(30),
    marginVertical: normalize(10),
    width: '80%',
    alignItems: 'center',
    elevation: 4,
  },
  buttonOutline: {
    backgroundColor: COLORS.tertiary,
    paddingVertical: normalize(14),
    borderRadius: normalize(30),
    marginVertical: normalize(10),
    width: '80%',
    alignItems: 'center',
    elevation: 4,
    borderWidth: 1,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: normalize(18),
    fontWeight: '600',
  },
  accountText: {
    marginTop: normalize(10),
    color: COLORS.secondary,
    fontSize: normalize(14),
  },
  errorText: {
    color: 'red',
    marginTop: normalize(10),
    fontSize: normalize(16),
    fontWeight: '500',
  },
});
