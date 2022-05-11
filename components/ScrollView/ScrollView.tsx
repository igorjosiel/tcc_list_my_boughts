import { ScrollView } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";

import ScrollViewProps from "./ScrollView.types";
import theme from "../../global/styles/theme";
import { useSetFonts } from "../../hooks/useSetFonts";

import Text from "../Text/Text";
import Button from "../Button/Button";

const Scroll = (props: ScrollViewProps) => {
  const { data, onSelected, setPropertyNewProduct } = props;

  const Poppins_600SemiBold = useSetFonts("Poppins_600SemiBold");

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      {data?.map((eachData) => {
        return (
          <Button
            key={eachData?.id}
            onPress={() => {
              onSelected(eachData?.name);
              setPropertyNewProduct(eachData?.name, "category");
            }}
            backgroundColor={theme.colors.primary}
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-evenly"}
            alignItems={"center"}
            marginBottom={"2px"}
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
            {eachData?.library === "MaterialIcons" && (
              <MaterialIcons name={eachData?.icon} size={30} color={"#FFF"} />
            )}
            {eachData?.library === "FontAwesome" && (
              <FontAwesome name={eachData?.icon} size={30} color={"#FFF"} />
            )}
            {eachData?.library === "MaterialCommunityIcons" && (
              <MaterialCommunityIcons
                name={eachData?.icon}
                size={30}
                color={"#FFF"}
              />
            )}
            {eachData?.library === "AntDesign" && (
              <AntDesign name={eachData?.icon} size={30} color={"#FFF"} />
            )}
          </Button>
        );
      })}
    </ScrollView>
  );
};

export default Scroll;