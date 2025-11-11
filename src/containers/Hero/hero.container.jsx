
import * as styled from "./hero.style.jsx";
import { Link } from "react-scroll";
import { useState, useEffect } from "react";
import { AiOutlineCluster, AiOutlineBuild  } from 'react-icons/ai'

//components
import{ GradientTextContainer } from "../../components/Text/Text.component"
import{ OutlineButton } from "../../components/Button/Button"
import{ HelloHandComponent } from '../../components/HelloHand/HelloHand.component'
import { MouseComponent } from '../../components/Mouse/Mouse.component';

//hook
import { useWindowSize } from '../../hooks/screenResize.hook';

//config
import { SCREEN_SIZE, getColorSettings, COLOR_SETTING} from '../../config.jsx'

//context
import { useSettingContext } from '../../context/Setting.context';
import { GridEffect } from '../../styles/effect.jsx';


//disabled

// import { ScrollTagComponent } from '../../components/ScroolingTag/ScroolingTag.component';
{/* <styled.TagSlider>
    <ScrollTagComponent Tags = {tags} Width = {IsSmallScreen ? "25rem" : "40rem"}/>
</styled.TagSlider> */}
//  const tags = [
//     'Sites', 
//     'Applications', 
//     'API', 
//     'UX/UI',
//     'Express',
//     'Performance',
// ];


const words = [
    'idée',
    'projet',
    'concept',
    'vision',
    'rêve',
    'univers',
    'œuvre',
    'entreprise',
    'marque',
    'inspiration',
    'pensée',
    'passion',
    'équilibre',
    'quête',
    'silence',
    'monde',
];


export const HeroContainer = ({id}) => {
    const isMobile = useWindowSize(SCREEN_SIZE.mobile.substring(0, SCREEN_SIZE.mobile.length - 2));
    const {settings} = useSettingContext();

    const [currentWord, setCurrentWord] = useState(() => {
        const randomIndex = Math.floor(Math.random() * words.length);
        return words[randomIndex];
    });
    const [isInputFocused, setIsInputFocused] = useState(false);

    useEffect(() => {
        let timerWorld;

        if (!isInputFocused) {
            timerWorld = setInterval(() => {
                const randomIndex = Math.floor(Math.random() * words.length);
                setCurrentWord(words[randomIndex]);
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

    return (
        <GridEffect>
            <styled.Container id={id}>
                <styled.Top>
                    <styled.HeroText>
                        <h1>Vous voulez transformer votre {lables()} en <GradientTextContainer>Site Web</GradientTextContainer>.</h1>
                        <p>Bonjour moi ces jonathan Vous êtes au bon endroit <HelloHandComponent/></p>
                        <div className="cta">
                            <Link to={'service'}>
                                <OutlineButton icon_right icon={<AiOutlineCluster/>}>Mes Service</OutlineButton>
                            </Link>
                            <Link to={'product'}>
                                <OutlineButton color={getColorSettings(settings.theme).ter} icon_right icon={<AiOutlineBuild/>}>Produits</OutlineButton>
                            </Link>

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
