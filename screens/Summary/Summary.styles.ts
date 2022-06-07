import styled from "styled-components/native";

import { CellProps } from "./Summary.types";

export const Cells = styled.View<CellProps>`
  width: ${(props) => props?.width && props?.width};
  height: 35px;
  display: flex;
  flex-direction: row;
  justify-content: ${(props) => props?.justifyContent && props?.justifyContent};
  align-items: center;
`;

export const ValueCells = styled.View`
  display: flex;
  flex-direction: row;
  padding-left: 3%;
  padding-right: 3%;
`;

export const ContainerTotalValue = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  margin-left: 5%;
  margin-right: 5%;
`;

export const ContainerTotalValueText = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  padding-left: 5px;
`;

export const ContainerButtons = styled.View`
  height: 10%;
  width: 90%;
  margin-left: 5%;
  margin-right: 5%;
`;

export const Buttons = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
