import styled, { css } from 'styled-components/native';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export const ContainerScreen = styled.View`
    ${({ theme }) => css`
        flex: 1;
        background-color: ${theme?.colors?.primary};
        color: ${theme?.colors?.primary};
        align-items: center;
        justify-content: center;
    `}
`;