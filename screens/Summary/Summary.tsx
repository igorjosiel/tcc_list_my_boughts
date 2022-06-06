import React, { useState } from "react";
import { useSetFonts } from "../../hooks/useSetFonts";
import { View } from "react-native";
import Header from "../../components/Header/Header";
import { ContainerProductsList } from "../ListItens/ListItens.styles";
import { Product, Button as ButtonProps } from "../../utils/interfaces";
import Text from "../../components/Text/Text";
import theme from "../../global/styles/theme";
import formatMoney from "../../utils/formatMoney";
import Button from "../../components/Button/Button";
import ModalConfirmation from "../../components/ModalConfirmation/ModalConfirmation";
import { styles } from "../../utils/constants";
import {
  Cells,
  Buttons,
  ValueCells,
  ContainerTotalValue,
  ContainerTotalValueText,
  ContainerButtons,
} from "./Summary.styles";

const Summary = ({ navigation, route }) => {
  const Poppins_600SemiBold = useSetFonts("Poppins_600SemiBold");

  const [isModalConfirmationVisible, setIsModalConfirmationVisible] =
    useState<boolean>(false);

  const products: Product[] = route?.params?.listProducts;
  const value: number = route?.params?.totalValue;
  const clearProductsList = route?.params?.clearProductsList;

  const buttons: ButtonProps[] = [
    {
      id: 0,
      name: "Cancelar",
      backgroundColor: "#FFF",
      color: theme?.colors?.primary,
      style: styles?.shadowPropMainColor,
      action: () => {
        if (!isModalConfirmationVisible) navigation?.navigate("ListItens");
        else setIsModalConfirmationVisible(false);
      },
    },
    {
      id: 1,
      name: "Finalizar",
      backgroundColor: theme?.colors?.primary,
      color: "#FFF",
      style: styles?.shadowPropMainColor,
      action: () => {
        if (!isModalConfirmationVisible) setIsModalConfirmationVisible(true);
        else {
          clearProductsList();
          setIsModalConfirmationVisible(false);
          navigation.navigate("ListItens");
        }
      },
    },
  ];

  return (
    <>
      <ModalConfirmation
        isModalOpen={isModalConfirmationVisible}
        closeModal={() => setIsModalConfirmationVisible(false)}
        fontFamily={Poppins_600SemiBold}
        message={"Tem certeza de que deseja finalizar a lista?"}
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

      <Header />

      <ContainerProductsList>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            width: "90%",
            height: 55,
            backgroundColor: theme?.colors?.primary,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            marginTop: "5%",
            marginBottom: 0,
            marginLeft: "5%",
            marginRight: "5%",
            paddingLeft: "3%",
            paddingRight: "3%",
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 5,
            },
            shadowOpacity: 0.58,
            shadowRadius: 16.0,
            elevation: 3,
          }}
        >
          <Cells width="35%" justifyContent="flex-start">
            <Text
              fontFamily={Poppins_600SemiBold}
              fontSize={14}
              textAlign={"center"}
            >
              ITEM
            </Text>
          </Cells>
          <Cells width="15%" justifyContent="center">
            <Text
              fontFamily={Poppins_600SemiBold}
              fontSize={14}
              textAlign={"center"}
            >
              QTD.
            </Text>
          </Cells>
          <Cells width="25%" justifyContent="flex-end">
            <Text
              fontFamily={Poppins_600SemiBold}
              fontSize={14}
              textAlign={"center"}
            >
              VL. UNI.
            </Text>
          </Cells>
          <Cells width="25%" justifyContent="flex-end">
            <Text
              fontFamily={Poppins_600SemiBold}
              fontSize={14}
              textAlign={"center"}
            >
              TOTAL
            </Text>
          </Cells>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            width: "90%",
            height: 55,
            marginBottom: 10,
            marginTop: 0,
            margin: "5%",
            borderBottomRightRadius: 10,
            borderBottomLeftRadius: 10,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 5,
            },
            shadowOpacity: 0.58,
            shadowRadius: 16.0,
            elevation: 3,
          }}
        >
          {products?.map((product, index) => {
            return (
              <ValueCells>
                <Cells width="35%" justifyContent="flex-start">
                  <Text
                    fontFamily={Poppins_600SemiBold}
                    fontSize={14}
                    color={"black"}
                    textAlign={"center"}
                  >
                    {product?.productName?.length > 13
                      ? product?.productName?.slice(0, 13) + "..."
                      : product?.productName}
                  </Text>
                </Cells>
                <Cells width="15%" justifyContent="center">
                  <Text
                    fontFamily={Poppins_600SemiBold}
                    fontSize={14}
                    color={"black"}
                    textAlign={"center"}
                  >
                    {product?.amount}
                  </Text>
                </Cells>
                <Cells width="25%" justifyContent="flex-end">
                  <Text
                    fontFamily={Poppins_600SemiBold}
                    fontSize={14}
                    color={"black"}
                    textAlign={"center"}
                  >
                    R$ {formatMoney(product?.price)}
                  </Text>
                </Cells>
                <Cells width="25%" justifyContent="flex-end">
                  <Text
                    fontFamily={Poppins_600SemiBold}
                    fontSize={14}
                    color={"black"}
                    textAlign={"center"}
                  >
                    R$ {formatMoney(product?.amount * product?.price)}
                  </Text>
                </Cells>
              </ValueCells>
            );
          })}
        </View>
        <ContainerTotalValue>
          <ContainerTotalValueText>
            <Text fontFamily={Poppins_600SemiBold} fontSize={18} color={"#000"}>
              Valor total:
            </Text>
          </ContainerTotalValueText>
          <View
            style={{
              width: "45%",
              height: 50,
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              paddingRight: 10,
              alignItems: "center",
              backgroundColor: theme?.colors?.primary,
              borderRadius: 10,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 5,
              },
              shadowOpacity: 0.58,
              shadowRadius: 16.0,
              elevation: 5,
            }}
          >
            <Text fontFamily={Poppins_600SemiBold} fontSize={18}>
              R$ {formatMoney(value)}
            </Text>
          </View>
        </ContainerTotalValue>
      </ContainerProductsList>
      <ContainerButtons>
        <Buttons>
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
        </Buttons>
      </ContainerButtons>
    </>
  );
};

export default Summary;
