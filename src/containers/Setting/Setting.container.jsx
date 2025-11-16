import * as Styled from "./Setting.style"
import { useState, useEffect } from "react"
import { COLOR_SETTING } from '../../config.jsx';

import { useSettingContext } from "../../context/Setting.context";
import { useLoading } from "../../context/loading.context";

import { FaCaretUp, FaCaretDown, FaXmark  } from "react-icons/fa6";
import { useRef } from "react";
import { getContrastTextColor } from "../../utils/WCAG_check.jsx";

import { useAlert } from '../../context/alert.context';


export const SettingContainer = () => {
    const {changeTheme, changeLight, settings } = useSettingContext();
    const {showLoading, hideLoading} = useLoading();
    const { addAlert } = useAlert();

    const [isOpen, setIsOpen] = useState(false)

    const containerRef = useRef(null);

    const handleThemeChange = (NewTheme, DisplayName) => {
        showLoading(COLOR_SETTING[NewTheme].background_secondary);
        setIsOpen(false);
        setTimeout(() => {changeTheme(NewTheme);}, 500);
        setTimeout(() => {hideLoading();}, 2000); 

        console.log("Theme changed to:", NewTheme);
        addAlert(`Votre thème est maintenant en mode ${DisplayName}.`, COLOR_SETTING[NewTheme].primary, 4000);
    };

    const handleRandomThemeChange = () => {
        const randHex = () => '#'+Math.floor(Math.random()*0xFFFFFF).toString(16).padStart(6,'0');
        const newKey = `random_${Date.now().toString(36)}`;
        
        const newBackground = randHex(); 

        const contrastPrimaryColor = getContrastTextColor(newBackground);

        COLOR_SETTING[newKey] = {
            background: newBackground,
            background_secondary: randHex(), 
            background_tertiary: randHex(), 
            primary: contrastPrimaryColor,
            secondary: randHex(), 
            accentuate: randHex(), 
            border: randHex()
        };
        handleThemeChange(newKey, "PAPUCHE !!!");
    };


    const ButtonTheme = ({Name, Title}) => {
        const classNameCur = Name == settings.theme ? "current" : "";

        return (
            <div className={`themeButton ${classNameCur}`}  onClick={() => handleThemeChange(Name, Title)} >
                <Styled.RoundColor 
                    $color={COLOR_SETTING[Name].primary}/>
                <Styled.RoundColor 
                    $color={COLOR_SETTING[Name].secondary}/>
                <span>{Title}</span>
            </div>
        )
    }

    useEffect(() => {
        function handleClickOutside(event) {if (containerRef.current && !containerRef.current.contains(event.target)) {setIsOpen(false); }}
        
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);;
    }, [containerRef]);


    const ArrowIcon = isOpen ? <FaCaretDown />: <FaCaretUp />;
    return (
        <Styled.ContainerSetting className={isOpen ? "opened" : "close"} ref={containerRef}>
            <Styled.Toggle>
                <Styled.Action className={isOpen ? "opened" : ""}
                    onClick={() => setIsOpen(!isOpen)} 
                >
                <Styled.Title>
                    <span className="Toggle">
                        {ArrowIcon} <span>Apparence</span>
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
                        <ButtonTheme Name="default" Title="Violet" />
                        <ButtonTheme Name="red" Title="Rouge" />
                        <ButtonTheme Name="green" Title="Vert" />
                        <ButtonTheme Name="yellow" Title="Jaune" />
                        <h3 className="titleOption">Mode fun</h3>
                        <div className="themeButton random" onClick={handleRandomThemeChange}>
                            <p>⚠️ Le theme aleatoire peut causer de fort problèmes visuels ⚠️</p>
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
