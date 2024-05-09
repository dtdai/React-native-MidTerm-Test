import { createStackNavigator } from "@react-navigation/stack";
import { useMyContextProvider } from "./firestore";
import Login from '../screens/Login';
import Register from '../screens/Register'
import Home from "../screens/Home";

const Stack = createStackNavigator()
const MyStack = ({ navigation }) => {
  const [controller, dispatch] = useMyContextProvider()
  const { userLogin } = controller

  return (
    <Stack.Navigator initialRouteName='Login'>
      <Stack.Screen name='Login' component={Login} options={{ headerTitleAlign: 'center' }} />
      <Stack.Screen name='Register' component={Register} options={{ headerTitleAlign: 'center' }} />
      <Stack.Screen name='Home' component={Home}
        options={{
          headerTitleAlign: 'center',
          headerLeft: null,
          headerTitleStyle: { fontStyle: 'italic' },
          title: 'Hello ' + (userLogin != null && userLogin.fullName)
        }} />
    </Stack.Navigator>
  )
}

export default MyStack