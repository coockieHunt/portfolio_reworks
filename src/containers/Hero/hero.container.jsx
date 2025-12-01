
import * as styled from "./hero.style.jsx";
import { Link } from "react-scroll";
import { useState, useEffect } from "react";
import { AiOutlineCluster, AiOutlineBuild, AiOutlineSend } from 'react-icons/ai'

//components
import{ GradientTextContainer } from "../../components/Text/Text.component"
import{ HelloHandComponent } from '../../components/HelloHand/HelloHand.component'
import { MouseComponent } from '../../components/Mouse/Mouse.component';

//config
import { word_hero } from '../../data.jsx'

//context
import { GridEffect } from '../../styles/effect.jsx';

export const HeroContainer = ({id}) => {

    const [currentWord, setCurrentWord] = useState(() => {
        const randomIndex = Math.floor(Math.random() * word_hero.length);
        return String(word_hero[randomIndex]).charAt(0).toUpperCase() + String(word_hero[randomIndex]).slice(1);
    });
    const [isInputFocused, setIsInputFocused] = useState(false);

    useEffect(() => {
        let timerWorld;

        if (!isInputFocused) {
            timerWorld = setInterval(() => {
                const randomIndex = Math.floor(Math.random() * word_hero.length);
                setCurrentWord(String(word_hero[randomIndex]).charAt(0).toUpperCase() + String(word_hero[randomIndex]).slice(1));
            }, 2000);
        }

        return () => {if (timerWorld) clearInterval(timerWorld);};
    }, [isInputFocused]);

    const lables = () => {
        return (
            <styled.LabelWorld
                type="text"
                name="name"
                autoComplete="off"
                autoCapitalize="true"
                placeholder={currentWord}
                onFocus={() => setIsInputFocused(true)}
                onBlur={() => setIsInputFocused(false)}
                size="10" /> 
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
