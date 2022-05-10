import ButtonProps from "./Button.types";

import StyledButton from "./Button.styles";

const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
  return <StyledButton {...props} />;
};

export default Button;
