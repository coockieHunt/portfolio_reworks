import * as Styled from "./Setting.style"
import { useState, useEffect } from "react"
import { COLOR_SETTING } from '../../config.jsx';

import { useSettingContext } from "../../context/Setting.context";
import { useLoading } from "../../context/loading.context";

import { FaLightbulb, FaRegLightbulb, FaCaretUp, FaCaretDown, FaXmark  } from "react-icons/fa6";

import { useRef } from "react";


export const SettingContainer = () => {
    const {changeTheme, changeLight, settings } = useSettingContext();
    const {showLoading, hideLoading} = useLoading();

    const [isOpen, setIsOpen] = useState(false)

    const containerRef = useRef(null);

    const handleThemeChange = (NewTheme) => {
        showLoading(COLOR_SETTING[NewTheme].background_secondary);
        setIsOpen(false);
        setTimeout(() => {changeTheme(NewTheme);}, 500);
        setTimeout(() => {hideLoading();}, 2000); 
    };

    // WIP
    // const ButtonLight = ( state ) => {
    //     const color = state === "dark" ? "black" : "white";
    //     showLoading(color);
    //     setIsOpen(false);
    //     setTimeout(() => {changeLight(state);
    //     }, 500);
    //     setTimeout(() => { hideLoading();
    //     }, 2000); 
    // }

    const ButtonTheme = ({Name, Title}) => {
        const classNameCur = Name == settings.theme ? "current" : "";

        return (
            <div className={`themeButton ${classNameCur}`}  onClick={() => handleThemeChange(Name)} >
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
                
                {/* DESACTIVATE FOR FIX ENV THEME VAR */}
                {/* <Styled.Option>
                    <h3 className="titleOption">Thème de Couleur</h3>

                    <Styled.Action 
                        onClick={()=> settings.light == "dark" ? ButtonLight("light") : ButtonLight("dark")}
                        style={{marginTop: '10px'}} 
                    >
                         {settings.light == "dark" ? <FaLightbulb/>: <FaRegLightbulb/>}
                         &nbsp; {settings.light == "dark" ? 'Mode Jour (Light)' : 'Mode Nuit (Dark)'}
                    </Styled.Action>
                </Styled.Option> */}
                
                <Styled.Option>
                    <h3 className="titleOption">Thème de Couleur</h3>
                    <div className="ContainerButton" style={{marginTop: '10px'}}>
                        <ButtonTheme Name="default" Title="Default" />
                        <ButtonTheme Name="red" Title="Rouge" />
                        <ButtonTheme Name="green" Title="Vert" />
                        <ButtonTheme Name="yellow" Title="Jaune" />
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