import { Modal, View } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import theme from "../../global/styles/theme";

import Text from "../Text/Text";
import { ContainerModalIcon } from "../../utils/constants";

import ModalConfirmationProps from "./ModalConfirmationProps";
import { CenteredView, ModalView, ModalTitle, ButtonsContainer } from "../ModalForm/ModalForm.styles";

const ModalConfirmation = (props: ModalConfirmationProps) => {
    const { isModalOpen, fontFamily, message, icon, children } = props;

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isModalOpen}
        >
            <CenteredView>
                <ModalView>
                    <View style={ContainerModalIcon}>
                        <FontAwesome size={70} color={theme?.colors?.primary} name={icon} />
                    </View>
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