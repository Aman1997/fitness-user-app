import {createStackNavigator} from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import {homeScreen} from "./routes";

const Stack = createStackNavigator();

const noHeader = {headerShown: false};

const AppNavigator = () => (
  <Stack.Navigator initialRouteName={homeScreen}>
    <Stack.Screen name={homeScreen} component={HomeScreen} options={noHeader} />
  </Stack.Navigator>
);

export default AppNavigator;
