import { useState } from "react";
import { View, ImageBackground, TextInput, Pressable } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CurrencyInput from 'react-native-currency-input';

import { useSetFonts } from "../../hooks/useSetFonts";
import compras from '../../assets/compras.jpg';
import Text from '../../components/Text/Text';
import theme from '../../global/styles/theme';

const ProductsPage = ({ navigation, route }) => {
    const { item } = route?.params;

    const Poppins_600SemiBold = useSetFonts('Poppins_600SemiBold');

    const [selectedValue, setSelectedValue] = useState<number>(0);
    const [isDropDownPickerOpen, setIsDropDownPickerOpen] = useState<boolean>(false);
    const [product, setProduct] = useState<string>('');
    const [amount, setAmount] = useState<string>('');
    const [price, setPrice] = useState<number | null>(0);
    const [category, setCategory] = useState<string>('');
    const [items, setItems] = useState([
        { label: 'Comida', value: 'Comida', icon: () => <Icon size={25} color="#000" name="food" /> },
        { label: 'Limpeza', value: 'Limpeza', icon: () => <Icon size={25} color="#000" name="broom" /> },
        { label: 'PetShop', value: 'PetShop', icon: () => <Icon size={25} color="#000" name="dog" /> }
    ]);

    const values = [
        'Alimento',
        'Hortfruti',
        'Limpeza',
        'Laticíneo',
        'PetShop',
    ];

    return (
        <>
            <ImageBackground source={compras} style={{ height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ height: '50%', width: '80%', backgroundColor: 'white', borderRadius: 20, padding: '3%' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', height: '14%' }}>
                        <Pressable onPress={() => navigation.navigate('ListItens')} style={{
                            backgroundColor: theme.colors.primary,
                            // height: '10%',
                            width: '48%',
                            borderRadius: 10,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-around',
                        }}>
                            <Icon size={30} color="#000" name="arrow-left" />
                            <Text fontFamily={Poppins_600SemiBold} fontSize={22}>
                                Voltar
                            </Text>
                        </Pressable>
                        <Pressable
                            onPress={() => {
                                // addItemToList({
                                //     product,
                                //     amount,
                                //     price,
                                //     category,
                                // });
                                navigation.navigate('ListItens');
                            }} style={{
                                backgroundColor: theme.colors.primary,
                                // height: '10%',
                                width: '48%',
                                borderRadius: 10,
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-around',
                            }}>
                            <Text fontFamily={Poppins_600SemiBold} fontSize={22}>
                                Salvar
                            </Text>
                            <Icon size={30} color="#000" name="plus" />
                        </Pressable>
                    </View>
                    <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: '5%', marginTop: '5%' }}>
                        <Text fontFamily={Poppins_600SemiBold} fontSize={22}>Informações do Produto</Text>
                    </View>
                    <TextInput
                        style={{
                            height: 60,
                            width: '100%',
                            marginBottom: '5%',
                            borderWidth: 3,
                            borderColor: theme.colors.primary,
                            padding: 10,
                            borderRadius: 10,
                            fontSize: 20,
                            shadowOffset: { width: 0, height: 1 }
                        }}
                        onChangeText={(value) => setProduct(value)}
                        value={item?.product}
                        placeholder="Nome do produto"
                        keyboardType="default"
                    />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <TextInput
                            style={{
                                height: 60,
                                width: '45%',
                                marginBottom: '5%',
                                borderWidth: 3,
                                borderColor: theme.colors.primary,
                                padding: 10,
                                borderRadius: 10,
                                fontSize: 20,
                                shadowOffset: { width: 0, height: 1 }
                            }}
                            keyboardType={"numeric"}
                            onChangeText={(value) => {
                                console.log('Deu: ', parseInt(value));
                                setAmount(value)
                            }
                            }
                            value={item?.amount}
                            placeholder="Quantidade"
                            maxLength={10}
                        />
                        <CurrencyInput
                            style={{
                                height: 60,
                                width: '50%',
                                marginBottom: '5%',
                                borderWidth: 3,
                                borderColor: theme.colors.primary,
                                padding: 10,
                                borderRadius: 10,
                                fontSize: 20,
                                shadowOffset: { width: 0, height: 1 }
                            }}
                            placeholder="Preço"
                            value={item?.price}
                            onChangeValue={(value) => setPrice(value)}
                            prefix="R$ "
                            delimiter="."
                            separator=","
                            precision={2}
                            minValue={0}
                        />
                        {/* <TextInput
                            
                            onChangeText={(value) => setPrice(value)}
                            value={price}
                            placeholder="Preço"
                            keyboardType="number-pad"
                        /> */}
                    </View>
                    <DropDownPicker
                        open={isDropDownPickerOpen}
                        value={category}
                        items={items}
                        setOpen={setIsDropDownPickerOpen}
                        setValue={setCategory}
                        setItems={setItems}
                        searchable={true}
                        searchPlaceholder="Pesquise por uma categoria..."
                        translation={{
                            SEARCH_PLACEHOLDER: "Search..."
                        }}
                        searchContainerStyle={{
                            height: 50,
                            borderWidth: 3,
                            borderRadius: 10,
                            borderColor: theme?.colors?.primary,
                        }}
                        searchTextInputStyle={{
                            color: "#000",
                            fontSize: 20,
                        }}
                        style={{
                            backgroundColor: theme?.colors?.primary,
                            borderRadius: 5,
                        }}
                        listParentContainerStyle={{
                            height: 50,
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                        listItemLabelStyle={{
                            color: "#000",
                            fontSize: 20,
                        }}
                        listMessageContainerStyle={{
                            backgroundColor: theme?.colors?.primary,
                        }}
                        modalContentContainerStyle={{
                            height: 50,
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                        modalTitleStyle={{
                            fontWeight: "bold",
                            fontSize: 20,
                        }}
                        modalTitle="Selecione um item..."
                        autoScroll={true}
                        stickyHeader={true}
                        searchPlaceholderTextColor="grey"
                        selectedItemContainerStyle={{
                            backgroundColor: "grey"
                        }}
                        selectedItemLabelStyle={{
                            fontWeight: "bold"
                        }}
                        itemSeparatorStyle={{
                            backgroundColor: theme?.colors?.primary,
                            borderWidth: 1,
                        }}
                        itemSeparator={true}
                    />
                </View>
            </ImageBackground>
        </>
    );
}

export default ProductsPage;