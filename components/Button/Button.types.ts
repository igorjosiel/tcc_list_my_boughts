import { ReactNode } from "react";
import { TouchableOpacityProps } from "react-native";
export default interface ButtonProps extends TouchableOpacityProps {
  backgroundColor?: string;
  height?: string;
  minHeight?: string;
  width?: string;
  maxWidth?: string;
  borderBottomLeftRadius?: string;
  borderBottomRightRadius?: string;
  borderTopLeftRadius?: string;
  borderTopRightRadius?: string;
  borderWidth?: number;
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
  children: ReactNode;
}
