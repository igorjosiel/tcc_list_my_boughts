import { ReactNode } from "react";
import { ModalProps } from "react-native";

export interface ModalFormProps extends ModalProps {
    isModalOpen: boolean;
    closeModal: () => void;
    children?: ReactNode;
};

export interface ModalFormStylesProps {

};