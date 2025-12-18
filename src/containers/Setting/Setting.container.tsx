import React, { useState, useEffect, useRef } from "react";
import { FaXmark, FaPalette, FaEye, FaEyeSlash  } from "react-icons/fa6";

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
    <button
        type="button"
        className={`themeButton ${isActive ? "current" : ""}`}
        onClick={onClick}
        aria-label={`Activer le thème ${displayName}`}
        aria-pressed={isActive}
    >
        <Styled.RoundColor $color={primaryColor} />
        <Styled.RoundColor $color={secondaryColor} />
        <span>{displayName}</span>
    </button>
);

export const SettingContainer: React.FC = () => {
    const { settings } = useSettingContext();
    
    const { 
        randomThemeCount, 
        fetchThemeCount, 
        applyTheme, 
        activateRandomTheme,
        ChangeHightContrast
    } = useThemeManager();
    
    const [isOpen, setIsOpen] = useState(false);
    const [hasFetched, setHasFetched] = useState(false);
    const [isHighContrast, setIsHighContrast] = useState(false);

    const containerRef = useRef<HTMLDivElement | null>(null);
    const toggleRef = useRef<HTMLButtonElement | null>(null);

    const defaultThemes: ThemeName[] = ["default", "red", "green", "yellow", "cyan", "pink", "ice"];

    const handleThemeClick = (themeKey: string) => {
        applyTheme(themeKey, COLOR_SETTING[themeKey].display_name);
    };

    const handleRandomClick = () => {
        activateRandomTheme();
    };
    
    const handleContrastClick = () => {
        ChangeHightContrast(!isHighContrast);
        setIsHighContrast(prev => !prev);
    };

    useEffect(() => {
        if (!isOpen) return;
        
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;
            if (
                containerRef.current && 
                !containerRef.current.contains(target) &&
                toggleRef.current && 
                !toggleRef.current.contains(target)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen]);

    useEffect(() => {
        if (isOpen && !hasFetched) {
            fetchThemeCount()
                .then(() => setHasFetched(true))
                .catch(err => console.error("Failed to fetch count", err));
        }
    }, [isOpen, hasFetched, fetchThemeCount]);

    return (
        <>
            <Styled.Toggle
                ref={toggleRef}
                $isOpen={isOpen}
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
                aria-label={isOpen ? "Fermer les paramètres" : "Ouvrir les paramètres"}
                type="button"
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
                    <Styled.CloseButton onClick={() => setIsOpen(false)} aria-label="Fermer">
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

<h3 className="titleOption">Accessibilité</h3>

<Styled.ContrastWrapper>
    <Styled.ContrastDescription>
        Conçue pour améliorer la visibilité des éléments
        et faciliter la lecture pour les personnes ayant des
        déficiences visuelles.
    </Styled.ContrastDescription>

    <button 
        className={`themeButton contrast ${isHighContrast ? 'active' : ''}`}
        onClick={handleContrastClick}
        type="button"
    >
        {isHighContrast ? 
            (
                <>
                    <FaEyeSlash/>
                    <span>Désactiver le contraste</span>
                </>
            )
            :
            (
                <>
                    <FaEye /> 
                    <span>Activer Contraste Élevé</span>
                </>
            )
        }
    </button>
</Styled.ContrastWrapper>

                            <h3 className="titleOption">Mode Fun</h3>
                            <button 
                                className="themeButton random" 
                                onClick={handleRandomClick} 
                                type="button"
                            >
                                <p>
                                    Nous déclinons toute responsabilité en cas de <br />
                                    <strong style={{ textDecoration: "underline" }}>crise de couleur</strong>
                                </p>
                                <span>🦄 Thème aléatoire 🦄</span>
                            </button>

                            <div className="counter">
                                <span className="icon">🦄</span>
                                <div className="number">
                                    <span>Ce mode a été activé</span>
                                    <span className="count">
                                        {hasFetched ? randomThemeCount : "..."}
                                    </span>
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