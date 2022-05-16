import React, { useState, useEffect } from "react";
import SQLite from "react-native-sqlite-storage";

const db = SQLite.openDatabase(
  {
    name: "shoppingList",
    location: "default",
  },
  () => { },
  error => { console?.log(error) }
);

import {
  ContainerProductsList,
  ContainerNewProduct,
  ContainerProductsListHeader,
  ContainerProductData,
  ContainerStar,
  ContainerActions,
  ContainerFooter,
  ContainerActionsFooter,
  ContainerButtonsActions,
  ContainerTotalValue,
} from "./ListItens.styles";
import {
  View,
  ScrollView,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Entypo from "react-native-vector-icons/Entypo";

import { useSetFonts } from "../../hooks/useSetFonts";
import Text from "../../components/Text/Text";
import theme from "../../global/styles/theme";
import formatMoney from "../../utils/formatMoney";

import { Product, Button as ButtonProps, Sorting } from "../../utils/interfaces";
import Header from "../../components/Header/Header";
import ModalForm from "../../components/ModalForm/ModalForm";
import TextInput from "../../components/Input/TextInput/TextInput.styles";
import Button from "../../components/Button/Button";
import ModalConfirmation from "../../components/ModalConfirmation/ModalConfirmation";

const sortingKinds: Sorting[] = [
  {
    sortingName: "A-Z",
    sortingNumber: 0,
  },
  {
    sortingName: "Z-A",
    sortingNumber: 1,
  },
];

const ListItens = () => {
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
  const [isModalFormVisible, setIsModalFormVisible] = useState<boolean>(false);
  const [isModalConfirmationVisible, setIsModalConfirmationVisible] = useState<boolean>(false);
  const [idGenerator, setIdGenerator] = useState<number>(0);
  const [action, setAction] = useState("");
  const [totalValue, setTotalValue] = useState<number>(0);
  const [sortOfOrdering, setSortOfOrdering] = useState<Sorting>(sortingKinds[0]);

  useEffect(() => {
    const searchedProducts = listProducts?.filter((product) => product?.productName?.includes(productSearch));
    setListSearchedProducts(searchedProducts);
  }, [productSearch]);

  const createTable = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS "
        + "Products "
        + "(Id INTEGER PRIMARY KEY, ProductName TEXT, Amount INTEGER, Category TEXT, Price REAL, Priority NUMERIC);"
      )
    });
  }

  const sortProducts = () => {
    if (sortOfOrdering?.sortingNumber === 0) {
      setListProducts((oldState) => {
        let newState = [...oldState];
        newState?.sort((firstElement, secondElement) => {
          return firstElement?.productName?.localeCompare(secondElement?.productName);
        });

        return newState;
      });
    }

    if (sortOfOrdering?.sortingNumber === 1) {
      setListProducts((oldState) => {
        let newState = [...oldState];
        newState?.sort((firstElement, secondElement) => {
          return secondElement?.productName?.localeCompare(firstElement?.productName);
        });

        return newState;
      });
    }
  }

  const buttons: ButtonProps[] = [
    {
      id: 0,
      name: 'Cancelar',
      backgroundColor: '#D2691E',
      action: () => setIsModalConfirmationVisible(false),
    },
    {
      id: 1,
      name: 'Remover',
      backgroundColor: 'red',
      action: () => {
        clearProductsList();
        setIsModalConfirmationVisible(false);
      }
    },
  ];

  useEffect(() => {
    sortProducts();
  }, [sortOfOrdering]);

  useEffect(() => {
    createTable();
  }, []);

  const changeSorting = () => {
    if (sortOfOrdering?.sortingNumber === sortingKinds?.length - 1) {
      setSortOfOrdering({
        ...sortOfOrdering,
        sortingName: sortingKinds[0]?.sortingName,
        sortingNumber: sortingKinds[0]?.sortingNumber,
      });

      return;
    }

    setSortOfOrdering({
      ...sortOfOrdering,
      sortingName: sortingKinds[sortOfOrdering?.sortingNumber + 1]?.sortingName,
      sortingNumber: sortingKinds[sortOfOrdering?.sortingNumber + 1]?.sortingNumber,
    });
  }

  const addItemToList = (newProduct: Product) => {
    if (!newProduct?.productName || !newProduct?.category) return;

    const newItem = {
      ...newProduct,
      id: idGenerator,
    };

    setTotalValue(
      (oldState) => oldState + newProduct?.price * newProduct?.amount
    );
    setListProducts((oldState) => [...oldState, newItem]);
    setIdGenerator((oldState) => oldState + 1);
    sortProducts();
  };

  const changeItemFromList = (changedProduct: Product) => {
    const { id } = changedProduct;

    const newListProducts = listProducts?.map((product) => {
      if (product?.id === id) {
        const removeOldValue = product?.amount * product?.price;
        setTotalValue((oldState) => oldState - removeOldValue);

        const addNewValue = changedProduct?.amount * changedProduct?.price;
        setTotalValue((oldState) => oldState + addNewValue);

        return {
          ...changedProduct,
        };
      }
      else return { ...product };
    });

    const searchedProducts = newListProducts?.filter((product) => product?.productName?.includes(productSearch));
    setListSearchedProducts(searchedProducts);
    setListProducts(newListProducts);
    sortProducts();
  }

  const removeItemFromList = (product: Product) => {
    const { id, price, amount } = product;
    const valueWillBeRemoved = price * amount;

    const listProductsFiltered: Product[] = listProducts?.filter(
      (item) => {
        if (item.id !== id) {
          return { ...item };
        }
        else setTotalValue((oldState) => oldState - valueWillBeRemoved);
      }
    );

    const searchedProducts = listProductsFiltered?.filter((product) => product?.productName?.includes(productSearch));
    setListSearchedProducts(searchedProducts);
    setListProducts(listProductsFiltered);
  };

  const onSaveNewProduct = (newProduct: Product) => {
    addItemToList(newProduct);
    setIsModalFormVisible(false);
  };

  const onChangeProduct = (changedProduct: Product) => {
    changeItemFromList(changedProduct);
    setIsModalFormVisible(false);
  }

  const onRemoveProduct = (removedProduct: Product) => {
    removeItemFromList(removedProduct);
    setIsModalFormVisible(false);
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

    const searchedProducts = newItems?.filter((product) => product?.productName?.includes(productSearch));
    setListSearchedProducts(searchedProducts);
    setListProducts(newItems);
  }

  function clearProductsList() {
    setListProducts([]);
    setListSearchedProducts([]);
    setTotalValue(0);
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

    const searchedProducts = newItems?.filter((product) => product?.productName?.includes(productSearch));
    setListSearchedProducts(searchedProducts);
    setListProducts(newItems);
  }

  function openModalToChangeProduct(product: Product) {
    setProductWillBeChanged(product);
    setAction("alteration");
    setIsModalFormVisible(true);
  }

  function openModalToCreateNewProduct() {
    setAction("creation");
    setIsModalFormVisible(true);
  }

  return (
    <>
      <ModalForm
        isModalOpen={isModalFormVisible}
        productWillBeChanged={productWillBeChanged}
        action={action}
        onSaveNewProduct={onSaveNewProduct}
        onChangeProduct={onChangeProduct}
        onRemoveProduct={onRemoveProduct}
        closeModal={() => {
          setIsModalFormVisible(!isModalFormVisible);
        }}
      />

      <ModalConfirmation
        isModalOpen={isModalConfirmationVisible}
        closeModal={() => setIsModalConfirmationVisible(false)}
        fontFamily={Poppins_600SemiBold}
        message={"Tem certeza de que deseja remover a lista?"}
      >
        {buttons?.map((button) => {
          return (
            <Button
              key={button?.id}
              onPress={button?.action}
              backgroundColor={button?.backgroundColor}
              width={"48%"}
              borderRadius={'10px'}
              flexDirection={"row"}
              alignItems={"center"}
              justifyContent={"space-around"}
            >
              <Text fontFamily={Poppins_600SemiBold} fontSize={22}>
                {button?.name}
              </Text>
            </Button>
          );
        })}
      </ModalConfirmation>

      <Header />

      <ContainerProductsList>
        <ContainerProductsListHeader>
          <TextInput
            fontFamily={Poppins_600SemiBold}
            width={'65%'}
            borderRadius={'10px'}
            value={productSearch}
            onChangeText={(value) => setProductSearch(value)}
            placeholder={"Pesquisar produto"}
          ></TextInput>
          <Button
            backgroundColor={theme.colors.primary}
            height={'55px'}
            width={'55px'}
            borderRadius={'50px'}
            borderBottomLeftRadius={"50px"}
            borderTopRightRadius={"50px"}
            borderBottomRightRadius={"50px"}
            borderTopLeftRadius={"50px"}
            alignItems={"center"}
            justifyContent={"center"}
            onPress={() => setProductSearch("")}
          >
            <Entypo size={35} color="#fff" name="erase" />
          </Button>
          <Button
            backgroundColor={theme.colors.primary}
            height={'55px'}
            width={'55px'}
            borderRadius={'50px'}
            borderBottomLeftRadius={"50px"}
            borderTopRightRadius={"50px"}
            borderBottomRightRadius={"50px"}
            borderTopLeftRadius={"50px"}
            alignItems={"center"}
            justifyContent={"center"}
            onPress={() => changeSorting()}
          >
            {sortOfOrdering?.sortingNumber === 0 ?
              <FontAwesome size={35} color="#fff" name="sort-alpha-asc" /> :
              <FontAwesome size={35} color="#fff" name="sort-alpha-desc" />
            }
          </Button>
        </ContainerProductsListHeader>
        <ContainerNewProduct>
          <Button
            width={"100%"}
            height={"40px"}
            onPress={openModalToCreateNewProduct}
          >
            <Text
              fontFamily={Poppins_600SemiBold}
              fontSize={24}
              textAlign={"center"}
            >
              Novo Item
            </Text>
          </Button>
        </ContainerNewProduct>
        <ScrollView>
          {!productSearch ? listProducts?.map((product, index) => {
            return (
              <ContainerProductData key={index}>
                <ContainerStar>
                  {product?.priority === "Sim" ? (
                    <FontAwesome name="star" size={25} color={"#FFA500"} />
                  ) : (
                    <FontAwesome name="star-o" size={25} color={"#000"} />
                  )}
                  <Text
                    fontFamily={Poppins_600SemiBold}
                    fontSize={17}
                    color={"#000"}
                    textAlign={"center"}
                  >
                    R$ {formatMoney(product?.price)}
                  </Text>
                </ContainerStar>
                <Button
                  width={"50%"}
                  height={"100%"}
                  display={"flex"}
                  flexDirection={"column"}
                  justifyContent={"center"}
                  backgroundColor={"#FFF"}
                  textAlign={"center"}
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
                </Button>
                <ContainerActions>
                  <Button
                    width={"25px"}
                    height={"100%"}
                    borderRadius={"50px"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    onPress={
                      product?.amount === 1
                        ? () => removeItemFromList(product)
                        : () => decreaseItemAmount(product?.id)
                    }
                  >
                    <FontAwesome size={30} color="#FFF" name="minus" />
                  </Button>
                  <Text
                    fontFamily={Poppins_600SemiBold}
                    fontSize={20}
                    color={"#FFF"}
                  >
                    {product?.amount}
                  </Text>
                  <Button
                    width={"25px"}
                    height={"100%"}
                    borderRadius={"50px"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    onPress={() => increaseItemAmount(product?.id)}
                  >
                    <FontAwesome size={30} color="#FFF" name="plus" />
                  </Button>
                </ContainerActions>
              </ContainerProductData>
            );
          }) :
            listSearchedProducts?.map((product, index) => {
              return (
                <ContainerProductData key={index}>
                  <ContainerStar>
                    {product?.priority === "Sim" ? (
                      <FontAwesome name="star" size={25} color={"#FFA500"} />
                    ) : (
                      <FontAwesome name="star-o" size={25} color={"#000"} />
                    )}
                    <Text
                      fontFamily={Poppins_600SemiBold}
                      fontSize={17}
                      color={"#000"}
                      textAlign={"center"}
                    >
                      R$ {formatMoney(product?.price)}
                    </Text>
                  </ContainerStar>
                  <Button
                    width={"50%"}
                    height={"100%"}
                    display={"flex"}
                    flexDirection={"column"}
                    backgroundColor={"#FFF"}
                    textAlign={"center"}
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
                  </Button>
                  <ContainerActions>
                    <Button
                      width={"25px"}
                      height={"100%"}
                      borderRadius={"50px"}
                      alignItems={"center"}
                      justifyContent={"center"}
                      onPress={
                        product?.amount === 1
                          ? () => removeItemFromList(product)
                          : () => decreaseItemAmount(product?.id)
                      }
                    >
                      <FontAwesome size={30} color="#FFF" name="minus" />
                    </Button>
                    <Text
                      fontFamily={Poppins_600SemiBold}
                      fontSize={20}
                      color={"#FFF"}
                    >
                      {product?.amount}
                    </Text>
                    <Button
                      width={"25px"}
                      height={"100%"}
                      borderRadius={"50px"}
                      alignItems={"center"}
                      justifyContent={"center"}
                      onPress={() => increaseItemAmount(product?.id)}
                    >
                      <FontAwesome size={30} color="#FFF" name="plus" />
                    </Button>
                  </ContainerActions>
                </ContainerProductData>
              );
            })
          }
        </ScrollView>
      </ContainerProductsList>
      <ContainerFooter>
        <ContainerActionsFooter>
          <ContainerButtonsActions>
            <Button
              backgroundColor={theme.colors.primary}
              height={"55px"}
              width={"55px"}
              borderRadius={"50px"}
              borderBottomLeftRadius={"50px"}
              borderTopRightRadius={"50px"}
              borderBottomRightRadius={"50px"}
              borderTopLeftRadius={"50px"}
              alignItems={"center"}
              justifyContent={"center"}
              onPress={() => setIsModalConfirmationVisible(true)}
            >
              <MaterialCommunityIcons
                size={40}
                color="#fff"
                name="trash-can"
              />
            </Button>
            <Button
              backgroundColor={theme.colors.primary}
              height={"55px"}
              width={"55px"}
              borderRadius={"50px"}
              borderBottomLeftRadius={"50px"}
              borderTopRightRadius={"50px"}
              borderBottomRightRadius={"50px"}
              borderTopLeftRadius={"50px"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <FontAwesome size={40} color="#fff" name="check" />
            </Button>
          </ContainerButtonsActions>
          <ContainerTotalValue>
            <Text fontFamily={Poppins_600SemiBold} fontSize={25}>
              R$ {formatMoney(totalValue)}
            </Text>
          </ContainerTotalValue>
        </ContainerActionsFooter>
      </ContainerFooter>
    </>
  );
};

export default ListItens;
