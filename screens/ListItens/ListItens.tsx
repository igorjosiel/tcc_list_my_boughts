import React, { useState } from 'react';
import { Conatiner } from "./ListItens.styles";
import { ImageBackground, StyleSheet, Pressable, View } from "react-native";
import Checkbox from 'expo-checkbox';
import Icon from 'react-native-vector-icons/FontAwesome';
import imagePaper from '../../assets/paper.png';

import { useSetFonts } from "../../hooks/useSetFonts";
import Text from '../../components/Text/Text';

const ListItens = () => {
    const Poppins_400Regular = useSetFonts('Poppins_600SemiBold');
    const Poppins_600SemiBold = useSetFonts('Poppins_600SemiBold');

    const [isChecked, setChecked] = useState(false);

    return (
        <ImageBackground source={imagePaper} style={styles.image}>
            <View style={{ height: '10%', marginLeft: 'auto', marginRight: 'auto', justifyContent: 'center' }}>
                <Text fontFamily={Poppins_600SemiBold} fontSize={28}>Lista de Compras</Text>
            </View>
            <View style={{ height: '80%', padding: '10%', paddingTop: 0 }}>
                <Conatiner style={styles.section}>
                    <Checkbox value={isChecked} onValueChange={setChecked} />
                    <Text fontFamily={Poppins_400Regular} fontSize={22}>Arroz</Text>
                    <Icon size={26} color="#000" name="pencil" />
                </Conatiner>
                <Conatiner style={styles.section}>
                    <Checkbox value={isChecked} onValueChange={setChecked} />
                    <Text fontFamily={Poppins_400Regular} fontSize={22}>Feijão</Text>
                    <Icon size={26} color="#000" name="pencil" />
                </Conatiner>
                {/* <Conatiner style={styles.section}>
                    <Checkbox value={isChecked} onValueChange={setChecked} />
                    <Text style={{ fontFamily: Poppins_400Regular, fontSize: 22 }}>Leite</Text>
                    <Icon size={26} color="#000" name="pencil" />
                </Conatiner> */}
            </View>
            <View style={{ height: '10%' }}>ffs</View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    image: {
        flex: 1,
        resizeMode: 'contain',
    },
    container: {
        flex: 1,
        marginHorizontal: 16,
        marginVertical: 32,
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '10px'
    },
    paragraph: {
        fontSize: 15,
    },
    checkbox: {
        margin: 8,
        height: 20,
        width: 20,
    },
})

export default ListItens;