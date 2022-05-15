import { Modal } from "react-native";

import Text from "../Text/Text";

import ModalConfirmationProps from "./ModalConfirmationProps";
import { CenteredView, ModalView, ModalTitle, ButtonsContainer } from "../ModalForm/ModalForm.styles";

const ModalConfirmation = (props: ModalConfirmationProps) => {
    const { isModalOpen, fontFamily, message, children } = props;

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
                            fontSize={22}
                            color={"#000"}
                            textAlign={"center"}
                        >
                            {message}
                        </Text>
                    </ModalTitle>
                    <ButtonsContainer>
                        {children}
                    </ButtonsContainer>
                </ModalView>
            </CenteredView>
        </Modal>
    );
}

export default ModalConfirmation;