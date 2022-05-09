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

import { categories, priorities } from "../../utils/constants";
import { Product } from "../../utils/interfaces";
import Header from "../../components/Header/Header";
import ModalForm from "../../components/ModalForm/ModalForm";

const ListItens = ({ navigation }) => {
  const Poppins_600SemiBold = useSetFonts("Poppins_600SemiBold");

  const [listProducts, setListProducts] = useState<Product[]>([]);

  const [item, setItem] = useState<string>("");
  const [newProduct, setNewProduct] = useState<Product>({
    id: 0,
    amount: 1,
    productName: '',
    category: '',
    price: 0,
    priority: false,
  });
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedPriority, setSelectedPriority] = useState<string>("");
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [showCategoryOptions, setShowCategoryOptions] = useState<boolean>(false);
  const [showPriorityOptions, setShowPriorityOptions] = useState<boolean>(false);
  const [idGenerator, setIdGenerator] = useState<number>(0);
  const [totalValue, setTotalValue] = useState<number>(0);

  const onSelectCategory = (category: string) => {
    setShowCategoryOptions(false);
    setSelectedCategory(category);
  };

  const onSelectPriority = (category: string) => {
    setShowPriorityOptions(false);
    setSelectedPriority(category);
  };

  const addItemToList = () => {
    if (!newProduct?.productName || !newProduct?.category) return;

    const newItem = {
      ...newProduct,
      id: idGenerator,
    };

    setTotalValue(oldState => oldState + (newProduct?.price * newProduct?.amount));
    setListProducts((oldState) => [...oldState, newItem]);
    setIdGenerator((oldState) => oldState + 1);
    setNewProduct({ ...newProduct, productName: '', price: 0 });
    // setItem("");
    // setSelectedCategory("");
  };

  const removeItemToList = (id: number) => {
    const listProductsFiltered: Product[] = listProducts?.filter(
      (item) => item.id !== id
    );

    setListProducts(listProductsFiltered);
  };

  const setPropertyNewProduct = (value: string | number | boolean | null, property: string) => {
    setNewProduct({ ...newProduct, [property]: value });
  }

  const setAmountNewProduct = (value: number) => {
    if (value === 0) return;

    setNewProduct({ ...newProduct, amount: value });
  }

  function increaseItemAmount(id: number) {
    const newItems: Product[] = listProducts?.map((item) =>
      item.id === id
        ? {
          ...item,
          amount: item?.amount + 1,
        }
        : item
    );

    setListProducts(newItems);
  }

  function decreaseItemAmount(id: number) {
    const newItems: Product[] = listProducts?.map((item) =>
      item.id === id
        ? {
          ...item,
          amount: item?.amount - 1,
        }
        : item
    );

    setListProducts(newItems);
  }

  function editItemName(value: string) {
    setItem(value);
  }

  return (
    <>
      <ImageBackground source={compras} style={styles.image}>

        <ModalForm isModalOpen={modalVisible} closeModal={() => {
          setModalVisible(!modalVisible);
        }} />

        {/* <Modal
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
                  fontSize: 18,
                  fontFamily: Poppins_600SemiBold,
                  shadowOffset: { width: 0, height: 1 },
                }}
                onChangeText={(value) => setPropertyNewProduct(value, 'productName')}
                value={newProduct?.productName}
                placeholder="Nome do produto"
                keyboardType="default"
              />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
              <View style={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
                <TouchableOpacity
                  style={{
                    backgroundColor: theme?.colors?.primary,
                    height: 61,
                    width: '15%',
                    borderBottomLeftRadius: 10,
                    borderTopLeftRadius: 10,
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() => setAmountNewProduct(newProduct?.amount - 1)}>
                  <FontAwesome size={30} color={"#FFF"} name="minus" />
                </TouchableOpacity>
                <TextInput
                  style={{
                    height: 60,
                    width: "70%",
                    marginBottom: "5%",
                    borderWidth: 3,
                    borderColor: theme.colors.primary,
                    padding: 10,
                    // borderRadius: 10,
                    fontSize: 18,
                    fontFamily: Poppins_600SemiBold,
                    shadowOffset: { width: 0, height: 1 },
                  }}
                  keyboardType={"numeric"}
                  onChangeText={(value) => setAmountNewProduct(parseInt(value))}
                  value={newProduct?.amount.toString() == "0" ? "" : newProduct?.amount.toString()}
                  placeholder="Quantidade"
                  maxLength={10}
                />
                <TouchableOpacity
                  style={{
                    backgroundColor: theme?.colors?.primary,
                    height: 61,
                    width: '15%',
                    borderBottomRightRadius: 10,
                    borderTopRightRadius: 10,
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() => setAmountNewProduct(newProduct?.amount + 1)}>
                  <FontAwesome size={30} color={"#FFF"} name="plus" />
                </TouchableOpacity>
              </View>
              <CurrencyInput
                style={{
                  height: 60,
                  width: "100%",
                  marginBottom: "5%",
                  borderWidth: 3,
                  borderColor: theme.colors.primary,
                  padding: 10,
                  borderRadius: 10,
                  fontSize: 18,
                  fontFamily: Poppins_600SemiBold,
                  shadowOffset: { width: 0, height: 1 },
                }}
                placeholder="Preço"
                value={newProduct?.price === 0 ? null : newProduct?.price}
                onChangeValue={(value) => setPropertyNewProduct(value, 'price')}
                prefix="R$ "
                delimiter="."
                separator=","
                precision={2}
                minValue={0}
              />
              <View style={{ width: "100%", borderColor: "red" }}>
                <TouchableOpacity
                  style={styles.dropDownStyle}
                  activeOpacity={0.8}
                  onPress={() => setShowCategoryOptions(!showCategoryOptions)}
                >
                  <Text
                    fontFamily={Poppins_600SemiBold}
                    fontSize={18}
                    color={"#adadac"}
                  >
                    {selectedCategory ? selectedCategory : `Categoria`}
                  </Text>
                  <MaterialIcons
                    name={!showCategoryOptions ? "arrow-drop-down" : "arrow-drop-up"}
                    size={35}
                    color={"black"}
                  />
                </TouchableOpacity>
              </View>
              {showCategoryOptions && (
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
                          onPress={() => {
                            onSelectCategory(category?.name);
                            setPropertyNewProduct(category?.name, 'category');
                          }}
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
                            fontFamily={Poppins_600SemiBold}
                            fontSize={18}
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
              <View style={{ width: "100%", borderColor: "red", marginTop: '1rem' }}>
                <TouchableOpacity
                  style={styles.dropDownStyle}
                  activeOpacity={0.8}
                  onPress={() => setShowPriorityOptions(!showPriorityOptions)}
                >
                  <Text
                    fontFamily={Poppins_600SemiBold}
                    fontSize={18}
                    color={"#adadac"}
                  >
                    {selectedPriority ? selectedPriority : `Prioridade`}
                  </Text>
                  <MaterialIcons
                    name={!showPriorityOptions ? "arrow-drop-down" : "arrow-drop-up"}
                    size={35}
                    color={"black"}
                  />
                </TouchableOpacity>
              </View>
              {showPriorityOptions && (
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
                    {priorities?.map((priority) => {
                      return (
                        <TouchableOpacity
                          key={priority?.id}
                          onPress={() => {
                            onSelectPriority(priority?.name);
                            setPropertyNewProduct(priority?.value, 'priority');
                          }}
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
                            fontFamily={Poppins_600SemiBold}
                            fontSize={18}
                            color={"white"}
                          >
                            {priority?.name}
                          </Text>
                          <FontAwesome
                            name={priority?.icon}
                            size={30}
                            color={"#FFF"}
                          />
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
                    // backgroundColor: theme.colors.primary,
                    backgroundColor: '#D2691E',
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
                </Pressable>
                <Pressable
                  onPress={() => {
                    addItemToList();
                    setModalVisible(false);
                  }}
                  style={{
                    // backgroundColor: theme.colors.primary,
                    backgroundColor: 'green',
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
                </Pressable>
              </View>
            </View>
          </View>
        </Modal> */}

        <Header />

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
                  // shadowOpacity: "0.7",
                }}
                // onPress={() => navigation?.navigate("ProductsPage")}
                onPress={() => setModalVisible(true)}
              >
                <Text
                  fontFamily={Poppins_600SemiBold}
                  fontSize={20}
                  style={{ textAlign: "center" }}
                >
                  Novo Item
                </Text>
              </Pressable>
              {/* <Checkbox value={item?.checked} onValueChange={() => changeItemOfList(item?.id)} /> */}
            </Conatiner>
            {listProducts?.map((product, index) => {
              return (
                <Conatiner style={styles.section} key={index}>
                  <View style={{ marginRight: "0.4rem" }}>
                    {product?.priority ? (
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
                  // onPress={() =>
                  //   navigation?.navigate("ProductsPage", { item })
                  // }
                  >
                    <View>
                      <Text
                        fontFamily={Poppins_600SemiBold}
                        fontSize={20}
                        color={"#000"}
                      >
                        {product?.productName}
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
                        product?.amount === 1
                          ? () => removeItemToList(product?.id)
                          : () => decreaseItemAmount(product?.id)
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
                      {product?.amount}
                    </Text>
                    {/* <Icon size={28} style={{ color: theme.colors.primary, marginBottom: 'auto', marginTop: 'auto' }} name="plus" onPress={increaseItemAmount}/> */}
                    <Pressable
                      onPress={() => increaseItemAmount(product?.id)}
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
            <Text fontFamily={Poppins_600SemiBold} fontSize={20}>
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
