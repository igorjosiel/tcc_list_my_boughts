import ButtonProps from "./Button.types";

import StyledButton from "./Button.styles";

const Button = (props: ButtonProps) => {
  return <StyledButton {...props}></StyledButton>;
};

export default Button;
