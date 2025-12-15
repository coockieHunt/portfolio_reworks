import React, { useState, useEffect, useRef, useCallback } from "react";
import { FaXmark, FaPalette } from "react-icons/fa6";
import * as Styled from "./Setting.style";
import { COLOR_SETTING } from '../../config';
import { useSettingContext } from "../../context/Setting.context";
import { useLoading } from "../../context/loading.context";
import { getThemeRand, incrementThemeRand } from '../../api/counter.api';


type ThemeName = keyof typeof COLOR_SETTING;

interface ThemeButtonProps {
    name: string;
    displayName: string;
    isActive: boolean;
    primaryColor: string;
    secondaryColor: string;
    onClick: () => void;
}

const getRandomHex = () => {
    const val = () => Math.floor(Math.random() * 150) + 50;
    const r = val();
    const g = val();
    const b = val();
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};

const getContrastRatio = (hex1: string, hex2: string) => {
    const getLuminance = (hex: string) => {
        const rgb = parseInt(hex.slice(1), 16);
        const r = ((rgb >> 16) & 0xff) / 255;
        const g = ((rgb >> 8) & 0xff) / 255;
        const b = (rgb & 0xff) / 255;
        const val = [r, g, b].map(c =>
            c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
        );
        return 0.2126 * val[0] + 0.7152 * val[1] + 0.0722 * val[2];
    };
    const l1 = getLuminance(hex1);
    const l2 = getLuminance(hex2);
    return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
};

const generateRandomColorWithContrast = (baseColor: string, minContrast = 4.5) => {
    let color;
    let attempts = 0;
    do {
        color = getRandomHex();
        attempts++;
    } while (getContrastRatio(color, baseColor) < minContrast && attempts < 100);
    return color;
};

const ThemeButton: React.FC<ThemeButtonProps> = ({ name, displayName, isActive, primaryColor, secondaryColor, onClick }) => (
    <div
        className={`themeButton ${isActive ? "current" : ""}`}
        onClick={onClick}
        role="button"
        aria-label={`Activer le thème ${displayName}`}
    >
        <Styled.RoundColor $color={primaryColor} />
        <Styled.RoundColor $color={secondaryColor} />
        <span>{displayName}</span>
    </div>
);

