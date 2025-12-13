import 'styled-components';
import { COLOR_SETTING } from '../config'; 

//get key of COLOR_SETTING
type ThemeKey = keyof typeof COLOR_SETTING;

// define on global styled-components DefaultTheme
declare module 'styled-components' {
    export interface DefaultTheme {
        theme: ThemeKey;
    }
}
