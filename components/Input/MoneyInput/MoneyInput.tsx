import MoneyInputProps from "./MoneyInput.types";
import StyledMoneyInput from "./MoneyInput.styles";

const MoneyInput: React.FC<MoneyInputProps> = (props: MoneyInputProps) => {
  return <StyledMoneyInput {...props} />;
};

export default MoneyInput;
