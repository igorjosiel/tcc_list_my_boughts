import styled from "styled-components/native";
import theme from "../../global/styles/theme";

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
    margin-bottom: 5px;
    margin-top: 5px;
    margin-left: 5%;
    margin-right: 5%;
    padding: 0.7rem;
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
    padding: 0px 15px;
    height: 3.8rem;
    border-radius: 10px;
`;

export const ContainerStar = styled.View`
    margin-right: 0.4rem;
`;

export const ContainerActions = styled.View`
    max-width: 7rem;
    height: 80%;
    flex: 1;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: ${theme?.colors?.primary};
    border-radius: 5px;
`;

export const ContainerFooter = styled.View`
    height: 8%;
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