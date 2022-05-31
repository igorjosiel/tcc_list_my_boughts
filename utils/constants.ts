import { Category, Priority } from "./interfaces";
import { StyleSheet } from "react-native";

export const categories: Category[] = [
    {
        id: 0,
        name: "Alimentação",
        value: "Alimentação",
        icon: "restaurant",
        library: "MaterialIcons",
    },
    {
        id: 1,
        name: "Arte",
        value: "Arte",
        icon: "paint-brush",
        library: "FontAwesome",
    },
    {
        id: 2,
        name: "Bebida",
        value: "Bebida",
        icon: "local-drink",
        library: "MaterialIcons",
    },
    {
        id: 3,
        name: "Brinquedo",
        value: "Brinquedo",
        icon: "puzzle-piece",
        library: "FontAwesome",
    },
    {
        id: 4,
        name: "Calçado",
        value: "Calçado",
        icon: "beach-slipper",
        library: "Fontisto",
    },
    {
        id: 5,
        name: "Construção",
        value: "Construção",
        icon: "dump-truck",
        library: "MaterialCommunityIcons",
    },
    {
        id: 6,
        name: "Cosmético",
        value: "Cosmético",
        icon: "lipstick",
        library: "MaterialCommunityIcons",
    },
    {
        id: 7,
        name: "Doméstico",
        value: "Doméstico",
        icon: "house",
        library: "MaterialIcons",
    },
    {
        id: 8,
        name: "Educação",
        value: "Educação",
        icon: "school",
        library: "MaterialCommunityIcons",
    },
    {
        id: 9,
        name: "Entretenimento",
        value: "Entretenimento",
        icon: "television-guide",
        library: "MaterialCommunityIcons",
    },
    {
        id: 10,
        name: "Esporte",
        value: "Esporte",
        icon: "soccer-ball-o",
        library: "FontAwesome",
    },
    {
        id: 11,
        name: "Ferramenta",
        value: "Ferramenta",
        icon: "build",
        library: "MaterialIcons",
    },
    {
        id: 12,
        name: "Festa",
        value: "Festa",
        icon: "party-popper",
        library: "MaterialCommunityIcons",
    },
    {
        id: 13,
        name: "Higiene",
        value: "Higiene",
        icon: "clean-hands",
        library: "MaterialIcons",
    },
    {
        id: 14,
        name: "Jogo",
        value: "Jogo",
        icon: "gamepad",
        library: "FontAwesome",
    },
    {
        id: 15,
        name: "Limpeza",
        value: "Limpeza",
        icon: "cleaning-services",
        library: "MaterialIcons",
    },
    {
        id: 16,
        name: "Livro",
        value: "Livro",
        icon: "book",
        library: "FontAwesome",
    },
    {
        id: 17,
        name: "Música",
        value: "Música",
        icon: "music",
        library: "FontAwesome",
    },
    {
        id: 18,
        name: "Pet",
        value: "Pet",
        icon: "pets",
        library: "MaterialIcons",
    },
    {
        id: 19,
        name: "Planta",
        value: "Planta",
        icon: "flower-outline",
        library: "MaterialCommunityIcons",
    },
    {
        id: 20,
        name: "Saúde",
        value: "Saúde",
        icon: "medicinebox",
        library: "AntDesign",
    },
    {
        id: 21,
        name: "Serviço",
        value: "Serviço",
        icon: "hand-holding-usd",
        library: "FontAwesome5",
    },
    {
        id: 22,
        name: "Tecnologia",
        value: "Tecnologia",
        icon: "computer",
        library: "MaterialIcons",
    },
    {
        id: 23,
        name: "Trabalho",
        value: "Trabalho",
        icon: "hands-helping",
        library: "FontAwesome5",
    },
    {
        id: 24,
        name: "Vestuário",
        value: "Vestuário",
        icon: "hanger",
        library: "MaterialCommunityIcons",
    },
    {
        id: 25,
        name: "Viagem",
        value: "Viagem",
        icon: "wallet-travel",
        library: "MaterialCommunityIcons",
    },
];

export const priorities: Priority[] = [
    {
        id: 0,
        name: 'Sim',
        value: 'Sim',
        icon: 'star',
        library: 'FontAwesome',
    },
    {
        id: 1,
        name: 'Não',
        value: 'Não',
        icon: 'star-o',
        library: 'FontAwesome',
    },
];

export const styles = StyleSheet.create({
    shadowPropMainColor: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 5,
    },
});

export const ContainerModalIcon = {
    marginBottom: 10,
};