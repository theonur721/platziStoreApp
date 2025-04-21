import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ROUTES} from './routes';
import Tabrouter from './Tabrouter';
import AllProductsScreen from '../screens/details/AllProductsScreen';
import ProductDetail from '../screens/details/ProductDetail';
import LoginScreen from '../screens/LoginScreen';

const Stack = createNativeStackNavigator();

const Router = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={ROUTES.LOGIN} component={LoginScreen} />
      <Stack.Screen name={ROUTES.TAB} component={Tabrouter} />
      <Stack.Screen name={ROUTES.PRODUCTS} component={AllProductsScreen} />
      <Stack.Screen name={ROUTES.PRODUCTDETAIL} component={ProductDetail} />
    </Stack.Navigator>
  );
};

export default Router;
