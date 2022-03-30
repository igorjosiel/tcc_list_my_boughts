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

    interface Item {
        id: number,
        name: string,
        checked: boolean,
    }

    const [listItems, setListItems] = useState<Item[]>([]);
    const [count, setCount] = useState<number>(0);

    const addItemToList = (item: string) => {
        const newItem = {
            id: count,
            name: item,
            checked: false,
        };

        setListItems(oldState => [...oldState, newItem]);
        setCount(oldState => oldState + 1);
    }

    const changeItemOfList = (id: number) => {
        console.log('Chegou: ', id);
    }

    return (
        <ImageBackground source={imagePaper} style={styles.image}>
            <View style={{ height: '10%', marginLeft: 'auto', marginRight: 'auto', justifyContent: 'center' }}>
                <Text fontFamily={Poppins_600SemiBold} fontSize={28}>Lista de Compras</Text>
            </View>
            <View style={{ height: '80%', padding: '10%', paddingTop: 0 }}>
                {listItems?.map((item => {
                    return (
                        <Conatiner style={styles.section}>
                            <Checkbox value={item.checked} onValueChange={() => changeItemOfList(item.id)} />
                            <Text fontFamily={Poppins_400Regular} fontSize={22}>{item.name}</Text>
                            <Icon size={26} color="#000" name="pencil" />
                        </Conatiner>
                    );
                }))}
                {/* <Conatiner style={styles.section}>
                    <Checkbox value={isChecked} onValueChange={setChecked} />
                    <Text fontFamily={Poppins_400Regular} fontSize={22}>Arroz</Text>
                    <Icon size={26} color="#000" name="pencil" />
                </Conatiner>
                <Conatiner style={styles.section}>
                    <Checkbox value={isChecked} onValueChange={setChecked} />
                    <Text fontFamily={Poppins_400Regular} fontSize={22}>Feijão</Text>
                    <Icon size={26} color="#000" name="pencil" />
                </Conatiner> */}
                {/* <Conatiner style={styles.section}>
                    <Checkbox value={isChecked} onValueChange={setChecked} />
                    <Text style={{ fontFamily: Poppins_400Regular, fontSize: 22 }}>Leite</Text>
                    <Icon size={26} color="#000" name="pencil" />
                </Conatiner> */}
            </View>
            <View style={{ height: '10%', alignItems: 'flex-end', marginRight: '20px' }}>
                <Pressable style={{ backgroundColor: '#1E90FF', height: 55, width: 55, borderRadius: '50%', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon size={40} color="#000" name="plus" />
                </Pressable>
            </View>
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