
import * as styled from "./hero.style.jsx";
import { Link } from "react-scroll";
import { useState, useEffect } from "react";
import { AiOutlineCluster, AiOutlineBuild, AiOutlineSend } from 'react-icons/ai'

//components
import{ GradientTextContainer } from "../../components/Text/Text.component"
import{ HelloHandComponent } from '../../components/HelloHand/HelloHand.component'
import { MouseComponent } from '../../components/Mouse/Mouse.component';

//hook
import { useWindowSize } from '../../hooks/screenResize.hook';

//config
import { SCREEN_SIZE, getColorSettings, COLOR_SETTING, word_hero} from '../../config.jsx'

//context
import { useSettingContext } from '../../context/Setting.context';
import { GridEffect } from '../../styles/effect.jsx';


export const HeroContainer = ({id}) => {
    const isMobile = useWindowSize(SCREEN_SIZE.mobile.substring(0, SCREEN_SIZE.mobile.length - 2));
    const {settings} = useSettingContext();

    const [currentWord, setCurrentWord] = useState(() => {
        const randomIndex = Math.floor(Math.random() * word_hero.length);
        return word_hero[randomIndex];
    });
    const [isInputFocused, setIsInputFocused] = useState(false);

    useEffect(() => {
        let timerWorld;

        if (!isInputFocused) {
            timerWorld = setInterval(() => {
                const randomIndex = Math.floor(Math.random() * word_hero.length);
                setCurrentWord(word_hero[randomIndex]);
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
                $borderColorCustom={COLOR_SETTING[settings.theme].primary}
                $backgroundCustom={COLOR_SETTING[settings.theme].background_secondary}
                size="10" /> 
            )
    }

    const CtaAction = (to, icon, title, content, hightLight = false) => {
        return (
            <Link to={to}>
                <styled.Action className={hightLight ? 'highlight' : ''}>
                    <div className="icon">{icon}</div>
                    <h3>{title}</h3>
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
                        <HelloHandComponent/><br/><span className="font_code other">Choisissez votre prochaine étape :</span></p>
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
                    <MouseComponent type={
                        isMobile ? "phone" : "mouse"
                    }/>
                </styled.ButtonScroll>
            </styled.Container>
        </GridEffect>
    )
}
