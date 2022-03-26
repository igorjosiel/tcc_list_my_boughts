import React from "react";
import StyledText from "./Text.styles";
import { TextProps } from "./Text.types";

const Text: React.FC<TextProps> = (props: TextProps) => {
    return (
        <StyledText {...props}>
            {props?.children}
        </StyledText>
    );
}

export default Text;