import React, { useState, useEffect } from 'react';
import { Conatiner } from "./ListItens.styles";
import { StyleSheet, Pressable, View, ScrollView, ImageBackground, TextInput, TouchableOpacity, Image } from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { useSetFonts } from "../../hooks/useSetFonts";
import Text from '../../components/Text/Text';
import theme from '../../global/styles/theme';
import compras from '../../assets/compras.jpg';
const arrowDropDown = require("../../assets/arrow_drop_down.png");

interface Category {
    id: number,
    name: string,
    icon: string,
    iconColor: string,
    library: string,
}

const categories = [
    {
        id: 0,
        name: 'Comida',
        icon: 'restaurant',
        iconColor: 'red',
        library: 'MaterialIcons',
    },
    {
        id: 1,
        name: 'Limpeza',
        icon: 'cleaning-services',
        iconColor: 'green',
        library: 'MaterialIcons',
    },
    {
        id: 2,
        name: 'Bebida',
        icon: 'local-drink',
        iconColor: 'blue',
        library: 'MaterialIcons',
    },
    {
        id: 3,
        name: 'Gelados',
        icon: 'ice-cream',
        iconColor: 'orange',
        library: 'MaterialCommunityIcons',
    },
    {
        id: 4,
        name: 'Higiene',
        icon: 'clean-hands',
        iconColor: '#b38b6d',
        library: 'MaterialIcons',
    },
    {
        id: 5,
        name: 'Vestuário',
        icon: 'hanger',
        iconColor: 'brown',
        library: 'MaterialCommunityIcons',
    },
];

const ListItens = ({ navigation }) => {
    const Poppins_400Regular = useSetFonts('Poppins_600SemiBold');
    const Poppins_600SemiBold = useSetFonts('Poppins_600SemiBold');

    interface Item {
        id: number,
        amount: number,
        product: string,
        category: string,
        price: number,
    }

    const [listItems, setListItems] = useState<Item[]>([]);
    const [item, setItem] = useState<string>('');
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [showOption, setShowOption] = useState<boolean>(false);
    const [idGenerator, setIdGenerator] = useState<number>(0);
    const [totalValue, setTotalValue] = useState<number>(0);

    const onSelect = (category: string) => {
        setShowOption(false);
        setSelectedCategory(category);
    }

    const addItemToList = () => {
        if (!item || !selectedCategory) return;

        const newItem = {
            id: idGenerator,
            amount: 1,
            product: item,
            category: '',
            price: 0.00,
        };

        // setTotalValue(oldState => oldState + (item?.price * parseInt(item?.amount)));
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

    function editItemName(value: string) {
        setItem(value);
    }

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
                                    <View style={{ width: '45%', flex: 1, flexDirection: 'row', justifyContent: 'space-between', borderRadius: 5 }}>
                                        {/* <Icon size={28} style={{ color: theme.colors.primary, marginBottom: 'auto', marginTop: 'auto' }} name="minus" /> */}
                                        <Pressable onPress={item?.amount === 1 ? () => removeItemToList(item?.id) : () => decreaseItemAmount(item?.id)} style={{
                                            width: 25,
                                            borderRadius: 50,
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            <FontAwesome size={30} color="#000" name="minus" />
                                        </Pressable>
                                        <Text fontFamily={Poppins_600SemiBold} fontSize={20}>{item.amount}</Text>
                                        {/* <Icon size={28} style={{ color: theme.colors.primary, marginBottom: 'auto', marginTop: 'auto' }} name="plus" onPress={increaseItemAmount}/> */}
                                        <Pressable onPress={() => increaseItemAmount(item?.id)} style={{
                                            width: 25,
                                            borderRadius: 50,
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            <FontAwesome size={30} color="#000" name="plus" />
                                        </Pressable>
                                    </View>
                                </Conatiner>
                            );
                        }))}
                    </ScrollView>
                </ImageBackground>
            </View>
            <View style={{ height: '15%', paddingTop: '3%', marginBottom: 10, marginRight: 20, marginLeft: 10 }}>
                {showOption && <View style={{
                    backgroundColor: theme?.colors?.primary,
                    padding: 4,
                    borderRadius: 6,
                    maxHeight: 150
                }}>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps="handled">
                        {categories?.map((category) => {
                            return (
                                <TouchableOpacity
                                    key={category?.id}
                                    onPress={() => onSelect(category?.name)}
                                    style={{
                                        backgroundColor: category?.name === selectedCategory ? theme.colors.primary : 'white',
                                        paddingVertical: 8,
                                        paddingHorizontal: 4,
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'space-around',
                                        alignItems: 'center',
                                        borderRadius: 6,
                                        marginBottom: 2
                                    }}>
                                    <Text fontFamily={Poppins_400Regular} fontSize={20}>{category?.name}</Text>
                                    {category?.library === "MaterialIcons" && <MaterialIcons name={category?.icon} size={35} color={category?.iconColor} />}
                                    {category?.library === "FontAwesome" && <FontAwesome name={category?.icon} size={35} color={category?.iconColor} />}
                                    {category?.library === "MaterialCommunityIcons" && <MaterialCommunityIcons name={category?.icon} size={35} color={category?.iconColor} />}
                                </TouchableOpacity>
                            );
                        })}
                    </ScrollView>
                </View>}
                <TouchableOpacity style={styles.dropDownStyle} activeOpacity={0.8} onPress={() => setShowOption(!showOption)}>
                    <Text fontFamily={Poppins_400Regular} fontSize={20}>{selectedCategory ? selectedCategory : `Categoria`}</Text>
                    <MaterialIcons name={!showOption ? 'arrow-drop-down' : 'arrow-drop-up'} size={35} color={'black'} />
                </TouchableOpacity>
                <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TextInput
                        style={styles.input}
                        onChangeText={(value) => editItemName(value)}
                        value={item}
                        placeholder="Digite aqui o protudo"
                        keyboardType="default"
                    />
                    {/* <View style={{
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
                </View> */}
                    <Pressable onPress={() => addItemToList()} style={{
                        backgroundColor: theme.colors.primary,
                        height: 55,
                        width: 55,
                        borderRadius: 50,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <FontAwesome size={30} color="#000" name="plus" />
                    </Pressable>
                </View>

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
    input: {
        height: 50,
        width: 230,
        margin: 12,
        borderWidth: 3,
        borderColor: theme.colors.primary,
        padding: 10,
        borderRadius: 10,
        fontSize: 20
    },
    dropDownStyle: {
        backgroundColor: theme.colors.primary,
        width: 280,
        padding: 10,
        borderRadius: 10,
        minHeight: 42,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 6,
        marginLeft: 12,
    }
})

export default ListItens;