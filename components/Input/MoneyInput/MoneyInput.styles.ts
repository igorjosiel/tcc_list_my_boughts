import styled from "styled-components/native";
import CurrencyInput from "react-native-currency-input";

import theme from "../../../global/styles/theme";
import MoneyInputProps from "./MoneyInput.types";

const MoneyInput = styled(CurrencyInput)<MoneyInputProps>`
  height: 60px;
  width: 100%;
  margin-bottom: 5%;
  border-width: 3px;
  border-color: ${theme.colors.primary};
  padding: 10px;
  border-radius: 10px;
  font-size: 18px;
  font-family: ${(props) => props?.fontFamily};
`;

export default MoneyInput;
