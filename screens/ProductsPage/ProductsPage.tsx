import { useState } from "react";
import { View, ImageBackground, TextInput, Pressable } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import CurrencyInput from "react-native-currency-input";

import { useSetFonts } from "../../hooks/useSetFonts";
import compras from "../../assets/compras.jpg";
import Text from "../../components/Text/Text";
import theme from "../../global/styles/theme";

const ProductsPage = ({ navigation, route }) => {
  const item = route?.params?.item;

  const Poppins_600SemiBold = useSetFonts("Poppins_600SemiBold");

  const [selectedValue, setSelectedValue] = useState<number>(0);
  const [isDropDownPickerOpen, setIsDropDownPickerOpen] =
    useState<boolean>(false);
  const [product, setProduct] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [price, setPrice] = useState<number | null>(0);
  const [category, setCategory] = useState<string>("");
  const [items, setItems] = useState([
    {
      label: "Comida",
      value: "Comida",
      icon: () => <Icon size={25} color="#000" name="food" />,
    },
    {
      label: "Limpeza",
      value: "Limpeza",
      icon: () => <Icon size={25} color="#000" name="broom" />,
    },
    {
      label: "PetShop",
      value: "PetShop",
      icon: () => <Icon size={25} color="#000" name="dog" />,
    },
  ]);

  const values = ["Alimento", "Hortfruti", "Limpeza", "Laticíneo", "PetShop"];

  return (
    <>
      <ImageBackground
        source={compras}
        style={{
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            height: "50%",
            width: "80%",
            backgroundColor: "white",
            borderRadius: 20,
            padding: "3%",
          }}
        >
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "5%",
              marginTop: "5%",
            }}
          >
            <Text fontFamily={Poppins_600SemiBold} fontSize={22}>
              Informações do Produto
            </Text>
          </View>
          <TextInput
            style={{
              height: 60,
              width: "100%",
              marginBottom: "5%",
              borderWidth: 3,
              borderColor: theme.colors.primary,
              padding: 10,
              borderRadius: 10,
              fontSize: 20,
              shadowOffset: { width: 0, height: 1 },
            }}
            onChangeText={(value) => setProduct(value)}
            value={item?.product}
            placeholder="Nome do produto"
            keyboardType="default"
          />
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <TextInput
              style={{
                height: 60,
                width: "45%",
                marginBottom: "5%",
                borderWidth: 3,
                borderColor: theme.colors.primary,
                padding: 10,
                borderRadius: 10,
                fontSize: 20,
                shadowOffset: { width: 0, height: 1 },
              }}
              keyboardType={"numeric"}
              onChangeText={(value) => {
                console.log("Deu: ", parseInt(value));
                setAmount(value);
              }}
              value={item?.amount}
              placeholder="Quantidade"
              maxLength={10}
            />
            <CurrencyInput
              style={{
                height: 60,
                width: "50%",
                marginBottom: "5%",
                borderWidth: 3,
                borderColor: theme.colors.primary,
                padding: 10,
                borderRadius: 10,
                fontSize: 20,
                shadowOffset: { width: 0, height: 1 },
              }}
              placeholder="Preço"
              value={item?.price}
              onChangeValue={(value) => setPrice(value)}
              prefix="R$ "
              delimiter="."
              separator=","
              precision={2}
              minValue={0}
            />
            {/* <TextInput
                            
                            onChangeText={(value) => setPrice(value)}
                            value={price}
                            placeholder="Preço"
                            keyboardType="number-pad"
                        /> */}
          </View>
        </View>
      </ImageBackground>
    </>
  );
};

export default ProductsPage;
