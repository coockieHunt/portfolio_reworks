import React, { Suspense } from 'react';

import { 
    Container,
    HeroText,
    DeskSpline 
} from "./hero.style"

import{CradiantTextComponent} from "../../components/Text/Text.component"
import{Button} from "../../components/Buttton/Button.component"
import{HellowHandComponent} from '../../components/HelloHand/HelloHand.component'
import { Link } from "react-scroll";

const Spline = React.lazy(() => import('@splinetool/react-spline'));

export const HeroContainer = ({id}) => {
    return (
        <Container id={id}>
            <HeroText>
                <h1>Vous voulez transformer votre idée en <CradiantTextComponent>Site Web</CradiantTextComponent>.  </h1>
                <p>Vous êtes au bon endroit <HellowHandComponent/></p>
                <div className="cta">
                    <Link to={'contact'}>
                        <Button>Contact</Button>
                    </Link>
                </div>
            </HeroText>

        <DeskSpline>
            <Suspense fallback={<div>Loading...</div>}>
                <Spline scene="https://draft.spline.design/RkBPPEpmICxiaTWD/scene.splinecode" />
            </Suspense>
        </DeskSpline>
          
        </Container>
    )
}
