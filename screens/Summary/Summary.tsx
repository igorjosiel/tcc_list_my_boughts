import React from "react";
import { useSetFonts } from "../../hooks/useSetFonts";
import { View } from "react-native";
import Header from "../../components/Header/Header";
import { ContainerFooter, ContainerProductsList, ContainerProductsListHeader } from "../ListItens/ListItens.styles";
import { Product, Button as ButtonProps } from "../../utils/interfaces";
import Text from "../../components/Text/Text";
import theme from "../../global/styles/theme";
import formatMoney from "../../utils/formatMoney";
import Button from "../../components/Button/Button";
import { ContainerTotalValue } from "../ListItens/ListItens.styles";
import { styles } from "../../utils/constants";

const Summary = ({ navigation, route }) => {
    const Poppins_600SemiBold = useSetFonts("Poppins_600SemiBold");

    const products: Product[] = route?.params?.listProducts;
    const value: number = route?.params?.totalValue;

    const buttons: ButtonProps[] = [
        {
            id: 0,
            name: 'Cancelar',
            backgroundColor: '#FFF',
            color: theme?.colors?.primary,
            style: styles?.shadowPropMainColor,
            action: () => navigation?.navigate('ListItens'),
        },
        {
            id: 1,
            name: 'Finalizar',
            backgroundColor: theme?.colors?.primary,
            color: '#FFF',
            style: styles?.shadowPropMainColor,
            action: () => {
                console.log('sds');
            },
        },
    ];

    return (
        <>
            <Header />

            <ContainerProductsList>
                {/* <View > */}
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '90%',
                    height: 55,
                    backgroundColor: theme?.colors?.primary,
                    borderTopLeftRadius: 7,
                    borderTopRightRadius: 7,
                    marginTop: '5%',
                    marginBottom: 0,
                    marginLeft: '5%',
                    marginRight: '5%',
                    paddingLeft: '3%',
                    paddingRight: '3%',
                }}>
                    <View style={{
                        width: '25%',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                    }}>
                        <Text fontFamily={Poppins_600SemiBold}
                            fontSize={14}
                            textAlign={"center"}
                        >
                            ITEM
                        </Text>
                    </View>
                    <View style={{
                        width: '25%',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <Text fontFamily={Poppins_600SemiBold}
                            fontSize={14}
                            textAlign={"center"}
                        >
                            QTD.
                        </Text>
                    </View>
                    <View style={{
                        width: '25%',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                    }}>
                        <Text fontFamily={Poppins_600SemiBold}
                            fontSize={14}
                            textAlign={"center"}
                        >
                            VL. UNI.
                        </Text>
                    </View>
                    <View style={{
                        width: '25%',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                    }}>
                        <Text fontFamily={Poppins_600SemiBold}
                            fontSize={14}
                            textAlign={"center"}
                        >
                            TOTAL
                        </Text>
                    </View>
                </View>
                <View style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '90%',
                    marginBottom: 10,
                    marginTop: 0,
                    margin: '5%',
                    borderBottomRightRadius: 10,
                    borderBottomLeftRadius: 10,
                    shadowColor: '#000',
                    shadowOffset: {
                        width: 0,
                        height: 5,
                    },
                    shadowOpacity: 0.58,
                    shadowRadius: 16.00,
                    elevation: 3,
                }}>
                    {products?.map((product, index) => {
                        return (
                            <View style={{
                                display: 'flex',
                                flexDirection: 'row',
                                height: 50,
                                paddingLeft: '3%',
                                paddingRight: '3%',
                            }}>
                                <View style={{
                                    width: '25%',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'flex-start',
                                    alignItems: 'center',
                                }}>
                                    <Text
                                        fontFamily={Poppins_600SemiBold}
                                        fontSize={14}
                                        color={'black'}
                                        textAlign={"center"}
                                    >
                                        {product?.productName}
                                    </Text>
                                </View>
                                <View style={{
                                    width: '25%',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                    <Text
                                        fontFamily={Poppins_600SemiBold}
                                        fontSize={14}
                                        color={'black'}
                                        textAlign={"center"}
                                    >
                                        {product?.amount}
                                    </Text>
                                </View>
                                <View style={{
                                    width: '25%',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'flex-end',
                                    alignItems: 'center',
                                }}>
                                    <Text
                                        fontFamily={Poppins_600SemiBold}
                                        fontSize={14}
                                        color={'black'}
                                        textAlign={"center"}
                                    >
                                        R$ {formatMoney(product?.price)}
                                    </Text>
                                </View>
                                <View style={{
                                    width: '25%',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'flex-end',
                                    alignItems: 'center',
                                }}>
                                    <Text
                                        fontFamily={Poppins_600SemiBold}
                                        fontSize={14}
                                        color={'black'}
                                        textAlign={"center"}
                                    >
                                        R$ {formatMoney(product?.amount * product?.price)}
                                    </Text>
                                </View>
                            </View>
                        );
                    })}
                </View>
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '90%',
                    marginLeft: '5%',
                    marginRight: '5%',
                }}>
                    <View style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        paddingLeft: 5,
                    }}>
                        <Text fontFamily={Poppins_600SemiBold} fontSize={18} color={'#000'}>
                            Valor total:
                        </Text>
                    </View>
                    <View style={{
                        width: '45%',
                        height: 50,
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        paddingRight: 10,
                        alignItems: 'center',
                        backgroundColor: theme?.colors?.primary,
                        borderRadius: 7,
                        shadowColor: '#000',
                        shadowOffset: {
                            width: 0,
                            height: 5,
                        },
                        shadowOpacity: 0.58,
                        shadowRadius: 16.00,
                        elevation: 5,
                    }}>
                        <Text fontFamily={Poppins_600SemiBold} fontSize={18}>
                            R$ {formatMoney(value)}
                        </Text>
                    </View>
                </View>
                {/* </View> */}
            </ContainerProductsList>
            <View style={{
                height: '10%',
                width: '90%',
                marginLeft: '5%',
                marginRight: '5%',
            }}>
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}>
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
                                style={button?.style}
                            >
                                <Text
                                    fontFamily={Poppins_600SemiBold}
                                    fontSize={22}
                                    color={button?.color}
                                >
                                    {button?.name}
                                </Text>
                            </Button>
                        );
                    })}
                </View>
            </View>
        </>
    );
};

export default Summary;
