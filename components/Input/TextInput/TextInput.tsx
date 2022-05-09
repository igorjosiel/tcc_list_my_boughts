import { ReactNode } from "react";
import StyledTextInput from "./TextInput.styles";

import TextInputProps from "./TextInput.types";

const TextInput: React.FC<TextInputProps> = (props: TextInputProps) => {
  return <StyledTextInput {...props} />;
};

export default TextInput;
