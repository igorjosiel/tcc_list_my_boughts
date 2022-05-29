import { ModalProps } from "react-native";

export default interface ModalMoneyProps extends ModalProps {
    isModalOpen: boolean;
    closeModal: () => void;
    fontFamily: string;
}