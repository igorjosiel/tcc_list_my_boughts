import styled from "styled-components/native";

import theme from "../../global/styles/theme";

const CenteredView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-top: 22;
`;

const ModalView = styled.View`
    margin: 20px;
    background-color: white;
    border-radius: 20;
    padding: 35px;
    align-items: center;
    shadow-color: #000;
    shadow-offset: {
        width: 0,
        height: 2,
    };
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

const ScrollViewContainer = styled.View`
  background-color: ${theme?.colors?.primary};
  padding: 4px;
  border-radius: 6px;
  max-height: 150px;
  width: 100%;
`;

export {
  CenteredView,
  ModalView,
  ModalTitle,
  AmountContainer,
  CategoryContainer,
  ScrollViewContainer,
};
