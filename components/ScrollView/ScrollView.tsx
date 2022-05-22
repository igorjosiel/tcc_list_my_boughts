import { ScrollView } from "react-native";
import Factory from "../Factory/Factory";

import ScrollViewProps from "./ScrollView.types";
import theme from "../../global/styles/theme";
import { useSetFonts } from "../../hooks/useSetFonts";

import Text from "../Text/Text";
import Button from "../Button/Button";

const Scroll = (props: ScrollViewProps) => {
  const { data, scrollName, onSelected, setPropertyNewProduct } = props;

  const Poppins_600SemiBold = useSetFonts("Poppins_600SemiBold");

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <Button
        height={"48px"}
        backgroundColor={theme.colors.primary}
        flexDirection={"row"}
        justifyContent={"center"}
        alignItems={"center"}
        marginBottom={"2px"}
        padding={"5px"}
        borderBottomLeftRadius={"0px"}
        borderBottomRightRadius={"0px"}
        borderBottomColor={"#ffffff"}
        borderBottomWidth={"5px"}
      >
        <Text
          fontFamily={Poppins_600SemiBold}
          fontSize={20}
          color={"white"}
        >
          {scrollName && scrollName === "category" ? "Categoria" : "Prioridade"}
        </Text>
      </Button>
      {data?.map((eachData) => {
        return (
          <Button
            key={eachData?.id}
            onPress={() => {
              onSelected(eachData?.value);
              setPropertyNewProduct(eachData?.value, scrollName);
            }}
            height={"48px"}
            backgroundColor={theme.colors.primary}
            flexDirection={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
            marginBottom={"2px"}
            padding={"5px"}
            borderBottomLeftRadius={"0px"}
            borderBottomRightRadius={"0px"}
            borderBottomColor={"#ffffff"}
            borderBottomWidth={"3px"}
          >
            <Text
              fontFamily={Poppins_600SemiBold}
              fontSize={18}
              color={"white"}
            >
              {eachData?.name}
            </Text>
            <Factory library={eachData?.library} icon={eachData?.icon} />
          </Button>
        );
      })}
    </ScrollView>
  );
};

export default Scroll;
