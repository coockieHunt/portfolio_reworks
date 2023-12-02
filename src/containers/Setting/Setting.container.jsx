import { ContainerSetting, Option, Action, Title, Icon, ButtonColor,OptionsList } from "./Setting.style"
import { useState, useEffect } from "react"
import { AiFillTool, AiOutlineUp, AiFillFormatPainter, AiFillFlag } from 'react-icons/ai'
import { useSettingContext } from "../../context/Setting.context"
import { COLOR_SETTING } from '../../config';

export const SettingContainer = () => {
    const { settings, changeTheme } = useSettingContext();
    const [isOpen, setIsOpen] = useState(false)
    const theme = useSettingContext();

    const [ HideScroll, SetHideScroll] = useState(false)

    const handleThemeChange = (theme) => {
        changeTheme(theme);
        setIsOpen(false);
    };

    const scrollToTop = () => {
        setIsOpen(false);
        window.scrollTo({top: 0,behavior: 'smooth'});
    };

    const ButtonTheme = ({Name}) => {
        return (
            <ButtonColor 
                onClick={() => handleThemeChange(Name)} 
                style={{backgroundColor: COLOR_SETTING[Name].primary}}
            />
        )
    }

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + window.innerHeight;
            if((scrollPosition >= document.body.scrollHeight - 450) || (window.scrollY <= 50)){
                setIsOpen(false);
                SetHideScroll(true);
            }else{SetHideScroll(false)}
        };
        window.addEventListener('scroll', handleScroll);
        return () => {window.removeEventListener('scroll', handleScroll);};
    }, [])

    return (
        <ContainerSetting className={isOpen ? "opened" : "close"}>
            <Icon>
                <Action 
                    onClick={() => setIsOpen(!isOpen)} 
                ><AiFillTool/></Action>
                <Action 
                    onClick={() => scrollToTop()} 
                    className={HideScroll && "hide"}
                ><AiOutlineUp/></Action>
            </Icon>
            <OptionsList>
                <Option>
                    <Title> <AiFillFormatPainter/> Theme</Title>
                    <div className="ContainerButton">
                        <ButtonTheme Name={'default'}/>
                        <ButtonTheme Name={'red'}/>
                        <ButtonTheme Name={'green'}/>
                        <ButtonTheme Name={'yellow'}/>
                    </div>
                </Option>
            </OptionsList>

        </ContainerSetting>
    )
}