import React, { useState } from 'react';
import { Conatiner } from "./ListItens.styles";
import { ImageBackground, StyleSheet, Pressable, View, TextInput } from "react-native";
import Checkbox from 'expo-checkbox';
import Icon from 'react-native-vector-icons/FontAwesome';
// import imagePaper from '../../assets/paper.png';

import { useSetFonts } from "../../hooks/useSetFonts";
import Text from '../../components/Text/Text';
import theme from '../../global/styles/theme';

const ListItens = () => {
    const Poppins_400Regular = useSetFonts('Poppins_600SemiBold');
    const Poppins_600SemiBold = useSetFonts('Poppins_600SemiBold');

    interface Item {
        id: number,
        name: string,
        made: boolean,
    }

    const [item, setItem] = useState<string>('');
    const [listItems, setListItems] = useState<Item[]>([]);
    const [count, setCount] = useState<number>(0);

    const addItemToList = () => {
        if (!item) return;

        const newItem = {
            id: count,
            name: item,
            made: false,
        };

        setListItems(oldState => [...oldState, newItem]);
        setCount(oldState => oldState + 1);
        setItem('');
    }

    const changeItemOfList = (id: number) => {
        const newItems = listItems?.map(item => {
            item.id === id ? {
                ...item,
                made: !item?.made,
            } : item
        });

        setListItems(newItems);
    }

    const changeItemStatus = (id: number) => {
        const changedItem = listItems?.map(item => item?.id === id ? {
            ...item,
            made: !item.made,
        } : item);

        setListItems(changedItem);
    }

    const editItemName = (itemName: string) => {
        setItem(itemName);
    }

    const deleteItem = (id: number) => {
        const listItemsFiltered = listItems?.filter(item => item.id !== id);

        setListItems(listItemsFiltered);
    }

    return (
        // <ImageBackground source={imagePaper} style={styles.image}>
        <>
            <View style={{
                width: '100%',
                backgroundColor: theme.colors.primary,
                height: '12%',
                marginLeft: 'auto',
                marginRight: 'auto',
                flex: 1,
                flexDirection: 'row',
                alignItems: 'flex-end',
                justifyContent: 'center'
            }}>
                <Text fontFamily={Poppins_600SemiBold} fontSize={25}>Lista de Compras</Text>
            </View>
            <View style={{
                height: '73%',
                padding: '5%',
                paddingTop: 0,
                backgroundColor: theme.colors.secondary
            }}>
                {listItems?.map(((item, index) => {
                    return (
                        <Conatiner style={item?.made ? styles.made : styles.section} key={index}>
                            <Pressable style={{ width: '75%' }} onPress={() => changeItemStatus(item?.id)}>
                                <Text style={item?.made && styles.tachado} fontFamily={Poppins_400Regular} fontSize={20}>{item?.name}</Text>
                            </Pressable>
                            {/* <Checkbox value={item?.checked} onValueChange={() => changeItemOfList(item?.id)} /> */}
                            <View style={{ width: '25%', flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Icon size={28} style={{ color: '#B22222' }} name="trash" onPress={() => deleteItem(item.id)} />
                                <Icon size={28} style={{ color: theme.colors.primary }} name="pencil" />
                            </View>
                        </Conatiner>
                    );
                }))}
            </View>
            <View style={{ height: '15%', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10, marginRight: 20, marginLeft: 10 }}>
                <TextInput
                    style={styles.input}
                    onChangeText={(value) => editItemName(value)}
                    value={item}
                    placeholder="Digite aqui o protudo"
                    keyboardType="default"
                />
                <Pressable onPress={() => addItemToList()} style={{
                    backgroundColor: theme.colors.primary,
                    height: 60,
                    width: 60,
                    borderRadius: 50,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Icon size={30} color="#000" name="plus" />
                </Pressable>
                <Pressable onPress={() => addItemToList()} style={{
                    backgroundColor: theme.colors.primary,
                    height: 60,
                    width: 60,
                    borderRadius: 50,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Icon size={30} color="#000" name="search" />
                </Pressable>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    // image: {
    //     flex: 1,
    //     resizeMode: 'contain',
    //     backgroundColor: theme.colors.primary,
    // },
    made: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
        backgroundColor: '#87CEEB',
        marginTop: 10,
        padding: 15,
        borderRadius: 10,
        opacity: 0.2
    },
    tachado: {
        textDecorationLine: 'line-through',
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
        marginBottom: 10,
        backgroundColor: '#87CEEB',
        marginTop: 10,
        padding: 15,
        borderRadius: 10
    },
    paragraph: {
        fontSize: 15,
    },
    checkbox: {
        margin: 8,
        height: 20,
        width: 20,
    },
    input: {
        height: 60,
        width: 210,
        margin: 12,
        borderWidth: 3,
        borderColor: theme.colors.primary,
        padding: 10,
        borderRadius: 10,
        fontSize: 20
    },
})

export default ListItens;