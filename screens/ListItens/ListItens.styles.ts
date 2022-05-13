import styled from "styled-components/native";
import theme from "../../global/styles/theme";

export const Conatiner = styled.View`

`;

export const ContainerProductsList = styled.View`
    height: 82%;
    padding-top: 0;
`;

export const ContainerNewProduct = styled.View`
    flex-direction: row;
    background-color: ${theme?.colors?.primary};
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10;
    margin-top: 10;
    margin-left: 5%;
    margin-right: 5%;
    padding: 1rem;
    border-radius: 10px;
`;