import React from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import ContainerHeader from "./Header.styles";
import Text from "../Text/Text";
import theme from "../../global/styles/theme";

const Header: React.FC = () => {
  return (
    <ContainerHeader
      width={"100%"}
      height={"20%"}
      backgroundColor={theme.colors.primary}
      marginLeft={"auto"}
      marginRight={"auto"}
      flex={1}
      flexDirection={"row"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Text fontSize={30}>
        LI$TA
      </Text>
      <FontAwesome size={40} color="#fff" name="shopping-cart" />
    </ContainerHeader>
  );
};

export default Header;
