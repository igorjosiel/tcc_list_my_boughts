import styled from "styled-components/native";

import ButtonProps from "./Button.types";

const StyledButton = styled.TouchableOpacity<ButtonProps>`
  background-color: ${(props) => props?.backgroundColor};
  height: ${(props) => props?.height};
  width: ${(props) => props?.width};
  border-bottom-left-radius: ${(props) => props?.borderBottomLeftRadius};
  border-bottom-right-radius: ${(props) => props?.borderBottomRightRadius};
  border-top-left-radius: ${(props) => props?.borderTopLeftRadius};
  border-top-right-radius: ${(props) => props?.borderTopRightRadius};
  display: ${(props) => props?.display};
  flex-direction: ${(props) => props?.flexDirection};
  justify-content: ${(props) => props?.justifyContent};
  align-items: ${(props) => props?.alignItems};
`;

export default StyledButton;
