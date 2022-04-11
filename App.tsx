import { ThemeProvider } from "styled-components";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import theme from './global/styles/theme';
import ListItens from "./screens/ListItens/ListItens";
import ProductsPage from "./screens/ProductsPage/ProductsPage";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name='ListItens'
            component={ListItens}
          />
          <Stack.Screen
            name='ProductsPage'
            component={ProductsPage}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}