import styled from "styled-components/native";

import theme from "../../../global/styles/theme";
import TextInputProps from "./TextInput.types";

const TextInput = styled.TextInput<TextInputProps>`
  height: 60px;
  width: ${(props) => props?.width};
  margin-bottom: 5%;
  border-width: 3px;
  border-color: ${theme?.colors?.primary};
  padding: 10px;
  border-radius: ${(props) => props?.borderRadius};
  font-size: 18px;
  /* font-family: ${(props) => props?.fontFamily}; */
`;

export default TextInput;
