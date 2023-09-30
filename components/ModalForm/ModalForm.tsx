import { useState, useEffect } from "react";
import { Modal } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import {
  CenteredView,
  ModalView,
  ModalTitle,
  AmountContainer,
  CategoryContainer,
  PriorityContainer,
  ButtonsContainer,
  ScrollViewContainer,
} from "./ModalForm.styles";
import { styles } from "../../utils/constants";

import Text from "../Text/Text";
import TextInput from "../Input/TextInput/TextInput";
import MoneyInput from "../Input/MoneyInput/MoneyInput";
import Button from "../Button/Button";
import Scroll from "../ScrollView/ScrollView";
import ModalConfirmation from "../ModalConfirmation/ModalConfirmation";

import { ModalFormProps } from "./ModalForm.types";
import { Product } from "../../utils/interfaces";

import theme from "../../global/styles/theme";
import { useSetFonts } from "../../hooks/useSetFonts";
import { categories, priorities } from "../../utils/constants";

const ModalForm: React.FC<ModalFormProps> = (props: ModalFormProps) => {
  const {
    isModalOpen,
    action,
    productWillBeChanged,
    closeModal,
    onSaveNewProduct,
    onChangeProduct,
    onRemoveProduct,
  } = props;

  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedPriority, setSelectedPriority] = useState<string>("");
  const [showCategoryOptions, setShowCategoryOptions] =
    useState<boolean>(false);
  const [showPriorityOptions, setShowPriorityOptions] =
    useState<boolean>(false);
  const [newProduct, setNewProduct] = useState<Product>({
    id: 0,
    amount: 1,
    productName: "",
    category: "",
    price: 0,
    priority: "",
  });
  const [isModalConfirmationVisible, setIsModalConfirmationVisible] =
    useState<boolean>(false);

  useEffect(() => {
    if (isModalOpen && action === "alteration") {
      setNewProduct({
        id: productWillBeChanged?.id,
        productName: productWillBeChanged?.productName,
        amount: productWillBeChanged?.amount,
        category: productWillBeChanged?.category,
        price: productWillBeChanged?.price,
        priority: productWillBeChanged?.priority,
      });

      setSelectedCategory(productWillBeChanged?.category);
      setSelectedPriority(productWillBeChanged?.priority);
    }
  }, [isModalOpen]);

  const Poppins_600SemiBold = useSetFonts("Poppins_600SemiBold");

  const resetProductData = () => {
    setNewProduct({
      ...newProduct,
      id: 0,
      productName: "",
      amount: 1,
      price: 0,
    });
  };

  const setAmountNewProduct = (value: number) => {
    if (value === 0) return;

    setNewProduct({ ...newProduct, amount: value });
  };

  const onSelectCategory = (category: string) => {
    setShowCategoryOptions(false);
    setSelectedCategory(category);
  };

  const onSelectPriority = (priority: string) => {
    setShowPriorityOptions(false);
    setSelectedPriority(priority);
  };

  const setPropertyNewProduct = (
    value: string | number | boolean | null,
    property: string
  ) => {
    setNewProduct({ ...newProduct, [property]: value });
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isModalOpen}
      onRequestClose={closeModal}
    >
      <CenteredView>
        <ModalView>
          <ModalTitle>
            <Text fontFamily={Poppins_600SemiBold} fontSize={20} color={"#000"}>
              Informações do Produto
            </Text>
          </ModalTitle>
          <TextInput
            fontFamily={Poppins_600SemiBold}
            borderRadius={"10px"}
            width={"100%"}
            onChangeText={(value) =>
              setPropertyNewProduct(value, "productName")
            }
            value={newProduct?.productName}
            placeholder="Nome do produto"
            keyboardType="default"
          />
          <AmountContainer>
            <Button
              backgroundColor={theme?.colors?.primary}
              height={"60px"}
              width={"15%"}
              borderBottomLeftRadius={"10px"}
              borderTopLeftRadius={"10px"}
              borderBottomRightRadius={"0px"}
              borderTopRightRadius={"0px"}
              flexDirection={"row"}
              justifyContent={"center"}
              alignItems={"center"}
              onPress={() => setAmountNewProduct(newProduct?.amount - 1)}
            >
              <FontAwesome size={30} color={"#FFF"} name="minus" />
            </Button>
            <TextInput
              fontFamily={Poppins_600SemiBold}
              borderRadius={"0"}
              width={"70%"}
              keyboardType={"numeric"}
              onChangeText={(value) =>
                value && setAmountNewProduct(parseInt(value))
              }
              value={
                newProduct?.amount?.toString() == "0"
                  ? ""
                  : newProduct?.amount?.toString()
              }
              placeholder="Quantidade"
              maxLength={10}
            />
            <Button
              backgroundColor={theme?.colors?.primary}
              height={"60px"}
              width={"15%"}
              borderTopLeftRadius={"0px"}
              borderBottomLeftRadius={"0px"}
              borderBottomRightRadius={"10px"}
              borderTopRightRadius={"10px"}
              flexDirection={"row"}
              justifyContent={"center"}
              alignItems={"center"}
              onPress={() => setAmountNewProduct(newProduct?.amount + 1)}
            >
              <FontAwesome size={30} color={"#FFF"} name="plus" />
            </Button>
          </AmountContainer>
          <MoneyInput
            fontFamily={Poppins_600SemiBold}
            placeholder="Preço"
            value={newProduct?.price === 0 ? null : newProduct?.price}
            onChangeValue={(value) => setPropertyNewProduct(value, "price")}
            prefix="R$ "
            delimiter="."
            separator=","
            precision={2}
            minValue={0}
          />
          <CategoryContainer>
            <Button
              borderWidth={"3px"}
              borderColor={theme?.colors?.primary}
              backgroundColor={"#FFF"}
              borderRadius={"10px"}
              borderBottomColor={theme?.colors?.primary}
              borderBottomWidth={"3"}
              width={"100%"}
              height={"60px"}
              padding={"10px"}
              flexDirection={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
              activeOpacity={0.8}
              onPress={() => setShowCategoryOptions(!showCategoryOptions)}
            >
              <Text
                fontFamily={Poppins_600SemiBold}
                fontSize={20}
                color={"black"}
              >
                {selectedCategory ? selectedCategory : `Categoria`}
              </Text>
              <MaterialIcons
                name={
                  !showCategoryOptions ? "arrow-drop-down" : "arrow-drop-up"
                }
                size={35}
                color={"black"}
              />
            </Button>
          </CategoryContainer>
          {showCategoryOptions && (
            <ScrollViewContainer>
              <Scroll
                data={categories}
                scrollName={"category"}
                onSelected={onSelectCategory}
                setPropertyNewProduct={setPropertyNewProduct}
              />
            </ScrollViewContainer>
          )}
          <PriorityContainer>
            <Button
              borderWidth={"3px"}
              borderColor={theme?.colors?.primary}
              borderRadius={"10px"}
              borderBottomColor={theme?.colors?.primary}
              borderBottomWidth={"3"}
              backgroundColor={"#FFF"}
              width={action === "creation" ? "100%" : "48%"}
              height={"60px"}
              padding={"10px"}
              flexDirection={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
              activeOpacity={0.8}
              onPress={() => setShowPriorityOptions(!showPriorityOptions)}
            >
              <Text
                fontFamily={Poppins_600SemiBold}
                fontSize={20}
                color={"black"}
              >
                {selectedPriority ? selectedPriority : `Prioridade`}
              </Text>
              <MaterialIcons
                name={
                  !showPriorityOptions ? "arrow-drop-down" : "arrow-drop-up"
                }
                size={35}
                color={"black"}
              />
            </Button>
            {action === "alteration" && (
              <Button
                backgroundColor={theme?.colors?.primary}
                width={"48%"}
                borderRadius={"10px"}
                flexDirection={"row"}
                alignItems={"center"}
                justifyContent={"space-around"}
                style={styles?.shadowPropMainColor}
                onPress={() => {
                  if (!newProduct?.productName) {
                    setIsModalConfirmationVisible(true);
                    return;
                  }

                  onChangeProduct(newProduct);
                  resetProductData();
                }}
              >
                <Text fontFamily={Poppins_600SemiBold} fontSize={20}>
                  Salvar
                </Text>
              </Button>
            )}
          </PriorityContainer>
          {showPriorityOptions && (
            <ScrollViewContainer
              width={action === "creation" ? "100%" : "48%"}
              marginRight={action === "alteration" ? "auto" : "0px"}
            >
              <Scroll
                data={priorities}
                scrollName={"priority"}
                onSelected={onSelectPriority}
                setPropertyNewProduct={setPropertyNewProduct}
              />
            </ScrollViewContainer>
          )}
          <ButtonsContainer>
            <Button
              backgroundColor={"#FFF"}
              width={"48%"}
              borderRadius={"10px"}
              flexDirection={"row"}
              alignItems={"center"}
              justifyContent={"space-around"}
              style={styles?.shadowPropMainColor}
              onPress={() => {
                closeModal();
                resetProductData();
              }}
            >
              <Text
                fontFamily={Poppins_600SemiBold}
                fontSize={20}
                color={theme?.colors?.primary}
              >
                Cancelar
              </Text>
            </Button>
            {action === "alteration" ? (
              <Button
                backgroundColor={"#FF4500"}
                width={"48%"}
                borderRadius={"10px"}
                flexDirection={"row"}
                alignItems={"center"}
                justifyContent={"space-around"}
                style={styles?.shadowPropMainColor}
                onPress={() => {
                  onRemoveProduct(newProduct);
                  resetProductData();
                }}
              >
                <Text fontFamily={Poppins_600SemiBold} fontSize={20}>
                  Remover
                </Text>
              </Button>
            ) : (
              <Button
                backgroundColor={theme?.colors?.primary}
                width={"48%"}
                borderRadius={"10px"}
                flexDirection={"row"}
                alignItems={"center"}
                justifyContent={"space-around"}
                style={styles?.shadowPropMainColor}
                onPress={() => {
                  if (!newProduct?.productName) {
                    setIsModalConfirmationVisible(true);
                    return;
                  }

                  onSaveNewProduct(newProduct);
                  resetProductData();
                }}
              >
                <Text fontFamily={Poppins_600SemiBold} fontSize={22}>
                  Salvar
                </Text>
              </Button>
            )}
          </ButtonsContainer>
        </ModalView>
      </CenteredView>

      <ModalConfirmation
        isModalOpen={isModalConfirmationVisible}
        closeModal={() => setIsModalConfirmationVisible(false)}
        fontFamily={Poppins_600SemiBold}
        message={"Para salvar, preencha o nome do produto!"}
        icon="exclamation"
      >
        <Button
          backgroundColor={theme?.colors?.primary}
          width={"40%"}
          marginLeft={"auto"}
          marginRight={"auto"}
          borderRadius={"10px"}
          flexDirection={"row"}
          alignItems={"center"}
          justifyContent={"space-around"}
          style={styles?.shadowPropMainColor}
          onPress={() => setIsModalConfirmationVisible(false)}
        >
          <Text fontFamily={Poppins_600SemiBold} fontSize={22}>
            Ok
          </Text>
        </Button>
      </ModalConfirmation>
    </Modal>
  );
};

export default ModalForm;
