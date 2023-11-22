import React from 'react';

import { 
    Container,
    HeroText,
    Botton,
    Top,
    TagSlider
} from "./hero.style"

import{ GradiantTextContainer } from "../../components/Text/Text.component"
import{ Button } from "../../components/Buttton/Button.component"
import{ HelloHandComponent } from '../../components/HelloHand/HelloHand.component'
import { Link } from "react-scroll";
import { MouseComponent } from '../../components/Mouse/Mouse.component';
import { ScroolingTagComponent } from '../../components/ScroolingTag/ScroolingTag.component';
import { useWindowSize } from '../../hooks/screenResize.hook';
import { SCREEN_SIZE } from '../../config'


import { AiOutlineCluster } from 'react-icons/ai'

export const HeroContainer = ({id}) => {
    const isMobile = useWindowSize(
        SCREEN_SIZE.mobile.substring(0, SCREEN_SIZE.mobile.length - 2)
    );

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
                    <h1>Vous voulez transformer votre idée en <GradiantTextContainer>Site Web</GradiantTextContainer>.</h1>
                    <p>Vous êtes au bon endroit <HelloHandComponent/></p>
                    <div className="cta">
                        <Link to={'contact'}>
                            <Button icon={<AiOutlineCluster/>}>Mes Service</Button>
                        </Link>
                    </div>
                </HeroText>

                <TagSlider>
                    <ScroolingTagComponent 
                        Tags = {tags}
                        Witdth = "40rem"
                    />
                </TagSlider>

            </Top>
            
            <Botton>
                <MouseComponent type={
                    isMobile ? "phone" : "mouse"
                }/>
            </Botton>
        </Container>
    )
}
