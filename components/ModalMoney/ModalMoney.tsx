import { Modal, View } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from '@react-native-async-storage/async-storage';

import Text from "../Text/Text";
import Button from "../Button/Button";
import MoneyInput from "../Input/MoneyInput/MoneyInput";
import { Button as ButtonProps } from "../../utils/interfaces";
import ModalMoneyProps from "./ModalMoney.types";
import { CenteredView, ModalView, ModalTitle, ButtonsContainer } from "../ModalForm/ModalForm.styles";
import { ContainerModalIcon, styles } from "../../utils/constants";
import { useEffect, useState } from "react";
import theme from "../../global/styles/theme";

const ModalMoney = (props: ModalMoneyProps) => {
    const { isModalOpen, closeModal, fontFamily } = props;

    const [balance, setBalance] = useState<number | null>(0);

    useEffect(() => {
        const getBalance = async () => {
            const balance = await AsyncStorage.getItem('@balance');
            setBalance(Number(balance));
        }

        getBalance();
    }, []);

    const storeBalanceData = async (value: number | null) => {
        try {
            await AsyncStorage.setItem('@balance', String(value))
        } catch (e) {
            // saving error
        }
    }

    const buttons: ButtonProps[] = [
        {
            id: 0,
            name: 'Cancelar',
            backgroundColor: '#FFF',
            color: theme?.colors?.primary,
            style: styles?.shadowPropMainColor,
            action: () => closeModal(),
        },
        {
            id: 1,
            name: 'Salvar',
            backgroundColor: theme?.colors?.primary,
            color: '#FFF',
            style: styles?.shadowPropMainColor,
            action: () => {
                storeBalanceData(balance);
                closeModal();
            },
        },
    ];

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isModalOpen}
        >
            <CenteredView>
                <ModalView>
                    <View style={ContainerModalIcon}>
                        <MaterialIcons size={70} color={theme?.colors?.primary} name="attach-money" />
                    </View>
                    <ModalTitle>
                        <Text
                            fontFamily={fontFamily}
                            fontSize={20}
                            color={"#000"}
                            textAlign={"center"}
                        >
                            Limite máximo de compras
                        </Text>
                    </ModalTitle>
                    <MoneyInput
                        fontFamily={fontFamily}
                        value={balance}
                        onChangeValue={(value) => setBalance(value)}
                        prefix="R$ "
                        delimiter="."
                        separator=","
                        precision={2}
                        minValue={0}
                    />
                    <ButtonsContainer>
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
                                        fontFamily={fontFamily}
                                        fontSize={22}
                                        color={button?.color}
                                    >
                                        {button?.name}
                                    </Text>
                                </Button>
                            );
                        })}
                    </ButtonsContainer>
                </ModalView>
            </CenteredView>
        </Modal>
    );
}

export default ModalMoney;