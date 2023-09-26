import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
  ContainerProductsCategory,
  ContainerData,
} from "./ListItens.styles";
import { View, ScrollView } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Entypo from "react-native-vector-icons/Entypo";

import { useSetFonts } from "../../hooks/useSetFonts";
import Text from "../../components/Text/Text";
import theme from "../../global/styles/theme";
import formatMoney from "../../utils/formatMoney";

import {
  Product,
  Button as ButtonProps,
  Sorting,
} from "../../utils/interfaces";
import Header from "../../components/Header/Header";
import ModalForm from "../../components/ModalForm/ModalForm";
import TextInput from "../../components/Input/TextInput/TextInput.styles";
import { styles } from "../../utils/constants";
import Button from "../../components/Button/Button";
import ModalConfirmation from "../../components/ModalConfirmation/ModalConfirmation";
import ModalMoney from "../../components/ModalMoney/ModalMoney";

const sortingKinds: Sorting[] = [
  {
    sortingName: "A-Z",
    sortingNumber: 0,
  },
  {
    sortingName: "Z-A",
    sortingNumber: 1,
  },
  {
    sortingName: "Priority",
    sortingNumber: 2,
  },
];

const ListItens = ({ navigation }) => {
  const Poppins_600SemiBold = useSetFonts("Poppins_600SemiBold");

  const [listProducts, setListProducts] = useState<Product[]>([]);
  const [productSearch, setProductSearch] = useState<string>("");
  const [listSearchedProducts, setListSearchedProducts] = useState<Product[]>(
    []
  );
  const [productWillBeChanged, setProductWillBeChanged] = useState<Product>({
    id: 0,
    amount: 0,
    productName: "",
    category: "",
    price: 0.0,
    priority: "",
  });
  const [isModalFormVisible, setIsModalFormVisible] = useState<boolean>(false);
  const [isModalConfirmationVisible, setIsModalConfirmationVisible] =
    useState<boolean>(false);
  const [isModalMoneyVisible, setIsModalMoneyVisible] =
    useState<boolean>(false);
  const [idGenerator, setIdGenerator] = useState<number>(0);
  const [action, setAction] = useState("");
  const [totalValue, setTotalValue] = useState<number>(0);
  const [sortOfOrdering, setSortOfOrdering] = useState<Sorting>(
    sortingKinds[0]
  );
  const [balance, setBalance] = useState<number>(0);
  const [enoughMoney, setEnoughMoney] = useState<boolean>(true);
  const [
    hasSomethingToSaveOnAsyncStorage,
    setHasSomethingToSaveOnAsyncStorage,
  ] = useState<boolean>(false);

  useEffect(() => {
    const getBalance = async () => {
      const balance = await AsyncStorage.getItem("@balance");
      setBalance(Number(balance));
    };

    getBalance();
  }, [isModalMoneyVisible]);

  useEffect(() => {
    if (hasSomethingToSaveOnAsyncStorage)
      AsyncStorage?.setItem("@idGenerator", String(idGenerator));
  }, [idGenerator]);

  useEffect(() => {
    if (hasSomethingToSaveOnAsyncStorage)
      AsyncStorage?.setItem("@listProducts", JSON.stringify(listProducts));
  }, [listProducts]);

  useEffect(() => {
    if (hasSomethingToSaveOnAsyncStorage)
      AsyncStorage?.setItem("@totalValue", JSON.stringify(totalValue));
  }, [totalValue]);

  useEffect(() => {
    if (totalValue > 0 && balance <= totalValue) {
      setEnoughMoney(false);
      return;
    }

    setEnoughMoney(true);
  }, [totalValue, balance]);

  useEffect(() => {
    const searchedProductsByName = listProducts?.filter((product) => {
      return product?.productName?.includes(productSearch);
    });

    const searchedProductsByCategory = listProducts?.filter((product) => {
      return product?.category?.includes(productSearch);
    });

    const searchedProductsByPrice = listProducts?.filter((product) => {
      return product?.price
        ?.toFixed(2)
        ?.toString()
        ?.replace(".", ",")
        ?.includes(productSearch);
    });

    const joinSearchedProducts = searchedProductsByName
      ?.concat(searchedProductsByPrice)
      ?.concat(searchedProductsByCategory);

    setListSearchedProducts(joinSearchedProducts);
  }, [productSearch]);

  useEffect(() => {
    const fetchData = async () => {
      const listStoraged = await AsyncStorage?.getItem("@listProducts");
      const id = await AsyncStorage?.getItem("@idGenerator");
      const totalValue = await AsyncStorage?.getItem("@totalValue");

      if (listStoraged !== null) {
        setListProducts(JSON.parse(listStoraged));
      }

      setTotalValue(Number(totalValue));
      setIdGenerator(Number(id));
    };

    fetchData();
  }, []);

  const sortProducts = () => {
    setHasSomethingToSaveOnAsyncStorage(true);

    if (sortOfOrdering?.sortingNumber === 0) {
      setListProducts((oldState) => {
        let newState = [...oldState];
        newState?.sort((firstElement, secondElement) => {
          return firstElement?.productName?.localeCompare(
            secondElement?.productName
          );
        });

        return newState;
      });
    }

    if (sortOfOrdering?.sortingNumber === 1) {
      setListProducts((oldState) => {
        let newState = [...oldState];
        newState?.sort((firstElement, secondElement) => {
          return secondElement?.productName?.localeCompare(
            firstElement?.productName
          );
        });

        return newState;
      });
    }

    if (sortOfOrdering?.sortingNumber === 2) {
      setListProducts(() => {
        let newStateWithPriority = listProducts?.filter(
          (product) => product?.priority === "Sim"
        );
        let newStateWithNoPriority = listProducts?.filter(
          (product) => product?.priority !== "Sim"
        );

        return [...newStateWithPriority, ...newStateWithNoPriority];
      });
    }
  };

  const buttons: ButtonProps[] = [
    {
      id: 0,
      name: "Cancelar",
      backgroundColor: "#FFF",
      color: theme?.colors?.primary,
      style: styles?.shadowPropMainColor,
      action: () => setIsModalConfirmationVisible(false),
    },
    {
      id: 1,
      name: "Remover",
      backgroundColor: "#FF4500",
      color: "#FFF",
      style: styles?.shadowPropMainColor,
      action: () => {
        clearProductsList();
        setIsModalConfirmationVisible(false);
      },
    },
  ];

  useEffect(() => {
    sortProducts();
  }, [sortOfOrdering]);

  const changeSorting = () => {
    if (sortOfOrdering?.sortingNumber === 2) {
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
      sortingNumber:
        sortingKinds[sortOfOrdering?.sortingNumber + 1]?.sortingNumber,
    });
  };

  async function addItemToList(newProduct: Product) {
    if (!newProduct?.productName) return;

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
  }

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
      } else return { ...product };
    });

    const searchedProducts = newListProducts?.filter((product) =>
      product?.productName?.includes(productSearch)
    );
    setListSearchedProducts(searchedProducts);
    setListProducts(newListProducts);
    sortProducts();
  };

  const removeItemFromList = (product: Product) => {
    const { id, price, amount } = product;
    const valueWillBeRemoved = price * amount;

    const listProductsFiltered: Product[] = listProducts?.filter((item) => {
      if (item.id !== id) {
        return { ...item };
      } else setTotalValue((oldState) => oldState - valueWillBeRemoved);
    });

    const searchedProducts = listProductsFiltered?.filter((product) =>
      product?.productName?.includes(productSearch)
    );
    setListSearchedProducts(searchedProducts);
    setListProducts(listProductsFiltered);
  };

  const onSaveNewProduct = (newProduct: Product) => {
    setHasSomethingToSaveOnAsyncStorage(true);
    addItemToList(newProduct);
    setIsModalFormVisible(false);
  };

  const onChangeProduct = (changedProduct: Product) => {
    setHasSomethingToSaveOnAsyncStorage(true);
    changeItemFromList(changedProduct);
    setIsModalFormVisible(false);
  };

  const onRemoveProduct = (removedProduct: Product) => {
    setHasSomethingToSaveOnAsyncStorage(true);
    removeItemFromList(removedProduct);
    setIsModalFormVisible(false);
  };

  function increaseItemAmount(id: number) {
    setHasSomethingToSaveOnAsyncStorage(true);

    const newItems: Product[] = listProducts?.map((item) => {
      if (item?.id === id) {
        setTotalValue((oldState) => oldState + item?.price);

        return {
          ...item,
          amount: item?.amount + 1,
        };
      } else return { ...item };
    });

    const searchedProducts = newItems?.filter((product) =>
      product?.productName?.includes(productSearch)
    );
    setListSearchedProducts(searchedProducts);
    setListProducts(newItems);
  }

  function clearProductsList() {
    setHasSomethingToSaveOnAsyncStorage(true);
    setListProducts([]);
    setListSearchedProducts([]);
    setTotalValue(0);
    setIdGenerator(0);
  }

  function decreaseItemAmount(id: number) {
    setHasSomethingToSaveOnAsyncStorage(true);

    const newItems: Product[] = listProducts?.map((item) => {
      if (item?.id === id) {
        setTotalValue((oldState) => oldState - item?.price);

        return {
          ...item,
          amount: item?.amount - 1,
        };
      } else return { ...item };
    });

    const searchedProducts = newItems?.filter((product) =>
      product?.productName?.includes(productSearch)
    );
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
        icon="question"
      >
        {buttons?.map((button) => {
          return (
            <Button
              key={button?.id}
              onPress={button?.action}
              backgroundColor={button?.backgroundColor}
              width={"48%"}
              borderRadius={"10px"}
              flexDirection={"row"}
              alignItems={"center"}
              justifyContent={"space-around"}
              style={button?.style}
            >
              <Text
                fontFamily={Poppins_600SemiBold}
                fontSize={20}
                color={button?.color}
              >
                {button?.name}
              </Text>
            </Button>
          );
        })}
      </ModalConfirmation>

      <ModalMoney
        isModalOpen={isModalMoneyVisible}
        closeModal={() => setIsModalMoneyVisible(false)}
        fontFamily={Poppins_600SemiBold}
      />

      <Header />

      <ContainerProductsList applyFilter={isModalFormVisible}>
        <ContainerProductsListHeader>
          <TextInput
            fontFamily={Poppins_600SemiBold}
            width={"65%"}
            borderRadius={"10px"}
            value={productSearch}
            onChangeText={(value) => setProductSearch(value)}
            placeholder={"Pesquisar produto"}
          ></TextInput>
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
            style={styles?.shadowPropMainColor}
            onPress={() => setProductSearch("")}
          >
            <Entypo size={35} color="#fff" name="erase" />
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
            style={styles?.shadowPropMainColor}
            onPress={() => changeSorting()}
          >
            {sortOfOrdering?.sortingNumber === 0 && (
              <FontAwesome size={35} color="#fff" name="sort-alpha-asc" />
            )}
            {sortOfOrdering?.sortingNumber === 1 && (
              <FontAwesome size={35} color="#fff" name="sort-alpha-desc" />
            )}
            {sortOfOrdering?.sortingNumber === 2 && (
              <FontAwesome size={35} color="#fff" name="star" />
            )}
          </Button>
        </ContainerProductsListHeader>
        <ContainerNewProduct style={styles?.shadowPropMainColor}>
          <Button
            width={"100%"}
            height={"40px"}
            onPress={openModalToCreateNewProduct}
          >
            <Text
              fontFamily={Poppins_600SemiBold}
              fontSize={20}
              textAlign={"center"}
            >
              Novo Item
            </Text>
          </Button>
        </ContainerNewProduct>
        <ScrollView>
          {!productSearch
            ? listProducts?.map((product, index) => {
              return (
                <ContainerProductData
                  key={index}
                  style={styles?.shadowPropMainColor}
                >
                  <ContainerProductsCategory>
                    <Text
                      fontFamily={Poppins_600SemiBold}
                      fontSize={18}
                      color={theme?.colors?.primary}
                      textAlign={"center"}
                    >
                      {product?.category
                        ? product?.category
                        : "Sem categoria"}
                    </Text>
                  </ContainerProductsCategory>
                  <ContainerData>
                    <ContainerStar>
                      {product?.priority === "Sim" ? (
                        <FontAwesome
                          name="star"
                          size={25}
                          color={"#FFA500"}
                        />
                      ) : (
                        <FontAwesome name="star-o" size={25} color={"#000"} />
                      )}
                      <Text
                        fontFamily={Poppins_600SemiBold}
                        fontSize={18}
                        color={"#040404"}
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
                      <Text
                        fontFamily={Poppins_600SemiBold}
                        fontSize={18}
                        color={"#000"}
                      >
                        {product?.productName?.length > 13
                          ? product?.productName?.slice(0, 13) + "..."
                          : product?.productName}
                      </Text>
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
                  </ContainerData>
                </ContainerProductData>
              );
            })
            : listSearchedProducts?.map((product, index) => {
              return (
                <ContainerProductData
                  key={index}
                  style={styles?.shadowPropMainColor}
                >
                  <ContainerProductsCategory>
                    <Text
                      fontFamily={Poppins_600SemiBold}
                      fontSize={16}
                      color={theme?.colors?.primary}
                      textAlign={"center"}
                    >
                      {product?.category
                        ? product?.category
                        : "Sem categoria"}
                    </Text>
                  </ContainerProductsCategory>
                  <ContainerData>
                    <ContainerStar>
                      {product?.priority === "Sim" ? (
                        <FontAwesome
                          name="star"
                          size={25}
                          color={"#FFA500"}
                        />
                      ) : (
                        <FontAwesome name="star-o" size={25} color={"#000"} />
                      )}
                      <Text
                        fontFamily={Poppins_600SemiBold}
                        fontSize={15}
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
                          fontSize={16}
                          color={"#000"}
                        >
                          {product?.productName?.length > 13
                            ? product?.productName?.slice(0, 13) + "..."
                            : product?.productName}
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
                        fontSize={18}
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
                  </ContainerData>
                </ContainerProductData>
              );
            })}
        </ScrollView>
      </ContainerProductsList>
      <ContainerFooter applyFilter={isModalFormVisible}>
        <ContainerActionsFooter>
          <ContainerButtonsActions>
            <Button
              backgroundColor={'#990000'}
              height={"55px"}
              width={"55px"}
              borderRadius={"50px"}
              borderBottomLeftRadius={"50px"}
              borderTopRightRadius={"50px"}
              borderBottomRightRadius={"50px"}
              borderTopLeftRadius={"50px"}
              alignItems={"center"}
              justifyContent={"center"}
              style={styles?.shadowPropMainColor}
              onPress={() => setIsModalConfirmationVisible(true)}
            >
              <MaterialCommunityIcons size={40} color="#fff" name="trash-can" />
            </Button>
            <Button
              backgroundColor={'#00008B'}
              height={"55px"}
              width={"55px"}
              borderRadius={"50px"}
              borderBottomLeftRadius={"50px"}
              borderTopRightRadius={"50px"}
              borderBottomRightRadius={"50px"}
              borderTopLeftRadius={"50px"}
              alignItems={"center"}
              justifyContent={"center"}
              style={styles?.shadowPropMainColor}
              onPress={() =>
                navigation.navigate("Summary", {
                  listProducts,
                  totalValue,
                  clearProductsList,
                })
              }
            >
              <FontAwesome size={40} color="#fff" name="check" />
            </Button>
            <Button
              backgroundColor={'#808000'}
              height={"55px"}
              width={"55px"}
              borderRadius={"50px"}
              borderBottomLeftRadius={"50px"}
              borderTopRightRadius={"50px"}
              borderBottomRightRadius={"50px"}
              borderTopLeftRadius={"50px"}
              alignItems={"center"}
              justifyContent={"center"}
              style={styles?.shadowPropMainColor}
              onPress={() => setIsModalMoneyVisible(true)}
            >
              <MaterialIcons size={40} color="#fff" name="attach-money" />
            </Button>
          </ContainerButtonsActions>
          <ContainerTotalValue enoughMoney={enoughMoney}>
            <Text fontFamily={Poppins_600SemiBold} fontSize={22}>
              R$ {formatMoney(totalValue)}
            </Text>
          </ContainerTotalValue>
        </ContainerActionsFooter>
      </ContainerFooter>
    </>
  );
};

export default ListItens;
