import styled from "styled-components/native";
import theme from "../../global/styles/theme";

export const Conatiner = styled.View`

`;

export const ContainerProductsList = styled.View`
    height: 82%;
    padding-top: 0;
`;

export const ContainerProductsListHeader = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 1rem;
    margin-right: 1rem;
    margin-left: 1rem;
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

export const ContainerProductData = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    background-color: #FFF;
    color: black;
    margin-top: 10px;
    margin-left: 5%;
    margin-right: 5%;
    padding: 15px;
    border-radius: 10px;
`;

export const ContainerStar = styled.View`
    margin-right: 0.4rem;
`;

export const ContainerActions = styled.View`
    max-width: 7rem;
    flex: 1;
    flex-direction: row;
    justify-content: space-between;
    background-color: ${theme?.colors?.primary};
    border-radius: 5px;
`;