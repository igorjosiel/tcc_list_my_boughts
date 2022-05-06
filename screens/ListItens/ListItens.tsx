import React, { useState, useEffect } from "react";
import { Conatiner } from "./ListItens.styles";
import {
  StyleSheet,
  Pressable,
  View,
  ScrollView,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
  Button,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";

import CurrencyInput from "react-native-currency-input";

import { useSetFonts } from "../../hooks/useSetFonts";
import Text from "../../components/Text/Text";
import theme from "../../global/styles/theme";
import compras from "../../assets/cart.jpg";
interface Category {
  id: number;
  name: string;
  icon: string;
  iconColor: string;
  library: string;
}

const categories = [
  {
    id: 0,
    name: "Comida",
    icon: "restaurant",
    library: "MaterialIcons",
  },
  {
    id: 1,
    name: "Limpeza",
    icon: "cleaning-services",
    library: "MaterialIcons",
  },
  {
    id: 2,
    name: "Bebida",
    icon: "local-drink",
    library: "MaterialIcons",
  },
  {
    id: 3,
    name: "Gelados",
    icon: "ice-cream",
    library: "MaterialCommunityIcons",
  },
  {
    id: 4,
    name: "Higiene",
    icon: "clean-hands",
    library: "MaterialIcons",
  },
  {
    id: 5,
    name: "Vestuário",
    icon: "hanger",
    library: "MaterialCommunityIcons",
  },
  {
    id: 6,
    name: "Saúde",
    icon: "medicinebox",
    library: "AntDesign",
  },
  {
    id: 7,
    name: "Música",
    icon: "music",
    library: "FontAwesome",
  },
  {
    id: 8,
    name: "Entretenimento",
    icon: "television-guide",
    library: "MaterialCommunityIcons",
  },
  {
    id: 9,
    name: "Tecnologia",
    icon: "computer",
    library: "MaterialIcons",
  },
  {
    id: 10,
    name: "Jogos",
    icon: "gamepad",
    library: "FontAwesome",
  },
  {
    id: 11,
    name: "Cosméticos",
    icon: "lipstick",
    library: "MaterialCommunityIcons",
  },
  {
    id: 12,
    name: "Festa",
    icon: "party-popper",
    library: "MaterialCommunityIcons",
  },
  {
    id: 13,
    name: "Brinquedo",
    icon: "puzzle-piece",
    library: "FontAwesome",
  },
  {
    id: 14,
    name: "Ferramentas",
    icon: "build",
    library: "MaterialIcons",
  },
  {
    id: 15,
    name: "Construção",
    icon: "dump-truck",
    library: "MaterialCommunityIcons",
  },
  {
    id: 16,
    name: "Plantas",
    icon: "flower-outline",
    library: "MaterialCommunityIcons",
  },
  {
    id: 17,
    name: "Animais",
    icon: "pets",
    library: "MaterialIcons",
  },
];

const ListItens = ({ navigation }) => {
  const Poppins_400Regular = useSetFonts("Poppins_600SemiBold");
  const Poppins_600SemiBold = useSetFonts("Poppins_600SemiBold");

  interface Item {
    id: number;
    amount: number;
    product: string;
    category: string;
    price: number;
    priority: boolean;
  }

  const [listItems, setListItems] = useState<Item[]>([
    {
      id: 0,
      amount: 2,
      product: "Testandodsdsdsdsdsdsdsdsd dadadsdsdsdsdsdsd",
      category: "comida",
      price: 10,
      priority: true,
    },
    {
      id: 1,
      amount: 2,
      product: "Teste",
      category: "comida",
      price: 10,
      priority: false,
    },
  ]);
  const [item, setItem] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [showOption, setShowOption] = useState<boolean>(false);
  const [idGenerator, setIdGenerator] = useState<number>(0);
  const [totalValue, setTotalValue] = useState<number>(0);

  const onSelect = (category: string) => {
    setShowOption(false);
    setSelectedCategory(category);
  };

  const addItemToList = () => {
    if (!item || !selectedCategory) return;

    const newItem = {
      id: idGenerator,
      amount: 1,
      product: item,
      category: "",
      price: 0.0,
    };

    // setTotalValue(oldState => oldState + (item?.price * parseInt(item?.amount)));
    setListItems((oldState) => [...oldState, newItem]);
    setIdGenerator((oldState) => oldState + 1);
    setItem("");
    setSelectedCategory("");
  };

  const removeItemToList = (id: number) => {
    const listItemsFiltered: Item[] = listItems?.filter(
      (item) => item.id !== id
    );

    setListItems(listItemsFiltered);
  };

  function increaseItemAmount(id: number) {
    const newItems: Item[] = listItems?.map((item) =>
      item.id === id
        ? {
            ...item,
            amount: item?.amount + 1,
          }
        : item
    );

    setListItems(newItems);
  }

  function decreaseItemAmount(id: number) {
    const newItems: Item[] = listItems?.map((item) =>
      item.id === id
        ? {
            ...item,
            amount: item?.amount - 1,
          }
        : item
    );

    setListItems(newItems);
  }

  function editItemName(value: string) {
    setItem(value);
  }

  return (
    <>
      <ImageBackground source={compras} style={styles.image}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "5%",
                  // marginTop: "5%",
                }}
              >
                <Text
                  fontFamily={Poppins_600SemiBold}
                  fontSize={22}
                  color={"#000"}
                >
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
                // onChangeText={(value) => setProduct(value)}
                // value={item?.product}
                placeholder="Nome do produto"
                keyboardType="default"
              />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
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
                  // onChangeText={(value) => {
                  //   console.log("Deu: ", parseInt(value));
                  //   setAmount(value);
                  // }}
                  // value={item?.amount}
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
                  // value={item?.price}
                  value={0}
                  // onChangeValue={(value) => setPrice(value)}
                  prefix="R$ "
                  delimiter="."
                  separator=","
                  precision={2}
                  minValue={0}
                />
              </View>
              <View style={{ width: "100%", borderColor: "red" }}>
                <TouchableOpacity
                  style={styles.dropDownStyle}
                  activeOpacity={0.8}
                  onPress={() => setShowOption(!showOption)}
                >
                  <Text
                    fontFamily={Poppins_400Regular}
                    fontSize={20}
                    color={"#adadac"}
                  >
                    {selectedCategory ? selectedCategory : `Categoria`}
                  </Text>
                  <MaterialIcons
                    name={!showOption ? "arrow-drop-down" : "arrow-drop-up"}
                    size={35}
                    color={"black"}
                  />
                </TouchableOpacity>
              </View>
              {showOption && (
                <View
                  style={{
                    backgroundColor: theme?.colors?.primary,
                    padding: 4,
                    borderRadius: 6,
                    maxHeight: 150,
                    width: "100%",
                  }}
                >
                  <ScrollView
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                  >
                    {categories?.map((category) => {
                      return (
                        <TouchableOpacity
                          key={category?.id}
                          onPress={() => onSelect(category?.name)}
                          style={{
                            backgroundColor: theme.colors.primary,
                            paddingVertical: 8,
                            paddingHorizontal: 4,
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-evenly",
                            alignItems: "center",
                            marginBottom: 2,
                            borderBottomColor: "#ffffff",
                            borderBottomWidth: 3,
                          }}
                        >
                          <Text
                            fontFamily={Poppins_400Regular}
                            fontSize={20}
                            color={"white"}
                          >
                            {category?.name}
                          </Text>
                          {category?.library === "MaterialIcons" && (
                            <MaterialIcons
                              name={category?.icon}
                              size={30}
                              color={"#FFF"}
                            />
                          )}
                          {category?.library === "FontAwesome" && (
                            <FontAwesome
                              name={category?.icon}
                              size={30}
                              color={"#FFF"}
                            />
                          )}
                          {category?.library === "MaterialCommunityIcons" && (
                            <MaterialCommunityIcons
                              name={category?.icon}
                              size={30}
                              color={"#FFF"}
                            />
                          )}
                          {category?.library === "AntDesign" && (
                            <AntDesign
                              name={category?.icon}
                              size={30}
                              color={"#FFF"}
                            />
                          )}
                        </TouchableOpacity>
                      );
                    })}
                  </ScrollView>
                </View>
              )}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "100%",
                  paddingTop: "0.8rem",
                  height: "4.5rem",
                }}
              >
                <Pressable
                  onPress={() => setModalVisible(false)}
                  style={{
                    backgroundColor: theme.colors.primary,
                    // height: '10%',
                    width: "48%",
                    borderRadius: 10,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-around",
                  }}
                >
                  <Text fontFamily={Poppins_600SemiBold} fontSize={22}>
                    Cancelar
                  </Text>
                  {/* <MaterialCommunityIcons
                    size={25}
                    color="#FFF"
                    name="cancel"
                  /> */}
                </Pressable>
                <Pressable
                  onPress={() => {
                    // addItemToList({
                    //     product,
                    //     amount,
                    //     price,
                    //     category,
                    // });
                    navigation.navigate("ListItens");
                  }}
                  style={{
                    backgroundColor: theme.colors.primary,
                    // height: '10%',
                    width: "48%",
                    borderRadius: 10,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-around",
                  }}
                >
                  <Text fontFamily={Poppins_600SemiBold} fontSize={22}>
                    Salvar
                  </Text>
                  {/* <FontAwesome size={25} color="#fff" name="check" /> */}
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>

        <View
          style={{
            width: "100%",
            height: "10%",
            backgroundColor: theme.colors.primary,
            maxHeight: "3.5rem",
            marginLeft: "auto",
            marginRight: "auto",
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text fontFamily={Poppins_600SemiBold} fontSize={25}>
            Lista de Compras
          </Text>
          <Pressable
            onPress={() => addItemToList()}
            style={{
              backgroundColor: theme.colors.primary,
              height: 55,
              width: 55,
              borderRadius: 50,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FontAwesome size={40} color="#fff" name="shopping-cart" />
          </Pressable>
        </View>

        <View
          style={{
            height: "82%",
            // padding: '5%',
            paddingTop: 0,
            // backgroundColor: theme.colors.secondary
          }}
        >
          <ScrollView>
            <Conatiner style={styles.sectionNewItem}>
              <Pressable
                style={{
                  width: "100%",
                  shadowOpacity: "0.7",
                }}
                // onPress={() => navigation?.navigate("ProductsPage")}
                onPress={() => setModalVisible(true)}
              >
                <Text
                  fontFamily={Poppins_400Regular}
                  fontSize={20}
                  style={{ textAlign: "center" }}
                >
                  Novo Item
                </Text>
              </Pressable>
              {/* <Checkbox value={item?.checked} onValueChange={() => changeItemOfList(item?.id)} /> */}
            </Conatiner>
            {listItems?.map((item, index) => {
              return (
                <Conatiner style={styles.section} key={index}>
                  <View style={{ marginRight: "0.4rem" }}>
                    {item?.priority ? (
                      <FontAwesome name="star" size={25} color={"#FFA500"} />
                    ) : (
                      <FontAwesome name="star-o" size={25} color={"#000"} />
                    )}
                  </View>
                  <Pressable
                    style={{
                      width: "65%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "stretch",
                      maxWidth: "10rem",
                    }}
                    onPress={() =>
                      navigation?.navigate("ProductsPage", { item })
                    }
                  >
                    <View>
                      <Text
                        fontFamily={Poppins_400Regular}
                        fontSize={20}
                        color={"#000"}
                      >
                        {item?.product}
                      </Text>
                    </View>
                  </Pressable>
                  {/* <Checkbox value={item?.checked} onValueChange={() => changeItemOfList(item?.id)} /> */}
                  <View
                    style={{
                      maxWidth: "7rem",
                      flex: 1,
                      flexDirection: "row",
                      justifyContent: "space-between",
                      borderRadius: 5,
                    }}
                  >
                    {/* <Icon size={28} style={{ color: theme.colors.primary, marginBottom: 'auto', marginTop: 'auto' }} name="minus" /> */}
                    <Pressable
                      onPress={
                        item?.amount === 1
                          ? () => removeItemToList(item?.id)
                          : () => decreaseItemAmount(item?.id)
                      }
                      style={{
                        width: 25,
                        borderRadius: 50,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <FontAwesome size={30} color="#000" name="minus" />
                    </Pressable>
                    <Text
                      fontFamily={Poppins_600SemiBold}
                      fontSize={20}
                      color={"#000"}
                    >
                      {item.amount}
                    </Text>
                    {/* <Icon size={28} style={{ color: theme.colors.primary, marginBottom: 'auto', marginTop: 'auto' }} name="plus" onPress={increaseItemAmount}/> */}
                    <Pressable
                      onPress={() => increaseItemAmount(item?.id)}
                      style={{
                        width: 25,
                        borderRadius: 50,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <FontAwesome size={30} color="#000" name="plus" />
                    </Pressable>
                  </View>
                </Conatiner>
              );
            })}
          </ScrollView>
        </View>
        <View
          style={{
            height: "8%",
            paddingTop: "3%",
            marginRight: 20,
            marginLeft: 10,
          }}
        >
          <View
            style={{ height: "150", display: "flex", flexDirection: "row" }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                width: "40%",
                justifyContent: "space-around",
              }}
            >
              <Pressable
                onPress={() => addItemToList()}
                style={{
                  backgroundColor: theme.colors.primary,
                  height: 55,
                  width: 55,
                  borderRadius: 50,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <MaterialCommunityIcons
                  size={40}
                  color="#fff"
                  name="trash-can"
                />
              </Pressable>
              <Pressable
                onPress={() => addItemToList()}
                style={{
                  backgroundColor: theme.colors.primary,
                  height: 55,
                  width: 55,
                  borderRadius: 50,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FontAwesome size={40} color="#fff" name="check" />
              </Pressable>
            </View>
            <View
              style={{
                backgroundColor: theme?.colors?.primary,
                width: "60%",
                height: "150",
                borderRadius: 10,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-end",
                paddingRight: "3%",
                paddingLeft: "3%",
              }}
            >
              <Text fontFamily={Poppins_600SemiBold} fontSize={25}>
                R$ {totalValue}
              </Text>
            </View>
          </View>

          {/* <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity
            style={styles.dropDownStyle}
            activeOpacity={0.8}
            onPress={() => setShowOption(!showOption)}
          >
            <Text fontFamily={Poppins_400Regular} fontSize={20}>
              {selectedCategory ? selectedCategory : `Categoria`}
            </Text>
            <MaterialIcons
              name={!showOption ? "arrow-drop-down" : "arrow-drop-up"}
              size={35}
              color={"black"}
            />
          </TouchableOpacity>
          <Pressable
            onPress={() => addItemToList()}
            style={{
              backgroundColor: theme.colors.primary,
              height: 55,
              width: 55,
              borderRadius: 50,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FontAwesome size={30} color="#000" name="plus" />
          </Pressable>
        </View> */}
          {/* <View
          style={{
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <TextInput
            style={styles.input}
            onChangeText={(value) => editItemName(value)}
            value={item}
            placeholder="Digite aqui o protudo"
            keyboardType="default"
          /> */}
          {/* <View style={{
                        backgroundColor: theme?.colors?.primary,
                        width: '40%',
                        height: '80%',
                        borderRadius: 10,
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        paddingRight: '3%',
                        paddingLeft: '3%',
                    }}>
                        <Text fontFamily={Poppins_600SemiBold} fontSize={25}>R$ {totalValue}</Text>
                    </View> */}
          {/* </View> */}
        </View>
      </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    // resizeMode: "contain",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  made: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    backgroundColor: "#87CEEB",
    marginTop: 10,
    padding: 15,
    borderRadius: 10,
    opacity: 0.2,
  },
  tachado: {
    textDecorationLine: "line-through",
  },
  container: {
    flex: 1,
    marginHorizontal: 16,
    marginVertical: 32,
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    backgroundColor: "#FFF",
    color: "black",
    marginTop: 10,
    marginLeft: "5%",
    marginRight: "5%",
    padding: 15,
    borderRadius: 10,
  },
  sectionNewItem: {
    flexDirection: "row",
    backgroundColor: theme?.colors?.primary,
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,

    marginTop: 10,
    marginLeft: "5%",
    marginRight: "5%",
    padding: 15,
    borderRadius: 10,
  },
  paragraph: {
    fontSize: 15,
  },
  checkbox: {
    margin: 8,
    height: 20,
    width: 20,
  },
  input: {
    height: 56,
    width: "100%",
    margin: 15,
    borderWidth: 3,
    borderColor: theme.colors.primary,
    padding: 10,
    borderRadius: 10,
    fontSize: 20,
  },
  dropDownStyle: {
    borderWidth: 3,
    borderColor: theme?.colors?.primary,
    width: "100%",
    padding: 10,
    borderRadius: 10,
    minHeight: 42,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default ListItens;

{
  /* <Pressable
                    onPress={() => addItemToList()}
                    style={{
                      backgroundColor: theme.colors.primary,
                      height: 55,
                      width: 55,
                      borderRadius: 50,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <FontAwesome size={30} color="#000" name="plus" />
                  </Pressable> */
}
