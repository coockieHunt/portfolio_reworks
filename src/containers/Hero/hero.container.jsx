import React from 'react';

import { 
    Container,
    HeroText,
    ButtonScroll,
    Top,
    TagSlider
} from "./hero.style"

import{ GradientTextContainer } from "../../components/Text/Text.component"
import{ Button, OutlineButton } from "../../components/Button/Button"
import{ HelloHandComponent } from '../../components/HelloHand/HelloHand.component'
import { Link } from "react-scroll";
import { MouseComponent } from '../../components/Mouse/Mouse.component';
import { ScrollTagComponent } from '../../components/ScroolingTag/ScroolingTag.component';
import { useWindowSize } from '../../hooks/screenResize.hook';
import { SCREEN_SIZE } from '../../config'


import { AiOutlineCluster, AiOutlineBuild  } from 'react-icons/ai'

export const HeroContainer = ({id}) => {
    const isMobile = useWindowSize(SCREEN_SIZE.mobile.substring(0, SCREEN_SIZE.mobile.length - 2));
    const IsSmallScreen = useWindowSize(1400);

    const tags = [
        'HTML', 
        'CSS', 
        'JavaScript', 
        'NodeJs',
        'Express',
        'RestApi',
        'Linux',
        'MangoDb',
        'Mysql',
    ];

    return (
        <Container id={id}>
            <Top>
                <HeroText>
                    <h1>Vous voulez transformer votre idée en <GradientTextContainer>Site Web</GradientTextContainer>.</h1>
                    <p>Vous êtes au bon endroit <HelloHandComponent/></p>
                    <div className="cta">
                        <Link to={'service'}>
                            <OutlineButton icon_right icon={<AiOutlineCluster/>}>Mes Service</OutlineButton>
                        </Link>
                        <Link to={'product'}>
                            <OutlineButton icon_right icon={<AiOutlineBuild/>}>Produits</OutlineButton>
                        </Link>

                    </div>
                </HeroText>

                <TagSlider>
                    <ScrollTagComponent Tags = {tags} Width = {IsSmallScreen ? "25rem" : "40rem"}/>
                </TagSlider>
            </Top>
            
            <ButtonScroll>
                <MouseComponent type={
                    isMobile ? "phone" : "mouse"
                }/>
            </ButtonScroll>
        </Container>
    )
}
