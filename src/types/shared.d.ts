import { CSSProperties } from 'react'; 

export interface ICustomCSSProperties extends CSSProperties {
    [key: `--${string}`]: string | number;
}