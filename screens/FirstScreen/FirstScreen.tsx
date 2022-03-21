import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useSetFonts } from '../../hooks/useSetFonts';
import { Theme } from '../../templates/theme';
import { welcomeMessage } from '../../utils/messages';

import { ContainerScreen } from './FirstScreen.styles';

export default function FirstScreen() {
    const regularfont = useSetFonts('Poppins_400Regular');

    return (
        <>
            <Theme>
                <ContainerScreen>
                    <View style={{ margin: '10px', width: '80%', backgroundColor: '#87CEEB', borderRadius: 5, marginBottom: '200px' }}>
                        <Text style={{ fontFamily: regularfont.toString(), padding: '10px', fontSize: 16 }}>{welcomeMessage}</Text>
                    </View>
                    <View style={{ width: '80%' }}>
                        <TouchableOpacity onPress={() => alert('Hello, world!')} style={styles.button}>
                            <Text style={styles.buttonText}>Entrar</Text>
                        </TouchableOpacity>
                    </View>
                    <StatusBar style="auto" />
                </ContainerScreen>
            </Theme>
        </>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "blue",
        width: '30vw',
        height: '13vw',
        padding: 20,
        borderRadius: 5,
        margin: 'auto'
    },
    buttonText: {
        fontSize: 16,
        textTransform: 'uppercase',
        color: '#fff',
    },
});
