import { ReactNode } from "react";
import { TouchableOpacityProps } from "react-native";
export default interface ButtonProps extends TouchableOpacityProps {
  backgroundColor: string;
  height: string;
  width: string;
  borderBottomLeftRadius?: string;
  borderBottomRightRadius?: string;
  borderTopLeftRadius?: string;
  borderTopRightRadius?: string;
  display: string;
  flexDirection: string;
  justifyContent: string;
  alignItems: string;
  children: ReactNode;
}
