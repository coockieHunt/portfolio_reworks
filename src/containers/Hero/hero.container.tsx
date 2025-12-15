import { useState, useEffect, ChangeEvent, KeyboardEvent, JSX } from "react";

// library
import { Link } from "react-scroll";
import { MdSend } from "react-icons/md";

// style
import * as styled from "./hero.style";
import { GridEffect } from '../../styles/effect';

// components
import { GradientTextContainer } from "../../components/Text/Text.component";
import { HelloHandComponent } from '../../components/HelloHand/HelloHand.component';
import { MouseComponent } from '../../components/Mouse/Mouse.component';
import { WireframeScene } from "../../components/FrameCube/FrameCube.components";

// data & context
import { word_hero } from '../../data';
import { COLOR_SETTING, GetHightContrastSetting } from '../../config';
import { useSettingContext } from '../../context/Setting.context';

// types
interface HeroContainerProps {
    id?: string;
}

interface CtaLinkProps {
    to: string;
    title: string;
    description: string;
    isHighlight?: boolean;
}

const CtaLink = ({ to, title, description, isHighlight = false }: CtaLinkProps) => {
    const { settings } = useSettingContext();

    const ariaLabel = `${title} – ${description}`;

    return (
        <Link
            href={`${window.location.origin}/#${to}`} 
            to={to} 
            spy={true} 
            smooth={true} 
            offset={-70} 
            duration={500}
            style={{ textDecoration: "none", color: "inherit" }}
            aria-label={ariaLabel}
            role="link"
        >
            <styled.Action 
                className={isHighlight ? 'highlight' : ''}
            >
                <h2>{title}</h2>
            </styled.Action>
        </Link>
    );
};

export const HeroContainer = ({ id }: HeroContainerProps): JSX.Element => {
    const [inputValue, setInputValue] = useState('');
    const [isInputFocused, setIsInputFocused] = useState(false);
    const [showCursor, setShowCursor] = useState(true);
    const { settings } = useSettingContext();
    
    const [currentWord, setCurrentWord] = useState(() => {
        const randomIndex = Math.floor(Math.random() * word_hero.length);
        return formatWord(word_hero[randomIndex]);
    });

    function formatWord(word: string): string {
        return String(word).charAt(0).toUpperCase() + String(word).slice(1);
    }

    const handleSubmit = () => {
        if (inputValue.trim().length < 1) return;

        const contactSection = document.getElementById('contact');
        if (contactSection) {
            const messageText = `Bonjour, je souhaite discuter de mon projet : ${inputValue}`;
            
            contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

            setTimeout(() => {
                const messageField = document.querySelector('textarea[name="message"]') as HTMLTextAreaElement | null;
                
                if (messageField) {
                    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, 'value')?.set;
                    
                    if (nativeInputValueSetter) {
                        nativeInputValueSetter.call(messageField, messageText);
                    }

                    const event = new Event('input', { bubbles: true });
                    messageField.dispatchEvent(event);
                    messageField.focus();
                }
            }, 800);

            setTimeout(() => { setInputValue(''); }, 1000);
        }
    };

    const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') { 
            handleSubmit(); 
        }
    };

    useEffect(() => {
        if (isInputFocused) return;

        const timer = setInterval(() => {
            const randomIndex = Math.floor(Math.random() * word_hero.length);
            setCurrentWord(formatWord(word_hero[randomIndex]));
        }, 2000);

        return () => clearInterval(timer);
    }, [isInputFocused]);

    useEffect(() => {
        if (isInputFocused) {
            setShowCursor(false);
            return;
        }

        const blinkTimer = setInterval(() => {
            setShowCursor((prev) => !prev);
        }, 500);

        return () => clearInterval(blinkTimer);
    }, [isInputFocused]);

    const themeKey = settings?.theme || 'default';
    const themeColors = COLOR_SETTING[themeKey] || COLOR_SETTING['default'];
    
    const renderInputSection = (
        <styled.InputWrapper>
            <styled.LabelWorld
                type="text"
                name="project-idea" 
                autoComplete="off"
                placeholder={`${currentWord}${showCursor ? '|' : ''}`}
                onFocus={() => setIsInputFocused(true)}
                onBlur={() => setIsInputFocused(false)}
                value={inputValue}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                size={10}
                aria-label="Décrivez votre projet"
            />
            {inputValue.length >= 1 && (
                <styled.SendIcon
                    onClick={handleSubmit}
                    role="button"
                    tabIndex={0}
                    aria-label="Aller au formulaire de contact avec ce texte"
                >
                    <MdSend />
                </styled.SendIcon>
            )}
        </styled.InputWrapper>
    );

    return (
        <GridEffect>
            <styled.Container id={id}>
                <div className="split">
                    <div className="text">
                        <h1>
                            Vous voulez transformer votre {renderInputSection} en{" "}
                            <span style={{ whiteSpace: "nowrap" }}>
                                <GradientTextContainer>Site Web</GradientTextContainer>.
                            </span>
                        </h1>
                        
                        <p className="font_code">
                            Bonjour, je suis Jonathan, développeur Web. Je développe vos plateformes numériques, rapides, pour atteindre vos objectifs.
                            <HelloHandComponent />
                        </p>
                        
                        <div className="cta">
                            <CtaLink 
                                to="service" 
                                title="Découvrez mes services" 
                                description="Exploration des services proposés" 
                            />
                            <CtaLink 
                                to="contact" 
                                title="Contactez-moi" 
                                description="Accéder au formulaire de contact" 
                                isHighlight={true}
                            />
                        </div>
                    </div>

                    <div className="cube">
                        <div className="scene">
                            <WireframeScene 
                                color={themeColors.primary}
                                hoverColor={themeColors.secondary}
                            />
                        </div>
                    </div>
                </div>

                <div className="mouse">
                    <MouseComponent />
                </div>
            </styled.Container>
        </GridEffect>
    );
};