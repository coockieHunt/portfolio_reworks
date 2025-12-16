import React, { useState, useEffect, useRef } from "react";
import { FaXmark, FaPalette } from "react-icons/fa6";

// Styles & Config
import * as Styled from "./Setting.style";
import { COLOR_SETTING } from '../../config';

// Contexts & Hooks
import { useSettingContext } from "../../context/Setting.context";
import { useThemeManager } from "../../hooks/useThemeManager"; 

type ThemeName = keyof typeof COLOR_SETTING;

interface ThemeButtonProps {
    displayName: string;
    isActive: boolean;
    primaryColor: string;
    secondaryColor: string;
    onClick: () => void;
}

const ThemeButton: React.FC<ThemeButtonProps> = ({ displayName, isActive, primaryColor, secondaryColor, onClick }) => (
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
    const { settings } = useSettingContext();
    
    const { 
        randomThemeCount, 
        fetchThemeCount, 
        applyTheme, 
        activateRandomTheme 
    } = useThemeManager();
    
    const [isOpen, setIsOpen] = useState(false);
    const [hasFetched, setHasFetched] = useState(false);

    const containerRef = useRef<HTMLDivElement | null>(null);
    const toggleRef = useRef<HTMLDivElement | null>(null);

    const defaultThemes: ThemeName[] = ["default", "red", "green", "yellow", "cyan", "pink", "ice"];

    const handleThemeClick = (themeKey: string) => {
        applyTheme(themeKey, COLOR_SETTING[themeKey].display_name);
        setIsOpen(false);
    };

    const handleRandomClick = () => {
        activateRandomTheme();
        setIsOpen(false);
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
            fetchThemeCount().then(() => setHasFetched(true));
        }
    }, [isOpen, hasFetched, fetchThemeCount]);

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
                                        displayName={COLOR_SETTING[themeKey].display_name}
                                        isActive={settings.theme === themeKey}
                                        primaryColor={COLOR_SETTING[themeKey].primary}
                                        secondaryColor={COLOR_SETTING[themeKey].secondary}
                                        onClick={() => handleThemeClick(themeKey)}
                                    />
                                ))}
                            </div>

                            <h3 className="titleOption">Mode fun</h3>
                            <div 
                                className="themeButton random" 
                                onClick={handleRandomClick} 
                                role="button" 
                                tabIndex={0}
                            >
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
                                    <span className="count">{randomThemeCount}</span>
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