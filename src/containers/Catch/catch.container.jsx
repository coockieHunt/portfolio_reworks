import {
    Container,
    Text,
    HomeSheetContainer
}  from './catch.style'

import HomeSheet from '../../image/home_sheet.png'
import { SplitLayouComponent } from '../../components/SplitLayout/SplitLayout.component'
import { AccentTextComponent } from '../../components/Text/Text.component'

import {useWindowSize} from "../../hooks/screenResize.hook";

import{SCREEN_SIZE} from '../../config'

export const CathContainer = ({id}) => {
    const isMobile = useWindowSize(
        SCREEN_SIZE.mobile.substring(0, SCREEN_SIZE.mobile.length - 2)
    ); 
    
    return(
        <Container id={id}>
            <SplitLayouComponent
                background_color="#292929"
                left_width={!isMobile ? '50%' : "100%"}
                left_child={
                    <Text>
                        <h1><AccentTextComponent>PASSIONNÉ</AccentTextComponent> par de nombreux domaines</h1>
                        <p>Passionné par de nombreux domaines, notamment le développement, la 3D, l'électronique et bien d'autres compétences. Mon expertise polyvalente me permet de relever efficacement les défis dans ces domaines, en fournissant des solutions innovantes et une qualité exceptionnelle pour chaque projet.</p>
                        <ul>
                            <li>Développement</li>
                            <li>3D</li>
                            <li>Électronique</li>
                            <li>Design</li>
                        </ul>
                    </Text>
                }
                right_width={!isMobile ? '50%' : "0%"}
                rigth_child={
                    !isMobile ?
                        <HomeSheetContainer>
                            <img src={HomeSheet}  alt="HomeSheet"/>
                        </HomeSheetContainer>
                        :
                        null
                   
                }
            />
        </Container>
    )
}