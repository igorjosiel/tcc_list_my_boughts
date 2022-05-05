import styled from "styled-components/native";

import { TextProps } from "./Text.types";

const StyledText = styled.Text<TextProps>`
  font-family: ${(props) => props?.fontFamily};
  font-size: ${(props) => props?.fontSize};
  color: ${(props) => (props?.color ? props?.color : "#FFF")};
`;

export default StyledText;
