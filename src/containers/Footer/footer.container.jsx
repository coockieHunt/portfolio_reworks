import * as Footer from './footer.style'
import { SiReact } from 'react-icons/si';
import { GiOutbackHat } from 'react-icons/gi';
import { DiJavascript1 } from 'react-icons/di';

export const FooterContainer = () => {
    return(
        <Footer.Container>
            <Footer.Block>
                Lève-toi et code <GiOutbackHat />
            </Footer.Block>
            <Footer.Block>
                GLEYZE Jonathan. All Rights Reserved<br/>
                Powered by Node <DiJavascript1/><br/>
                06.03.42.02.04
            </Footer.Block>
            <Footer.Block>
                create whith react <SiReact />
            </Footer.Block>
        </Footer.Container>
    )
}