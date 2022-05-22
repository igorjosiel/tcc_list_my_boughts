import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import Fontisto from "react-native-vector-icons/Fontisto";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

import FactoryProps from "./FactoryProps";

const Factory = ({ library, icon }: FactoryProps) => {
    switch (library) {
        case 'MaterialIcons':
            return <MaterialIcons name={icon} size={30} color={"#FFF"} />;
        case 'FontAwesome':
            return <FontAwesome name={icon} size={30} color={"#FFF"} />;
        case 'FontAwesome5':
            return <FontAwesome5 name={icon} size={30} color={"#FFF"} />;
        case 'AntDesign':
            return <AntDesign name={icon} size={30} color={"#FFF"} />;
        case 'Fontisto':
            return <Fontisto name={icon} size={30} color={"#FFF"} />
        case 'MaterialCommunityIcons':
            return <MaterialCommunityIcons name={icon} size={30} color={"#FFF"} />;
        default: return <FontAwesome name={icon} size={30} color={"#FFF"} />;
    }
}

export default Factory;