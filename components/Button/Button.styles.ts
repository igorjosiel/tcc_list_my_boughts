import styled from "styled-components/native";

import ButtonProps from "./Button.types";
import theme from "../../global/styles/theme";

const StyledButton = styled.TouchableOpacity<ButtonProps>`
  background-color: ${(props) => props?.backgroundColor ? props?.backgroundColor : theme?.colors?.primary};
  height: ${(props) => props?.height ? props?.height : "60px"};
  width: ${(props) => props?.width ? props?.width : "100%"};
  border-bottom-left-radius: ${(props) => props?.borderBottomLeftRadius ? props?.borderBottomLeftRadius : 10};
  border-bottom-right-radius: ${(props) => props?.borderBottomRightRadius ? props?.borderBottomRightRadius : 10};
  border-top-left-radius: ${(props) => props?.borderTopLeftRadius ? props?.borderTopLeftRadius : 10};
  border-top-right-radius: ${(props) => props?.borderTopRightRadius ? props?.borderTopRightRadius : 10};
  display: flex;
  flex-direction: ${(props) => props?.flexDirection ? props?.flexDirection : "column"};
  justify-content: ${(props) => props?.justifyContent ? props?.justifyContent : "space-around"};
  align-items: ${(props) => props?.alignItems ? props?.alignItems : "center"};
  border-width: ${(props) => props?.borderWidth ? props?.borderWidth : 0};
  border-color: ${(props) => props?.borderColor ? props?.borderColor : "#000"};
  border-radius: ${(props) => props?.borderRadius ? props?.borderRadius : "0px"};
  border-bottom-color: ${(props) => props?.borderBottomColor ? props?.borderBottomColor : "#000"};
  border-bottom-width: ${(props) => props?.borderBottomWidth ? props?.borderBottomWidth : 0};
  padding: ${(props) => (props?.padding ? props?.padding : "0px")};
  margin-bottom: ${(props) => props?.marginBottom ? props?.marginBottom : "0px"};
  margin-left: ${(props) => props?.marginLeft ? props?.marginLeft : "0px"};
  margin-right: ${(props) => props?.marginRight ? props?.marginRight : "0px"};
  text-align: ${(props) => props?.textAlign ? props?.textAlign : "auto"};
  `;

export default StyledButton;
