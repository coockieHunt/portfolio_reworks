import React, { useState, useEffect, useRef } from "react";
import { FaXmark, FaPalette, FaEye, FaEyeSlash  } from "react-icons/fa6";

// Styles & Config
import * as Styled from "./Setting.style";
import { COLOR_SETTING } from '../../config';
import { BackDrop } from '../../styles/effect';
import { RoundColor, Wrapper } from '../../styles/utils.style';

// Contexts & Hooks
import { useSettingContext } from "../../context/Setting.context";
import { useThemeManager } from "../../hooks/useThemeManager"; 
import { SimpleButton } from "../../components/Button/SimpleButton";

type ThemeName = keyof typeof COLOR_SETTING;

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
    const [isLoadingCount, setIsLoadingCount] = useState(false); 
    const [isHighContrast, setIsHighContrast] = useState(false);

    const containerRef = useRef<HTMLDivElement | null>(null);
    const toggleRef = useRef<HTMLButtonElement | null>(null);

    const defaultThemes: ThemeName[] = ["default", "red", "green", "yellow", "cyan", "pink", "ice"];

    const handleThemeClick = (themeKey: string) => {applyTheme(themeKey, COLOR_SETTING[themeKey].display_name);};

    const handleRandomClick = async () => {
        await activateRandomTheme();
        fetchThemeCount().catch(err => console.error(err));
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
    
        setIsLoadingCount(true);
        fetchThemeCount().finally(() => setIsLoadingCount(false));
    
        document.addEventListener("mousedown", handleClickOutside);
    
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen, fetchThemeCount]); 

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
                <span>{isOpen ? "Fermer" : "Apparence"}</span>
                <FaPalette />
            </Styled.Toggle>

            <BackDrop $isOpen={isOpen} onClick={() => setIsOpen(false)} />

            <Styled.ContainerSetting ref={containerRef} className={isOpen ? "opened" : "close"}>
                <div className="header">
                    <h3 className="font_code">Apparence</h3>
                    <Styled.CloseButton onClick={() => setIsOpen(false)} aria-label="Fermer">
                        <FaXmark />
                    </Styled.CloseButton>
                </div>
                <Styled.Content>
                        <div className="ContainerButton" style={{ marginTop: '10px' }}>
                            <div className="theme">
                                <h3>Thème de Couleur</h3>
                                <div className="ThemesContainer">
                                    {defaultThemes.map((themeKey) => (
                                        <SimpleButton
                                            key={themeKey}
                                            isActive={settings.theme === themeKey}
                                            onClick={() => handleThemeClick(themeKey)}
                                            aria-label={`Activer le thème ${COLOR_SETTING[themeKey].display_name}`}
                                        >
                                            <RoundColor $color={COLOR_SETTING[themeKey].primary} />
                                            <RoundColor $color={COLOR_SETTING[themeKey].secondary} />
                                            <span>{COLOR_SETTING[themeKey].display_name}</span>
                                        </SimpleButton>
                                    ))}
                                </div>
                            </div>

                            <div className="accesebility">
                                <h3>Accessibilité</h3>
                                <Wrapper>
                                    <p>
                                        Conçue pour améliorer la visibilité des éléments
                                        et faciliter la lecture pour les personnes ayant des
                                        déficiences visuelles.
                                    </p>

                                    <SimpleButton 
                                        className={`contrast ${isHighContrast ? 'active' : ''}`}
                                        onClick={handleContrastClick}
                                        type="button"
                                    >
                                        {isHighContrast ? <><FaEyeSlash/> <span>Désactiver le contraste</span></> : <><FaEye /> <span>Activer Contraste Élevé</span></>}
                                    </SimpleButton>
                                </Wrapper>
                            </div>

                            <div className="fun">
                                <h3>Mode Fun</h3>
                                <SimpleButton 
                                    className="random" 
                                    onClick={handleRandomClick} 
                                    type="button"
                                >
                                    <div className="content-random">
                                        <p>
                                            Nous déclinons toute responsabilité en cas de <br />
                                            <strong style={{ textDecoration: "underline" }}>crise de couleur</strong>
                                        </p>
                                        <span>🦄 Thème aléatoire 🦄</span>
                                    </div>
                                    
                                    <div className="counter-random">
                                        <span>
                                            Déja
                                        </span>
                                        <span className="count">
                                            {randomThemeCount ?? "..."}
                                        </span>
                                        <span>âmes courageuses<br/> ont osé essayer</span>
                                    </div>
                                </SimpleButton>
                            </div>
                        </div>
                </Styled.Content>

                <div className="footer">
                    <p>Personnalisez votre expérience</p>
                </div>
            </Styled.ContainerSetting>
        </>
    );
};