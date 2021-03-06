import { ReactNode } from "react";
import { ModalProps } from "react-native";

import { Product } from "../../utils/interfaces";
export interface ModalFormProps extends ModalProps {
    isModalOpen: boolean;
    action: string;
    productWillBeChanged: Product;
    closeModal: () => void;
    onSaveNewProduct: (newProduct: Product) => void;
    onChangeProduct: (changedProduct: Product) => void;
    onRemoveProduct: (removedProduct: Product) => void;
    children?: ReactNode;
};
export interface ScrollViewContainerProps {
    width?: string;
    marginRight?: string;
}