import {
    Poppins_100Thin,
    Poppins_100Thin_Italic,
    Poppins_200ExtraLight,
    Poppins_200ExtraLight_Italic,
    Poppins_300Light,
    Poppins_300Light_Italic,
    Poppins_400Regular,
    Poppins_400Regular_Italic,
    Poppins_500Medium,
    Poppins_500Medium_Italic,
    Poppins_600SemiBold,
    Poppins_600SemiBold_Italic,
    Poppins_700Bold,
    Poppins_700Bold_Italic,
    Poppins_800ExtraBold,
    Poppins_800ExtraBold_Italic,
    Poppins_900Black,
    Poppins_900Black_Italic
} from '@expo-google-fonts/poppins';
import { useFonts } from 'expo-font';

export const useSetFonts = (font: string) => {
    switch (font) {
        case 'Poppins_100Thin': {
            useFonts({ Poppins_100Thin });
            return 'Poppins_100Thin';
        }
        case 'Poppins_100Thin_Italic': {
            useFonts({ Poppins_100Thin_Italic });
            return 'Poppins_100Thin_Italic';
        }
        case 'Poppins_200ExtraLight': {
            useFonts({ Poppins_200ExtraLight });
            return 'Poppins_200ExtraLight';
        }
        case 'Poppins_200ExtraLight_Italic': {
            useFonts({ Poppins_200ExtraLight_Italic });
            return 'Poppins_200ExtraLight_Italic';
        }
        case 'Poppins_300Light': {
            useFonts({ Poppins_300Light });
            return 'Poppins_300Light';
        }
        case 'Poppins_300Light_Italic': {
            useFonts({ Poppins_300Light_Italic });
            return 'Poppins_300Light_Italic';
        }
        case 'Poppins_400Regular': {
            useFonts({ Poppins_400Regular });
            return 'Poppins_400Regular';
        }
        case 'Poppins_400Regular_Italic': {
            useFonts({ Poppins_400Regular_Italic });
            return 'Poppins_400Regular_Italic';
        }
        case 'Poppins_500Medium': {
            useFonts({ Poppins_500Medium });
            return 'Poppins_500Medium';
        }
        case 'Poppins_500Medium_Italic': {
            useFonts({ Poppins_500Medium_Italic });
            return 'Poppins_500Medium_Italic';
        }
        case 'Poppins_600SemiBold': {
            useFonts({ Poppins_600SemiBold });
            return 'Poppins_600SemiBold';
        }
        case 'Poppins_600SemiBold_Italic': {
            useFonts({ Poppins_600SemiBold_Italic });
            return 'Poppins_600SemiBold_Italic';
        }
        case 'Poppins_700Bold': {
            useFonts({ Poppins_700Bold });
            return 'Poppins_700Bold';
        }
        case 'Poppins_700Bold_Italic': {
            useFonts({ Poppins_700Bold_Italic });
            return 'Poppins_700Bold_Italic';
        }
        case 'Poppins_800ExtraBold': {
            useFonts({ Poppins_800ExtraBold });
            return 'Poppins_800ExtraBold';
        }
        case 'Poppins_800ExtraBold_Italic': {
            useFonts({ Poppins_800ExtraBold_Italic });
            return 'Poppins_800ExtraBold_Italic';
        }
        case 'Poppins_900Black': {
            useFonts({ Poppins_900Black });
            return 'Poppins_900Black';
        }
        case 'Poppins_900Black_Italic': {
            useFonts({ Poppins_900Black_Italic });
            return 'Poppins_900Black_Italic';
        }
        default: return '';
    }
}