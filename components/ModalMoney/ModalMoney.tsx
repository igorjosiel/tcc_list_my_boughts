import { Modal } from "react-native";

import Text from "../Text/Text";
import Button from "../Button/Button";
import MoneyInput from "../Input/MoneyInput/MoneyInput";
import { Button as ButtonProps } from "../../utils/interfaces";
import ModalMoneyProps from "./ModalMoney.types";
import { CenteredView, ModalView, ModalTitle, ButtonsContainer } from "../ModalForm/ModalForm.styles";
import { styles } from "../../utils/constants";
import { useState } from "react";

const ModalMoney = (props: ModalMoneyProps) => {
    const { isModalOpen, closeModal, fontFamily } = props;

    const [balance, setBalance] = useState<number>(0);

    const buttons: ButtonProps[] = [
        {
            id: 0,
            name: 'Cancelar',
            backgroundColor: '#D2691E',
            style: styles?.shadowPropMainColor,
            action: () => closeModal(),
        },
        {
            id: 1,
            name: 'Salvar',
            backgroundColor: 'green',
            style: styles?.shadowPropMainColor,
            action: () => {
                console.log('Deu bom...')
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
                    <ModalTitle>
                        <Text
                            fontFamily={fontFamily}
                            fontSize={20}
                            color={"#000"}
                            textAlign={"center"}
                        >
                            Quanto você está disposto a gastar aqui no CrieLista?
                        </Text>
                    </ModalTitle>
                    <MoneyInput
                        fontFamily={fontFamily}
                        value={balance}
                        // onChangeValue={(value) => setBalance(value)}
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
                                    <Text fontFamily={fontFamily} fontSize={22}>
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