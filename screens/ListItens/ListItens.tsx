import React, { useState, useEffect } from "react";
import {
  ContainerProductsList,
  ContainerNewProduct,
  Conatiner,
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

import { Product } from "../../utils/interfaces";
import Header from "../../components/Header/Header";
import ModalForm from "../../components/ModalForm/ModalForm";
import TextInput from "../../components/Input/TextInput/TextInput.styles";
import Button from "../../components/Button/Button";
interface Sorting {
  sortingName: string;
  sortingNumber: number;
}

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
  const [sortOfOrdering, setSortOfOrdering] = useState<Sorting>(sortingKinds[0]);

  useEffect(() => {
    const searchedProducts = listProducts?.filter((product) => product?.productName?.includes(productSearch));
    setListSearchedProducts(searchedProducts);
  }, [productSearch]);

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

  useEffect(() => {
    sortProducts();
  }, [sortOfOrdering]);

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

  function openModalToCreateNewProduct() {
    setAction("creation");
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
        <ScrollView>
          <ContainerNewProduct>
            <Button
              width={"100%"}
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
          {!productSearch ? listProducts?.map((product, index) => {
            return (
              <ContainerProductData key={index}>
                <ContainerStar>
                  {product?.priority === "Sim" ? (
                    <FontAwesome name="star" size={25} color={"#FFA500"} />
                  ) : (
                    <FontAwesome name="star-o" size={25} color={"#000"} />
                  )}
                </ContainerStar>
                <Button
                  width={"65%"}
                  display={"flex"}
                  flexDirection={"column"}
                  justifyContent={"stretch"}
                  maxWidth={"10rem"}
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
                    width={"25"}
                    borderRadius={"50px"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    onPress={
                      product?.amount === 1
                        ? () => removeItemToList(product)
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
                    width={"25"}
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
                  </ContainerStar>
                  <Button
                    width={"65%"}
                    display={"flex"}
                    flexDirection={"column"}
                    justifyContent={"stretch"}
                    maxWidth={"10rem"}
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
                      borderRadius={"50px"}
                      alignItems={"center"}
                      justifyContent={"center"}
                      onPress={
                        product?.amount === 1
                          ? () => removeItemToList(product)
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
              alignItems={"center"}
              justifyContent={"center"}
              onPress={() => clearLis()}
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
              alignItems={"center"}
              justifyContent={"center"}
            >
              <FontAwesome size={40} color="#fff" name="check" />
            </Button>
          </ContainerButtonsActions>
          <ContainerTotalValue>
            <Text fontFamily={Poppins_600SemiBold} fontSize={25}>
              R$ {formatMoneyValue(totalValue)}
            </Text>
          </ContainerTotalValue>
        </ContainerActionsFooter>
      </ContainerFooter>
    </>
  );
};

export default ListItens;
