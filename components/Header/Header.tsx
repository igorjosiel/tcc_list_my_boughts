import React from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import { useSetFonts } from "../../hooks/useSetFonts";

import ContainerHeader from "./Header.styles";
import Text from "../Text/Text";
import theme from "../../global/styles/theme";

const Header: React.FC = () => {
    const Poppins_600SemiBold = useSetFonts("Poppins_600SemiBold");

    return (
        <ContainerHeader
            width={"100%"}
            height={"10%"}
            backgroundColor={theme.colors.primary}
            maxHeight={"3.5rem"}
            marginLeft={"auto"}
            marginRight={"auto"}
            flex={1}
            flexDirection={"row"}
            alignItems={"center"}
            justifyContent={"center"}
        >
            <Text fontFamily={Poppins_600SemiBold} fontSize={25}>
                Lista de Compras
            </Text>
            <FontAwesome size={40} color="#fff" name="shopping-cart" />
        </ContainerHeader>
    );
};

export default Header;