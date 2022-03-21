import React from 'react';

import { ThemeProvider } from 'styled-components';
import theme from '../styles';

type ThemeProps = {
    children: React.ReactNode,
}
console.log('Tema: ', theme)
export function Theme({ children }: ThemeProps) {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}