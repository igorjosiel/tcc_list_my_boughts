import styled from "styled-components/native";

import theme from "../../global/styles/theme";
import { ScrollViewContainerProps } from "./ModalForm.types";

const CenteredView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-top: 22;
`;

const ModalView = styled.View`
    margin: 20px;
    width: 90%;
    padding: 25px;
    background-color: white;
    border-radius: 10px;
    align-items: center;
`;

const ModalTitle = styled.View`
  align-items: center;
  justify-content: center;
  margin-bottom: 5%;
`;

const AmountContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const CategoryContainer = styled.View`
  width: 100%;
`;

const PriorityContainer = styled(CategoryContainer)`
  margin-top: 16px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 5px;
`;

const ScrollViewContainer = styled.View<ScrollViewContainerProps>`
  background-color: ${theme?.colors?.primary};
  padding: 4px;
  border-radius: 6px;
  max-height: 150px;
  width: ${(props) => props?.width ? props?.width : "100%"};
  margin-right: ${(props) => props?.marginRight ? props?.marginRight : "0px"};
`;

const ButtonsContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding-top: 14px;
  height: 75px;
`;

export {
  CenteredView,
  ModalView,
  ModalTitle,
  AmountContainer,
  CategoryContainer,
  ScrollViewContainer,
  PriorityContainer,
  ButtonsContainer,
};
