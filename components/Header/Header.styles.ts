import styled from "styled-components/native";

import { HeaderProps } from "./Header.types";

const ContainerHeader = styled.View<HeaderProps>`
    width: ${props => props?.width};
    height: ${props => props?.height};
    background-color: ${props => props?.backgroundColor};
    margin-left: ${props => props?.marginLeft};
    margin-right: ${props => props?.marginRight};
    flex: ${props => props?.flex};
    flex-direction: ${props => props?.flexDirection};
    align-items: ${props => props?.alignItems};
    justify-content: ${props => props?.justifyContent};
    padding-bottom: 5px;
`;

export default ContainerHeader;