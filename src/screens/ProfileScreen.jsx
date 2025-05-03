import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../store/slice/authSlice';
import {defaultScreenStyle} from '../styles/defaultScreenStyle';
import {COLORS} from '../theme/colors';
import normalize from '../constants/normalize';
import {useNavigation} from '@react-navigation/native';
import {ROUTES} from '../navigation/routes';
import LinearGradient from 'react-native-linear-gradient';

const ProfileScreen = () => {
  const {user} = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleLogout = () => {
    dispatch(logout());
    navigation.replace(ROUTES.LOGIN); // Kullanıcı çıkınca login'e yönlendirme
  };

  if (!user) {
    return (
      <SafeAreaView
        style={[
          defaultScreenStyle.safeAreaContainer,
          {backgroundColor: COLORS.primary},
        ]}>
        <Text style={styles.notLoggedText}>You are not logged in.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={[
        defaultScreenStyle.safeAreaContainer,
        {backgroundColor: COLORS.primary},
      ]}>
      <LinearGradient
        colors={[COLORS.primary, COLORS.secondary]}
        style={styles.gradient}>
        <View style={styles.container}>
          <Text style={styles.title}>Profile</Text>
          <Image source={{uri: user.avatar}} style={styles.avatar} />

          <Text style={styles.label}>Name</Text>
          <Text style={styles.value}>{user.name}</Text>

          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{user.email}</Text>

          <Text style={styles.label}>Role</Text>
          <Text style={styles.value}>{user.role}</Text>

          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    paddingTop: normalize(20),
    paddingBottom: normalize(40),
    alignItems: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    width: '90%',
    borderRadius: normalize(20),
    padding: normalize(20),
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    marginTop: normalize(40),
  },
  title: {
    fontSize: normalize(32),
    fontWeight: 'bold',
    color: COLORS.secondary,
    marginBottom: normalize(30),
  },
  avatar: {
    width: normalize(180),
    height: normalize(180),
    borderRadius: normalize(90),
    marginBottom: normalize(20),
    borderWidth: 4,
    borderColor: COLORS.secondary,
  },
  label: {
    fontSize: normalize(18),
    color: COLORS.white,
    fontWeight: '600',
    marginTop: normalize(15),
  },
  value: {
    fontSize: normalize(20),
    fontWeight: '600',
    color: COLORS.white,
    backgroundColor: COLORS.secondary,
    paddingVertical: normalize(7),
    paddingHorizontal: normalize(15),
    borderRadius: normalize(12),
    marginTop: normalize(5),
  },
  notLoggedText: {
    fontSize: normalize(18),
    color: COLORS.white,
    textAlign: 'center',
    marginTop: normalize(40),
  },
  logoutButton: {
    marginTop: normalize(40),
    backgroundColor: COLORS.quaternary,

    paddingVertical: normalize(12),
    paddingHorizontal: normalize(70),
    borderRadius: normalize(25),
    elevation: 5,
  },
  logoutText: {
    color: COLORS.secondary,
    fontSize: normalize(20),
    fontWeight: '700',
    textAlign: 'center',
  },
});
