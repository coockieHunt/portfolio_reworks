import { ContainerSetting, Option, Action, Title, Icon, OptionsList, RoudedButtonColor } from "./Setting.style"
import { useState, useEffect } from "react"
import { AiOutlineUp, AiFillFormatPainter,  AiOutlineClose  } from 'react-icons/ai'
import { COLOR_SETTING, getColorSettings } from '../../config';

import { useSettingContext } from "../../context/Setting.context";
import { useLoading } from "../../context/loading.context";
import { useScrollbar } from "../../hooks/scrollBar.hook";

import { FaLightbulb, FaRegLightbulb  } from "react-icons/fa6";


export const SettingContainer = () => {
    const {changeTheme, changeLight, settings } = useSettingContext();
    const {showLoading, hideLoading} = useLoading();
    const [isOpen, setIsOpen] = useState(false)
    const [ HideScroll, SetHideScroll] = useState(false)

    const handleThemeChange = (NewTheme) => {
        showLoading(COLOR_SETTING[NewTheme].background_secondary);
        setIsOpen(false);
        setTimeout(() => {
            changeTheme(NewTheme);
        }, 500);
        setTimeout(() => {
            hideLoading();
        }, 1000); 
    };

    const scrollToTop = () => {
        setIsOpen(false);
        window.scrollTo({top: 0,behavior: 'smooth'});
    };

    const ButtonLight = ( state ) => {
        const color = state === "dark" ? "black" : "white";
        showLoading(color);
        setIsOpen(false);
        setTimeout(() => {
            changeLight(state);
        }, 500);
        setTimeout(() => {
            hideLoading();
        }, 1000); 
    }

    const ButtonTheme = ({Name, display}) => {
        return (
            <RoudedButtonColor 
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
                >{isOpen ? <AiOutlineClose /> : <AiFillFormatPainter />}</Action>
                 <Action onClick={()=> settings.light == "dark" ? ButtonLight("light") : ButtonLight("dark")}>
                    {settings.light == "dark" ? <FaLightbulb/>: <FaRegLightbulb/>}
                </Action>
                <Action 
                    onClick={() => scrollToTop()} 
                    className={HideScroll && "hide"}
                ><AiOutlineUp/></Action>
            </Icon>
            <OptionsList>
                <Option>
                    <div className="ContainerButton">
                        <ButtonTheme Name={'default'} display={"Default"}/>
                        <ButtonTheme Name={'red'} display={"Rouge"}/>
                        <ButtonTheme Name={'green'} display={"Vert"}/>
                        <ButtonTheme Name={'yellow'} display={"Jaune"}/>
                    </div>
                </Option>
                
            </OptionsList>

        </ContainerSetting>
    )
}