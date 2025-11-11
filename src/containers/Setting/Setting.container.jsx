import * as Styled from "./Setting.style"
import { useState, useEffect } from "react"
import { COLOR_SETTING } from '../../config.jsx';

import { useSettingContext } from "../../context/Setting.context";
import { useLoading } from "../../context/loading.context";

import { FaLightbulb, FaRegLightbulb  } from "react-icons/fa6";

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

    const ButtonLight = ( state ) => {
        const color = state === "dark" ? "black" : "white";
        showLoading(color);
        setIsOpen(false);
        setTimeout(() => {changeLight(state);
        }, 500);
        setTimeout(() => { hideLoading();
        }, 2000); 
    }

    const ButtonTheme = ({Name, display}) => {
        return (
            <Styled.RoudedButtonColor 
                onClick={() => handleThemeChange(Name)} 
                color={Name} 
                $primary = {COLOR_SETTING[Name].primary} 
                $secondary = {COLOR_SETTING[Name].secondary}
                className={Name == settings.theme && "current"}
                display = {display}
            />
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
                <Styled.Action 
                    onClick={() => setIsOpen(!isOpen)}
                    style={{padding: '0 10px', backgroundColor: 'transparent', border: 'none', boxShadow: 'none'}} 
                >
                    <Styled.Title style={{cursor: 'pointer'}}>
                        Apparence
                    </Styled.Title>
                </Styled.Action>
            </Styled.Toggle>
            
            <Styled.OptionsList>
                <Styled.Option>
                    <Styled.TitleOption>Mode éclairage</Styled.TitleOption>
                    <Styled.Action 
                        onClick={()=> settings.light == "dark" ? ButtonLight("light") : ButtonLight("dark")}
                        style={{marginTop: '10px'}} 
                    >
                         {settings.light == "dark" ? <FaLightbulb/>: <FaRegLightbulb/>}
                         &nbsp; {settings.light == "dark" ? 'Mode Jour (Light)' : 'Mode Nuit (Dark)'}
                    </Styled.Action>
                </Styled.Option>
                
                <Styled.Option>
                    <Styled.TitleOption>Thème de Couleur</Styled.TitleOption>
                    <div className="ContainerButton" style={{marginTop: '10px'}}>
                        <ButtonTheme Name={'default'} display={"Default"}/>
                        <ButtonTheme Name={'red'} display={"Rouge"}/>
                        <ButtonTheme Name={'green'} display={"Vert"}/>
                        <ButtonTheme Name={'yellow'} display={"Jaune"}/>
                    </div>
                </Styled.Option>
            </Styled.OptionsList>
        </Styled.ContainerSetting>
    )
}