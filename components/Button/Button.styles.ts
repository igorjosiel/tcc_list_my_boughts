import styled from "styled-components/native";

import ButtonProps from "./Button.types";

const StyledButton = styled.TouchableOpacity<ButtonProps>`
  background-color: ${(props) => props?.backgroundColor};
  height: ${(props) => props?.height};
  min-height: ${(props) => props?.minHeight};
  width: ${(props) => props?.width};
  max-width: ${(props) => props?.maxWidth};
  border-bottom-left-radius: ${(props) => props?.borderBottomLeftRadius};
  border-bottom-right-radius: ${(props) => props?.borderBottomRightRadius};
  border-top-left-radius: ${(props) => props?.borderTopLeftRadius};
  border-top-right-radius: ${(props) => props?.borderTopRightRadius};
  display: ${(props) => props?.display};
  flex-direction: ${(props) => props?.flexDirection};
  justify-content: ${(props) => props?.justifyContent};
  align-items: ${(props) => props?.alignItems};
  border-width: ${(props) => props?.borderWidth};
  border-color: ${(props) => props?.borderColor};
  border-radius: ${(props) => props?.borderRadius};
  border-bottom-color: ${(props) => props?.borderBottomColor};
  border-bottom-width: ${(props) => props?.borderBottomWidth};
  padding: ${(props) => (props?.padding ? props?.padding : "0px")};
  margin-bottom: ${(props) => props?.marginBottom};
`;

export default StyledButton;
