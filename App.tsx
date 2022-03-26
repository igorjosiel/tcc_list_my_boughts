import { ThemeProvider } from "styled-components";

import theme from './global/styles/theme';
import ListItens from "./screens/ListItens/ListItens";

export default function App() {
  console.log('Deu: ', theme.colors.primary);
  return (
    <ThemeProvider theme={theme}>
      <ListItens />
    </ThemeProvider>
  )
}