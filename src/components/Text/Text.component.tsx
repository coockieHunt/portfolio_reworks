import { useMemo, JSX } from 'react';
import { Text } from './style/AccentText.style';
import { Gradient } from './style/GradientText.style';
import { ToText } from './style/LinkText.style';
import { TitleContainer, BackTitle } from './style/TitleText.style';
import { useSettingContext } from '../../context/Setting.context';
import { COLOR_SETTING } from '../../config';
import {InfoDataTextContainer} from './style/InfoDataText.style';



export interface IAccentTextComponentProps {
    children: React.ReactNode;
    className?: string;
}
export interface ITitleTextComponentProps {
    children: React.ReactNode;
    subtitle: React.ReactNode;
    subtitleOpacity?: number;
    style?: React.CSSProperties | undefined;
    weight?: 1 | 2;
}

export interface IGradientTextContainerProps {
    children?: React.ReactNode;
}

export interface ILinkTextComponentProps {
    children: string;
    to: string;
    onClick?: () => void;
}

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

const hexToRgb = (hex: string) => {
    const h = hex.replace('#', '');
    const bigint = parseInt(
        h.length === 3
            ? h
                  .split('')
                  .map((c) => c + c)
                  .join('')
            : h,
        16,
    );
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return { r, g, b };
};

const rgbToHex = ({ r, g, b }: { r: number; g: number; b: number }) => {
    const toHex = (n: number) => n.toString(16).padStart(2, '0');
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

const rgbToHsl = ({ r, g, b }: { r: number; g: number; b: number }) => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b),
        min = Math.min(r, g, b);
    let h = 0,
        s = 0,
        l = (max + min) / 2;

    if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            default:
                h = (r - g) / d + 4;
                break;
        }
        h /= 6;
    }
    return { h, s, l };
};

const hslToRgb = ({ h, s, l }: { h: number; s: number; l: number }) => {
    let r, g, b;
    if (s === 0) {
        r = g = b = l;
    } else {
        const hue2rgb = (p: number, q: number, t: number) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }
    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255),
    };
};

const adjustColor = (hex: string, { brighten = 0, saturate = 0 }) => {
    const rgb = hexToRgb(hex);
    const hsl = rgbToHsl(rgb);
    const l = clamp01(hsl.l + brighten);
    const s = clamp01(hsl.s + saturate);
    return rgbToHex(hslToRgb({ h: hsl.h, s, l }));
};

export const AccentTextComponent = ({
    children,
    className,
}: IAccentTextComponentProps): JSX.Element => {
    return <Text className={className}>{children}</Text>;
};

/*
    weight: 1 for h1, 2 for h2
*/
export const TitleTextComponent = ({
    children,
    subtitle,
    subtitleOpacity = 0.2,
    style,
    weight = 2
}: ITitleTextComponentProps): JSX.Element => {
    return (
        <TitleContainer style={style} >
            {weight === 1 ?
                <h1 className='title'>{children}</h1>
                :
                <h2 className='title'>{children}</h2>
            }
            <BackTitle
                style={{ opacity: subtitleOpacity }}
                className="BackSubtitle font_code"
            >
                {subtitle}
            </BackTitle>
        </TitleContainer>
    );
};

export const GradientTextContainer = ({
    children,
    style,
}: IGradientTextContainerProps & {
    style?: React.CSSProperties;
}): JSX.Element => {
    const { settings } = useSettingContext();
    const currentTheme = settings?.theme;
    const steps = 5;

    const gradientColors = useMemo(() => {
        const colorConfig =
            COLOR_SETTING[currentTheme] || COLOR_SETTING.default;
        const base = colorConfig.primary;

        return Array.from({ length: steps + 1 }, (_, index) =>
            adjustColor(base, {
                brighten: 0.06 * index,
                saturate: 0.06 * index,
            }),
        );
    }, [currentTheme]);

    return (
        <Gradient style={style} $color={gradientColors}>
            {children}
        </Gradient>
    );
};

export const LinkTextComponent = ({
    children,
    to,
    onClick,
}: ILinkTextComponentProps): JSX.Element => {
    return (
        <ToText
            href={to}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClick}
        >
            {children}
        </ToText>
    );
};

export const InfoDataTextComponent = ({
    StrongText,
    text,
    subtitle
}: { StrongText: string; text: string; subtitle?: string }) => {
    return (
        <InfoDataTextContainer>
            <span><strong>{StrongText}</strong> {text}</span>
            {subtitle && <span className='sub'>{subtitle}</span>}
        </InfoDataTextContainer>
    );
};