import { ModalProps } from "react-native";

export default interface ModalConfirmationProps extends ModalProps {
    isModalOpen: boolean;
    closeModal: () => void;
    fontFamily: string;
    message: string;
    icon: string;
}