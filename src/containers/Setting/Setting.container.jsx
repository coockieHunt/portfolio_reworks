//React
import { useState, useEffect, useRef } from "react"

//Icons
import { FaXmark, FaPalette } from "react-icons/fa6";

//Styles
import * as Styled from "./Setting.style"

//Config
import { COLOR_SETTING } from '../../config.jsx';

//Context
import { useAlert } from '../../context/alert.context';
import { useSettingContext } from "../../context/Setting.context";
import { useLoading } from "../../context/loading.context";

//API
import { getThemeRand, incrementThemeRand } from '../../api/counter.api';

export const SettingContainer = () => {
    const { changeTheme, settings } = useSettingContext();
    const { showLoading, hideLoading } = useLoading();
    const { addAlert } = useAlert();
    
    const [isOpen, setIsOpen] = useState(false);
    
    const containerRef = useRef(null);
    const toggleRef = useRef(null);

    const [numberActivate, setNumberActivate] = useState(0);

    const handleThemeChange = (NewTheme, DisplayName) => {
        showLoading(COLOR_SETTING[NewTheme].background_secondary);
        setIsOpen(false);
        setTimeout(() => { changeTheme(NewTheme); }, 500);
        setTimeout(() => { hideLoading(); }, 2000);

        addAlert(`Votre thème est maintenant en mode ${DisplayName}.`, COLOR_SETTING[NewTheme].primary, 4000);
    };

    const handleRandomThemeChange = async () => {
        Object.keys(COLOR_SETTING).forEach(key => {
            if (key.startsWith('random_')) {
                delete COLOR_SETTING[key];
            }
        });

        const randHex = () => {
            const val = () => Math.floor(Math.random() * 150) + 50;
            const r = val();
            const g = val();
            const b = val();
            return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
        };

        const randBright = () => {
            const val = () => Math.floor(Math.random() * 100) + 155; 
            const r = val();
            const g = val();
            const b = val();
            return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
        };

        const newKey = `random_${Date.now().toString(36)}`;
        const newBackground = randHex(); 

        COLOR_SETTING[newKey] = {
            name: "🦄 Papuche",
            background: newBackground,
            background_secondary: randHex(), 
            background_tertiary: randHex(), 
            primary: randBright(),
            secondary: randHex(), 
            accentuate: randHex(), 
            border: randHex()
        };
        handleThemeChange(newKey, "🦄 PAPUCHE !!!");
        try {
                await incrementNumberActivate();
                await fetchNumberActivate();
        } catch (err) {
            console.warn('Failed to increment/fetch THEME_RAND after random theme change', err);
        }
    };

    async function fetchNumberActivate() {
        try {
            const data = await getThemeRand();
            if (data && data.success) {
                setNumberActivate(Number(data.counterValue || 0));
            }
        } catch (err) { console.warn('Failed to fetch THEME_RAND counter', err); }
    }

    async function incrementNumberActivate() {
        try {
            const data = await incrementThemeRand();
            if (data && data.success) {
                setNumberActivate(Number(data.newValue || data.counterValue || 0));
            }
        } catch (err) { console.warn('Failed to increment THEME_RAND counter', err); }
    }

    const ButtonTheme = ({ Name }) => {
        const classNameCur = Name == settings.theme ? "current" : "";
        return (
            <div className={`themeButton ${classNameCur}`} onClick={() => handleThemeChange(Name, COLOR_SETTING[Name].display_name)} >
                <Styled.RoundColor $color={COLOR_SETTING[Name].primary} />
                <Styled.RoundColor $color={COLOR_SETTING[Name].secondary} />
                <span>{COLOR_SETTING[Name].display_name}</span>
            </div>
        )
    }

    useEffect(() => {
        function handleClickOutside(event) {
            if (
                isOpen && 
                containerRef.current && !containerRef.current.contains(event.target) &&
                toggleRef.current && !toggleRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);

        let isMounted = true;
        (async () => {
            if (!isMounted) return;
            try { await fetchNumberActivate(); } catch (err) { }
        })();

        return () => {
            isMounted = false;
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    return (
        <>
            <Styled.Toggle 
                ref={toggleRef}
                $isOpen={isOpen} 
                onClick={() => setIsOpen(!isOpen)}
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
                                <ButtonTheme Name="default" />
                                <ButtonTheme Name="red" />
                                <ButtonTheme Name="green" />
                                <ButtonTheme Name="yellow" />
                                <ButtonTheme Name="cyan" />
                                <ButtonTheme Name="pink" />
                                <ButtonTheme Name="ice" />
                            </div>

                            <h3 className="titleOption">Mode fun</h3>
                            <div className="themeButton random" onClick={handleRandomThemeChange}>
                                <p>Le theme aleatoire peut causer de fort problèmes visuels</p>
                                <p>🔎 n'hesitez pas a re-charger la page si besoin 🔎</p>
                                <span>🦄Theme aléatoire 🦄</span>
                            </div>
                            <div className="counter">
                                <span className="icon">🦄</span>
                                <div className="number">
                                    <span>Ce mode a etais activer</span>
                                    <span className="count">{numberActivate}</span>
                                    <span>fois par des âmes courageuses</span>
                                </div>
                            </div>
                        </div>
                    </Styled.Option>

                    <Styled.infoText>
                        <p><strong>WIP</strong> En développement <br /> Plus d'options arrivent bientôt !</p>
                    </Styled.infoText>
                </Styled.ScrollableContent>

                <Styled.SettingFooter>
                    <p>Personnalisez votre expérience</p>
                </Styled.SettingFooter>

            </Styled.ContainerSetting>
        </>
    )
}