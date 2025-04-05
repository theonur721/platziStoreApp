import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import {ROUTES} from './routes';
import SearchScreen from '../screens/SearchScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CartScreen from '../screens/CartScreen';
import FavoriteScreen from '../screens/FavoriteScreen';
import {View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../theme/colors';

const Tab = createBottomTabNavigator();

const Tabrouter = () => {
  return (
    <View style={styles.container}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false, // Üst başlıkları kaldır
          tabBarStyle: {
            backgroundColor: COLORS.secondary,
            height: 80,
            paddingTop: 5,
          },
          tabBarActiveTintColor: COLORS.primary,
          tabBarInactiveTintColor: COLORS.tertiary,
          tabBarLabelStyle: {
            fontSize: 12,
          },
        }}>
        <Tab.Screen
          name={ROUTES.HOME}
          component={HomeScreen}
          options={{
            tabBarIcon: ({color, size, focused}) => (
              <Icon
                name={focused ? 'home' : 'home-outline'}
                color={color}
                size={27}
              /> // Focus durumuna göre ikon değişiyor
            ),
          }}
        />
        <Tab.Screen
          name={ROUTES.SEARCH}
          component={SearchScreen}
          options={{
            tabBarIcon: ({color, size, focused}) => (
              <Icon
                name={focused ? 'search-circle' : 'search'}
                color={color}
                size={27}
              /> // Focus durumuna göre ikon değişiyor
            ),
          }}
        />
        <Tab.Screen
          name={ROUTES.FAVORITE}
          component={FavoriteScreen}
          options={{
            tabBarIcon: ({color, size, focused}) => (
              <Icon
                name={focused ? 'heart' : 'heart-outline'}
                color={color}
                size={27}
              /> // Focus durumuna göre ikon değişiyor
            ),
          }}
        />
        <Tab.Screen
          name={ROUTES.CART}
          component={CartScreen}
          options={{
            tabBarIcon: ({color, size, focused}) => (
              <Icon
                name={focused ? 'cart' : 'cart-outline'}
                color={color}
                size={27}
              /> // Focus durumuna göre ikon değişiyor
            ),
          }}
        />
        <Tab.Screen
          name={ROUTES.PROFILE}
          component={ProfileScreen}
          options={{
            tabBarIcon: ({color, size, focused}) => (
              <Icon
                name={focused ? 'person' : 'person-outline'}
                color={color}
                size={27}
              /> // Focus durumuna göre ikon değişiyor
            ),
          }}
        />
      </Tab.Navigator>
    </View>
  );
};

export default Tabrouter;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
