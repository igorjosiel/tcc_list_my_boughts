import { Conatiner } from "./ListItens.styles";
import { ImageBackground, StyleSheet } from "react-native";
import imagePaper from '../../assets/paper.png';

const ListItens = () => {
    return (
        <ImageBackground source={imagePaper} style={styles.image}>
            <Conatiner></Conatiner>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    image: {
        flex: 1,
        resizeMode: 'contain',
    },
})

export default ListItens;