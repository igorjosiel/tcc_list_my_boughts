import { ReactNode } from "react";
import { TextProps as Props } from "react-native";

export interface TextProps extends Props {
  fontFamily: string;
  fontSize: number;
  color?: string;
  children: ReactNode | string | number;
}