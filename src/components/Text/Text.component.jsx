import { Text } from "./style/AccentText.style"
import { Gradient } from "./style/GradientText.style"
import { ToText } from "./style/LinkText.style"
import { TitleContainer, Title, BackTitle } from "./style/TitleText.style"
import { useSettingContext, } from "../../context/Setting.context";
import { COLOR_SETTING } from '../../config.jsx'

/**
 * AccentTextComponent
 * 
 * This component overlays text on top of existing content for an accent effect.
 * 
 * @param children {ReactNode} - The text content to be displayed on top of other content.
 */
export const AccentTextComponent = ({ children, className }) => {
    return(
        <Text className={className}>{children}</Text>
    )
}

/**
 * TitleTextComponent
 *
 * Title component with subtitle.
 *
 * @param children - Main title
 * @param subtitle - Subtitle of the component.
 * @param subtitleOpacity - Subtitle opacity (default value: 0.2).
 */ 
export const TitleTextComponent = ({ children, subtitle, subtitleOpacity= 0.2, style }) => {
    return(
        <TitleContainer style={style}>
            <Title>{children}</Title>
            <BackTitle  style={{ opacity: subtitleOpacity }}>{subtitle}</BackTitle>   
        </TitleContainer>
    )
}

/**
 * GradientTextContainer
 * 
 * This component creates a container with an animated gradient background by primary color.
 * 
 * @param children {ReactNode} - The content to be displayed within the gradient container.
 */
export const GradientTextContainer = ({ children }) => {
    const theme = useSettingContext();
    const steps = 5;

    // Lightweight color helpers (Hex <-> HSL) to replace chroma-js
    const clamp01 = (v) => Math.max(0, Math.min(1, v));
    const hexToRgb = (hex) => {
        const h = hex.replace('#', '');
        const bigint = parseInt(h.length === 3 ? h.split('').map(c => c + c).join('') : h, 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;
        return { r, g, b };
    };
    const rgbToHex = ({ r, g, b }) => {
        const toHex = (n) => n.toString(16).padStart(2, '0');
        return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    };
    const rgbToHsl = ({ r, g, b }) => {
        r /= 255; g /= 255; b /= 255;
        const max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;
        if (max === min) { h = s = 0; }
        else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                default: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }
        return { h, s, l };
    };
    const hslToRgb = ({ h, s, l }) => {
        let r, g, b;
        if (s === 0) { r = g = b = l; }
        else {
            const hue2rgb = (p, q, t) => {
                if (t < 0) t += 1;
                if (t > 1) t -= 1;
                if (t < 1/6) return p + (q - p) * 6 * t;
                if (t < 1/2) return q;
                if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
                return p;
            };
            const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            const p = 2 * l - q;
            r = hue2rgb(p, q, h + 1/3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1/3);
        }
        return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
    };

    const adjustColor = (hex, { brighten = 0, saturate = 0 }) => {
        const hsl = rgbToHsl(hexToRgb(hex));
        const l = clamp01(hsl.l + brighten);
        const s = clamp01(hsl.s + saturate);
        return rgbToHex(hslToRgb({ h: hsl.h, s, l }));
    };

    const base = COLOR_SETTING[theme.settings.theme].primary;
    const gradientColors = Array.from({ length: steps + 1 }, (_, index) =>
        adjustColor(base, { brighten: 0.06 * index, saturate: 0.06 * index })
    );

    return (<Gradient color={gradientColors}>{children}</Gradient>);
}

/**
 * A component that renders a secure link with specified text.
 *
 * @param {Object} props - The component's props.
 * @param {string} props.children - The content to be displayed as the link text.
 * @param {string} props.to - The URL to which the link should navigate.
 * @returns {JSX.Element} A secure link element.
 *
 * @example
 */
export const LinkTextComponent = ({ children, to}) => {
    return (
        <ToText 
            href={to} 
            target="_blank" 
            rel="noopener noreferrer"
        >
            {children}
        </ToText>
    );
}