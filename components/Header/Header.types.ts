import { ReactNode } from "react";
import { ViewProps } from "react-native";

export interface HeaderProps extends ViewProps {
    width: string,
    height: string,
    backgroundColor: string,
    marginLeft: string,
    marginRight: string,
    flex: number,
    flexDirection: string,
    alignItems: string,
    justifyContent: string,
    children: ReactNode,
}