import * as StyleCatch from './catch.style'

import HomeSheet from '../../assets/images/home_sheet.webp'
import { SplitLayoutComponent } from '../../components/SplitLayout/SplitLayout.component'
import { AccentTextComponent } from '../../components/Text/Text.component'

import { useWindowSize } from "../../hooks/screenResize.hook";

import { SCREEN_SIZE, GetLightSetting, setting} from '../../config'

export const CathContainer = ({ id }) => {
    const light = GetLightSetting();
    const isMobile = useWindowSize(
        SCREEN_SIZE.mobile.substring(0, SCREEN_SIZE.mobile.length - 2)
    );

    return (
        <StyleCatch.Section id={id}>
            <SplitLayoutComponent
                padding="50px"
                background_color= {light.background_secondary}
                left_width={!isMobile ? '50%' : "100%"}
                left_child={
                    <StyleCatch.Text>
                        <h2><AccentTextComponent>PASSIONNÉ</AccentTextComponent> par de nombreux domaines</h2>
                        <p>Passionné par de nombreux domaines, notamment le développement, la 3D, l'électronique et bien d'autres compétences. Mon expertise polyvalente me permet de relever efficacement les défis dans ces domaines, en fournissant des solutions innovantes et une qualité exceptionnelle pour chaque projet.</p>
                        <ul>
                            <li>Développement</li>
                            <li>3D</li>
                            <li>Électronique</li>
                            <li>Design</li>
                        </ul>
                    </StyleCatch.Text>
                }
                right_width={!isMobile ? '50%' : "0%"}
                right_child={
                    !isMobile &&
                    <StyleCatch.HomeSheetContainer>
                        <img src={HomeSheet} alt="HomeSheet" />
                    </StyleCatch.HomeSheetContainer>
                }
            />
        </StyleCatch.Section>
    )
}