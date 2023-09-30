import { ReactNode } from "react";
import { TouchableOpacityProps } from "react-native";
export default interface ButtonProps extends TouchableOpacityProps {
  backgroundColor?: string;
  height?: string;
  width?: string;
  borderBottomLeftRadius?: string;
  borderBottomRightRadius?: string;
  borderTopLeftRadius?: string;
  borderTopRightRadius?: string;
  borderWidth?: string;
  borderColor?: string;
  borderRadius?: string;
  borderBottomColor?: string;
  borderBottomWidth?: string;
  padding?: string;
  marginBottom?: string;
  marginLeft?: string;
  marginRight?: string;
  display?: string;
  flexDirection?: string;
  justifyContent?: string;
  alignItems?: string;
  textAlign?: string;
  children: ReactNode;
}
