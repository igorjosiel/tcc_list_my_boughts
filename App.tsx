import { ThemeProvider } from "styled-components";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import theme from './global/styles/theme';
import ListItens from "./screens/ListItens/ListItens";
import Summary from "./screens/Summary/Summary";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name='ListItens'
            component={ListItens}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='Summary'
            component={Summary}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}