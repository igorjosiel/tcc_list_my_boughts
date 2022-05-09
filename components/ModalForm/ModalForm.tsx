import { Modal } from "react-native";

import { CenteredView, ModalView, ModalTitle } from "./ModalForm.styles";
import { ModalFormProps } from "./ModalForm.types";
import Text from "../Text/Text";

import { useSetFonts } from "../../hooks/useSetFonts";

const ModalForm: React.FC<ModalFormProps> = (props: ModalFormProps) => {
    const Poppins_600SemiBold = useSetFonts("Poppins_600SemiBold");

    const { isModalOpen, closeModal } = props;

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
                        <Text
                            fontFamily={Poppins_600SemiBold}
                            fontSize={22}
                            color={"#000"}
                        >
                            Informações do Produto
                        </Text>
                    </ModalTitle>
                </ModalView>
            </CenteredView>
        </Modal>
    );
};

export default ModalForm;