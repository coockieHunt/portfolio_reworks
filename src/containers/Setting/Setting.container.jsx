//React
import { useState, useEffect, useRef } from "react"

//Icons
import { FaCaretUp, FaCaretDown, FaXmark, FaPalette, FaX    } from "react-icons/fa6";

//Styles
import * as Styled from "./Setting.style"

//Config
import { COLOR_SETTING,SCREEN_SIZE } from '../../config.jsx';

//Hooks
import { useWindowSize } from "../../hooks/useScreenResize.hook.jsx"

//Context
import { useAlert } from '../../context/alert.context';
import { useSettingContext } from "../../context/Setting.context";
import { useLoading } from "../../context/loading.context";

export const SettingContainer = () => {
    const {changeTheme, settings } = useSettingContext();
    const {showLoading, hideLoading} = useLoading();
    const { addAlert } = useAlert();
    const [isOpen, setIsOpen] = useState(false)
    const isMobile = useWindowSize();
    const containerRef = useRef(null);

    const handleThemeChange = (NewTheme, DisplayName) => {
        showLoading(COLOR_SETTING[NewTheme].background_secondary);
        setIsOpen(false);
        setTimeout(() => {changeTheme(NewTheme);}, 500);
        setTimeout(() => {hideLoading();}, 2000); 

        addAlert(`Votre thème est maintenant en mode ${DisplayName}.`, COLOR_SETTING[NewTheme].primary, 4000);
    };

    const handleRandomThemeChange = () => {
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
    };


    const ButtonTheme = ({Name}) => {
        const classNameCur = Name == settings.theme ? "current" : "";

        return (
            <div className={`themeButton ${classNameCur}`}  onClick={() => handleThemeChange(Name, COLOR_SETTING[Name].display_name)} >
                <Styled.RoundColor 
                    $color={COLOR_SETTING[Name].primary}/>
                <Styled.RoundColor 
                    $color={COLOR_SETTING[Name].secondary}/>
                <span>{COLOR_SETTING[Name].display_name}</span>
            </div>
        )
    }

    useEffect(() => {
        function handleClickOutside(event) {if (containerRef.current && !containerRef.current.contains(event.target)) {setIsOpen(false); }}
        
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);;
    }, [containerRef]);


    return (
        <Styled.ContainerSetting className={isOpen ? "opened" : "close"} ref={containerRef}>
            <Styled.Toggle>
                <Styled.Action className={isOpen ? "opened" : ""}
                    onClick={() => setIsOpen(!isOpen)} 
                >
                <Styled.Title>
                    <span className="Toggle">
                        {isMobile >= parseInt(SCREEN_SIZE.mobile)? 
                            <>
                                {isOpen ?  <span>Fermer</span> : <span>Apparence</span>}
                                
                            </> 
                            : <FaPalette />
                        }
                    </span>
                </Styled.Title>
                </Styled.Action>
            </Styled.Toggle>
            
            <Styled.OptionsList>
                <Styled.CloseButton onClick={() => setIsOpen(false)}>
                    <FaXmark  />
                </Styled.CloseButton>

                <h3 className="font_code">Apparence</h3>

                <Styled.Option>
                    <h3 className="titleOption">Thème de Couleur</h3>
                    <div className="ContainerButton" style={{marginTop: '10px'}}>
                        <ButtonTheme Name="default"/>
                        <ButtonTheme Name="red" />
                        <ButtonTheme Name="green"/>
                        <ButtonTheme Name="yellow"/>
                        <ButtonTheme Name="cyan"/>
                        <ButtonTheme Name="pink"/>
                        <ButtonTheme Name="ice"/>
                        <h3 className="titleOption">Mode fun</h3>
                        <div className="themeButton random" onClick={handleRandomThemeChange}>
                            <p>Le theme aleatoire peut causer de fort problèmes visuels</p>
                            <p>🔎 n'hesitez pas a re-charger la page si besoin 🔎</p>
                            <span>🦄Theme aléatoire 🦄</span>
                        </div>
                    </div>
                </Styled.Option>

                <Styled.infoText>
                    <p><strong>WIP</strong> En développement <br/> Plus d'options de personnalisation arrivent bientôt !</p>
                </Styled.infoText>

                <Styled.Footer>
                    <p>Personnalisez votre expérience</p>
                </Styled.Footer>
            </Styled.OptionsList>
        </Styled.ContainerSetting>
    )
}
