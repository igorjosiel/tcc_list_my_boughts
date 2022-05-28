import styled from "styled-components/native";
import theme from "../../global/styles/theme";

import { ContainerScreenProps } from "./ListItens.types";

export const ContainerProductsList = styled.View<ContainerScreenProps>`
    height: 80%;
    padding-top: 0px;
`;

export const ContainerProductsListHeader = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 16px;
    margin-right: 16px;
    margin-left: 16px;
`;

export const ContainerNewProduct = styled.View`
    flex-direction: row;
    background-color: ${theme?.colors?.primary};
    align-items: center;
    justify-content: space-between;
    margin-bottom: 5px;
    margin-left: 5%;
    margin-right: 5%;
    padding: 10px;
    border-radius: 10px;
`;

export const ContainerProductData = styled.View`
    margin-bottom: 10px;
    background-color: #FFF;
    color: black;
    margin-top: 10px;
    margin-left: 5%;
    margin-right: 5%;
    padding: 0px 15px;
    height: 105px;
    border-radius: 10px;
`;

export const ContainerData = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

export const ContainerStar = styled.View`
    margin-right: 6px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const ContainerActions = styled.View`
    max-width: 90px;
    height: 70%;
    flex: 1;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    background-color: ${theme?.colors?.primary};
    border-radius: 5px;
`;

export const ContainerFooter = styled.View<ContainerScreenProps>`
    height: 10%;
    padding-top: 3%;
    margin-right: 20px;
    margin-left: 10px;
`;

export const ContainerActionsFooter = styled.View`
    display: flex;
    flex-direction: row;
`;

export const ContainerButtonsActions = styled.View`
    display: flex;
    flex-direction: row;
    width: 40%;
    justify-content: space-around;
`;

export const ContainerTotalValue = styled.View`
    background-color: ${theme?.colors?.primary}
    width: 60%;
    border-radius: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    padding-right: 3%;
    padding-left: 3%;
`;

export const ContainerProductsCategory = styled.View`
    border-bottom-width: 4px;
    border-bottom-color: ${theme?.colors?.primary};
`;