export const SettingContainer: React.FC = () => {
    const { changeTheme, settings } = useSettingContext();
    const { showLoading, hideLoading } = useLoading();
    
    const [isOpen, setIsOpen] = useState(false);
    const [hasFetched, setHasFetched] = useState(false);
    const [count, setCount] = useState(0);

    const containerRef = useRef<HTMLDivElement | null>(null);
    const toggleRef = useRef<HTMLDivElement | null>(null);

    const fetchCounter = useCallback(async () => {
        try {
            const data = await getThemeRand();
            if (data?.success) setCount(Number(data.counterValue || 0));
        } catch (err) {
            console.warn('Failed to fetch theme counter', err);
        }
    }, []);

    const incrementCounter = async () => {
        try {
            const data = await incrementThemeRand();
            if (data?.success) setCount(Number(data.newValue || data.counterValue || 0));
        } catch (err) {
            console.warn('Failed to increment theme counter', err);
        }
    };

    const applyThemeChange = (newTheme: ThemeName, displayName: string, AddedTime: number = 0) => {
        const TOTAL_DURATION = 2000 + AddedTime;
        console.log('Applying theme change to', TOTAL_DURATION);
        showLoading(
            COLOR_SETTING[newTheme].background_secondary,
            TOTAL_DURATION,
            <>
                <span>Changement de thème en cours...</span>
                <strong style={{ color: COLOR_SETTING[newTheme].primary }}>
                    {displayName}
                </strong>
            </>
        );
    
        setTimeout(() => {
            changeTheme(newTheme);
        }, 0);

        setIsOpen(false);

        setTimeout(() => hideLoading(), TOTAL_DURATION);
    };


    const handleRandomTheme = async () => {
        Object.keys(COLOR_SETTING).forEach(key => {
            if (key.startsWith('random_')) delete COLOR_SETTING[key as ThemeName];
        });

        const newKey = `random_${Date.now().toString(36)}`;
        
        const background = generateRandomColorWithContrast('#ffffff', 4.5);
        
        // Génère une couleur très proche du blanc (240-255) pour avoir une "nuance" mais rester blanc/lisible
        const valNuance = () => Math.floor(Math.random() * 16) + 240;
        const font = '#' + ((1 << 24) + (valNuance() << 16) + (valNuance() << 8) + valNuance()).toString(16).slice(1);
        
        const fontSubtle = font + 'cc';
        const fontHint = font + '99';

        const bgSecondary = generateRandomColorWithContrast(font, 4.5);
        const bgTertiary = generateRandomColorWithContrast(font, 4.5);

        const primary = generateRandomColorWithContrast(background, 3);
        const fontOnPrimary = getContrastRatio(primary, '#ffffff') >= 3 ? '#ffffff' : '#000000';
        
        const secondary = generateRandomColorWithContrast(background, 3);
        const accentuate = generateRandomColorWithContrast(background, 3);
        const border = generateRandomColorWithContrast(background, 3);

        COLOR_SETTING[newKey] = {
            display_name: "🦄 Papuche",
            background: background,
            background_secondary: bgSecondary,
            background_tertiary: bgTertiary,
            primary: primary,
            secondary: secondary,
            accentuate: accentuate,
            border: border,
            font: font,
            font_on_primary: fontOnPrimary,
            font_subtle: fontSubtle,
            font_hint: fontHint,
        };

        applyThemeChange(newKey as ThemeName, "🦄 PAPUCHE !!!" , 500);
        await incrementCounter();
    };

    useEffect(() => {
        if (!isOpen) return;
        
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;
            if (
                containerRef.current && !containerRef.current.contains(target) &&
                toggleRef.current && !toggleRef.current.contains(target)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen]);

    useEffect(() => {
        if (isOpen && !hasFetched) {
            fetchCounter().then(() => setHasFetched(true));
        }
    }, [isOpen, hasFetched, fetchCounter]);

    const defaultThemes: ThemeName[] = ["default", "red", "green", "yellow", "cyan", "pink", "ice"];

    return (
        <>
            <Styled.Toggle
                ref={toggleRef}
                $isOpen={isOpen}
                onClick={() => setIsOpen(!isOpen)}
                role="button" 
                tabIndex={0} 
                aria-label={isOpen ? "Fermer les paramètres" : "Ouvrir les paramètres"}
            >
                <Styled.Action className={isOpen ? "opened" : ""}>
                    <Styled.Title>
                        <span className="Toggle">
                            <span className="desktop-text">{isOpen ? "Fermer" : "Apparence"}</span>
                            <span className="mobile-icon"><FaPalette /></span>
                        </span>
                    </Styled.Title>
                </Styled.Action>
            </Styled.Toggle>

            <Styled.ContainerSetting ref={containerRef} className={isOpen ? "opened" : "close"}>
                <Styled.SettingHeader>
                    <h3 className="font_code">Apparence</h3>
                    <Styled.CloseButton onClick={() => setIsOpen(false)}>
                        <FaXmark />
                    </Styled.CloseButton>
                </Styled.SettingHeader>

                <Styled.ScrollableContent>
                    <Styled.Option>
                        <h3 className="titleOption">Thème de Couleur</h3>
                        <div className="ContainerButton" style={{ marginTop: '10px' }}>
                            <div className="defaultThemesContainer">
                                {defaultThemes.map((themeKey) => (
                                    <ThemeButton
                                        key={themeKey}
                                        name={themeKey}
                                        displayName={COLOR_SETTING[themeKey].display_name}
                                        isActive={settings.theme === themeKey}
                                        primaryColor={COLOR_SETTING[themeKey].primary}
                                        secondaryColor={COLOR_SETTING[themeKey].secondary}
                                        onClick={() => applyThemeChange(themeKey, COLOR_SETTING[themeKey].display_name)}
                                    />
                                ))}
                            </div>

                            <h3 className="titleOption">Mode fun</h3>
                            <div className="themeButton random" onClick={handleRandomTheme} role="button" tabIndex={0}>
                                <p>
                                    Nous déclinons toute responsabilité en cas de <br />
                                    <strong style={{ textDecoration: "underline" }}>crise de couleur</strong>
                                </p>
                                <span>🦄 Thème aléatoire 🦄</span>
                            </div>

                            <div className="counter">
                                <span className="icon">🦄</span>
                                <div className="number">
                                    <span>Ce mode a été activé</span>
                                    <span className="count">{count}</span>
                                    <span>fois par des âmes courageuses</span>
                                </div>
                            </div>
                        </div>
                    </Styled.Option>
                </Styled.ScrollableContent>

                <Styled.SettingFooter>
                    <p>Personnalisez votre expérience</p>
                </Styled.SettingFooter>
            </Styled.ContainerSetting>
        </>
    );
};