import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Lyrics from "../tabs/Lyrics";
import Home from "../tabs/Home";
const Stack = createNativeStackNavigator();

export default function StackTab() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Lyrics" component={Lyrics} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
