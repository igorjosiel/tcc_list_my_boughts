import React, { useState, useEffect } from "react";
import { Conatiner } from "./ListItens.styles";
import {
  StyleSheet,
  Pressable,
  View,
  ScrollView,
  ImageBackground,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Entypo from "react-native-vector-icons/Entypo";

import { useSetFonts } from "../../hooks/useSetFonts";
import Text from "../../components/Text/Text";
import theme from "../../global/styles/theme";
import compras from "../../assets/cart.jpg";

import { Product } from "../../utils/interfaces";
import Header from "../../components/Header/Header";
import ModalForm from "../../components/ModalForm/ModalForm";
import TextInput from "../../components/Input/TextInput/TextInput.styles";

const ListItens = ({ navigation }) => {
  const Poppins_600SemiBold = useSetFonts("Poppins_600SemiBold");

  const [listProducts, setListProducts] = useState<Product[]>([]);
  const [productSearch, setProductSearch] = useState<string>("");
  const [listSearchedProducts, setListSearchedProducts] = useState<Product[]>([]);
  const [productWillBeChanged, setProductWillBeChanged] = useState<Product>({
    id: 0,
    amount: 0,
    productName: "",
    category: "",
    price: 0.0,
    priority: "",
  });
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [idGenerator, setIdGenerator] = useState<number>(0);
  const [action, setAction] = useState("");
  const [totalValue, setTotalValue] = useState<number>(0);

  useEffect(() => {
    const searchedProducts = listProducts?.filter((product) => product?.productName?.includes(productSearch));
    setListSearchedProducts(searchedProducts);
  }, [productSearch]);

  const addItemToList = (newProduct: Product) => {
    if (!newProduct?.productName || !newProduct?.category) return;

    const newItem = {
      ...newProduct,
      id: idGenerator,
    };

    setTotalValue(
      (oldState) => oldState + newProduct?.price * newProduct?.amount
    );
    setListProducts((oldState) => {
      let newState = [...oldState, newItem];
      newState?.sort((firstElement, secondElement) => {
        return firstElement?.productName?.localeCompare(secondElement?.productName);
      });

      return newState;
    });
    setIdGenerator((oldState) => oldState + 1);
  };

  const changeItemFromList = (changedProduct: Product) => {
    const { id } = changedProduct;

    const newListProducts = listProducts?.map((product) => {
      if (product?.id === id) {
        return {
          ...changedProduct,
        };
      }
      else return { ...product };
    });

    setListProducts(newListProducts);
  }

  const removeItemToList = (product: Product) => {
    const { id, price } = product;
    const listProductsFiltered: Product[] = listProducts?.filter(
      (item) => {
        if (item.id !== id) {
          return { ...item };
        }
        else setTotalValue((oldState) => oldState - price);
      }
    );

    setListProducts(listProductsFiltered);
  };

  const onSaveNewProduct = (newProduct: Product) => {
    addItemToList(newProduct);
    setModalVisible(false);
  };

  const onChangeProduct = (changedProduct: Product) => {
    changeItemFromList(changedProduct);
    setModalVisible(false);
  }

  function increaseItemAmount(id: number) {
    const newItems: Product[] = listProducts?.map((item) => {
      if (item?.id === id) {
        setTotalValue((oldState) => oldState + item?.price);

        return {
          ...item,
          amount: item?.amount + 1,
        };
      } else return { ...item };
    });

    setListProducts(newItems);
  }

  function clearLis() {
    setListProducts([]);
    setTotalValue(0);
  }

  function formatMoneyValue(moneyValue: number) {
    const convertMoneyValue = moneyValue?.toString();
    return convertMoneyValue?.replaceAll(".", ",");
  }

  function decreaseItemAmount(id: number) {
    const newItems: Product[] = listProducts?.map((item) => {
      if (item?.id === id) {
        setTotalValue((oldState) => oldState - item?.price);

        return {
          ...item,
          amount: item?.amount - 1,
        }
      } else return { ...item };
    }
    );

    setListProducts(newItems);
  }

  function openModalToChangeProduct(product: Product) {
    setProductWillBeChanged(product);
    setAction("alteration");
    setModalVisible(true);
  }

  return (
    <>
      <ModalForm
        isModalOpen={modalVisible}
        productWillBeChanged={productWillBeChanged}
        action={action}
        onSaveNewProduct={onSaveNewProduct}
        onChangeProduct={onChangeProduct}
        closeModal={() => {
          setModalVisible(!modalVisible);
        }}
      />

      <Header />

      <View
        style={{
          height: "82%",
          // padding: '5%',
          paddingTop: 0,
          // backgroundColor: theme.colors.secondary
        }}
      >
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: '1rem', marginRight: '1rem', marginLeft: '1rem' }}>
          <TextInput
            fontFamily={Poppins_600SemiBold}
            width={'80%'}
            borderRadius={'10px'}
            value={productSearch}
            onChangeText={(value) => setProductSearch(value)}
            placeholder={"Pesquise por um produto"}
          ></TextInput>
          <Pressable
            onPress={() => setProductSearch("")}
            style={{
              backgroundColor: theme.colors.primary,
              height: 55,
              width: 55,
              borderRadius: 50,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Entypo size={35} color="#fff" name="erase" />
          </Pressable>
        </View>
        <ScrollView>
          <Conatiner style={styles.sectionNewItem}>
            <Pressable
              style={{
                width: "100%",
                // shadowOpacity: "0.7",
              }}
              // onPress={() => navigation?.navigate("ProductsPage")}
              onPress={() => { setAction("creation"); setModalVisible(true); }}
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
          {!productSearch ? listProducts?.map((product, index) => {
            return (
              <Conatiner style={styles.section} key={index}>
                <View style={{ marginRight: "0.4rem" }}>
                  {product?.priority === "Sim" ? (
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
                  onPress={() => openModalToChangeProduct(product)}
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
                    backgroundColor: theme?.colors?.primary,
                    borderRadius: 5,
                  }}
                >
                  {/* <Icon size={28} style={{ color: theme.colors.primary, marginBottom: 'auto', marginTop: 'auto' }} name="minus" /> */}
                  <Pressable
                    onPress={
                      product?.amount === 1
                        ? () => removeItemToList(product)
                        : () => decreaseItemAmount(product?.id)
                    }
                    style={{
                      width: 25,
                      borderRadius: 50,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <FontAwesome size={30} color="#FFF" name="minus" />
                  </Pressable>
                  <Text
                    fontFamily={Poppins_600SemiBold}
                    fontSize={20}
                    color={"#FFF"}
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
                    <FontAwesome size={30} color="#FFF" name="plus" />
                  </Pressable>
                </View>
              </Conatiner>
            );
          }) :
            listSearchedProducts?.map((product, index) => {
              return (
                <Conatiner style={styles.section} key={index}>
                  <View style={{ marginRight: "0.4rem" }}>
                    {product?.priority === "Sim" ? (
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
                    onPress={() => openModalToChangeProduct(product)}
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
                      backgroundColor: theme?.colors?.primary,
                      borderRadius: 5,
                    }}
                  >
                    {/* <Icon size={28} style={{ color: theme.colors.primary, marginBottom: 'auto', marginTop: 'auto' }} name="minus" /> */}
                    <Pressable
                      onPress={
                        product?.amount === 1
                          ? () => removeItemToList(product)
                          : () => decreaseItemAmount(product?.id)
                      }
                      style={{
                        width: 25,
                        borderRadius: 50,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <FontAwesome size={30} color="#FFF" name="minus" />
                    </Pressable>
                    <Text
                      fontFamily={Poppins_600SemiBold}
                      fontSize={20}
                      color={"#FFF"}
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
                      <FontAwesome size={30} color="#FFF" name="plus" />
                    </Pressable>
                  </View>
                </Conatiner>
              );
            })
          }
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
              onPress={() => clearLis()}
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
              // onPress={() => addItemToList()}
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
              R$ {formatMoneyValue(totalValue)}
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
