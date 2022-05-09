import { useState } from "react";
import { Modal } from "react-native";

import {
  CenteredView,
  ModalView,
  ModalTitle,
  AmountContainer,
} from "./ModalForm.styles";
import Text from "../Text/Text";
import TextInput from "../Input/TextInput/TextInput";

import { ModalFormProps } from "./ModalForm.types";
import { Product } from "../../utils/interfaces";

import { useSetFonts } from "../../hooks/useSetFonts";

const ModalForm: React.FC<ModalFormProps> = (props: ModalFormProps) => {
  const [newProduct, setNewProduct] = useState<Product>({
    id: 0,
    amount: 1,
    productName: "",
    category: "",
    price: 0,
    priority: false,
  });

  const Poppins_600SemiBold = useSetFonts("Poppins_600SemiBold");

  const { isModalOpen, closeModal } = props;

  const setPropertyNewProduct = (
    value: string | number | boolean | null,
    property: string
  ) => {
    setNewProduct({ ...newProduct, [property]: value });
  };

  const setAmountNewProduct = (value: number) => {
    if (value === 0) return;

    setNewProduct({ ...newProduct, amount: value });
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
            <Text fontFamily={Poppins_600SemiBold} fontSize={22} color={"#000"}>
              Informações do Produto
            </Text>
          </ModalTitle>
          <TextInput
            fontFamily={Poppins_600SemiBold}
            width={"100%"}
            onChangeText={(value) =>
              setPropertyNewProduct(value, "productName")
            }
            value={newProduct?.productName}
            placeholder="Nome do produto"
            keyboardType="default"
          />
          <AmountContainer>
            <TextInput
              fontFamily={Poppins_600SemiBold}
              width={"70%"}
              keyboardType={"numeric"}
              onChangeText={(value) => setAmountNewProduct(parseInt(value))}
              value={
                newProduct?.amount.toString() == "0"
                  ? ""
                  : newProduct?.amount.toString()
              }
              placeholder="Quantidade"
              maxLength={10}
            />
          </AmountContainer>
        </ModalView>
      </CenteredView>
    </Modal>
  );
};

export default ModalForm;
