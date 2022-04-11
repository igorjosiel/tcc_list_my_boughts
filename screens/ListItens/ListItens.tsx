import React, { useState, useEffect } from 'react';
import { Conatiner } from "./ListItens.styles";
import { StyleSheet, Pressable, View, ScrollView, ImageBackground } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

import { useSetFonts } from "../../hooks/useSetFonts";
import Text from '../../components/Text/Text';
import theme from '../../global/styles/theme';
import compras from '../../assets/compras.jpg';

const ListItens = ({ navigation }) => {
    const Poppins_400Regular = useSetFonts('Poppins_600SemiBold');
    const Poppins_600SemiBold = useSetFonts('Poppins_600SemiBold');

    interface Item {
        id: number,
        amount: string,
        product: string,
        category: string,
        price: number,
    }

    const [listItems, setListItems] = useState<Item[]>([]);
    const [idGenerator, setIdGenerator] = useState<number>(0);
    const [totalValue, setTotalValue] = useState<number>(0);

    const addItemToList = (item: Item) => {
        if (!item) return;

        const newItem = {
            ...item,
            id: idGenerator,
        };

        setTotalValue(oldState => oldState + (item?.price * parseInt(item?.amount)));
        setListItems(oldState => [...oldState, newItem]);
        setIdGenerator(oldState => oldState + 1);
    }

    const removeItemToList = (id: number) => {
        const listItemsFiltered: Item[] = listItems?.filter(item => item.id !== id);

        setListItems(listItemsFiltered);
    }

    function increaseItemAmount(id: number) {
        const newItems: Item[] = listItems?.map(item =>
            item.id === id ? {
                ...item,
                amount: item?.amount + 1,
            } : item);

        setListItems(newItems);
    };

    function decreaseItemAmount(id: number) {
        const newItems: Item[] = listItems?.map(item =>
            item.id === id ? {
                ...item,
                amount: item?.amount - 1,
            } : item);

        setListItems(newItems);
    };

    return (
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
                justifyContent: 'center',
            }}>
                <Text fontFamily={Poppins_600SemiBold} fontSize={25}>Lista de Compras</Text>
            </View>
            <View style={{
                height: '78%',
                // padding: '5%',
                paddingTop: 0,
                // backgroundColor: theme.colors.secondary
            }}>
                <ImageBackground source={compras} style={styles.image}>
                    <ScrollView>
                        {listItems?.map(((item, index) => {
                            return (
                                <Conatiner style={styles.section} key={index}>
                                    <Pressable style={{ width: '65%' }}>
                                        <Text fontFamily={Poppins_400Regular} fontSize={20}>{item?.product}</Text>
                                    </Pressable>
                                    {/* <Checkbox value={item?.checked} onValueChange={() => changeItemOfList(item?.id)} /> */}
                                    <View style={{ width: '45%', flex: 1, flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'white', borderRadius: 5 }}>
                                        {/* <Icon size={28} style={{ color: theme.colors.primary, marginBottom: 'auto', marginTop: 'auto' }} name="minus" /> */}
                                        <Pressable onPress={item?.amount === "1" ? () => removeItemToList(item?.id) : () => decreaseItemAmount(item?.id)} style={{
                                            width: 25,
                                            borderRadius: 50,
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            <Icon size={30} color="#000" name="minus" />
                                        </Pressable>
                                        <Text fontFamily={Poppins_600SemiBold} fontSize={20}>{item.amount}</Text>
                                        {/* <Icon size={28} style={{ color: theme.colors.primary, marginBottom: 'auto', marginTop: 'auto' }} name="plus" onPress={increaseItemAmount}/> */}
                                        <Pressable onPress={() => increaseItemAmount(item?.id)} style={{
                                            width: 25,
                                            borderRadius: 50,
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            <Icon size={30} color="#000" name="plus" />
                                        </Pressable>
                                    </View>
                                </Conatiner>
                            );
                        }))}
                    </ScrollView>
                </ImageBackground>
            </View>
            <View style={{ height: '10%', backgroundColor: 'white', paddingTop: '3%', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10, marginRight: 20, marginLeft: 10 }}>
                {/* <TextInput
                    style={styles.input}
                    onChangeText={(value) => editItemName(value)}
                    value={item}
                    placeholder="Digite aqui o protudo"
                    keyboardType="default"
                /> */}
                <View style={{
                    backgroundColor: theme?.colors?.primary,
                    width: '70%',
                    height: '80%',
                    borderRadius: 10,
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    paddingRight: '3%',
                    paddingLeft: '3%',
                }}>
                    <Text fontFamily={Poppins_600SemiBold} fontSize={25}>R$ {totalValue}</Text>
                </View>
                <Pressable onPress={() => navigation.navigate('ProductsPage', { addItemToList: (newItem: object) => addItemToList(newItem) })} style={{
                    backgroundColor: theme.colors.primary,
                    height: 55,
                    width: 55,
                    borderRadius: 50,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <Icon size={30} color="#000" name="plus" />
                </Pressable>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    image: {
        flex: 1,
        resizeMode: 'contain',
        // backgroundColor: theme.colors.primary,
    },
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
        backgroundColor: theme?.colors?.primary,
        marginTop: 10,
        marginLeft: '5%',
        marginRight: '5%',
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
})

export default ListItens;