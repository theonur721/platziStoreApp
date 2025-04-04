import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ROUTES} from './routes';
import Tabrouter from './Tabrouter';

const Stack = createNativeStackNavigator();

const Router = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={ROUTES.TAB} component={Tabrouter} />
    </Stack.Navigator>
  );
};

export default Router;
