import { Category, Priority } from "./interfaces";

export const categories: Category[] = [
    {
        id: 0,
        name: "Comida",
        icon: "restaurant",
        library: "MaterialIcons",
    },
    {
        id: 1,
        name: "Limpeza",
        icon: "cleaning-services",
        library: "MaterialIcons",
    },
    {
        id: 2,
        name: "Bebida",
        icon: "local-drink",
        library: "MaterialIcons",
    },
    {
        id: 3,
        name: "Gelados",
        icon: "ice-cream",
        library: "MaterialCommunityIcons",
    },
    {
        id: 4,
        name: "Higiene",
        icon: "clean-hands",
        library: "MaterialIcons",
    },
    {
        id: 5,
        name: "Vestuário",
        icon: "hanger",
        library: "MaterialCommunityIcons",
    },
    {
        id: 6,
        name: "Saúde",
        icon: "medicinebox",
        library: "AntDesign",
    },
    {
        id: 7,
        name: "Música",
        icon: "music",
        library: "FontAwesome",
    },
    {
        id: 8,
        name: "Entretenimento",
        icon: "television-guide",
        library: "MaterialCommunityIcons",
    },
    {
        id: 9,
        name: "Tecnologia",
        icon: "computer",
        library: "MaterialIcons",
    },
    {
        id: 10,
        name: "Jogos",
        icon: "gamepad",
        library: "FontAwesome",
    },
    {
        id: 11,
        name: "Cosméticos",
        icon: "lipstick",
        library: "MaterialCommunityIcons",
    },
    {
        id: 12,
        name: "Festa",
        icon: "party-popper",
        library: "MaterialCommunityIcons",
    },
    {
        id: 13,
        name: "Brinquedo",
        icon: "puzzle-piece",
        library: "FontAwesome",
    },
    {
        id: 14,
        name: "Ferramentas",
        icon: "build",
        library: "MaterialIcons",
    },
    {
        id: 15,
        name: "Construção",
        icon: "dump-truck",
        library: "MaterialCommunityIcons",
    },
    {
        id: 16,
        name: "Plantas",
        icon: "flower-outline",
        library: "MaterialCommunityIcons",
    },
    {
        id: 17,
        name: "Animais",
        icon: "pets",
        library: "MaterialIcons",
    },
];

export const priorities: Priority[] = [
    {
        id: 0,
        name: 'SIM',
        value: true,
        icon: 'star',
    },
    {
        id: 1,
        name: 'NÂO',
        value: false,
        icon: 'star-o',
    }
];