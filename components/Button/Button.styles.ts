import styled from "styled-components/native";

import ButtonProps from "./Button.types";

const StyledButton = styled.TouchableOpacity<ButtonProps>`
  background-color: ${(props) => props?.backgroundColor};
  height: ${(props) => props?.height};
  width: ${(props) => props?.width};
  max-width: ${(props) => props?.maxWidth};
  border-bottom-left-radius: ${(props) => props?.borderBottomLeftRadius ? props?.borderBottomLeftRadius : 10};
  border-bottom-right-radius: ${(props) => props?.borderBottomRightRadius ? props?.borderBottomRightRadius : 10};
  border-top-left-radius: ${(props) => props?.borderTopLeftRadius ? props?.borderTopLeftRadius : 10};
  border-top-right-radius: ${(props) => props?.borderTopRightRadius ? props?.borderTopRightRadius : 10};
  display: flex;
  flex-direction: ${(props) => props?.flexDirection ? props?.flexDirection : "column"};
  justify-content: ${(props) => props?.justifyContent};
  align-items: ${(props) => props?.alignItems};
  border-width: ${(props) => props?.borderWidth ? props?.borderWidth : 0};
  border-color: ${(props) => props?.borderColor ? props?.borderColor : "#000"};
  border-radius: ${(props) => props?.borderRadius};
  border-bottom-color: ${(props) => props?.borderBottomColor ? props?.borderBottomColor : "#000"};
  border-bottom-width: ${(props) => props?.borderBottomWidth ? props?.borderBottomWidth : 0};
  padding: ${(props) => (props?.padding ? props?.padding : "0px")};
  margin-bottom: ${(props) => props?.marginBottom};
  margin-left: ${(props) => props?.marginLeft};
  margin-right: ${(props) => props?.marginRight ? props?.marginRight : "0px"};
  text-align: ${(props) => props?.textAlign ? props?.textAlign : "auto"};
`;

export default StyledButton;
