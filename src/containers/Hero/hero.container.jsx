
import * as styled from "./hero.style.jsx";
import { Link } from "react-scroll";
import { useState, useEffect, use } from "react";
import { AiOutlineCluster, AiOutlineBuild, AiOutlineSend } from 'react-icons/ai'

//icon 
import { MdSend } from "react-icons/md";
//components
import{ GradientTextContainer } from "../../components/Text/Text.component"
import{ HelloHandComponent } from '../../components/HelloHand/HelloHand.component'
import { MouseComponent } from '../../components/Mouse/Mouse.component';

//config
import { word_hero } from '../../data.jsx'

//context
import { GridEffect } from '../../styles/effect.jsx';

export const HeroContainer = ({id}) => {
    const [FormData, setFormData] = useState('');
    const [isInputFocused, setIsInputFocused] = useState(false);
    const [showCursor, setShowCursor] = useState(true); 

    const handleSubmit = () => {
        if (FormData.trim().length >= 1) {
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                
                setTimeout(() => {
                    const messageField = document.querySelector('textarea[name="message"]')
                    if (messageField) {
                        messageField.value = "bonjour, je souhaite discuter de mon projet : " + FormData;
                        messageField.focus();
                        const event = new Event('input', { bubbles: true });
                        messageField.dispatchEvent(event);
                    }
                }, 800);

                setTimeout(() => {setFormData('');}, 150);

            }
        }
    }

    const handleKeyPress = (e) => {if (e.key === 'Enter' && FormData.trim().length >= 1) {handleSubmit();}}
    const [currentWord, setCurrentWord] = useState(() => {
        const randomIndex = Math.floor(Math.random() * word_hero.length);
        return String(word_hero[randomIndex]).charAt(0).toUpperCase() + String(word_hero[randomIndex]).slice(1);
    });

    useEffect(() => {
        let timerWorld;
        if (!isInputFocused) {
            timerWorld = setInterval(() => {
                const randomIndex = Math.floor(Math.random() * word_hero.length);
                setCurrentWord(String(word_hero[randomIndex]).charAt(0).toUpperCase() + String(word_hero[randomIndex]).slice(1));
            }, 2000);
        }
        return () => { if (timerWorld) clearInterval(timerWorld); };
    }, [isInputFocused]);

    useEffect(() => {
        let blinkTimer;
        if (!isInputFocused) {
            blinkTimer = setInterval(() => {
                setShowCursor((prev) => !prev);
            }, 500);
        } else {
            setShowCursor(false); 
        }
        return () => { if (blinkTimer) clearInterval(blinkTimer); };
    }, [isInputFocused]);

    const lables = () => {
        return (
            <styled.InputWrapper>
                <styled.LabelWorld
                    type="text"
                    name="name"
                    autoComplete="off"
                    autoCapitalize="true"
                     placeholder={`${currentWord}${showCursor ? '|' : ''}`} 
                    onFocus={() => setIsInputFocused(true)}
                    onBlur={() => setIsInputFocused(false)}
                    value={FormData}
                    onChange={() => setFormData(event.target.value)}
                    onKeyPress={handleKeyPress}
                    size="10" 
                    aria-label="Décrivez votre projet" /> 
                
                {FormData.length >= 1 && (
                    <styled.SendIcon 
                        onClick={handleSubmit}
                        role="button"
                        tabIndex="0"
                        aria-label="Aller au formulaire de contact avec ce texte">
                        <MdSend />
                    </styled.SendIcon>
                )}
            </styled.InputWrapper>
            )
    }

    const CtaAction = (to, icon, title, content, hightLight = false) => {
        const ariaLabel = `${title} – ${content}`;
        return (
            <Link 
                href={`${window.location.origin}/#${to}`} 
                to={to} spy={true} smooth={true} offset={-70} duration={500} 
                style={{textDecoration: "none", color: "inherit"}}
                aria-label={ariaLabel}
                role="link"
            >
                <styled.Action className={hightLight ? 'highlight' : ''}>
                    <div className="icon" aria-hidden="true">{icon}</div>
                    <h2>{title}</h2>
                    <p>{content}</p>
                </styled.Action>
            </Link>
        )
    }
    
    return (
        <GridEffect>
            <styled.Container id={id}>
                <styled.Top>
                    <styled.HeroText>
                        <h1>Vous voulez transformer votre {lables()} en <GradientTextContainer>Site Web</GradientTextContainer>.</h1>
                        <p className="font_code">Bonjour, je suis Jonathan, développeur Web. Je développe vos plateformes numériques, rapides, pour atteindre vos objectifs.
                        <HelloHandComponent/></p>
                        <div className="cta">
                            {CtaAction(
                                'service', 
                                <AiOutlineCluster/>, 
                                'Mes Services', 
                                'Découvrez mes services sur mesure pour lancer votre idée et la transformer en succès numérique.'
                            )}
                            {CtaAction(
                                'ProcessTimeline', 
                                <AiOutlineBuild/>, 
                                'Mon processus', 
                                'Processus de développement innovant, efficace, et garantissant des résultats fiables.'
                            )}
                            {CtaAction(
                                'contact', 
                                <AiOutlineSend/>, 
                                'Me contacter', 
                                'Prêt à démarrer ? Envoyez-moi un message pour transformer votre idée en réalité numérique.',
                                true
                            )}
                        </div>
                    </styled.HeroText>
                </styled.Top>
                
                <styled.ButtonScroll>
                    <MouseComponent />
                </styled.ButtonScroll>
            </styled.Container>
        </GridEffect>
    )
}
