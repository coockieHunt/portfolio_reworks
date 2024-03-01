import { ContainerSetting, Option, Action, Title, Icon, ButtonColor,OptionsList, RoudedButtonColor } from "./Setting.style"
import { useState, useEffect } from "react"
import { AiFillTool, AiOutlineUp, AiFillFormatPainter,  AiOutlineCaretRight } from 'react-icons/ai'
import { COLOR_SETTING } from '../../config';

import { useSettingContext } from "../../context/Setting.context";

import { FaLightbulb, FaRegLightbulb  } from "react-icons/fa6";

export const SettingContainer = () => {
    const {changeTheme, changeLight, settings } = useSettingContext();
    const [isOpen, setIsOpen] = useState(false)

    const [ HideScroll, SetHideScroll] = useState(false)

    const handleThemeChange = (NewTheme) => {
        changeTheme(NewTheme);
        setIsOpen(false);
    };

    const scrollToTop = () => {
        setIsOpen(false);
        window.scrollTo({top: 0,behavior: 'smooth'});
    };

    const ButtonLight = ( state ) => {
        console.log('click', state)
        changeLight(state);
    }

    const ButtonTheme = ({Name, display}) => {
        return (
            <>
                <RoudedButtonColor 
                    onClick={() => handleThemeChange(Name)} 
                    color={Name} 
                    primary = {COLOR_SETTING[Name].primary} 
                    secondary = {COLOR_SETTING[Name].secondary}
                    className={Name == settings.theme && "current"}
                    display = {display}
                />
            </>
            
        )
    }

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + window.innerHeight;
    
            if ((scrollPosition >= document.body.scrollHeight - 450) ||(window.scrollY <= 50) ||(window.scrollY === 0)
            ){setIsOpen(false);SetHideScroll(true);
            } else {SetHideScroll(false);}
        };
    
        if (window.scrollY === 0) {SetHideScroll(true);}
        window.addEventListener('scroll', handleScroll);
        return () => {window.removeEventListener('scroll', handleScroll);};
    }, [])

    return (
        <ContainerSetting className={isOpen ? "opened" : "close"}>
            <Icon>
                <Action 
                    onClick={() => setIsOpen(!isOpen)} 
                >{isOpen ? <AiOutlineCaretRight/> : <AiFillTool/>}</Action>
                <Action 
                    onClick={() => scrollToTop()} 
                    className={HideScroll && "hide"}
                ><AiOutlineUp/></Action>
            </Icon>
            <OptionsList>
                <Option>
                    <Title> <AiFillFormatPainter/> Couleur du site</Title>
                    <div className="ContainerButton">
                        <ButtonTheme Name={'default'} display={"Default"}/>
                        <ButtonTheme Name={'red'} display={"Rouge"}/>
                        <ButtonTheme Name={'green'} display={"Vert"}/>
                        <ButtonTheme Name={'yellow'} display={"Jaune"}/>
                    </div>
                    <Title> <AiFillFormatPainter/> Theme</Title>
                    <div className="ContainerButton">
                        {settings.light == "dark" ? <><FaLightbulb onClick={() => ButtonLight("light")} /> <p>false</p> </>: <><FaRegLightbulb onClick={() => ButtonLight("dark")} /><p>true</p> </>}
                    </div>
                </Option>
                
            </OptionsList>

        </ContainerSetting>
    )
}